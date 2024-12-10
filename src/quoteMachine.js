// DINAMICLY DISABLE RADIO BUTTONS BASED ON PREVIOUS CHOICES

// Step 1: Parse machine data from the DOM
var machines = [];
$('.jsonmachine').each(function() {
    var jsonText = $(this).text().trim();
    try {
        var machine = JSON.parse(jsonText);
        machines.push(machine);
    } catch (e) {
        console.error("Error parsing JSON:", e);
    }
});

console.log("Machines Data:", machines);

// Step 2: Define mapping between form fields and machine data properties
var fieldMapping = {
    'what-you-moving': 'lifting',          // Form field: what-you-moving → Machine property: lifting
    'where-you-working': 'location',       // Form field: where-you-working → Machine property: location
    'max-height': 'height',                // Form field: max-height → Machine property: height
    'max-weight': 'weight'                 // Form field: max-weight → Machine property: weight
};

// Step 3: Function to retrieve current user selections
function getCurrentSelections() {
    var selections = {};
    $.each(fieldMapping, function(formField, machineField) {
        var value = $('input[name="' + formField + '"]:checked').val();
        if (value) {
            selections[formField] = value;
        }
    });
    return selections;
}

// Step 4: Function to filter machines based on current selections
function filterMachines(selections) {
    return machines.filter(function(machine) {
        for (var formField in selections) {
            var machineField = fieldMapping[formField];
            var selectedValue = selections[formField];
            
            // Handle special cases, e.g., "Indoor & Outdoor"
            if (machineField === 'location') {
                if (selectedValue === "Indoor & Outdoor") {
                    if (!(machine.location === "Indoor & Outdoor" || machine.location === "Indoor" || machine.location === "Outdoor")) {
                        return false;
                    }
                } else {
                    if (machine.location !== selectedValue) {
                        return false;
                    }
                }
            } else {
                if (machine[machineField] !== selectedValue) {
                    return false;
                }
            }
        }
        return true;
    });
}

// Step 5: Function to get available options for a specific form field based on filtered machines
function getAvailableOptions(filteredMachines, formField) {
    var machineField = fieldMapping[formField];
    var options = new Set();
    filteredMachines.forEach(function(machine) {
        options.add(machine[machineField]);
    });
    return options;
}

// Step 6: Function to update the state of form options (enable/disable)
function updateOptions() {
    var selections = getCurrentSelections();
    var filtered = filterMachines(selections);
    
    // For debugging purposes
    console.log("Current Selections:", selections);
    console.log("Filtered Machines:", filtered);

    // Iterate through each form field to update options
    $.each(fieldMapping, function(formField, machineField) {
        var availableOptions = getAvailableOptions(filtered, formField);

        $('input[name="' + formField + '"]').each(function() {
            var value = $(this).val();
            if (availableOptions.has(value)) {
                $(this).prop('disabled', false);
                $(this).closest('label').removeClass('disabled'); // Optional: For styling
            } else {
                $(this).prop('disabled', true);
                $(this).closest('label').addClass('disabled'); // Optional: For styling

                // If the option was previously selected, deselect it
                if ($(this).is(':checked')) {
                    $(this).prop('checked', false);
                    // Recursively update options since the selection has changed
                    updateOptions();
                }
            }
        });
    });
}

// Step 7: Attach event listeners to all radio buttons
$('input[name="what-you-moving"], input[name="where-you-working"], input[name="max-height"], input[name="max-weight"]').on('change', function() {
    updateOptions();
});

// Step 8: Initial call to set up the form based on any pre-selected options
updateOptions();