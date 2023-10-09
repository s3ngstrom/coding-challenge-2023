function generatePartySizeOptions() {
  const selectPartySize = document.getElementById("party-size");
  for (let i = 1; i <= 20; i++) {
    const optionLabel = i === 1 ? "1 Person" : `${i} People`;
    const option = new Option(optionLabel, i);
    selectPartySize.appendChild(option);
  }
}

generatePartySizeOptions();

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

generateTimeOptions();

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

  function isValidCalendarDate(date) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return (
      date instanceof Date && !isNaN(date) && date >= currentDate 
    );
  }

  function isValidReservationTime(time) {
    return time !== "";
  }

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
