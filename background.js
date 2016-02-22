var tabAgeMap = {};
var MAX_AGE_MINUTES = 2;

var killTab = function (tabId) {
    chrome.tabs.remove(tabId, function () {
        console.log('killed', tabId, tabAgeMap[tabId]);
        delete tabAgeMap[tabId];
    });
};

var increaseTabAge = function (tabId) {
    if (typeof tabAgeMap[tabId] == 'undefined') {
        tabAgeMap[tabId] = 0;
    } else {
        tabAgeMap[tabId]++;
    }
};

setInterval(function () {
    chrome.tabs.query({
        url: 'https://*.facebook.com/*'
    }, function (tabs) {
        console.log(tabAgeMap);
        tabs.forEach(function (tab) {
            increaseTabAge(tab.id);
            if (tabAgeMap[tab.id] > MAX_AGE_MINUTES * 60) {
                killTab(tab.id);
            }
        });
    });
}, 1000);
