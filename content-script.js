function replaceTextOnPage() {
    browser.storage.sync.get(['removeTLDs', 'showBadge']).then(({ removeTLDs, showBadge }) => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;

        while (node = walker.nextNode()) {
            const parent = node.parentNode;
            let newValue = "";
            let wskyDomainRemoved = false;
            let customDomainRemoved = false;

            // Replace @user.bsky.social with @user
            newValue = node.nodeValue.replace(/@([a-zA-Z0-9_.-]+)\.bsky\.social/g, '@$1');
            wskyDomainRemoved = node.nodeValue !== newValue;
            node.nodeValue = newValue;

            // Remove other TLDs (e.g., @user.com becomes @user)
            newValue = node.nodeValue.replace(/@([a-zA-Z0-9_.-]+)\.[a-z]{2,6}/g, '@$1');
            customDomainRemoved = node.nodeValue !== newValue;

            if (removeTLDs) {
                node.nodeValue = newValue;
            }

            if(
                (showBadge || showBadge == null) && 
                node.nodeValue.includes('@') && 
                !parent.querySelector('.badge') && 
                (wskyDomainRemoved || customDomainRemoved)
            ) {
                let image = document.createElement('img');
                image.className = 'badge';
                image.src = browser.runtime.getURL('icons/icon-light.png');
                image.style.width = '16px';
                image.style.height = '16px';
                image.style.marginLeft = '4px';
                image.style.marginBottom = '-4px';
                image.style.display = customDomainRemoved ? 'none' : 'inline-block';
                parent.appendChild(image)
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
