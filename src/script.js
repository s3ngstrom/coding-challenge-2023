/* Party size should reasonably have some limit, based on the restaurant's needs. 
Set to 20 People in this script, but restaurant may want users to call for reservations greater than 10+ people, for example. */
function generatePartySizeOptions() {
  const selectPartySize = document.getElementById("party-size");
  for (let i = 1; i <= 20; i++) {
    const optionLabel = i === 1 ? "1 Person" : `${i} People`;
    const option = new Option(optionLabel, i);
    selectPartySize.appendChild(option);
  }
}
generatePartySizeOptions();

/* IF it's only one person, preventing "1 People" being displayed */
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

/* This may be unnecessary IF we can access a better time input field via vanilla HTML.
Accepts reservations from 10 AM to 11:30 PM; assuming that restaurant may not necessarily accept reservations a certain amount of time before closing.*/
function generateTimeOptions() {
  const selectTime = document.getElementById("reservation-time");
  for (let hour = 10; hour <= 23; hour++) {
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
generateTimeOptions();


/* Reservation form listener and handler*/
document.addEventListener("DOMContentLoaded", function () {
  const reservationForm = document.getElementById("reservation-form");
  const customerInfoForm = document.getElementById("customer-info-form");
  const successMessage = document.getElementById("success-message");
  const validationError = document.getElementById("validation-error");

  const submitRequestButton = document.getElementById("submit-request");
  const submitCustomerInfoButton = document.getElementById(
    "submit-customer-info"
  );

  function hideErrorMessage() {
    validationError.style.display = "none";
  }

  submitRequestButton.addEventListener("click", function (e) {
    e.preventDefault();
    hideErrorMessage();
    const reservationDateInput = document.getElementById("reservation-date");
    const selectedDate = new Date(reservationDateInput.value);
    const selectedTime = document.getElementById("reservation-time").value;
    const selectedPartySize = document.getElementById("party-size").value;
    const isValidDate = isValidCalendarDate(selectedDate);
    const isValidTime = isValidReservationTime(selectedTime);
    const isValidPartySize = isValidPartySizeSelection(selectedPartySize);
    if (isValidDate && isValidTime && isValidPartySize) {
      reservationForm.style.display = "none";
      customerInfoForm.style.display = "block";
      validationError.style.display = "none";
    } else {
      validationError.style.display = "block";
    }
  });

 /* Validate date */
function isValidCalendarDate(date) {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  return date instanceof Date && !isNaN(date) && date >= currentDate;
}

  /* Validate time */
  function isValidReservationTime(time) {
    return time !== "";
  }

  /* Validate party size */
  function isValidPartySizeSelection(partySize) {
    return partySize !== "";
  }

  submitCustomerInfoButton.addEventListener("click", function (e) {
    e.preventDefault();
    let name = document.getElementById("customer-name").value;
    let phone = document.getElementById("customer-phone").value;
    let email = document.getElementById("customer-email").value;
    if (name && phone && email) {
      customerInfoForm.style.display = "none";
      validationError.style.display = "none";
      successMessage.style.display = "block";
    } else {
      validationError.style.display = "block";
    }
  });
});
