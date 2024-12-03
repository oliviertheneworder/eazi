// Country-Specific Content Example HTML
// <div data-country="South Africa">Content for South Africa (e.g., Rent and Sale)</div>
// <div data-country="Botswana">Content for Botswana (e.g., Rent only)</div>
// <div data-country="Mozambique">Content for Mozambique</div>
// <div data-country="Namibia">Content for Namibia</div>
// <div data-country="Zimbabwe">Content for Zimbabwe</div>
// <div data-country="Zambia">Content for Zambia</div>


// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
    console.log(`Cookie set: ${name}=${value}`); // Log cookie for debugging
}

// Function to get a cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length, cookie.length);
    }
    return null;
}

// Function to handle country selection
function selectCountry(country) {
    console.log(`Country selected: ${country}`); // Log selected country
    setCookie('selectedCountry', country, 365); // Set cookie for 1 year
    updateNav(country);
    hideModal();
}

// Function to update navigation with the selected country
function updateNav(country) {
    const navElement = document.querySelector('.selected-country');
    if (navElement) {
        navElement.textContent = country; // Update nav with selected country
        console.log(`Navigation updated: ${country}`); // Log nav update
    } else {
        console.warn('Navigation element not found.');
    }
}

// Function to show the modal and prevent scrolling
function showModal() {
    const modal = document.querySelector('.country-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.classList.add('no-scroll'); // Prevent scrolling
        console.log('Modal displayed.');
    } else {
        console.error('Modal element not found.');
    }
}

// Function to hide the modal and restore scrolling
function hideModal() {
    const modal = document.querySelector('.country-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('no-scroll'); // Restore scrolling
        console.log('Modal hidden.');
    } else {
        console.error('Modal element not found.');
    }
}

// Check if country is already chosen
document.addEventListener('DOMContentLoaded', () => {
    const chosenCountry = getCookie('selectedCountry');
    if (chosenCountry) {
        updateNav(chosenCountry);
    } else {
        showModal();
    }

    // Attach event listeners to country buttons
    const countryButtons = document.querySelectorAll('.button-country');
    countryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const country = button.textContent.trim(); // Use button text as country name
            if (country) {
                selectCountry(country);
            } else {
                console.error('Country name is missing.');
            }
        });
    });
});