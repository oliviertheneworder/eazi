console.log('General JS file loaded indeed');

// if #homeCareers has any child with .w-dyn-empty then hide #homeCareers
if ($('#homeCareers').children('.w-dyn-empty').length > 0) {
    $('#homeCareers').hide();
    console.log('Home Careers section hidden');
}

// for each check if a .drawings-list has one child with class w-dyn-item the only set that one to display to block
$('.drawings-list').each(function () {
    if ($(this).children('.w-dyn-item').length === 1) {
        $(this).children('.w-dyn-item').css('display', 'block');
    }
});

// .cta-button.book-now clicked then click .quote-trigger programmatically
$('.cta-button.book-training, .cta-button.buy-used').click(function () {
    $('.quote-trigger').click();
    // console.log('CTA button clicked');
});

// if .key-spec-text.unit is empty then remove it
$('.key-spec-text.unit').each(function () {
    if ($(this).text() === '') {
        $(this).remove();
        //console.log('Unit removed');
    }
});

// Map of category to visible metrics
const categoryMapping = {
    "Articulated Diesel Boom Lifts": ["working-height", "horizontal-outreach", "working-outreach", "up-over-height", "machine-weight"],
    "Compact Crawlers": ["working-height", "horizontal-outreach", "working-outreach", "machine-weight", "platform-capacity-unrestricted"],
    "Diesel Scissor Lifts": ["working-height", "machine-weight", "platform-capacity-unrestricted", "deck-extension", "turning-radius-inside", "turning-radius-outside"],
    "E - Trucks": ["power-unit", "load-capacity", "load-centre", "free-lift", "overall-width"],
    "Electric Boom Lifts": ["working-height", "horizontal-outreach", "working-outreach", "machine-weight"],
    "Electric Scissor Lifts": ["working-height", "horizontal-outreach", "working-outreach", "up-over-height", "machine-weight"],
    "High Capacity Telehandlers": ["horizontal-outreach", "machine-weight", "rated-capacity", "max-lift-capacity-at-full-height-forks", "max-lift-capacity-at-maximum-reach-forks"],
    "IC - Trucks": ["power-unit", "load-capacity", "load-centre", "free-lift", "overall-width"],
    "Mast Boom Lifts": ["working-height", "horizontal-outreach", "up-over-height", "machine-weight", "drive-speed-2"],
    "Mini Cranes": ["horizontal-outreach", "machine-weight", "rated-capacity", "max-lift-height", "maximum-working-radius"],
    "Order Pickers": ["power-unit", "load-capacity", "load-centre", "overall-width"],
    "Pallet Stackers": ["power-unit", "load-capacity", "load-centre", "free-lift", "overall-width", "lift-hight"],
    "Pallet Trucks": ["power-unit", "load-capacity", "load-centre", "overall-width"],
    "Personnel Lifts": ["working-height", "machine-weight"],
    "Reach Trucks": ["power-unit", "load-capacity", "load-centre", "free-lift", "overall-width", "lift-hight"],
    "Rotational Telehandlers": ["horizontal-outreach", "machine-weight", "rated-capacity", "max-lift-capacity-at-full-height-stabilizers-down", "max-lift-capacity-at-maximum-reach-stabilizers-down", "max-lift-height"],
    "Rough Terrain Forklifts": ["machine-weight", "load-capacity", "load-centre", "free-lift"],
    "Skid Steer: Small Platforms": ["machine-weight", "turning-radius-outside"],
    "Telehandlers": ["horizontal-outreach", "machine-weight", "rated-capacity", "max-lift-height"],
    "Telescopic Diesel Boom Lifts": ["working-height", "horizontal-outreach", "working-outreach", "machine-weight", "platform-capacity-unrestricted"],
    "Tow Tractors & Platform Trucks": ["power-unit", "load-capacity", "overall-width"],
    "Trailer Mounted Boom Lifts (Towable)": ["working-height", "working-outreach", "up-over-height", "machine-weight"],
    "Very Narrow Aisle Trucks": ["power-unit", "load-capacity", "load-centre", "overall-width", "lift-hight"]
};

// Extract the category from the `data-category` attribute
const category = $(".key-spec-list").attr("data-category");

// Get the metrics for the category
const visibleMetrics = categoryMapping[category] || [];

// Hide all metrics by default
$(".key-spec-list > div").hide();

// Show only the relevant metrics
visibleMetrics.forEach(metric => {
    $(`.${metric}`).show();
});