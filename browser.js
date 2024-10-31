let tabs = [];
let currentTab = null;

function createTab(url) {
    const tabId = 'tab-' + tabs.length;
    tabs.push(tabId);

    const tabOption = document.createElement('option');
    tabOption.value = tabId;
    tabOption.innerHTML = 'Tab ' + (tabs.length);
    document.getElementById('tab-selector').appendChild(tabOption);

    const iframe = document.createElement('iframe');
    iframe.id = 'iframe-' + tabId;
    iframe.src = url || 'about:blank';
    document.getElementById('browser-container').appendChild(iframe);

    switchTab(tabId);
}

function switchTab(tabId) {
    tabs.forEach(id => {
        const iframe = document.getElementById('iframe-' + id);
        iframe.classList.remove('active');
    });
    const activeIframe = document.getElementById('iframe-' + tabId);
    activeIframe.classList.add('active');
    document.getElementById('tab-selector').value = tabId;
    currentTab = tabId;
}

document.getElementById('new-tab').onclick = () => createTab();
document.getElementById('go').onclick = () => {
    const url = document.getElementById('url').value;
    if (url && currentTab) {
        const iframe = document.getElementById('iframe-' + currentTab);
        iframe.src = url.startsWith('http') ? url : `http://${url}`;
    }
};

document.getElementById('tab-selector').onchange = (event) => {
    switchTab(event.target.value);
};

document.getElementById('back').onclick = () => {
    if (currentTab) {
        const iframe = document.getElementById('iframe-' + currentTab).contentWindow;
        iframe.history.back();
    }
};

document.getElementById('forward').onclick = () => {
    if (currentTab) {
        const iframe = document.getElementById('iframe-' + currentTab).contentWindow;
        iframe.history.forward();
    }
};

document.getElementById('reload').onclick = () => {
    if (currentTab) {
        const iframe = document.getElementById('iframe-' + currentTab).contentWindow;
        iframe.location.reload();
    }
};

// Create an initial tab
createTab();
