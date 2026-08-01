/**
 * Lucky Consultant — Google Sheets CMS
 * Google Sheets menjadi panel admin untuk website GitHub Pages.
 *
 * Nama tab wajib:
 * Pengaturan, Portfolio, Testimoni, Layanan, FAQ
 */

function doGet() {
  try {
    const config = buildLuckyConfig_();
    const javascript =
      "window.LUCKY_CONFIG = " +
      JSON.stringify(config) +
      "; window.LUCKY_CONFIG_LOADED = true;";

    return ContentService
      .createTextOutput(javascript)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  } catch (error) {
    const message = String(error && error.message ? error.message : error);
    const javascript =
      "window.LUCKY_CONFIG_ERROR = " +
      JSON.stringify(message) +
      ";";

    return ContentService
      .createTextOutput(javascript)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
}

function buildLuckyConfig_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const settings = readSettings_(ss, "Pengaturan");
  const portfolioRows = readRows_(ss, "Portfolio");
  const testimonialRows = readRows_(ss, "Testimoni");
  const serviceRows = readRows_(ss, "Layanan");
  const faqRows = readRows_(ss, "FAQ");

  const portfolio = portfolioRows
    .filter(row => isVisible_(row["Tampilkan"]))
    .sort(sortByOrder_)
    .map(row => ({
      title: value_(row["Judul"], "Portfolio"),
      category: value_(row["Kategori"], "Lainnya"),
      image: normalizeImageUrl_(row["Link Gambar"]),
      description: value_(row["Deskripsi"], ""),
      tags: splitTags_(row["Tags"]),
      demo: isYes_(row["Placeholder"])
    }));

  const testimonials = testimonialRows
    .filter(row => isVisible_(row["Tampilkan"]))
    .sort(sortByOrder_)
    .map(row => ({
      text: value_(row["Testimoni"], ""),
      name: value_(row["Nama / Inisial"], "Client"),
      role: value_(row["Layanan"], ""),
      rating: clamp_(number_(row["Rating"], 5), 1, 5),
      demo: false
    }));

  const services = serviceRows
    .filter(row => isVisible_(row["Tampilkan"]))
    .sort(sortByOrder_)
    .map(row => ({
      icon: value_(row["Icon"], "document"),
      title: value_(row["Judul"], "Layanan"),
      description: value_(row["Deskripsi"], "")
    }));

  const faq = faqRows
    .filter(row => isVisible_(row["Tampilkan"]))
    .sort(sortByOrder_)
    .map(row => ({
      question: value_(row["Pertanyaan"], ""),
      answer: value_(row["Jawaban"], "")
    }));

  return {
    brand: {
      name: setting_(settings, "brand_name", "Lucky Consultant"),
      eyebrow: setting_(
        settings,
        "brand_eyebrow",
        "PORTOFOLIO & PENDAMPINGAN AKADEMIK"
      ),
      headline: setting_(
        settings,
        "brand_headline",
        "Tugas lebih rapi, proses lebih transparan."
      ),
      description: setting_(
        settings,
        "brand_description",
        "Pendampingan dokumen, presentasi, olah data, dan revisi."
      ),
      note: setting_(
        settings,
        "brand_note",
        "Portfolio hanya menampilkan contoh yang telah disamarkan."
      )
    },

    links: {
      tracking: setting_(settings, "tracking_url", "#"),
      whatsappNumber: setting_(settings, "whatsapp_number", ""),
      whatsappMessage: setting_(
        settings,
        "whatsapp_message",
        "Halo Lucky Consultant, saya ingin konsultasi."
      ),
      tiktok: setting_(settings, "tiktok_url", "#"),
      instagram: setting_(settings, "instagram_url", "#")
    },

    stats: [
      {
        value: number_(setting_(settings, "stat_pekerjaan", 0), 0),
        suffix: "+",
        label: "Pekerjaan selesai"
      },
      {
        value: number_(setting_(settings, "stat_ulasan", testimonials.length), testimonials.length),
        suffix: "+",
        label: "Ulasan positif"
      },
      {
        value: number_(setting_(settings, "stat_layanan", services.length), services.length),
        suffix: "",
        label: "Jenis layanan"
      },
      {
        value: number_(setting_(settings, "stat_privasi", 100), 100),
        suffix: "%",
        label: "Privasi dijaga"
      }
    ],

    services: services,
    portfolio: portfolio,
    testimonials: testimonials,
    faq: faq
  };
}

function readSettings_(ss, sheetName) {
  const rows = readRows_(ss, sheetName);
  const result = {};

  rows.forEach(row => {
    const key = String(row["Kunci"] || "").trim();
    if (key) result[key] = row["Nilai"];
  });

  return result;
}

function readRows_(ss, sheetName) {
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    throw new Error('Tab "' + sheetName + '" tidak ditemukan.');
  }

  const values = sheet.getDataRange().getDisplayValues();

  if (values.length < 2) return [];

  const headers = values[0].map(header => String(header).trim());

  return values.slice(1)
    .filter(row => row.some(cell => String(cell).trim() !== ""))
    .map(row => {
      const object = {};
      headers.forEach((header, index) => {
        object[header] = row[index];
      });
      return object;
    });
}

function sortByOrder_(a, b) {
  return number_(a["Urutan"], 9999) - number_(b["Urutan"], 9999);
}

function normalizeImageUrl_(url) {
  const raw = String(url || "").trim();
  if (!raw) return "portfolio-word.svg";

  // File lokal GitHub atau URL gambar biasa tetap digunakan.
  if (!raw.includes("drive.google.com")) return raw;

  let match = raw.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) match = raw.match(/[?&]id=([a-zA-Z0-9_-]+)/);

  if (!match) return raw;

  return "https://drive.google.com/thumbnail?id=" +
    encodeURIComponent(match[1]) +
    "&sz=w1600";
}

function splitTags_(value) {
  return String(value || "")
    .split(",")
    .map(tag => tag.trim())
    .filter(Boolean);
}

function isVisible_(value) {
  const normalized = String(value || "YA").trim().toUpperCase();
  return !["TIDAK", "NO", "NONAKTIF", "0"].includes(normalized);
}

function isYes_(value) {
  return ["YA", "YES", "TRUE", "1"].includes(
    String(value || "").trim().toUpperCase()
  );
}

function setting_(settings, key, fallback) {
  const value = settings[key];
  return String(value === undefined || value === null ? "" : value).trim() || fallback;
}

function value_(value, fallback) {
  const result = String(value === undefined || value === null ? "" : value).trim();
  return result || fallback;
}

function number_(value, fallback) {
  const cleaned = String(value === undefined || value === null ? "" : value)
    .replace(/[^\d.-]/g, "");
  const result = Number(cleaned);
  return Number.isFinite(result) ? result : fallback;
}

function clamp_(number, min, max) {
  return Math.min(Math.max(number, min), max);
}