// FORM LOGIC

// Initially hide all sections except #quoteWhat
$('.form-section').hide();
$('#quoteDetails').hide(); // Explicitly hide quoteDetails
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

// Function to handle showing final sections
function handleFinalSteps() {
    const isBranchValid = areRequiredFieldsValid('quoteBranch');
    const isDetailsValid = areRequiredFieldsValid('quoteDetails');

    // Debugging logs for validation
    console.log("Branch valid:", isBranchValid);
    console.log("Details visible:", $('#quoteDetails').is(':visible'));
    console.log("Details valid:", isDetailsValid);

    // Show or hide #quoteDetails based on validation
    if (isBranchValid) {
        $('#quoteDetails').show(); // Ensure #quoteDetails is visible
    } else {
        $('#quoteDetails').hide(); // Hide #quoteDetails if branch is invalid
        $('#quoteSubmit').hide(); // Also hide submit button
        return; // Exit early if branch is invalid
    }

    // Show or hide submit button based on #quoteDetails validation
    if (isDetailsValid) {
        $('#quoteSubmit').show(); // Show submit button
    } else {
        $('#quoteSubmit').hide(); // Hide submit button
    }

    // Update required attributes dynamically
    toggleRequiredAttributes();
}

// Event listeners for dynamic validation
$('#quoteBranch input, #quoteBranch select, #quoteBranch textarea').on('change', handleFinalSteps);
$('#quoteDetails input, #quoteDetails select, #quoteDetails textarea').on('focusout change', function () {
    handleFinalSteps();
});

// Attach other event listeners and initializations
$('input[name="what-to-quote"]').on('change', handleQuoteWhat);
$('input[name="what-you-need"]').on('change', handleQuoteRentBuy);
$('input[name="groupTraining"]').on('change', handleGroupTrainingSelection);

// Initial setup
toggleRequiredAttributes();


// QUOTE MODAL GSAP

// Open Quote Modal
$('.quote-trigger').on('click', function () {
    const $modal = $('.quote-modal');
    gsap.to($modal, {
        autoAlpha: 1, // Ensures visibility and opacity are set
        duration: 0.4,
        ease: 'power3.out',
        onStart: function () {
            $modal.css('display', 'flex'); // Ensure modal is visible
        }
    });
    $('body').addClass('no-scroll'); // Disable body scroll
});

// Close Quote Modal
$('.quote-close, .quote-bg').on('click', function () {
    const $modal = $('.quote-modal');
    gsap.to($modal, {
        autoAlpha: 0, // Ensures visibility and opacity are set
        duration: 0.4,
        ease: 'power3.in',
        onComplete: function () {
            $modal.css('display', 'none'); // Hide modal after animation
        }
    });
    $('body').removeClass('no-scroll'); // Re-enable body scroll
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

// Text fiels behavior

// Initial setup: remove active class from all text fields and labels on page load
$('.text-field, .textarea').removeClass('active').siblings('.field-label').removeClass('active');
// Focus event: add active class to the field and its label
$('.text-field, .textarea').on('focus', function () {
    $(this).addClass('active').siblings('.field-label').addClass('active');
});
// Blur event: remove active class if the field is empty
$('.text-field, .textarea').on('blur', function () {
    if ($(this).val().trim() === '') {
        $(this).removeClass('active').siblings('.field-label').removeClass('active');
    }
});