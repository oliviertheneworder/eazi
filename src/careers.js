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
    
    // FormData should automatically include file inputs, but we can verify
    console.log("CV file included:", $("#careerCv")[0].files.length > 0);
    console.log("ID file included:", $("#careerId")[0].files.length > 0);

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

        $("#cv-file-name").text("No file chosen");
        $("#cv-file-name").css("color", "#f60");

        $("#id-file-name").text("No file chosen");
        $("#id-file-name").css("color", "#f60");

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