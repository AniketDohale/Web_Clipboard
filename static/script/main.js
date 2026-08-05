function copyText(id, button) {
    const text = document.getElementById(id).innerText;

    if (!text) return;

    // Modern Browsers (HTTPS)
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
            .then(() => {
                showDone(button);
            })
            .catch(() => {
                fallbackCopy(text, button);
            });
        return;
    }
    // HTTP / Older Browsers
    fallbackCopy(text, button);
}

function fallbackCopy(text, button) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";

    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    try {
        document.execCommand("copy");
        showDone(button);
    } 
    catch (err) {
        alert("Copy Failed");
    }
    document.body.removeChild(textArea);
}

function editItem(id) {
    document.getElementById("t" + id).style.display = "none";
    document.getElementById("form" + id).style.display = "block";
}

function cancelEdit(id) {
    document.getElementById("t" + id).style.display = "block";
    document.getElementById("form" + id).style.display = "none";
}

function showDone(button) {
    const img = button.querySelector("img");
    const originalSrc = img.src;

    img.src = "/static/icons/done.png";

    // Restore Copy icon - 3 Seconds
    setTimeout(() => {
        img.src = originalSrc;
    }, 3000);
}