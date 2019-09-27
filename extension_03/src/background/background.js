chrome.browserAction.onClicked.addListener(() => {

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {

        const activeTab = tabs[0];

        chrome.tabs.executeScript(activeTab.id, {file: 'content/content.js'}, () => {
            console.log('Execute Script.');
        });

        chrome.tabs.insertCSS(activeTab.id, {file: 'content/content.css'}, () => {
            console.log('Insert Css.');
        })

    });

});
