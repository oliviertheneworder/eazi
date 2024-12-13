// console.log("Country.js loaded");

// Locate modal and its buttons
const modal = document.querySelector(".country-modal");
const modalButtons = document.querySelectorAll(".button-country");

// Locate navigation dropdown
const dropdownContainer = document.querySelector(".country-list");
if (dropdownContainer) {
    console.log("Navigation dropdown found:", dropdownContainer);

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
    console.log("No country selection found in cookies. Showing modal.");
    showModal(modal);

    // Add click listeners for modal buttons
    modalButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const country = button.textContent.trim();

            // Get short name and flag from navigation dropdown
            const matchingDropdownItem = [...dropdownContainer.querySelectorAll(".nav_dropdown_item")].find(
                (item) => item.querySelector(".country")?.textContent.trim() === country
            );

            if (matchingDropdownItem) {
                const shortName = matchingDropdownItem.querySelector(".country-short").textContent.trim();
                const flagUrl = matchingDropdownItem.querySelector("img").src;

                //console.log(`Modal Country: ${country}, Short Name: ${shortName}, Flag URL: ${flagUrl}`);
                selectCountry(country, shortName, flagUrl);
                hideModal(modal);
            } else {
                console.error(`Dropdown item for ${country} not found.`);
            }
        });
    });
} else {
    console.log("Country already selected. Updating navigation.");
    updateSelectedCountry(chosenCountry, chosenShortName, chosenFlagUrl);
}


// Function to show the modal
function showModal(modal) {
    if (modal) {
        modal.style.display = "flex";
        document.body.classList.add("no-scroll");
        console.log("Modal displayed.");
    } else {
        console.error("Modal element not found.");
    }
}

// Function to hide the modal
function hideModal(modal) {
    if (modal) {
        modal.style.display = "none";
        document.body.classList.remove("no-scroll");
        console.log("Modal hidden.");
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
    console.log(`Cookie set: ${name}=${value}`);
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
    console.log(`Country selected: ${country}`);
    console.log(`Short name: ${shortName}`);
    console.log(`Flag URL: ${flagUrl}`);

    setCookie("selectedCountry", country, 365);
    setCookie("selectedCountryShort", shortName, 365);
    setCookie("selectedCountryFlag", flagUrl, 365);
    updateSelectedCountry(country, shortName, flagUrl);
}

// Function to update navigation and dropdown with the selected country
function updateSelectedCountry(country, shortName, flagUrl) {
    const navShortName = document.querySelector(".short-chosen");
    const navFlag = document.querySelector(".flag-chosen");
    if (navShortName) {
        navShortName.textContent = shortName;
        console.log(`Navigation short name updated to: ${shortName}`);
    } else {
        console.error("Element with class 'short-chosen' not found.");
    }
    if (navFlag) {
        navFlag.src = flagUrl;
        console.log(`Navigation flag updated to: ${flagUrl}`);
    } else {
        console.error("Element with class 'flag-chosen' not found.");
    }
}

// Country Availability

// Function to update availability for rent or buy based on the selected country
function updateAvailability(country) {
    const buttonRentBuy = $(".button-rent-buy");
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
}

// Initial setup: check selected country and update availability

if (chosenCountry) {
    updateAvailability(chosenCountry);
} else {
    console.log("No country selected. Rent/Buy availability cannot be determined.");
}

// Example usage: dynamically update availability when the country changes
// Call updateAvailability(selectedCountry) wherever you handle country selection