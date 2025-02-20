// if #homeCareers has any child with .w-dyn-empty then hide #homeCareers
if ($('#homeCareers').children('.w-dyn-empty').length > 0) {
    $('#homeCareers').hide();
    console.log('Home Careers section hidden');
}

// for each check if a .drawings-list has one child with class w-dyn-item the only set that one to display to block
$('.drawings-list').each(function () {
    if ($(this).children('.w-dyn-item').length === 1) {
        $(this).css('display', 'block');
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
    "Agricultural Telehandlers": ["horizontal-outreach", "machine-weight", "rated-capacity", "max-lift-capacity-at-full-height-forks", "max-lift-capacity-at-maximum-reach-forks"],
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
    "Skid Steer: Small Platforms": ["dump-reach","working-height","machine-weight", "turning-radius-outside"],
    "Telehandlers": ["horizontal-outreach", "machine-weight", "rated-capacity", "max-lift-height"],
    "Telescopic Diesel Boom Lifts": ["working-height", "horizontal-outreach", "working-outreach", "machine-weight", "platform-capacity-unrestricted"],
    "Tow Tractors & Platform Trucks": ["power-unit", "load-capacity", "overall-width"],
    "Trailer Mounted Boom Lifts (Towable)": ["working-height", "working-outreach", "up-over-height", "machine-weight"],
    "Very Narrow Aisle Trucks": ["power-unit", "load-capacity", "load-centre", "overall-width", "lift-hight"],
    "Tractor Loader Backhoes": ["drive-speed-1", "drive-speed-2", "machine-weight", "overall-width", "power-unit"]
};

// Iterate through each `.key-spec-list` that has a `data-category`
$(".key-spec-list[data-category]").each(function () {
    const $list = $(this);

    // Get the `data-category` attribute of the current list
    const category = $list.attr("data-category");

    // Get the metrics for the category
    const visibleMetrics = categoryMapping[category] || [];

    // Loop through each child `li` and determine visibility
    $list.children("li").each(function () {
        const $item = $(this);

        // Check if the `li` has a class that matches the visible metrics
        const hasVisibleMetric = visibleMetrics.some(metric => $item.hasClass(metric));

        // Toggle visibility based on whether the class is in the visible metrics
        if (hasVisibleMetric || !$item.attr("class")) {
            $item.show();
        } else {
            $item.hide();
        }
    });
});

// if .pdf-wrap has no visible childe then hide it
$('.pdf-wrap').each(function () {
    if ($(this).children(':visible').length === 0) {
        $(this).hide();
    }
});

// if URL contains 'high-capacity-telehandlers' sort '.grid-4 .w-dyn-item' by it's '.key-spec-text' vale as a number (<div class="key-spec-item"><div class="key-spec-label">Horizontal Outreach</div><div class="key-spec-val"><div class="key-spec-text">5.10</div><div class="key-spec-text unit">m</div></div></div>)
if (window.location.href.indexOf('telehandlers') > -1 || 
    (window.location.href.indexOf('/machine/') > -1 && $('#machineCategory').attr('href') === 'telehandlers')) {
    const items = $('.grid-4 .w-dyn-item');
    items.sort(function (a, b) {
        const aVal = parseFloat($(a).find('.rated-capacity .key-spec-text').text());
        const bVal = parseFloat($(b).find('.rated-capacity .key-spec-text').text());
        return bVal - aVal; // Reverse the order
    });
    $('.grid-4').html(items);
    // console.log('Telehandlers sorted by Rated Capacity');
}

// if URL contains 'high-capacity-telehandlers' sort '.grid-4 .w-dyn-item' by it's '.key-spec-text' vale as a number (<div class="key-spec-item"><div class="key-spec-label">Horizontal Outreach</div><div class="key-spec-val"><div class="key-spec-text">5.10</div><div class="key-spec-text unit">m</div></div></div>)
if (window.location.href.indexOf('high-capacity-telehandlers') > -1 || 
    (window.location.href.indexOf('/machine/') > -1 && $('#machineCategory').attr('href') === 'high-capacity-telehandlers')) {
    const items = $('.grid-4 .w-dyn-item');
    items.sort(function (a, b) {
        const aVal = parseFloat($(a).find('.horizontal-outreach .key-spec-text').text());
        const bVal = parseFloat($(b).find('.horizontal-outreach .key-spec-text').text());
        return bVal - aVal; // Reverse the order
    });
    $('.grid-4').html(items);
    // console.log('High Capacity Telehandlers sorted by Horizontal Outreach');
}

// Sort for agricultural-telehandlers key specs
if (window.location.href.indexOf('agricultural-telehandlers') > -1 || 
    (window.location.href.indexOf('/machine/') > -1 && $('#machineCategory').attr('href') === '/category/agricultural-telehandlerss')) {
    const items = $('.grid-4 .w-dyn-item');
    items.sort(function (a, b) {
        const aVal = parseFloat($(a).find('.horizontal-outreach .key-spec-text').text());
        const bVal = parseFloat($(b).find('.horizontal-outreach .key-spec-text').text());
        return bVal - aVal; // Reverse the order
    });
    $('.grid-4').html(items);
    // console.log('Agricultural Telehandlers sorted by Horizontal Outreach');
}

if (window.location.href.indexOf('rotational-telehandlers') > -1 || 
    (window.location.href.indexOf('/machine/') > -1 && $('#machineCategory').attr('href') === '/category/rotational-telehandlers')) {
    const items = $('.grid-4 .w-dyn-item');
    items.sort(function (a, b) {
        const aVal = parseFloat($(a).find('.horizontal-outreach .key-spec-text').text());
        const bVal = parseFloat($(b).find('.horizontal-outreach .key-spec-text').text());
        return bVal - aVal; // Reverse the order
    });
    $('.grid-4').html(items);
    // console.log('Rotational Telehandlers sorted by Rated Capacity');
}

if (window.location.href.indexOf('rough-terrain-forklifts') > -1 || 
    (window.location.href.indexOf('/machine/') > -1 && $('#machineCategory').attr('href') === '/category/rough-terrain-forklifts')) {
    const items = $('.grid-4 .w-dyn-item');
    items.sort(function (a, b) {
        const aVal = parseFloat($(a).find('.load-capacity .key-spec-text').text());
        const bVal = parseFloat($(b).find('.load-capacity .key-spec-text').text());
        return bVal - aVal; // Reverse the order
    });
    $('.grid-4').html(items);
    // console.log('Rotational Telehandlers sorted by Rated Capacity');
}

if (window.location.href.indexOf('skid-steer-small-platforms') > -1 || 
    (window.location.href.indexOf('/machine/') > -1 && $('#machineCategory').attr('href') === '/category/skid-steer-small-platforms')) {
    const items = $('.grid-4 .w-dyn-item');
    items.sort(function (a, b) {
        const aVal = parseFloat($(a).find('.working-height .key-spec-text').text());
        const bVal = parseFloat($(b).find('.working-height .key-spec-text').text());
        return bVal - aVal; // Reverse the order
    });
    $('.grid-4').html(items);
    // console.log('Rotational Telehandlers sorted by Rated Capacity');
}

// console.log('General JS file loaded indeed');