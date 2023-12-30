document.addEventListener('DOMContentLoaded', (event) => {
    fetch('http://localhost:3000/api/user_count')
        .then(response => response.json())
        .then(data => {
            const userCountElement = document.getElementById('userCount');
            userCountElement.innerHTML = `<span>${data.userCount}</span>`;
        })
        .catch(error => console.error('Error:', error));
});


document.addEventListener('DOMContentLoaded', (event) => {
    fetch('http://localhost:3000/api/d_count')
        .then(response => response.json())
        .then(data => {
            const donationCountElement = document.getElementById('donationCount');
            // Use the correct property from the JSON object, here it's 'donorCount'
            donationCountElement.innerHTML = `<span>${data.donorCount}</span>`;
        })
        .catch(error => console.error('Error:', error));
});


document.addEventListener('DOMContentLoaded', (event) => {
    fetch('http://localhost:3000/api/b_count')
        .then(response => response.json())
        .then(data => {
            const donationCountElement = document.getElementById('bloodTestingCount');
            // Use the correct property from the JSON object, here it's 'donorCount'
            donationCountElement.innerHTML = `<span>${data.bloodTestingCount}</span>`;
        })
        .catch(error => console.error('Error:', error));
});

document.addEventListener('DOMContentLoaded', (event) => {
    fetch('http://localhost:3000/api/c_count')
        .then(response => response.json())
        .then(data => {
            const donationCountElement = document.getElementById('total_customers');
            // Use the correct property from the JSON object, here it's 'donorCount'
            donationCountElement.innerHTML = `<span>${data.total_customers}</span>`;
        })
        .catch(error => console.error('Error:', error));
});


let fetchedData = [];

document.addEventListener('DOMContentLoaded', function() {
    // Fetch data from the API
    fetch('/api/blood-group-data')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            fetchedData = data; // Store the data for later use
            const labels = fetchedData.map(item => item.blood_type);
            const units = fetchedData.map(item => item.units_available);
            renderChart(labels, units); // Render chart initially
        })
        .catch(error => console.error('Error:', error));

    // Add event listeners to dropdown items
    document.getElementById('showChart').addEventListener('click', function() {
        renderChart(fetchedData.map(item => item.blood_type), fetchedData.map(item => item.units_available));
        document.getElementById('dataDisplayArea').style.display = 'none';
        document.getElementById('myChart').style.display = 'block';
    });

    document.getElementById('showTable').addEventListener('click', function() {
        renderTable(fetchedData);
        document.getElementById('myChart').style.display = 'none';
        document.getElementById('dataDisplayArea').style.display = 'block';
    });
});

function renderTable(data) {
    const tableContainer = document.getElementById('dataDisplayArea');
    let tableHTML = "<table class='table'><thead><tr><th>Blood Type</th><th>Units Available</th></tr></thead><tbody>";

    data.forEach(item => {
        tableHTML += `<tr><td>${item.blood_type}</td><td>${item.units_available}</td></tr>`;
    });

    tableHTML += "</tbody></table>";
    tableContainer.innerHTML = tableHTML;
}

function renderChart(labels, units) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: "Units",
                data: units,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(199, 199, 199, 0.2)",
                    "rgba(83, 102, 255, 0.2)"
                ],
                borderColor: [
                    "rgba(255,99,132,1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(199, 199, 199, 1)",
                    "rgba(83, 102, 255, 1)"
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false,
                labels: {
                    fontStyle: "normal"
                }
            },
            title: {
                fontStyle: "normal"
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: false,
                        drawTicks: false,
                        borderDash: ["2"],
                        zeroLineBorderDash: ["2"],
                        drawOnChartArea: false
                    },
                    ticks: {
                        fontColor: "#858796",
                        fontStyle: "normal",
                        padding: 20
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: false,
                        drawTicks: false,
                        borderDash: ["2"],
                        zeroLineBorderDash: ["2"]
                    },
                    ticks: {
                        fontColor: "#858796",
                        fontStyle: "normal",
                        beginAtZero: true,
                        padding: 20
                    }
                }]
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const addUnitsBtn = document.getElementById('addUnits');
    const removeUnitsBtn = document.getElementById('removeUnits');
    const formContainer = document.getElementById('formContainer');

    // Function to create Add Units form
    function createAddUnitsForm() {
        return `
            <form id="addBloodUnitsForm" class="unitForm">
                <div class="mb-3">
                <label for="bloodType" class="form-label">Blood Type</label>
                <select class="form-control custom-select" id="add_blood_type" name="blood_type">

                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="unitsNumber" class="form-label">Number of Units</label>
                <input type="number" class="form-control" id="add_units_available" name="units_available" placeholder="Enter number of units">
            </div>
                <button type="submit" class="btn btn-primary">Add Units</button>
            </form>
        `;
    }

    // Function to create Remove Units form
    function createRemoveUnitsForm() {
        return `
            <form id="removeBloodUnitsForm" class="unitForm">
                <div class="mb-3">
                <label for="bloodType" class="form-label">Blood Type</label>
                <select class="form-control custom-select" id="remove_blood_type" name="blood_type">

                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="unitsNumber" class="form-label">Number of Units</label>
                <input type="number" class="form-control" id="remove_units_available" name="units_available" placeholder="Enter number of units">
            </div>
                <button type="submit" class="btn btn-danger">Remove Units</button>
            </form>
        `;
    }

    // Function to handle form submission
    function handleFormSubmission(formId, apiUrl) {
        const form = document.getElementById(formId);
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Gather form data
            const formData = new FormData(form);
            // Convert formData to a plain object
            let data = {};
            formData.forEach((value, key) => data[key] = value);

            // Post data to the server
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                window.location.reload();

                // Handle success - maybe update the UI or show a message
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle errors here
            });
        });
    }

    // Event listeners for Add/Remove units buttons
    addUnitsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        formContainer.innerHTML = createAddUnitsForm();
        handleFormSubmission('addBloodUnitsForm', '/api/addBloodUnits'); // Replace '/api/add-units' with your actual API endpoint
    });

    removeUnitsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        formContainer.innerHTML = createRemoveUnitsForm();
        handleFormSubmission('removeBloodUnitsForm', '/api/removeBloodUnits'); // Replace '/api/remove-units' with your actual API endpoint
    });
});
