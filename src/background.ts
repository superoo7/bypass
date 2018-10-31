const showForPages = ["*://*.quora.com/*", "*://*.youtube.com/*"];

const bypassRestriction = (_word: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) => {
  const url = tab.url;
  const loc = new URL(url as string);

  switch (loc.hostname) {
    case "quora.com":
    case "www.quora.com":
      if (!loc.searchParams.get("share")) {
        loc.searchParams.append("share", "1");
        chrome.tabs.update({ url: loc.href });
      }
      break;
    default:
      break;
  }
};

chrome.contextMenus.create({
  title: "Bypass restriction",
  contexts: ["all"],
  documentUrlPatterns: showForPages,
  onclick: bypassRestriction
});
