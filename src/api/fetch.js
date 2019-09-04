import { BrowserApiWrapper } from '../api/browser-api-wrapper.js';

const browser = new BrowserApiWrapper().browser;

export const fetch = (url, options) => {
    return new Promise(
        (resolve, reject) => {
            browser.runtime.sendMessage({fetch: {url, options}}, (response) => {
                const lastError = browser.runtime.lastError;

                if (lastError) reject(lastError);
                if (response.error) reject(response.error);

                const {body, init} = response;
                const resp = new Response(JSON.stringify(body), {...init});

                resolve(resp);
            });
        });
};
