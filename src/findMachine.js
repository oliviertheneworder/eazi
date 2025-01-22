
// Purpose: Handle form logic and build custom URL

// Immediately Invoked Function Expression (IIFE) to encapsulate the code
(function () {

    $('.radio-button-field').removeClass('disabled');

    // hide #findLocation, #findMaxHeight, #findMaxWeight, #findLast
    $('#findLocation, #findMaxHeight, #findMaxWeight, #findLast').hide();

    const findForm = document.getElementById('wf-form-Find-Form');
    const submitButton = document.getElementById('findSubmit');

    // Extract equipment data
    const equipmentScripts = document.querySelectorAll('.jsonmachine script.jsonmachine');
    const equipmentData = Array.from(equipmentScripts).map(script => JSON.parse(script.textContent));

    // console log how many json objects are in the equipmentData
    // console.log('Machine Count = ', equipmentData.length);

    // Utility functions
    function toggleRadioField(radioField, enable) {
        radioField.classList.toggle('disabled', !enable);
        const input = radioField.querySelector('input');
        input.disabled = !enable;
        radioField.style.opacity = enable ? '1' : '0.5'; // Optional: visually indicate disabled state
    }

    function resetForm(form) {
        form.reset();
        // Re-enable all options
        const allRadioFields = form.querySelectorAll('.radio-button-field');
        allRadioFields.forEach(field => toggleRadioField(field, true));
        // Remove reset button if it exists
        const resetButton = document.getElementById('reset-button');
        if (resetButton) {
            resetButton.remove();
        }
    }

    function updateOptions() {

        // Capture current selections
        const formData = new FormData(findForm);
        const moving = formData.get('find-lifting'); // 'People', 'Material', or 'People & Material'
        const location = formData.get('find-location'); // 'Indoor', 'Outdoor', or 'Indoor & Outdoor'
        const selectedHeight = formData.get('find-height');
        const selectedWeight = formData.get('find-weight');

        // If either 'moving' or 'location' is not selected, exit the function
        if (!moving || !location) return;

        // Determine the selected criteria
        const movingPeople = moving.includes('People');
        const movingMaterial = moving.includes('Material');
        const workingIndoor = location.includes('Indoor');
        const workingOutdoor = location.includes('Outdoor');

        // Filter equipment based on current selections
        const filteredMachines = equipmentData.filter(machine => {
            return (movingPeople ? machine.people : true) &&
                (movingMaterial ? machine.material : true) &&
                (workingIndoor ? machine.indoor : true) &&
                (workingOutdoor ? machine.outdoor : true) &&
                (!selectedHeight || machine.height === selectedHeight) &&
                (!selectedWeight || machine.weight === selectedWeight);
        });

        // console.log('Filtered Machines: ', filteredMachines);
        // console log Machine names and their heights and weights
        filteredMachines.forEach(machine => {
            // console.log('Machine: ', machine.id, 'Height: ', machine.height, 'Weight: ', machine.weight);
        });

        // Extract unique heights and weights from filtered machines
        const validHeights = new Set(filteredMachines.map(machine => machine.height));
        const validWeights = new Set(filteredMachines.map(machine => machine.weight));

        // Update options
        updateRadioOptions('find-height', validHeights);
        updateRadioOptions('find-weight', validWeights);

        // console.log unique heights and weights
        // console.log("Valid Heights: ", validHeights);
        // console.log("Valid Weights: ", validWeights);

        // Console log moving and location values
        // console.log('Moving = ', moving);
        // console.log('Location = ', location);
    }

    function updateRadioOptions(name, validOptions) {
        const options = findForm.querySelectorAll(`input[name="${name}"]`);
        options.forEach(option => {
            const radioField = option.closest('.radio-button-field');
            const isValid = validOptions.has(option.value);
            toggleRadioField(radioField, isValid);
            if (!isValid && option.checked) {
                option.checked = false;
            }
        });
    }

    // Initial update on page load
    updateOptions();

    // Add event listeners to 'find-lifting', 'find-location', 'find-height', and 'find-weight' radio inputs
    findForm.addEventListener('change', event => {

        if (event.target.name === 'find-lifting') {
            // Reset height and weight when lifting type changes
            const heightFields = findForm.querySelectorAll('.radio-button-field input[name="find-height"]');
            const weightFields = findForm.querySelectorAll('.radio-button-field input[name="find-weight"]');

            heightFields.forEach(field => {
                field.checked = false;
                toggleRadioField(field.closest('.radio-button-field'), true);
            });

            weightFields.forEach(field => {
                field.checked = false;
                toggleRadioField(field.closest('.radio-button-field'), true);
            });

            // Remove active classes
            $('#findLifting').find('.radio-button-field').removeClass('active');
            $('#findMaxHeight').find('.radio-button-field').removeClass('active');
            $('#findMaxWeight').find('.radio-button-field').removeClass('active');
            event.target.closest('.radio-button-field').classList.add('active');
        }

        if (event.target.name === 'find-location') {
            // Reset height and weight when location changes
            const heightFields = findForm.querySelectorAll('.radio-button-field input[name="find-height"]');
            const weightFields = findForm.querySelectorAll('.radio-button-field input[name="find-weight"]');

            heightFields.forEach(field => {
                field.checked = false;
                toggleRadioField(field.closest('.radio-button-field'), true);
            });

            weightFields.forEach(field => {
                field.checked = false;
                toggleRadioField(field.closest('.radio-button-field'), true);
            });

            // Remove active classes
            $('#findLocation').find('.radio-button-field').removeClass('active');
            $('#findMaxHeight').find('.radio-button-field').removeClass('active');
            $('#findMaxWeight').find('.radio-button-field').removeClass('active');
            event.target.closest('.radio-button-field').classList.add('active');
        }

        if (['find-lifting', 'find-location', 'find-height', 'find-weight'].includes(event.target.name)) {
            updateOptions();
        }
        
    });

    // Function to scroll to the next section using GSAP
    function scrollToFindSection(sectionId) {
        const container = $('#findFormBlock')[0]; // Scrollable container
        const target = $(`#${sectionId}`)[0]; // Target section

        if (container && target) {
            const scrollOffset = target.offsetTop - container.offsetTop;
            gsap.to(container, {
                scrollTop: scrollOffset - 20, // Adjust offset if necessary
                duration: 0.4,
                ease: 'power3.out',
            });
        }
        // console.log('Scrolling to section:', sectionId);
    }

    // Show corresponding elements when any radio button is selected
    findForm.addEventListener('change', event => {
        if (event.target.name === 'find-lifting') {
            $('#findLocation').show();
            scrollToFindSection('findLocation');
        }
        if (event.target.name === 'find-location') {
            $('#findMaxHeight').show();
            scrollToFindSection('findMaxHeight');
        }
        if (event.target.name === 'find-height') {
            $('#findMaxWeight').show();
            scrollToFindSection('findMaxWeight');
        }
        if (event.target.name === 'find-weight') {
            $('#findLast').show();
            scrollToFindSection('findLast');
        }
    });

    // Handle form submission with validation
    submitButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default submission

        // Change text of submit button to 'Loading...'
        submitButton.textContent = 'Loading...';

        // Capture form data
        const formData = new FormData(findForm);
        const moving = formData.get('find-lifting');
        const location = formData.get('find-location');
        const maxHeight = formData.get('find-height');
        const maxWeight = formData.get('find-weight');

        if (!moving || !location) {
            alert('Please select both "What are you moving?" and "Where are you working?" options.');
            return;
        }

        // Determine if selected height and weight are enabled
        const selectedHeight = findForm.querySelector('input[name="find-height"]:checked');
        const selectedWeight = findForm.querySelector('input[name="find-weight"]:checked');
        let invalidSelection = false;

        if ((selectedHeight && selectedHeight.disabled) || (selectedWeight && selectedWeight.disabled)) {
            invalidSelection = true;
        }

        if (invalidSelection) {
            alert('The selected combination of options is not possible. Please adjust your selections.');
            // Show a reset button if not already present
            if (!document.getElementById('reset-button')) {
                const resetButton = document.createElement('button');
                resetButton.type = 'button';
                resetButton.id = 'reset-button';
                resetButton.textContent = 'Reset Form';
                resetButton.style.marginTop = '10px';
                resetButton.addEventListener('click', () => resetForm(findForm));
                findForm.appendChild(resetButton);
            }
            return;
        }

        // Proceed with URL construction and redirection
        let locationSegment = '';
        if (location.includes('Indoor') && location.includes('Outdoor')) {
            locationSegment = 'indoor-outdoor';
        } else if (location.includes('Indoor')) {
            locationSegment = 'indoor';
        } else if (location.includes('Outdoor')) {
            locationSegment = 'outdoor';
        }

        let pathSegments = [locationSegment];

        if ( moving.includes('People') && moving.includes('Material') ) {
            pathSegments.push('work-at-height-material-handling');
        } else if (moving.includes('People')) {
            pathSegments.push('work-at-height');
        } else if (moving.includes('Material')) {
            pathSegments.push('material-handling');
        }

        const path = pathSegments.join('-');
        const baseURL = `/find-equipment/${path}`;

        const params = new URLSearchParams();
        if (maxHeight) {
            params.append('height', maxHeight);
        }
        if (maxWeight) {
            params.append('weight', maxWeight);
        }

        const queryString = params.toString();
        const fullURL = queryString ? `${baseURL}?${queryString}` : baseURL;

        // Redirect to the constructed URL
        window.location.href = fullURL;
    });

    // Optional: Prevent selection of disabled options via additional event listeners
    findForm.addEventListener('click', event => {
        if (event.target.name === 'find-height' || event.target.name === 'find-weight') {
            if (event.target.closest('.radio-button-field').classList.contains('not-sure')) {
                return; // Ignore if .not-sure is clicked
            }
            if (event.target.disabled) {
                event.preventDefault();
                alert(`This ${event.target.name.split('-')[1]} option is not available for your current selections.`);
            }
        }
    });

    // add a reset function using #findReset, remove all .active classes from radio buttons
    const resetButton = document.getElementById('findReset');
    resetButton.addEventListener('click', function () {
        resetForm(findForm);
        $(findForm).find('.radio-button-field').removeClass('active');
        $(findForm).find('.radio-button-field .field-icon').css({ 'scale': '1', 'opacity': '1', 'transform': 'scale(1)' });
        $(findForm).find('.radio-button-field .field-icon-active').css({ 'scale': '0', 'opacity': '0', 'transform': 'scale(0)' });
        $('#findLocation, #findMaxHeight, #findMaxWeight, #findLast').hide();
        scrollToFindSection('findLifting');
    });

    if (window.location.pathname.includes('/find-equipment/')) {
        document.addEventListener('DOMContentLoaded', function () {
            function getQueryParams() {
                const params = new URLSearchParams(window.location.search);
                const query = {};
                for (const [key, value] of params.entries()) {
                    query[key] = value;
                }
                return query;
            }
    
            function filterEquipment() {
                const query = getQueryParams();
                const heightFilter = query.height ? parseFloat(query.height) : null;
                const weightFilter = query.weight ? parseFloat(query.weight) : null;
    
                const equipmentItems = document.querySelectorAll('.grid-4 .w-dyn-item');
                let matchCount = 0;
    
                equipmentItems.forEach(item => {
                    // Find the .hide container first
                    const hideContainer = item.querySelector('.hide');
                    if (!hideContainer) return;
    
                    // Find elements with data attributes
                    const heightElement = hideContainer.querySelector('[data-height]');
                    const weightElement = hideContainer.querySelector('[data-weight]');
    
                    // Get values with null checks
                    const itemHeight = heightElement ? parseFloat(heightElement.getAttribute('data-height')) : null;
                    const itemWeight = weightElement ? parseFloat(weightElement.getAttribute('data-weight')) : null;
    
                    // Skip if required values are missing
                    if (itemHeight === null || itemWeight === null) return;
    
                    let heightMatch = true;
                    let weightMatch = true;
    
                    if (heightFilter !== null) {
                        heightMatch = (itemHeight <= heightFilter);
                    }
    
                    if (weightFilter !== null) {
                        weightMatch = (itemWeight <= weightFilter);
                    }
    
                    if (heightMatch && weightMatch) {
                        item.classList.remove('hide');
                        matchCount++;
                    }
                });
    
                // Handle no matches
                const noResults = document.getElementById('no-results');
                if (noResults) {
                    noResults.style.display = matchCount === 0 ? 'block' : 'none';
                }

                // if query string contains 'height' or 'weight' then update .filtered-height and .filtered-weight with the values
                if (heightFilter) {
                    $('.filtered-height').text("Filtered by Max Working Height = " + heightFilter + " m");
                }
                if (weightFilter) {
                    $('.filtered-weight').text("Filtered by Max Lifting Weight = " + weightFilter + " kg");
                }
                // if no query string is present, hide .filtered-by
                if (!heightFilter && !weightFilter) {
                    $('.filtered-by').hide();
                }
            }
    
            // Execute the filter function on page load
            filterEquipment();

            // Console log the amount of items on the page and how many have been hidden
            // console.log('Total Items = ', document.querySelectorAll('.grid-4 .w-dyn-item').length);
            // console.log('Visible Items = ', document.querySelectorAll('.grid-4 .w-dyn-item:not(.hide)').length);
        });
    }

})();