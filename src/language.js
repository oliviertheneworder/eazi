// Google
document.querySelectorAll('.lang-select').forEach(item => {
    item.addEventListener('click', function() {
        var lang = this.getAttribute('data-lang');
        document.cookie = "googtrans=/en/" + lang; // Set cookie for language
        window.location.reload(); // Reload page to apply translation
    });
});

// Function to check for existing cookie and set language if present
function checkLanguageCookie() {
    var match = document.cookie.match(/googtrans=([^;]+)/);
    if (match) {
        var lang = match[1].split('/')[1]; // Get language from cookie
        if (lang) {
            document.querySelector('.goog-te-combo').value = lang; // Set Google Translate dropdown
            document.querySelector('.goog-te-combo').dispatchEvent(new Event('change')); // Trigger change event
        }
    }
}

window.onload = checkLanguageCookie; // Check cookie on page load