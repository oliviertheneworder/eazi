// FORM LOGIC

// Initially hide all sections except #quoteWhat
$('.form-section').hide();
$('#quoteWhat').show();

// Function to toggle required attributes and clear hidden inputs
function toggleRequiredAttributes() {
    $('.form-section').each(function () {
        if ($(this).is(':visible')) {
            $(this).find('input, textarea, select').attr('required', true);
        } else {
            // Remove required attribute and clear values for hidden sections
            $(this).find('input, textarea, select').removeAttr('required').val('');
            $(this).find('input[type="radio"], input[type="checkbox"]').prop('checked', false);
            $(this).find('select').prop('selectedIndex', 0);
        }
    });
}

// Function to validate all required fields in a specific section
function areRequiredFieldsValid(sectionId) {
    let isValid = true;
    $(`#${sectionId}`).find('input[required], textarea[required], select[required]').each(function () {
        if (!$(this).val() || ($(this).attr('type') === 'radio' && !$(`input[name="${$(this).attr('name')}"]:checked`).length)) {
            isValid = false;
            return false; // Break loop if a required field is invalid
        }
    });
    return isValid;
}

// Function to scroll to the next section using GSAP
function scrollToNextSection(sectionId) {
    const container = document.querySelector('.form-block'); // Scrollable container
    const target = document.querySelector(`#${sectionId}`); // Target section

    if (container && target) {
        const containerRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        // Calculate scroll position relative to the container
        const scrollOffset = targetRect.top - containerRect.top + container.scrollTop;

        // Scroll the container to the target
        gsap.to(container, {
            scrollTop: scrollOffset - 20, // Adjust offset if necessary
            duration: 1.8,
            ease: 'power3.out',
        });
    }
}

// Function to handle displaying sections based on #quoteWhat input
function handleQuoteWhat() {
    const selectedValue = $('input[name="what-to-quote"]:checked').attr('id');

    // Hide all sections except #quoteWhat
    $('.form-section').hide();
    $('#quoteWhat').show();

    // Show the appropriate section based on selection
    switch (selectedValue) {
        case 'whatRental':
        case 'whatBuyNew':
        case 'whatBuyUsed':
        case 'whatBuyNewUsed':
            $('#quoteRentBuy').show();
            scrollToNextSection('quoteRentBuy');
            break;

        case 'whatPartsService':
            $('#quotePartsService').show();
            scrollToNextSection('quotePartsService');
            break;

        case 'whatTraining':
            $('#quoteTraining').show();
            scrollToNextSection('quoteTraining');
            break;

        default:
            break;
    }

    toggleRequiredAttributes();
}

// Function to handle the "Do you know what you need?" section
function handleQuoteRentBuy() {
    const selectedNeed = $('input[name="what-you-need"]:checked').attr('id');

    if (selectedNeed === 'iKnowHWhatINeed') {
        // Show #quoteKnow directly
        $('#quoteMoving, #quoteLocation, #quoteMaxHeight, #quoteMaxWeight').hide();
        $('#quoteKnow').show();
        scrollToNextSection('quoteKnow');
    } else if (selectedNeed === 'helpMeChoose') {
        // Show "Help Me Choose" steps sequentially
        $('#quoteKnow').hide();
        $('#quoteMoving').show();
        scrollToNextSection('quoteMoving');

        $('#quoteMoving input').on('change', function () {
            $('#quoteLocation').show();
            scrollToNextSection('quoteLocation');

            $('#quoteLocation input').on('change', function () {
                $('#quoteMaxHeight').show();
                scrollToNextSection('quoteMaxHeight');

                $('#quoteMaxHeight input').on('change', function () {
                    $('#quoteMaxWeight').show();
                    scrollToNextSection('quoteMaxWeight');
                });
            });
        });
    }

    toggleRequiredAttributes();
}

// Function to handle training course selection
function handleGroupTrainingSelection() {
    if ($('input[name="groupTraining"]:checked').length > 0) {
        $('#quoteBranch').show();
        scrollToNextSection('quoteBranch');
    } else {
        $('#quoteBranch').hide();
        $('#quoteDetails').hide();
        $('#quoteSubmit').hide();
    }

    toggleRequiredAttributes();
}

// Function to handle showing final sections
function handleFinalSteps() {
    if (areRequiredFieldsValid('quoteBranch')) {
        $('#quoteDetails').show();
        scrollToNextSection('quoteDetails');
    } else {
        $('#quoteDetails').hide();
        $('#quoteSubmit').hide();
    }

    if (areRequiredFieldsValid('quoteDetails')) {
        $('#quoteSubmit').show();
        scrollToNextSection('quoteSubmit');
    } else {
        $('#quoteSubmit').hide();
    }

    toggleRequiredAttributes();
}

// Attach event listeners for #quoteWhat
$('input[name="what-to-quote"]').on('change', handleQuoteWhat);

// Attach event listeners for #quoteRentBuy
$('input[name="what-you-need"]').on('change', handleQuoteRentBuy);

// Attach event listeners for training course selection
$('input[name="groupTraining"]').on('change', handleGroupTrainingSelection);

// Attach event listeners for #quoteBranch and #quoteDetails validation
$('#quoteBranch input, #quoteBranch select, #quoteBranch textarea').on('change keyup', handleFinalSteps);
$('#quoteDetails input, #quoteDetails select, #quoteDetails textarea').on('change keyup', handleFinalSteps);

// Initial setup
toggleRequiredAttributes();


// QUOTE MODAL GSAP

// Open Quote Modal
$('.quote-trigger').on('click', function () {
    gsap.to('.quote-modal', {
        autoAlpha: 1, // Ensures both visibility and opacity are set
        duration: 0.4,
        ease: 'power3.out',
        onStart: function () {
            $('.quote-modal').css('display', 'flex'); // Ensure modal is visible
        }
    });
    $('body').addClass('no-scroll'); // Disable scrolling on the body
});
// Close Quote Modal
$('.quote-close, .quote-bg').on('click', function () {
    gsap.to('.quote-modal', {
        autoAlpha: 0, // Ensures both visibility and opacity are set
        duration: 0.4,
        ease: 'power3.in',
        onComplete: function () {
            $('.quote-modal').css('display', 'none'); // Hide modal after animation
        }
    });
    $('body').removeClass('no-scroll'); // Re-enable scrolling on the body
});

// FORM BEHAVIOUR

// Radio Button Behaviour
$('input[type="radio"]').on('change', function () {
    var groupName = $(this).attr('name'); // Get the group name

    // Handle class toggling for all radio buttons in the group
    $('input[name="' + groupName + '"]').closest('.radio-button-field').removeClass('active'); // Remove active class from all in group
    $(this).closest('.radio-button-field').addClass('active'); // Add active class to the selected radio button

    // Animate all radio buttons in the group
    $('input[name="' + groupName + '"]').each(function () {
        // Find inactive and active icons relative to each radio input
        var inactiveIcon = $(this).closest('.radio-button-field').find('.field-icon');
        var activeIcon = $(this).closest('.radio-button-field').find('.field-icon-active');

        if ($(this).is(':checked')) {
            // Animate the active icon for the selected radio button
            gsap.to(activeIcon, { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" });
            gsap.to(inactiveIcon, { scale: 0, opacity: 0, duration: 0.2, ease: "power3.out" });
        } else {
            // Animate the inactive icon for unselected radio buttons
            gsap.to(activeIcon, { scale: 0, opacity: 0, duration: 0.2, ease: "power3.out" });
            gsap.to(inactiveIcon, { scale: 1, opacity: 1, duration: 0.2, ease: "power3.out" });
        }
    });
});

// if .text-field and textarea Behaviour
$('.text-field, .textarea').on('focus', function () {
    $(this).siblings('.field-label').addClass('active'); // Use siblings to target the label
    $(this).addClass('active');
});
// if .text-field gets blurred, remove .active class from .field-label and sibling .text-field
$('.text-field, .textarea').on('blur', function () {
    if ($(this).val().trim() === '') {
        $(this).siblings('.field-label').removeClass('active'); // Use siblings to target the label
        $(this).removeClass('active');
    }
});