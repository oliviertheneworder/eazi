// GSAP registration for ScrollTrigger plugin
window.Webflow ||= [];
window.Webflow.push(() => {
  gsap.registerPlugin(ScrollTrigger);
});

// GSAP animation for h1-h6 elements
gsap.utils.toArray('h1, h2, h3, h4, h5, h6').forEach((header) => {
    gsap.from(header, {
        scrollTrigger: {
            trigger: header,
            start: "top 85%", // Starts animation when the element is in view
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 20, // Moves up by 20 pixels
        duration: 1.2, // Animation duration
        ease: "power3.out" // Subtle easing for a modern effect
    });
});

// GSAP animation for .w-dyn-item elements
gsap.utils.toArray('.w-dyn-item img').forEach((item) => {
    gsap.fromTo(
        item,
        {
            scale: 0.75 // Start smaller
        },
        {
            scale: 1, // End at full size
            scrollTrigger: {
                trigger: item, // Each item is its own trigger
                start: "top bottom", // Start when the item enters the viewport
                end: "top 50%", // End when the item leaves the viewport
                scrub: true, // Link animation to scroll distance
                toggleActions: "restart pause reverse pause" // Reset animation when scrolling back up
            },
            ease: "power3.out", // Smooth easing effect
        }
    );
});

// Machine Filter Form
document.addEventListener("DOMContentLoaded", function () {
    const machineItems = document.querySelectorAll(".w-dyn-item"); // Select all machine items
    const filterForm = document.querySelector("#wf-form-Machine-Filter-Form"); // Filter form

    // Function to populate select options dynamically
    function populateSelectOptions() {
        const selectFields = {
            rentBuyFinder: new Set(),
            categoryFinder: new Set(),
            manufacturerFinder: new Set(),
            workEnvironmentFinder: new Set(),
            workHeightFinder: new Set(),
            loadCapacityFinder: new Set(),
            powerUnitFinder: new Set(),
        };

        // Gather unique values for each filter field
        machineItems.forEach((item) => {
            selectFields.rentBuyFinder.add(item.querySelector("[data-rent]").getAttribute("data-rent"));
            selectFields.categoryFinder.add(item.querySelector("[data-category]").getAttribute("data-category"));
            selectFields.manufacturerFinder.add(item.querySelector("[data-manufacturer]").getAttribute("data-manufacturer"));
            selectFields.workEnvironmentFinder.add(item.querySelector("[data-outdoor]").getAttribute("data-outdoor") === "true" ? "Outdoor" : "Indoor");
            selectFields.workHeightFinder.add(item.querySelector("[data-workingheight]").getAttribute("data-workingheight"));
            selectFields.loadCapacityFinder.add(item.querySelector("[data-loadcapacity]").getAttribute("data-loadcapacity"));
            selectFields.powerUnitFinder.add(item.querySelector("[data-powerunit]").getAttribute("data-powerunit"));
        });

        // Populate each select dropdown
        Object.entries(selectFields).forEach(([fieldId, values]) => {
            const select = document.querySelector(`#${fieldId}`);
            select.innerHTML = '<option value="Not Sure">Not Sure</option>'; // Default option
            Array.from(values)
                .filter((value) => value) // Remove empty values
                .sort() // Optional: sort values alphabetically
                .forEach((value) => {
                    select.innerHTML += `<option value="${value}">${value}</option>`;
                });
        });
    }

    // Function to filter machines based on form selections
    function filterMachines() {
        const filters = {
            rent: document.querySelector("#rentBuyFinder").value.toLowerCase(),
            category: document.querySelector("#categoryFinder").value.toLowerCase(),
            manufacturer: document.querySelector("#manufacturerFinder").value.toLowerCase(),
            workEnvironment: document.querySelector("#workEnvironmentFinder").value.toLowerCase(),
            workingHeight: document.querySelector("#workHeightFinder").value,
            loadCapacity: document.querySelector("#loadCapacityFinder").value.toLowerCase(),
            powerUnit: document.querySelector("#powerUnitFinder").value.toLowerCase(),
        };

        machineItems.forEach((item) => {
            const rent = item.querySelector("[data-rent]").getAttribute("data-rent").toLowerCase();
            const category = item.querySelector("[data-category]").getAttribute("data-category").toLowerCase();
            const manufacturer = item.querySelector("[data-manufacturer]").getAttribute("data-manufacturer").toLowerCase();
            const workEnvironment = item.querySelector("[data-outdoor]").getAttribute("data-outdoor").toLowerCase();
            const workingHeight = parseFloat(item.querySelector("[data-workingheight]").getAttribute("data-workingheight")) || 0;
            const loadCapacity = item.querySelector("[data-loadcapacity]").getAttribute("data-loadcapacity").toLowerCase();
            const powerUnit = item.querySelector("[data-powerunit]").getAttribute("data-powerunit").toLowerCase();

            const isVisible =
                (filters.rent === "not sure" || rent.includes(filters.rent)) &&
                (filters.category === "not sure" || category.includes(filters.category)) &&
                (filters.manufacturer === "not sure" || manufacturer.includes(filters.manufacturer)) &&
                (filters.workEnvironment === "not sure" || workEnvironment.includes(filters.workEnvironment)) &&
                (filters.workingHeight === "not sure" || workingHeight >= parseFloat(filters.workingHeight)) &&
                (filters.loadCapacity === "not sure" || loadCapacity.includes(filters.loadCapacity)) &&
                (filters.powerUnit === "not sure" || powerUnit.includes(filters.powerUnit));

            item.style.display = isVisible ? "block" : "none";
        });
    }

    // Populate select options and attach filter functionality
    populateSelectOptions();
    filterForm.querySelectorAll("select").forEach((select) => {
        select.addEventListener("change", filterMachines);
    });
});