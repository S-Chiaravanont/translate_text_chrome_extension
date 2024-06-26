// Saves options to chrome.storage
const saveOptions = () => {
    const language = document.getElementById('language').value;
  
    chrome.storage.sync.set(
      { presetLanguage: language },
      () => {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => {
          status.textContent = '';
        }, 750);
      }
    );
  };
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  const restoreOptions = () => {
    chrome.storage.sync.get(
      { presetLanguage: 'en' },
      (items) => {
        document.getElementById('language').value = items.favoriteColor;
      }
    );
  };
  
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save').addEventListener('click', saveOptions);