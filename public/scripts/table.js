document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/api/table')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.querySelector('#dataTable tbody');
            data.forEach(emp => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${emp.full_name}</td>
                    <td>${emp.email}</td>
                    <td>${emp.phone_number}</td>
                    <td>${emp.appointment_date}</td>
                    <td>${emp.source}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
});
