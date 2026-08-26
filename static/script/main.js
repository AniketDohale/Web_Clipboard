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

function autoResizeTextarea(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
}

function setupAutoResize() {
    document.querySelectorAll("textarea").forEach(function (textarea) {
        textarea.addEventListener("input", function () {
            autoResizeTextarea(this);
        });

        if (textarea.offsetParent !== null) {
            autoResizeTextarea(textarea);
        }
    });
}

function editItem(id) {
    const content = document.getElementById("t" + id);
    const form = document.getElementById("form" + id);

    content.style.display = "none";
    form.style.display = "block";

    form.querySelectorAll("textarea").forEach(function (textarea) {
        autoResizeTextarea(textarea);
    });

    form.querySelector("textarea[name='text']").focus();
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

function linkifyText(text) {
    const urlRegex = /(https?:\/\/[^\s<]+|www\.[^\s<]+)/gi;

    return text.replace(urlRegex, function (url) {
        let href = url;

        if (url.toLowerCase().startsWith("www.")) {
            href = "https://" + url;
        }

        return `<a href="${href}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
}

function makeLinksClickable() {
    document.querySelectorAll("pre[id^='t']").forEach(function (element) {
        const text = element.textContent;
        element.innerHTML = linkifyText(text);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    makeLinksClickable();
    setupAutoResize();
});
