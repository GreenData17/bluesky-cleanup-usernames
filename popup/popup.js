document.addEventListener('DOMContentLoaded', function() {
    browser.storage.sync.get(['removeTLDs']).then(({ removeTLDs }) => {
        document.getElementById('remove-TLD-toggle').classList.add(removeTLDs ? "active" : "false");
    });
});

document.getElementById('save').addEventListener('click', () => {
    const removeTLDs = document.getElementById('remove-TLD-toggle').classList.contains("active")
    
    browser.storage.sync.set({ removeTLDs }).then(() => {
        window.close();
    });
});

document.querySelectorAll('.toggle').forEach(element => {
    element.addEventListener('click', () => {
        element.children[0].className = element.children[0].className == "active" ? "" : "active";
    });
});

document.querySelectorAll('.toggle-area').forEach(element => {
    element.addEventListener('click', () => {
        element.children[0].children[0].className = element.children[0].children[0].className == "active" ? "" : "active";
    });
});