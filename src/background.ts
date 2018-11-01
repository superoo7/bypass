const showForPages = ["*://*.quora.com/*", "*://*.youtube.com/*"];
const channelTabs: any[] = [];

// a tab requests connection to the background script
chrome.extension.onConnect.addListener((port: any) => {
  const tabId = port.sender.tab.id;
  console.log("Received request from content script", port);

  // add tab when opened
  if (channelTabs.indexOf(tabId) == -1) {
    channelTabs.push(tabId);
  }

  // remove when closed/directed to another url
  port.onDisconnect.addListener(function() {
    channelTabs.splice(channelTabs.indexOf(tabId), 1);
  });
});

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
    case "youtube.com":
    case "www.youtube.com":
      if (loc.searchParams.get("v")) {
        const id = loc.searchParams.get("v");
        chrome.tabs.update({ url: `https://${loc.hostname}/embed/${id}` });
      }
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
