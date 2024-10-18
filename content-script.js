function replaceTextOnPage() {
    browser.storage.sync.get(['removeTLDs']).then(({ removeTLDs }) => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;

        while (node = walker.nextNode()) {
            // Replace @user.bsky.social with @user
            node.nodeValue = node.nodeValue.replace(/@([a-zA-Z0-9_.-]+)\.bsky\.social/g, '@$1');

            if (removeTLDs) {
                // Remove other TLDs (e.g., @user.com becomes @user)
                node.nodeValue = node.nodeValue.replace(/@([a-zA-Z0-9_.-]+)\.[a-z]{2,6}/g, '@$1');
            }
        }
    });
}

replaceTextOnPage();

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            // Only target newly added elements that are text-containing nodes
            if (node.nodeType === Node.ELEMENT_NODE) {
                replaceTextOnPage();
            }
        });
    });
});

observer.observe(document.body, { childList: true, subtree: true });
