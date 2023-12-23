// // Fetch data from an API
// fetch("https://api.bloodcare.com/inventory")
// .then(response => response.json())
// .then(data => {
//     // Update the table with data
//     let tableBody = document.querySelector("table tbody");
//     tableBody.innerHTML = "";
//     for (let bloodType of data) {
//         // Create a new row for each blood type
//         let row = document.createElement("tr");
//         // Create a cell for the blood type name
//         let nameCell = document.createElement("td");
//         nameCell.textContent = bloodType.name;
//         // Create a cell for the units available
//         let unitsCell = document.createElement("td");
//         unitsCell.textContent = bloodType.units;
//         // Append the cells to the row
//         row.appendChild(nameCell);
//         row.appendChild(unitsCell);
//         // Append the row to the table body
//         tableBody.appendChild(row);
//     }
// })
// .catch(error => {
//     // Handle errors
//     console.error(error);
// });

// // Display alerts and notifications for low blood supply
// let alertBox = document.querySelector("p");
// // Set a threshold for low supply
// let threshold = 20;
// // Check the table every 5 seconds
// setInterval(() => {
//     // Get all the rows in the table body
//     let rows = document.querySelectorAll("table tbody tr");
//     // Initialize an empty array to store low supply blood types
//     let lowSupply = [];
//     // Loop through each row
//     for (let row of rows) {
//         // Get the blood type name and units available from the cells
//         let name = row.children[0].textContent;
//         let units = parseInt(row.children[1].textContent);
//         // If the units are below the threshold, add the name to the low supply array
//         if (units < threshold) {
//             lowSupply.push(name);
//         }
//     }
//     // If there are any low supply blood types, display an alert message
//     if (lowSupply.length > 0) {
//         alertBox.textContent = "Alert: The following blood types have low supply: " + lowSupply.join(", ") + ". Please contact your nearest blood bank or donor center.";
//         alertBox.style.color = "red";
//     } else {
//         // Otherwise, display a normal message
//         alertBox.textContent = "Note: Alerts and notifications for low blood supply will be displayed here.";
//         alertBox.style.color = "black";
//     }
// }, 5000);

