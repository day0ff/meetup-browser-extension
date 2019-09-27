import * as config from '../../config.json';
import { BrowserApiWrapper } from '../api/browser-api-wrapper.js';

const browser = new BrowserApiWrapper().browser;

browser.browserAction.onClicked.addListener(() => {
    browser.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const activeTab = tabs[0];

        fetch(`${config.url}/characters/random`)
            .then(response => response.json())
            .then(character => {
                browser.tabs.sendMessage(
                    activeTab.id,
                    {background: {message: character}},
                    response => console.log(response.content.response)
                );
            });
    });
});
