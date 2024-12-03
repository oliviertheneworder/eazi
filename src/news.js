// Update News Links
$('.news-list-link').each(function () {
    var text = $(this).html();
    text = text.replace(/ (\S+)$/, '&nbsp;$1');
    $(this).html(text);
});