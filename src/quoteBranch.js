// Collect JSON data from the `.json` divs
const branchData = [];
$(".json").each(function () {
    const jsonText = $(this).text(); // Get the JSON text
    try {
        const branch = JSON.parse(jsonText); // Parse the JSON
        branchData.push(branch); // Add it to the array
    } catch (e) {
        console.error("Invalid JSON format in branch data:", jsonText);
    }
});

// Dropdown selectors
const $countrySelect = $("#branchCountry");
const $provinceSelect = $("#branchProvince");
const $citySelect = $("#branchCity");
const $branchSelect = $("#branchName");

// Initially hide province, city, and branch fields
$provinceSelect.closest(".fieldset").hide();
$citySelect.closest(".fieldset").hide();
$branchSelect.closest(".fieldset").hide();

// Helper function to populate options
function populateSelect($select, options, defaultOption) {
    $select.empty().append(`<option value="">${defaultOption}</option>`);
    options.forEach(option => {
        $select.append(`<option value="${option}">${option}</option>`);
    });
    $select.prop("disabled", options.length === 0);
}

// Populate countries dynamically
function populateCountries() {
    const countries = [...new Set(branchData.map(branch => branch.country))];
    populateSelect($countrySelect, countries, "Select Country");
}

// Populate provinces dynamically based on country
function populateProvinces(selectedCountry) {
    const provinces = [
        ...new Set(
            branchData.filter(branch => branch.country === selectedCountry && branch.province).map(branch => branch.province)
        )
    ];
    if (provinces.length === 1) {
        populateSelect($provinceSelect, provinces, "Select Province");
        $provinceSelect.val(provinces[0]).change();
        return; // Auto-select if only one option
    }
    populateSelect($provinceSelect, provinces, "Select Province");
    $provinceSelect.closest(".fieldset").show();
}

// Populate cities dynamically based on country and province
function populateCities(selectedCountry, selectedProvince) {
    const cities = [
        ...new Set(
            branchData
                .filter(branch => branch.country === selectedCountry && branch.province === selectedProvince && branch.city)
                .map(branch => branch.city)
        )
    ];
    if (cities.length === 1) {
        populateSelect($citySelect, cities, "Select City");
        $citySelect.val(cities[0]).change();
        return; // Auto-select if only one option
    }
    populateSelect($citySelect, cities, "Select City");
    $citySelect.closest(".fieldset").show();
}

// Populate branches dynamically based on country, province, and city
function populateBranches(selectedCountry, selectedProvince = "", selectedCity = "") {
    let branches = branchData.filter(branch => {
        return branch.country === selectedCountry &&
            (!branch.province || branch.province === selectedProvince) &&
            (!branch.city || branch.city === selectedCity);
    });

    // If no province or city and no branches are found, use the country as the branch
    if (!selectedProvince && !selectedCity && branches.length === 0) {
        branches = [{ branch: selectedCountry }];
    }

    if (branches.length === 1) {
        const branchName = branches[0].branch;
        populateSelect($branchSelect, [branchName], "Select Branch");
        $branchSelect.val(branchName).prop("disabled", false);
        $branchSelect.closest(".fieldset").show(); // Ensure branch name is visible
        return; // Auto-select if only one option
    }

    populateSelect($branchSelect, branches.map(branch => branch.branch), "Select Branch");
    $branchSelect.prop("disabled", branches.length === 0);
    $branchSelect.closest(".fieldset").show();
}

// Event handlers for dropdowns
$countrySelect.on("change", function () {
    const selectedCountry = $(this).val();
    $provinceSelect.closest(".fieldset").hide();
    $citySelect.closest(".fieldset").hide();
    $branchSelect.closest(".fieldset").hide();
    $provinceSelect.empty();
    $citySelect.empty();
    $branchSelect.empty();

    if (selectedCountry) {
        populateProvinces(selectedCountry);

        // Always populate branches for the selected country
        populateBranches(selectedCountry);
    }
});

$provinceSelect.on("change", function () {
    const selectedCountry = $countrySelect.val();
    const selectedProvince = $(this).val();
    $citySelect.closest(".fieldset").hide();
    $branchSelect.closest(".fieldset").hide();
    $citySelect.empty();
    $branchSelect.empty();

    if (selectedProvince) {
        populateCities(selectedCountry, selectedProvince);

        // Always populate branches for the selected country and province
        populateBranches(selectedCountry, selectedProvince);
    }
});

$citySelect.on("change", function () {
    const selectedCountry = $countrySelect.val();
    const selectedProvince = $provinceSelect.val();
    const selectedCity = $(this).val();
    $branchSelect.closest(".fieldset").hide();
    $branchSelect.empty();

    if (selectedCity) {
        // Populate branches for the selected country, province, and city
        populateBranches(selectedCountry, selectedProvince, selectedCity);
    }
});

// Initial population
populateCountries();