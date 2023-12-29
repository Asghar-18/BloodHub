document.addEventListener('DOMContentLoaded', function() {
    const userCount = document.getElementById('userCount');
    const donationCount = document.getElementById('donationCount');
    const bloodTestingCount = document.getElementById('bloodTestingCount');
    const total_customers = document.getElementById('total_customers');
    const addUnitsLink = document.getElementById('addUnitsLink');
    const removeUnitsLink = document.getElementById('removeUnitsLink');
    const formContainer = document.getElementById('formContainer');

    // Fetches and updates count data
    function updateCounts() {
        fetch('/api/user_count')
            .then(response => response.json())
            .then(data => { userCount.textContent = data.count; });

        fetch('/api/d_count')
            .then(response => response.json())
            .then(data => { donationCount.textContent = data.count; });

        fetch('/api/b_count')
            .then(response => response.json())
            .then(data => { bloodTestingCount.textContent = data.count; });

        fetch('/api/c_count')
            .then(response => response.json())
            .then(data => { total_customers.textContent = data.count; });
    }

    // Fetches blood group data and initializes chart
    function initChart() {
        fetch('/api/blood-group-data')
            .then(response => response.json())
            .then(data => {
                // Initialize your chart here
                // Example: chartFunction(data);
            });
    }

    // Function to create Add Units form
    function createAddUnitsForm() {
        return `
            <form id="addBloodUnitsForm">
                <!-- Add form fields here -->
                <button type="submit">Submit</button>
            </form>
        `;
    }

    // Function to create Remove Units form
    function createRemoveUnitsForm() {
        return `
            <form id="addBloodUnitsForm">
                <!-- Add form fields here -->
                <button type="submit">Submit</button>
            </form>
        `;
    }

    // Function to attach event listener to form
    function attachFormSubmitListener() {
        const form = document.getElementById('addBloodUnitsForm');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Form submission logic
            // Example: postData('/api/add-units', formData);
        });
    }

    // Event listeners for Add/Remove units links
    addUnitsLink.addEventListener('click', (e) => {
        e.preventDefault();
        formContainer.innerHTML = createAddUnitsForm();
        attachFormSubmitListener();
    });

    removeUnitsLink.addEventListener('click', (e) => {
        e.preventDefault();
        formContainer.innerHTML = createRemoveUnitsForm();
        attachFormSubmitListener();
    });

    // Initialize counts and chart
    updateCounts();
    initChart();
});
