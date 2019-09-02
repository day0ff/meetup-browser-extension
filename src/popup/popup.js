const button = document.getElementById('dominate');
const dominatorArray = Array.from(document.getElementsByName('dominator'));
const dominatedArray = Array.from(document.getElementsByName('dominated'));

button.addEventListener('click', () => {

    const dominator = dominatorArray.filter(element => element.checked)[0].value;
    const dominated = dominatedArray.filter(element => element.checked)[0].value;

    chrome.tabs.query({currentWindow: true, active: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {popup: {message: {dominator, dominated}}}, response => {
            if (response && response.content) console.log(response.content.response);
        });
    });

    chrome.runtime.sendMessage({popup: {message: 'Hello from popup!'}}, (response) => {
        if (response && response.background) console.log(response);
    });
});

