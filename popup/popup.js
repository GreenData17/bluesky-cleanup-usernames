if(navigator.userAgent.toLowerCase().includes("mobile")) {
    document.body.classList.add("android")
}

// onLoadCompleted
document.addEventListener('DOMContentLoaded', function() {
    browser.storage.sync.get(['removeTLDs', 'showBadge']).then(({ removeTLDs, showBadge }) => {
        document.getElementById('remove-TLD-toggle').classList.add(removeTLDs ? "active" : "false");
        document.getElementById('show-badge').classList.add(showBadge || showBadge == null ? "active" : "false");
    });
});

// on github button clicked
document.getElementById('github').addEventListener('click', () => {
    window.open('https://github.com/GreenData17/bluesky-cleanup-usernames', '_blank');
});

// on save button clicked
document.getElementById('save').addEventListener('click', () => {
    const removeTLDs = document.getElementById('remove-TLD-toggle').classList.contains("active")
    const showBadge = document.getElementById('show-badge').classList.contains("active")
    
    browser.storage.sync.set({ removeTLDs, showBadge }).then(() => {
        window.close();
    });
});

// on any toggle clicked
document.querySelectorAll('.toggle').forEach(element => {
    element.addEventListener('click', () => {
        element.children[0].className = element.children[0].className == "active" ? "" : "active";
    });
});

// on any toggle area clicked
document.querySelectorAll('.toggle-area').forEach(element => {
    element.addEventListener('click', () => {
        element.children[0].children[0].className = element.children[0].children[0].className == "active" ? "" : "active";
    });
});