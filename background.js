// on initialize, create a new option for contextMenu
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "getSelectedText",
        title: "Translate selected text",
        contexts: ["selection"]
    });
});

// add listener on this new context menu option
chrome.contextMenus.onClicked.addListener(async (info) => {
    // fetch for current active & focused window
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    let result;
    if (info.menuItemId === "getSelectedText") {
        // injecting code to grab selected text
        try {
            [{result}] = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: getSelectedText,
            })
        } catch (e) {
            return;
        }
        // fetch to get preset language from chrome storage
        chrome.storage.sync.get('presetLanguage', (language) => {
            let presetLanguage;
            if (Object.keys(language).length > 0) {
                presetLanguage = language.presetLanguage;
            } else {
                presetLanguage = 'en'
            }
            // create new pop up window
            chrome.windows.create({
                url: `https://translate.google.com/?hl=en&sl=auto&tl=${presetLanguage}&text=${encodeURI(result)}&op=translate`,
                type: "popup",
                focused: true,
                width: 900,
                height: 400
              });
        })
    }
});

// function to extract and return selected text from current active tab/window
function getSelectedText() {
    const selection = window.getSelection().toString();
    return selection
}
  