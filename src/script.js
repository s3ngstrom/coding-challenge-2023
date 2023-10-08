function generatePartySizeOptions() {
  const selectPartySize = document.getElementById("party-size");

  // Generate party size options
  for (let i = 1; i <= 20; i++) {
    const optionLabel = i === 1 ? "1 Person" : `${i} People`;
    const option = new Option(optionLabel, i);
    selectPartySize.appendChild(option);
  }
}

// Call the function to generate party size options
generatePartySizeOptions();

// Event listener to update the selected value as "{number selected} People"
const partySizeDropdown = document.getElementById("party-size");
partySizeDropdown.addEventListener("change", function () {
  const selectedValue = partySizeDropdown.value;
  const newText =
    selectedValue === ""
      ? "Party Size"
      : selectedValue === "1"
      ? "1 Person"
      : `${selectedValue} People`;
  partySizeDropdown.options[partySizeDropdown.selectedIndex].text = newText;
});

function generateTimeOptions() {
  const selectTime = document.getElementById("reservation-time");

  // Generate time options
  for (let hour = 11; hour <= 23; hour++) {
    for (let minutes = 0; minutes < 60; minutes += 30) {
      const time = `${hour}:${minutes === 0 ? "00" : minutes}`;
      const formattedHour = hour > 12 ? hour - 12 : hour;
      const amOrPm = hour >= 12 ? "PM" : "AM";
      const optionLabel = `${formattedHour}:${
        minutes === 0 ? "00" : minutes
      } ${amOrPm}`;
      const option = new Option(optionLabel, time);
      selectTime.appendChild(option);
    }
  }
}

// Call the function to generate time options
generateTimeOptions();

/* Reservation Form Functionality */

document.addEventListener("DOMContentLoaded", function () {
  const reservationForm = document.getElementById("reservation-form");
  const customerInfoForm = document.getElementById("customer-info-form");
  const successMessage = document.getElementById("success-message");
  const validationError = document.getElementById("validation-error");

  const submitReservationButton = document.getElementById("submit-reservation");
  const submitCustomerInfoButton = document.getElementById(
    "submit-customer-info"
  );

  // Function to hide the error message
  function hideErrorMessage() {
    validationError.style.display = "none";
  }

  //  Hide the initial reservation form and show the date/time/size form
  submitReservationButton.addEventListener("click", function (e) {
    e.preventDefault();

    // Hide the error message
    hideErrorMessage();

    // Validate Date, Time, and Party Size
    const reservationDate = document.getElementById("reservation-date").value;
    const selectedTime = document.getElementById("reservation-time").value;
    const selectedPartySize = document.getElementById("party-size").value;

    const isValidDate = isValidCalendarDate(reservationDate);
    const isValidTime = isValidReservationTime(selectedTime);
    const isValidPartySize = isValidPartySizeSelection(selectedPartySize);

    if (isValidDate && isValidTime && isValidPartySize) {
      reservationForm.style.display = "none";
      customerInfoForm.style.display = "block";

      // Remove the error message if it was displayed
      validationError.style.display = "none";
    } else {
      // Display validation error message
      validationError.style.display = "block";
    }
  });

  // Calendar validation
  function isValidCalendarDate(date) {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    return /\d{4}-\d{2}-\d{2}/.test(date) && selectedDate > currentDate;
  }

  // Time validation
  function isValidReservationTime(time) {
    // Add your time validation logic here
    // For simplicity, you can check if it's not an empty string
    return time !== "";
  }

  // Party size validation
  function isValidPartySizeSelection(partySize) {
    // Add your party size validation logic here
    // For simplicity, you can check if it's not an empty string
    return partySize !== "";
  }

  //  Customer info submit handler
  submitCustomerInfoButton.addEventListener("click", function (e) {
    e.preventDefault();

    let name = document.getElementById("customer-name").value;
    let phone = document.getElementById("customer-phone").value;
    let email = document.getElementById("customer-email").value;

    if (name && phone && email) {
      // Successful submission, show success message
      customerInfoForm.style.display = "none";
      // Remove the error message if it was displayed
      validationError.style.display = "none";
      successMessage.style.display = "block";
    } else {
      // Display validation error message
      validationError.style.display = "block";
    }
  });
});
