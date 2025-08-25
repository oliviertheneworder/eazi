// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Locate modal and its dropdown
        const modal = document.querySelector(".country-modal");
        const countryDropdown = document.querySelector(".country-dropdown");

        // Locate navigation dropdown
        const dropdownContainer = document.querySelector(".country-list");
    if (dropdownContainer) {
        // Add click listener for navigation dropdown
        dropdownContainer.addEventListener("click", (event) => {
            const clickedLink = event.target.closest(".nav_dropdown_link");
            if (clickedLink) {
                const countryElement = clickedLink.querySelector(".country");
                const shortNameElement = clickedLink.querySelector(".country-short");
                const flagElement = clickedLink.querySelector("img");

                if (countryElement && shortNameElement && flagElement) {
                    const country = countryElement.textContent.trim();
                    const shortName = shortNameElement.textContent.trim();
                    const flagUrl = flagElement.src;

                    // console.log(`Dropdown Country: ${country}, Short Name: ${shortName}, Flag URL: ${flagUrl}`);
                    selectCountry(country, shortName, flagUrl);
                }
            }
        });
    } else {
        console.error("Navigation dropdown '.country-list' not found.");
    }

    // Check cookies for previously selected country
    const chosenCountry = getCookie("selectedCountry");
    const chosenShortName = getCookie("selectedCountryShort");
    const chosenFlagUrl = getCookie("selectedCountryFlag");

    if (!chosenCountry || !chosenShortName || !chosenFlagUrl) {
        //console.log("No country selection found in cookies. Showing modal.");
        showModal(modal);
        
        // Populate the dropdown with countries from navigation
        populateCountryDropdown(countryDropdown, dropdownContainer);
        
        // Add click listeners for country buttons in the modal
        addModalButtonListeners(modal, dropdownContainer);
        
        // Add change listener for dropdown
        if (countryDropdown) {
            countryDropdown.addEventListener("change", (event) => {
                const selectedCountry = event.target.value;
                
                if (selectedCountry) {
                    // Get short name and flag from navigation dropdown
                    const matchingDropdownItem = [...dropdownContainer.querySelectorAll(".nav_dropdown_item")].find(
                        (item) => item.querySelector(".country")?.textContent.trim() === selectedCountry
                    );

                    if (matchingDropdownItem) {
                        const shortName = matchingDropdownItem.querySelector(".country-short").textContent.trim();
                        const flagUrl = matchingDropdownItem.querySelector("img").src;

                        //console.log(`Modal Country: ${selectedCountry}, Short Name: ${shortName}, Flag URL: ${flagUrl}`);
                        selectCountry(selectedCountry, shortName, flagUrl);
                        hideModal(modal);
                    } else {
                        console.error(`Dropdown item for ${selectedCountry} not found.`);
                    }
                }
            });
        }
    } else {
        //console.log("Country already selected. Updating navigation.");
        updateSelectedCountry(chosenCountry, chosenShortName, chosenFlagUrl);
    }
    
        // Initial setup: check selected country and update availability
        if (chosenCountry) {
            updateAvailability(chosenCountry);
        } else {
            // console.log("No country selected. Rent/Buy availability cannot be determined.");
        }
    } catch (error) {
        console.error("Error in country selection logic:", error);
        alert("Error in country selection: " + error.message);
    }
});

// Function to show the modal
function showModal(modal) {
    if (modal) {
        modal.style.display = "flex";
        modal.style.visibility = "visible";
        modal.style.opacity = "1";
        modal.style.zIndex = "9999";
        document.body.classList.add("no-scroll");
        //console.log("Modal displayed successfully.");
    } else {
        console.error("Modal element not found.");
    }
}

// Function to hide the modal
function hideModal(modal) {
    if (modal) {
        modal.style.display = "none";
        document.body.classList.remove("no-scroll");
        //console.log("Modal hidden.");
    } else {
        console.error("Modal element not found.");
    }
}

// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
    //console.log(`Cookie set: ${name}=${value}`);
}

// Function to get a cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length, cookie.length);
    }
    return null;
}

// Function to handle country selection
function selectCountry(country, shortName, flagUrl) {
    // Get current country from cookies
    const currentCountry = getCookie("selectedCountry");
    
    // Don't refresh if:
    // 1. South Africa is selected (either as default or when chosen)
    // 2. The same country is already selected
    const shouldRefresh = country !== "South Africa" && country !== currentCountry;
    
    setCookie("selectedCountry", country, 365);
    setCookie("selectedCountryShort", shortName, 365);
    setCookie("selectedCountryFlag", flagUrl, 365);
    updateSelectedCountry(country, shortName, flagUrl);
    
    // Only refresh the page if conditions are met
    if (shouldRefresh) {
        setTimeout(() => {
            window.location.reload();
        }, 100); // Small delay to ensure cookies are properly set
    }
}

// Function to populate the country dropdown with countries from navigation
function populateCountryDropdown(countryDropdown, dropdownContainer) {
    if (!countryDropdown || !dropdownContainer) {
        console.error("Country dropdown or navigation container not found.");
        return;
    }
    
    // Clear existing options except the first "Select other" option
    countryDropdown.innerHTML = '<option value="">Select other</option>';
    
    // Get all country items from navigation dropdown
    const countryItems = dropdownContainer.querySelectorAll(".nav_dropdown_item");
    
    countryItems.forEach((item) => {
        const countryElement = item.querySelector(".country");
        if (countryElement) {
            const countryName = countryElement.textContent.trim();
            const option = document.createElement("option");
            option.value = countryName;
            option.textContent = countryName;
            countryDropdown.appendChild(option);
        }
    });
    
    //console.log(`Populated dropdown with ${countryItems.length} countries`);
}

// Function to add click listeners for country buttons in the modal
function addModalButtonListeners(modal, dropdownContainer) {
    if (!modal || !dropdownContainer) return;
    
    // Find all country buttons in the modal
    const countryButtons = modal.querySelectorAll(".button-country");
    
    countryButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const countryName = button.textContent.trim();
            
            // Find matching country in navigation dropdown to get short name and flag
            const matchingDropdownItem = [...dropdownContainer.querySelectorAll(".nav_dropdown_item")].find(
                (item) => item.querySelector(".country")?.textContent.trim() === countryName
            );
            
            if (matchingDropdownItem) {
                const shortName = matchingDropdownItem.querySelector(".country-short").textContent.trim();
                const flagUrl = matchingDropdownItem.querySelector("img").src;
                
                //console.log(`Modal Button Country: ${countryName}, Short Name: ${shortName}, Flag URL: ${flagUrl}`);
                selectCountry(countryName, shortName, flagUrl);
                hideModal(modal);
            } else {
                console.error(`Dropdown item for ${countryName} not found.`);
            }
        });
    });
}

// Function to update navigation and dropdown with the selected country
function updateSelectedCountry(country, shortName, flagUrl) {
    const navShortName = document.querySelector(".short-chosen");
    const navFlag = document.querySelector(".flag-chosen");
    if (navShortName) {
        navShortName.textContent = shortName;
    } else {
        console.error("Element with class 'short-chosen' not found.");
    }
    if (navFlag) {
        navFlag.src = flagUrl;
    } else {
        console.error("Element with class 'flag-chosen' not found.");
    }
}

// Function to update availability for rent or buy based on the selected country
function updateAvailability(country) {

    $(".button-rent-buy").each(function () {

        const buttonRentBuy = $(this);
        
        const rentData = buttonRentBuy.find("[data-rent]").attr("data-rent") || "";
        const saleData = buttonRentBuy.find("[data-sale]").attr("data-sale") || "";

        const rentCountries = rentData.split(",").map((item) => item.trim());
        const saleCountries = saleData.split(",").map((item) => item.trim());

        const availableForRent = rentCountries.includes(country);
        const availableForSale = saleCountries.includes(country);

        if (availableForRent && availableForSale) {
            buttonRentBuy.show().text("Available to Rent / Buy");
        } else if (availableForRent) {
            buttonRentBuy.show().text("Available to Rent");
        } else if (availableForSale) {
            buttonRentBuy.show().text("Available to Buy");
        } else {
            //buttonRentBuy.hide();
            buttonRentBuy.show().text("Not Available to Rent / Buy in " + country);
        }

        //console.log(`Country: ${country}, Rent: ${availableForRent}, Sale: ${availableForSale}`);

    });
}