// Google
$('.lang-select').on('click', function() {
    var lang = $(this).data('lang');
    document.cookie = "googtrans=/en/" + lang; // Set cookie for language
    location.reload(); // Reload page to apply translation
});

// Function to check for existing cookie and set language if present
function checkLanguageCookie() {
    var match = document.cookie.match(/googtrans=([^;]+)/);
    if (match) {
        var lang = match[1].split('/')[1]; // Get language from cookie
        if (lang) {
            $('.goog-te-combo').val(lang); // Set Google Translate dropdown
            $('.goog-te-combo').trigger('change'); // Trigger change event
        }
    }
}

$(window).on('load', checkLanguageCookie); // Check cookie on page load

//console.log('Language script loaded');