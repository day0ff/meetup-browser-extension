chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.popup && request.popup.message) {
            console.log(request.popup.message);
        }
        sendResponse({content: {response: 'Response from Background!'}});
    }
);
