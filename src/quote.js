// FORM LOGIC

console.log("quote.js loaded");

const currentUrl = window.location.href;
$("#currentUrl").val(currentUrl);
console.log("currentUrl =", currentUrl);

// Initially hide all sections except #quoteWhat
$('.form-section').hide();
$('#quoteWhat').show();

// Monitor changes to the relevant fields
$('#Machine-Name, #partsServiceRequirements, #trainingCourses').on('input change', function () {

    const machineNameValue = $('#Machine-Name').val();
    const partsServiceValue = $('#partsServiceRequirements').val();
    const trainingCoursesValue = $('#trainingCourses').val();

    // Check if any field has a value
    if (partsServiceValue || trainingCoursesValue) {
        $('#quoteBranch').show(); // Show the #quoteBranch section
    } else {
        $('#quoteBranch').hide(); // Hide the #quoteBranch section if no values
    }
});

// Function to toggle required attributes and clear hidden inputs
// function toggleRequiredAttributes() {
//     $('.form-section').each(function () {
//         if ($(this).is(':visible')) {
//             $(this).find('input, textarea, select').attr('required', true);
//         } else {
//             // Remove required attribute and clear values for hidden sections
//             $(this).find('input, textarea, select').removeAttr('required').val('');
//             $(this).find('input[type="radio"], input[type="checkbox"]').prop('checked', false);
//             $(this).find('select').prop('selectedIndex', 0);
//         }
//     });
// }

// Function to scroll to the next section using GSAP
function scrollToNextSection(sectionId) {
    const container = $('.form-block')[0]; // Scrollable container
    const target = $(`#${sectionId}`)[0]; // Target section

    if (container && target) {
        const scrollOffset = target.offsetTop - container.offsetTop;
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

    $('.form-section').hide();
    $('#quoteWhat').show();

    switch (selectedValue) {
        case 'chooseRental':
        case 'chooseNew':
        case 'chooseUsed':
        case 'chooseNewUsed':
            $('#quoteRentBuy').show();
            scrollToNextSection('quoteRentBuy');
            break;

        case 'choosePartsService':
            $('#quotePartsService').show();
            scrollToNextSection('quotePartsService');
            break;

        case 'chooseTraining':
            $('#quoteTraining').show();
            scrollToNextSection('quoteTraining');
            break;

        default:
            break;
    }

    //toggleRequiredAttributes();
}

// Function to handle the "Do you know what you need?" section
function handleQuoteRentBuy() {
    const selectedNeed = $('input[name="what-you-need"]:checked').attr('id');

    if (selectedNeed === 'iKnowHWhatINeed') {
        // Hide unnecessary sections and show the #quoteKnow section
        $('#quoteMoving, #quoteLocation, #quoteMaxHeight, #quoteMaxWeight, #quoteDates, #quoteBranch').hide();

        $('#quoteKnow').show();
        scrollToNextSection('quoteKnow');

        $('#quoteKnow input').on('change', function () {
            // if #chooseRental is active
            if ($('#chooseRental').is(':checked')) {
                $('#quoteDates').show();
                scrollToNextSection('quoteDates');
            }
        });

        // if #chooseRental, #chooseNew, or #chooseUsed is active
        if ($('#chooseNew').is(':checked') || $('#chooseUsed').is(':checked') || $('#chooseNewUsed').is(':checked')  ) {

            $('#quoteMaxWeight input').on('change', function () {
                $('#quoteBranch').show();
                scrollToNextSection('quoteBranch');
            });

            $('#quoteKnow input').on('change', function () {
                $('#quoteBranch').show();
                scrollToNextSection('quoteBranch');
            });

        } else {
            
            $('#quoteMaxWeight input').on('change', function () {
                $('#quoteBranch').show();
                scrollToNextSection('quoteBranch');
            });
        }

    } else if (selectedNeed === 'helpMeChoose') {
        // Show sections sequentially based on input changes
        $('#quoteKnow').hide();
        $('#quoteMoving').show();
        scrollToNextSection('quoteMoving');

        $('#quoteMoving input').on('change', function () {
            $('#quoteLocation').show();
            scrollToNextSection('quoteLocation');
        });

        $('#quoteLocation input').on('change', function () {
            $('#quoteMaxHeight').show();
            scrollToNextSection('quoteMaxHeight');
        });

        $('#quoteMaxHeight input').on('change', function () {
            $('#quoteMaxWeight').show();
            scrollToNextSection('quoteMaxWeight');
        });

        // if #chooseRental, #chooseNew, or #chooseUsed is active
        if ($('#chooseRental').is(':checked') || $('#chooseNew').is(':checked') || $('#chooseUsed').is(':checked')) {

            $('#quoteMaxWeight input').on('change', function () {
                $('#quoteBranch').show();
                scrollToNextSection('quoteBranch');
            });

            $('#quoteKnow input').on('change', function () {
                $('#quoteBranch').show();
                scrollToNextSection('quoteBranch');
            });

        } else {
            
            $('#quoteMaxWeight input').on('change', function () {
                $('#quoteBranch').show();
                scrollToNextSection('quoteBranch');
            });
        }
    }

    // Ensure required attributes are toggled correctly
    //toggleRequiredAttributes();
}

$('#siteAddress').on('focus', function () {
    $('#quoteBranch').show();
    scrollToNextSection('quoteBranch');
    console.log('siteAddress focused');
});

// Function to handle training course selection
function handleGroupTrainingSelection() {
    if ($('input[name="groupTraining"]:checked').length > 0) {
        $('#quoteBranch').show();
        scrollToNextSection('quoteBranch');
    } else {
        $('#quoteBranch, #quoteDetails, #quoteSubmit').hide();
    }

    //toggleRequiredAttributes();
}

// Function to handle final steps
function handleFinalSteps() {
    const isBranchValid = areRequiredFieldsValid('quoteBranch');
    if (isBranchValid) {
        $('#quoteDetails').show();
        scrollToNextSection('quoteDetails');
    } else {
        $('#quoteDetails, #quoteSubmit').hide();
        return;
    }

    const isDetailsValid = areRequiredFieldsValid('quoteDetails');
    if (isDetailsValid) {
        $('#quoteSubmit').show();
        scrollToNextSection('quoteSubmit');
    } else {
        $('#quoteSubmit').hide();
    }

    //toggleRequiredAttributes();
}

// Function to validate required fields in a specific section
function areRequiredFieldsValid(sectionId) {
    let isValid = true;
    $(`#${sectionId}`).find('input[required], textarea[required], select[required]').each(function () {
        if (!$(this).val() || ($(this).attr('type') === 'radio' && !$(`input[name="${$(this).attr('name')}"]:checked`).length)) {
            isValid = false;
            return false; // Exit loop if a required field is invalid
        }
    });
    return isValid;
}

// Event listeners
$('input[name="what-to-quote"]').on('change', handleQuoteWhat);
$('input[name="what-you-need"]').on('change', handleQuoteRentBuy);
$('input[name="groupTraining"]').on('change', handleGroupTrainingSelection);
$('#quoteBranch input, #quoteBranch select, #quoteBranch textarea').on('change keyup', handleFinalSteps);
$('#quoteDetails input, #quoteDetails select, #quoteDetails textarea').on('change keyup', handleFinalSteps);

// Initial setup
//toggleRequiredAttributes();


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
$('.quote-close, .quote-bg, .quaote-success').on('click', function () {
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

// Text fields behavior

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