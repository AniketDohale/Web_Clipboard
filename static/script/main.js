function copyText(id, button) {
    const text = document.getElementById(id).innerText;

    if (!text) return;

    // Modern Browsers (HTTPS)
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
            .then(() => {
                button.innerText = "Copied!";
                setTimeout(() => {
                    button.innerText = "Copy";
                }, 1500);
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
        button.innerText = "Copied!";
        setTimeout(() => {
            button.innerText = "Copy";
        }, 1500);
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