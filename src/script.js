// Function to generate party size options
function generatePartySizeOptions() {
  const selectPartySize = document.getElementById("party-size");

  for (let i = 1; i <= 20; i++) {
    const option = new Option(`${i} People`, i);
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
    selectedValue === "1" ? "1 person" : `${selectedValue} People`;
  partySizeDropdown.options[partySizeDropdown.selectedIndex].text = newText;
});

// Function to generate time options in AM/PM format from 11:00 AM to 11:00 PM
function generateTimeOptions() {
  const selectTime = document.getElementById("reservation-time");

  for (let hour = 11; hour <= 23; hour++) {
    for (let minutes = 0; minutes < 60; minutes += 30) {
      const time = `${hour}:${minutes === 0 ? "00" : minutes}`;
      const formattedHour = hour > 12 ? hour - 12 : hour;
      const amOrPm = hour >= 12 ? "PM" : "AM";
      const option = new Option(`${formattedHour}:${minutes === 0 ? "00" : minutes} ${amOrPm}`, time);
      selectTime.appendChild(option);
    }
  }
}

// Call the function to generate time options
generateTimeOptions();

