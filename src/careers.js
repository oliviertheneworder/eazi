const MAX_CAREER_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

function setFileNameDisplay($nameEl, text, isError) {
    if (!$nameEl || !$nameEl.length) return;
    $nameEl.text(text);
    $nameEl.css("color", isError ? "#f60" : "#222");
}

function validateRequiredFileInput($input, $nameEl, label) {
    if (!$input || !$input.length) return true;

    const el = $input[0];
    const file = el.files && el.files[0] ? el.files[0] : null;

    if (!file) {
        setFileNameDisplay($nameEl, `No file chosen (${label} required)`, true);
        return false;
    }

    if (file.size > MAX_CAREER_FILE_SIZE_BYTES) {
        setFileNameDisplay($nameEl, `${label} too large (max 2MB)`, true);
        el.value = ""; // Reset the input
        return false;
    }

    setFileNameDisplay($nameEl, file.name, false);
    return true;
}

// Enforce file requirements on change (required + < 2MB)
$("#careerCv, #careerId").on("change", function () {
    const isCv = this.id === "careerCv";
    const $nameEl = isCv ? $("#cv-file-name") : $("#id-file-name");
    const label = isCv ? "CV" : "ID";

    const ok = validateRequiredFileInput($(this), $nameEl, label);
    if (!ok) {
        alert(`${label} file is required and must be under 2MB.`);
    }
});

// Legacy file name change handlers replaced by unified validation above.

// If RSA nationality, ID Number must have 11 digits and no spaces or non-numerical numbers
$("#careerNationality").change(function () {
    // autoaticly remove spaces if they are typed in the #careerIdNumber input
    $("#careerIdNumber").val($("#careerIdNumber").val().replace(/\s/g, ""));

    if ($(this).val() === "South Africa") {
        $("#careerIdNumber").attr("pattern", "\\d{13}");
        $("#careerIdNumber").attr("inputmode", "numeric");
    } else {
        $("#careerIdNumber").removeAttr("pattern");
    }
});

function getWorksAtEaziValue() {
    // Preferred: Yes/No radio group for "Are you employed by Eazi Access?"
    const $employeeStatus = $('input[name="employee-status"]');
    if ($employeeStatus.length) {
        const v = $employeeStatus.filter(":checked").val();
        if (v) return String(v);
    }

    // Alternative: radio group named exactly like the webhook expects
    const $worksAtEaziRadios = $('input[name="Works-at-Eazi"]');
    if ($worksAtEaziRadios.length) {
        const v = $worksAtEaziRadios.filter(":checked").val();
        if (v) return String(v);
    }

    // Backwards compatibility: legacy checkbox
    const $careerEazi = $("#careerEazi");
    if ($careerEazi.length) return $careerEazi.is(":checked") ? "Yes" : "No";

    return "No";
}

function isWorksAtEaziYes() {
    return getWorksAtEaziValue().trim().toLowerCase() === "yes";
}

function setConditionalRequired($input, required) {
    if (!$input || !$input.length) return;

    // Remove any previously injected required indicators ("*")
    $input.prev("label").find(".required-asterisk").remove();

    if (required) {
        $input.attr("required", true);
        $input.addClass("required-field");
    } else {
        $input.removeAttr("required");
        $input.removeClass("required-field");
        $input.val("");
    }
}

function applyWorksAtEaziState() {
    var isChecked = isWorksAtEaziYes();
    var managerSection = $("#careerManagerSection");
    var managerNameInput = $("#careerManagerName");
    var managerEmailInput = $("#careerManagerEmail");
    var passwordInput = $("#Line-Manager-Password");

    // Employee detail fields (shown only when "Works at Eazi" is checked)
    var employeeNumberInput = $("#Employee-Number");
    var dateStartedInput = $("#date-started");
    var currentPositionInput = $("#Current-Position-Held");
    var departmentInput = $("#Department");
    var branchInput = $("#Branch");

    if (isChecked) {
        // Show manager section and make inputs required
        managerSection.removeClass("hide").addClass("career-section");
        setConditionalRequired(managerNameInput, true);
        setConditionalRequired(managerEmailInput, true);
        setConditionalRequired(passwordInput, true);

        // Apply the same required/asterisk logic to employee detail fields
        setConditionalRequired(employeeNumberInput, true);
        setConditionalRequired(dateStartedInput, true);
        setConditionalRequired(currentPositionInput, true);
        setConditionalRequired(departmentInput, true);
        setConditionalRequired(branchInput, true);
    } else {
        // Hide manager section and remove required attributes
        managerSection.removeClass("career-section").addClass("hide");
        setConditionalRequired(managerNameInput, false);
        setConditionalRequired(managerEmailInput, false);
        setConditionalRequired(passwordInput, false);

        // Reset employee detail fields when hiding
        setConditionalRequired(employeeNumberInput, false);
        setConditionalRequired(dateStartedInput, false);
        setConditionalRequired(currentPositionInput, false);
        setConditionalRequired(departmentInput, false);
        setConditionalRequired(branchInput, false);

        // Remove any password validation messages
        passwordInput.removeClass("password-error password-success");
        $(".password-error-message, .password-success-message").remove();
    }
}

// Handle "Works at Eazi" Yes/No radio (or legacy checkbox)
$(document).on(
    "change",
    '#careerEazi, input[name="employee-status"], input[name="Works-at-Eazi"]',
    applyWorksAtEaziState
);

// Password validation function
function validatePassword(password) {
    return password.toLowerCase() === "myeazi";
}

// Add password validation on input
$("#Line-Manager-Password").on("input", function() {
    var password = $(this).val();
    var isChecked = isWorksAtEaziYes();
    
    if (isChecked && password.length > 0) {
        if (validatePassword(password)) {
            $(this).removeClass("password-error").addClass("password-success");
            $(".password-error-message").remove();
            // Add success message if not already present
            if (!$(this).next(".password-success-message").length) {
                $(this).after('<div class="password-success-message" style="color: green; font-size: 12px; margin-top: 4px;">✓ Password correct</div>');
            }
        } else {
            $(this).removeClass("password-success").addClass("password-error");
            $(".password-success-message").remove();
            // Add error message if not already present
            if (!$(this).next(".password-error-message").length) {
                $(this).after('<div class="password-error-message" style="color: red; font-size: 12px; margin-top: 4px;">✗ Incorrect password (Contact HR)</div>');
            }
        }
    } else {
        $(this).removeClass("password-error password-success");
        $(".password-error-message, .password-success-message").remove();
    }
});

// set #careerCv and #careerId to required
$("#careerCv").attr("required", true);
$("#careerId").attr("required", true);

// Let Webflow handle the form submission and webhook integration
$("#careerApplication").submit(function (e) {
    e.preventDefault(); // Prevent default Webflow form submission

    // Validate required file inputs (< 2MB) before disabling submit.
    const cvOk = validateRequiredFileInput($("#careerCv"), $("#cv-file-name"), "CV");
    const idOk = validateRequiredFileInput($("#careerId"), $("#id-file-name"), "ID");
    if (!cvOk || !idOk) {
        alert("Please upload your CV and ID. Each file must be under 2MB.");
        return;
    }

    // Get the submit button
    var submitButton = $('#careerApplication input[type="submit"]');
    
    // Disable the button and change text to "Loading..."
    submitButton.prop('disabled', true);
    submitButton.val("Loading...");
    submitButton.css('opacity', '0.7');
    submitButton.css('cursor', 'not-allowed');

    // Create FormData from the form
    var formData = new FormData(this);
    
    // Add the "Works at Eazi" status to the form data
    var worksAtEazi = getWorksAtEaziValue();
    if (typeof formData.set === "function") {
        formData.set("Works-at-Eazi", worksAtEazi);
    } else {
        formData.delete("Works-at-Eazi");
        formData.append("Works-at-Eazi", worksAtEazi);
    }
    
    // If "Works at Eazi" is checked, ensure manager details are included
    if (isWorksAtEaziYes()) {
        var managerName = $("#careerManagerName").val();
        var managerEmail = $("#careerManagerEmail").val();
        var password = $("#Line-Manager-Password").val();

        // Validate employee details
        var employeeNumber = $("#Employee-Number").val();
        var dateStarted = $("#date-started").val();
        var currentPosition = $("#Current-Position-Held").val();
        var department = $("#Department").val();
        var branch = $("#Branch").val();
        
        // Validate manager details if required
        if (!managerName || !managerEmail || !password) {
            alert("Please fill in your Line Manager's details and password.");
            submitButton.prop('disabled', false);
            submitButton.val("Submit");
            submitButton.css('opacity', '1');
            submitButton.css('cursor', 'pointer');
            return;
        }

        if (!employeeNumber || !dateStarted || !currentPosition || !department || !branch) {
            alert("Please complete your employee details (Employee Number, Date Started, Current Position, Department, and Branch).");
            submitButton.prop('disabled', false);
            submitButton.val("Submit");
            submitButton.css('opacity', '1');
            submitButton.css('cursor', 'pointer');
            return;
        }
        
        // Validate password
        if (!validatePassword(password)) {
            alert("Incorrect password. Please enter the correct password for Eazi Access employees.");
            submitButton.prop('disabled', false);
            submitButton.val("Submit");
            submitButton.css('opacity', '1');
            submitButton.css('cursor', 'pointer');
            return;
        }
        
        // Add manager details to form data
        formData.append("Line-Manager-Name", managerName);
        formData.append("Line-Manager-Email", managerEmail);
        formData.append("Line-Manager-Password", password);
    }
    
    // FormData should automatically include file inputs, but we can verify
    console.log("CV file included:", $("#careerCv")[0].files.length > 0);
    console.log("ID file included:", $("#careerId")[0].files.length > 0);
    console.log("Works at Eazi:", worksAtEazi);

    // Send data to Make.com webhook
    fetch("https://hook.eu1.make.com/he7ete4428fk332sumzgugb74e95x9hx", {
        method: "POST",
        body: formData, // Sends as multipart/form-data with files included
    })
    .then(response => {
        // Check if the response is JSON before trying to parse it
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json();
        } else {
            // For non-JSON responses, just return the status text
            return { status: response.status, message: response.statusText };
        }
    })
    .then(data => {
        // console.log("Form submitted successfully:", data);
        // alert("Form submitted successfully!");

        $("#careerApplication").hide();
        $(".career-success").show();
        $('.career-error').hide();

        // link to #careerApplication on the page
        window.location.href = "#careerApplication";

        // Optional: Reset form after successful submission
        this.reset();

        // Reset file name displays
        $("#cv-file-name").text("No file chosen");
        $("#cv-file-name").css("color", "#f60");

        $("#id-file-name").text("No file chosen");
        $("#id-file-name").css("color", "#f60");
        
        // Hide manager section and reset its state
        $("#careerManagerSection").removeClass("career-section").addClass("hide");
        $("#careerManagerName").removeAttr("required").removeClass("required-field");
        $("#careerManagerEmail").removeAttr("required").removeClass("required-field");
        $("#Line-Manager-Password").removeAttr("required").removeClass("required-field");
        $("#careerManagerName").prev("label").find(".required-asterisk").remove();
        $("#careerManagerEmail").prev("label").find(".required-asterisk").remove();
        $("#Line-Manager-Password").prev("label").find(".required-asterisk").remove();
        $(".password-error-message, .password-success-message").remove();

        // Reset employee detail fields state
        $("#Employee-Number, #date-started, #Current-Position-Held, #Department, #Branch")
            .removeAttr("required")
            .removeClass("required-field")
            .val("")
            .each(function () {
                $(this).prev("label").find(".required-asterisk").remove();
            });

        // Re-enable the button and reset text (though it won't be visible as the form is hidden)
        submitButton.prop('disabled', false);
        submitButton.val("Submit");
        submitButton.css('opacity', '1');
        submitButton.css('cursor', 'pointer');
    })
    .catch(error => {
        console.error("Error:", error);
        $('.career-error').show();
        alert("Form submission failed.");
        
        // Re-enable the button in case of error
        submitButton.prop('disabled', false);
        submitButton.val("Submit");
        submitButton.css('opacity', '1');
        submitButton.css('cursor', 'pointer');
    });
});

// if '.more-career-section' no '.w-dyn-items' childen, hide '.more-career-section'
if ($(".more-career-section .w-dyn-items").children().length === 0) {
    $(".more-career-section").hide();
}

// Ensure the "Works at Eazi" state is applied on load
applyWorksAtEaziState();

// Log when the page is loaded
// console.log("careers.js loaded");
