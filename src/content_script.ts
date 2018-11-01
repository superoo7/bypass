const port = chrome.extension.connect();

interface IRequest {
  action: String;
}

chrome.extension.onMessage.addListener((request: IRequest, _sender: any, _sendResponse: any) => {
  switch (request.action) {
  }
});
