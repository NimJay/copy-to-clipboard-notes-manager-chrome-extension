// Save the note when the "save-button" is clicked
document.getElementById('save-button').addEventListener('click', function () {
    const saveButton = document.getElementById('save-button');
    saveButton.disabled = true;
    const textarea = document.getElementById('note-textarea');
    const text = textarea.value;
    chrome.storage.sync.set({ 'savedNote': text }, () => {
        console.log('Text saved to storage');
    });
});

// Enable the "save-button" when the "note-textarea" is modified
document.getElementById('note-textarea').addEventListener('input', () => {
    const saveButton = document.getElementById('save-button');
    saveButton.disabled = false;
});

// "Copy to clipboard" feature
document.getElementById('copy-button').addEventListener('click', () => {
    chrome.storage.sync.get(['savedNote'], (result) => {
        const text = result.savedNote;
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Text copied to clipboard!');
                const copyToClipboardButton = document.getElementById('copy-button');
                copyToClipboardButton.innerHTML = 'Copied!';
                copyToClipboardButton.disabled = true;
                setTimeout(() => {
                    copyToClipboardButton.innerHTML = 'Copy to clipboard';
                    copyToClipboardButton.disabled = false;
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy text:  ', err);
            });
    });
});

// Load the saved note
chrome.storage.sync.get(['savedNote'], (result) => {
    const textarea = document.getElementById('note-textarea');
    textarea.value = result.savedNote || '';
});
