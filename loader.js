(() => {
  const endpoint = String(window.LUCKY_SHEET_URL || "").trim();

  function addScript(src, onload, onerror) {
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = onload || null;
    script.onerror = onerror || null;
    document.head.appendChild(script);
  }

  function startWebsite() {
    addScript("script.js?v=20260802-3");
  }

  function loadFallback() {
    console.warn("Google Sheets tidak dapat dimuat. Memakai data.js sementara.");
    addScript("data.js?v=20260802-3", startWebsite, startWebsite);
  }

  if (
    !endpoint ||
    endpoint.includes("TEMPEL_LINK") ||
    !endpoint.startsWith("https://script.google.com/")
  ) {
    loadFallback();
    return;
  }

  const separator = endpoint.includes("?") ? "&" : "?";
  const freshUrl = endpoint + separator + "t=" + Date.now();

  addScript(
    freshUrl,
    () => {
      if (window.LUCKY_CONFIG) {
        startWebsite();
      } else {
        console.error(window.LUCKY_CONFIG_ERROR || "Data Sheets kosong.");
        loadFallback();
      }
    },
    loadFallback
  );
})();