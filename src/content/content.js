import { BrowserApiWrapper } from '../assets/api/browser-api-wrapper.js';

const browser = new BrowserApiWrapper().browser;

const BROWSER_ICON = {
    'Chrome': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Chrome_icon_%28September_2014%29.svg/1024px-Google_Chrome_icon_%28September_2014%29.svg.png',
    'Firefox': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Firefox_Logo%2C_2017.svg/1024px-Firefox_Logo%2C_2017.svg.png',
    'Safari': 'https://upload.wikimedia.org/wikipedia/ru/9/9f/Safari-icon.png',
    'Edge': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Microsoft_Edge_logo.svg/1024px-Microsoft_Edge_logo.svg.png'
};

const BROWSER_COMPANY = {
    'Chrome': 'Google',
    'Firefox': 'Mozilla',
    'Safari': 'Apple',
    'Edge': 'Microsoft'
};

browser.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.popup && request.popup.message) {
            console.log(request.popup.message.dominator, request.popup.message.dominated);
            dominateBrowser(request.popup.message.dominator, request.popup.message.dominated);
        }
        sendResponse({content: {response: 'Response from Content!'}});
    }
);


function dominateBrowser(dominator, dominated) {
    const body = document.body;
    body.innerHTML = body.innerHTML.replace(new RegExp(`${dominated}`, 'ig'), dominator);
    body.innerHTML = body.innerHTML.replace(new RegExp(`${BROWSER_COMPANY[dominated]}`, 'ig'), BROWSER_COMPANY[dominator]);

    const images = body.querySelectorAll('img');

    images.forEach(img => {
        if (img.src.includes(dominator)) {
            img.src = BROWSER_ICON[dominator];
            const size = Math.max(img.width, img.height);
            img.style.width = size + 'px';
            img.style.height = size + 'px';
        }
    });
}

