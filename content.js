chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "logSelection") {
        const selection = window.getSelection().toString();
        console.log("Selected text:", selection);
    }
});
  