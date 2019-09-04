import { BrowserApiWrapper } from '../api/browser-api-wrapper.js';

const browser = new BrowserApiWrapper().browser;

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.fetch) {

        fetch(message.fetch.url, message.fetch.options)
            .then(response => {
                const init = {
                    status: response.status,
                    statusText: response.text
                };
                const body = response.json();

                return Promise.all([body, init]);
            })
            .then(response => {
                const [body, init] = response;

                return sendResponse({body, init});
            })
            .catch(error => sendResponse({error: error.message}));

        return true;
    }
});
