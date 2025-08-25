// Limit file size for ID and CV
$('#careerCV, #careerId').on('change', function() {
    if (this.files[0].size > 2 * 1024 * 1024) { // 2MB in bytes
        alert("File size must be 2MB or smaller.");
        this.value = ""; // Reset the input
    }
});

// CV File Upload
$("#careerCv").change(function () {
    var file = this.files[0]; // Get the selected file
    if (file && file.name !== "") {
        $("#cv-file-name").text(file.name);
        $("#cv-file-name").css("color", "#222");
    } else {
        $("#cv-file-name").text("No file chosen");
        $("#cv-file-name").css("color", "#f60");
    }
});

// Do the same for ID File Upload
$("#careerId").change(function () {
    var file = this.files[0]; // Get the selected file
    if (file && file.name !== "") {
        $("#id-file-name").text(file.name);
        $("#id-file-name").css("color", "#222");
    } else {
        $("#id-file-name").text("No file chosen");
        $("#id-file-name").css("color", "#f60");
    }
});

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

// Handle "Works at Eazi" checkbox functionality
$("#careerEazi").change(function () {
    var isChecked = $(this).is(":checked");
    var managerSection = $("#careerManagerSection");
    var managerNameInput = $("#careerManagerName");
    var managerEmailInput = $("#careerManagerEmail");
    var passwordInput = $("#Line-Manager-Password");
    
    if (isChecked) {
        // Show manager section and make inputs required
        managerSection.removeClass("hide").addClass("career-section");
        managerNameInput.attr("required", true);
        managerEmailInput.attr("required", true);
        passwordInput.attr("required", true);
        
        // Add visual indication that fields are required
        managerNameInput.addClass("required-field");
        managerEmailInput.addClass("required-field");
        passwordInput.addClass("required-field");
        
        // Add asterisk to labels if not already present
        if (!managerNameInput.prev("label").find(".required-asterisk").length) {
            managerNameInput.prev("label").append('<span class="required-asterisk" style="color: red;"> *</span>');
        }
        if (!managerEmailInput.prev("label").find(".required-asterisk").length) {
            managerEmailInput.prev("label").append('<span class="required-asterisk" style="color: red;"> *</span>');
        }
        if (!passwordInput.prev("label").find(".required-asterisk").length) {
            passwordInput.prev("label").append('<span class="required-asterisk" style="color: red;"> *</span>');
        }
    } else {
        // Hide manager section and remove required attributes
        managerSection.removeClass("career-section").addClass("hide");
        managerNameInput.removeAttr("required");
        managerEmailInput.removeAttr("required");
        passwordInput.removeAttr("required");
        
        // Remove visual indication
        managerNameInput.removeClass("required-field");
        managerEmailInput.removeClass("required-field");
        passwordInput.removeClass("required-field");
        
        // Remove asterisk from labels
        managerNameInput.prev("label").find(".required-asterisk").remove();
        managerEmailInput.prev("label").find(".required-asterisk").remove();
        passwordInput.prev("label").find(".required-asterisk").remove();
        
        // Clear the input values when hiding
        managerNameInput.val("");
        managerEmailInput.val("");
        passwordInput.val("");
        
        // Remove any password validation messages
        passwordInput.removeClass("password-error");
        $(".password-error-message").remove();
    }
});

// Password validation function
function validatePassword(password) {
    return password.toLowerCase() === "myeazi";
}

// Add password validation on input
$("#Line-Manager-Password").on("input", function() {
    var password = $(this).val();
    var isChecked = $("#careerEazi").is(":checked");
    
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

// set #careerCV and #careerId to required
$("#careerCV").attr("required", true);
$("#careerId").attr("required", true);

// Let Webflow handle the form submission and webhook integration
$("#careerApplication").submit(function (e) {
    e.preventDefault(); // Prevent default Webflow form submission

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
    var worksAtEazi = $("#careerEazi").is(":checked") ? "Yes" : "No";
    formData.append("Works-at-Eazi", worksAtEazi);
    
    // If "Works at Eazi" is checked, ensure manager details are included
    if ($("#careerEazi").is(":checked")) {
        var managerName = $("#careerManagerName").val();
        var managerEmail = $("#careerManagerEmail").val();
        var password = $("#Line-Manager-Password").val();
        
        // Validate manager details if required
        if (!managerName || !managerEmail || !password) {
            alert("Please fill in your Line Manager's details and password.");
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

// Log when the page is loaded
// console.log("careers.js loaded");