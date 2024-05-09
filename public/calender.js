// calendar.js

document.addEventListener("DOMContentLoaded", function () {
    const calendarContainer = document.getElementById("calendarContainer");
    const dateInput = document.getElementById("date");

    // Fetch booked dates from the server
    fetch('/booking/dates')
        .then(response => response.json())
        .then(data => {
            const bookedDates = data.map(date => new Date(date).toISOString().split('T')[0]);

            // Function to create the calendar
            function createCalendar(year, month, bookedDates) {
                const firstDay = new Date(year, month, 1);
                const lastDay = new Date(year, month + 1, 0);
                const daysInMonth = lastDay.getDate();

                const table = document.createElement("table");
                const header = table.createTHead();
                const body = table.createTBody();

                // Create header row
                const headerRow = header.insertRow();
                const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                daysOfWeek.forEach(day => {
                    const cell = headerRow.insertCell();
                    cell.textContent = day;
                });

                // Create calendar days
                let date = 1;
                for (let i = 0; i < 6; i++) {
                    const row = body.insertRow();
                    for (let j = 0; j < 7; j++) {
                        if (i === 0 && j < firstDay.getDay()) {
                            const cell = row.insertCell();
                            cell.textContent = '';
                        } else if (date > daysInMonth) {
                            break;
                        } else {
                            const cell = row.insertCell();
                            cell.textContent = date;
                            const currentDate = new Date(year, month, date).toISOString().split('T')[0];
                            if (bookedDates.includes(currentDate)) {
                                cell.classList.add('booked');
                            }
                            date++;
                        }
                    }
                }
                return table;
            }

            // Function to display the calendar
            function showCalendar() {
                const today = new Date();
                const currentYear = today.getFullYear();
                const currentMonth = today.getMonth();
                const calendar = createCalendar(currentYear, currentMonth, bookedDates);
                calendarContainer.innerHTML = '';
                calendarContainer.appendChild(calendar);
                calendarContainer.style.display = 'block';
            }

            // Event listener for the "Check Availability" button
            document.getElementById('checkAvailabilityBtn').addEventListener('click', showCalendar);

            // Event listener for date input
            dateInput.addEventListener('change', () => {
                const selectedDate = dateInput.value;
                const isBooked = bookedDates.includes(selectedDate);
                const dateStatus = document.getElementById('dateStatus');
                if (isBooked) {
                    dateStatus.textContent = 'Date unavailable';
                    dateStatus.style.color = 'red';
                } else {
                    dateStatus.textContent = 'Date available';
                    dateStatus.style.color = 'green';
                }
            });
        })
        .catch(error => {
            console.error('Error fetching booked dates:', error);
        });
});
