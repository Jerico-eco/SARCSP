// Sign Up - Email
let verificationCode = '';

// Function to send email to the server
async function sendEmail(email) {
  try {
    const response = await fetch('send_email.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const result = await response.json();
    if (result.success) {
      verificationCode = result.code;
      alert('Verification code sent to your email.');
    } else {
      alert(result.message || 'Failed to send email.');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred while sending the email.');
  }
}

// Send button functionality
document.getElementById('send-btn').addEventListener('click', async () => {
  const email = document.getElementById('email').value.trim();
  if (!email) {
    alert('Please enter a valid email.');
    return;
  }
  await sendEmail(email);
});

// Resend button functionality
document.getElementById('resend-btn').addEventListener('click', async () => {
  const email = document.getElementById('email').value.trim();
  if (!email) {
    alert('Please enter a valid email.');
    return;
  }
  await sendEmail(email);
});

// Next button functionality
document.getElementById('next-btn').addEventListener('click', () => {
  const enteredCode = document.getElementById('code').value.trim();
  if (enteredCode === verificationCode) {
    alert('Email verified! Proceeding to the next step...');
    window.location.href = 'signup-pass.html';
  } else {
    alert('Invalid code. Please try again.');
  }
});

// Sign Up Page - Form
const termsLink = document.getElementById('terms-link');
const termsModal = document.getElementById('terms-modal');
const closeModal = document.getElementById('close-modal');
const overlayBg = document.querySelector('.overlay-bg');

const signupForm = document.getElementById('signup-form');
const createAccount = document.getElementById('create-account-success');
const successfulAccountModal = document.getElementById('create-account-successful-modal');
const proceed = document.getElementById('proceed');

termsLink.addEventListener('click', (e) => {
  e.preventDefault();
  termsModal.style.display = 'block';
  overlayBg.style.display = 'block';
});

closeModal.addEventListener('click', () => {
  termsModal.style.display = 'none';
  overlayBg.style.display = 'none';
});

overlayBg.addEventListener('click', () => {
  termsModal.style.display = 'none';
  overlayBg.style.display = 'none';
});

// Validate form and show success modal
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const studentNumber = document.getElementById('student-number').value.trim();
  const contactNumber = document.getElementById('contact-number').value.trim();
  const idUpload = document.getElementById('id-upload').value;

  if (!name || !studentNumber || !contactNumber || !idUpload || !document.getElementById('terms').checked) {
    alert("Please fill out all fields and agree to the Terms & Conditions.");
    return;
  }

  successfulAccountModal.style.display = 'block';
  overlayBg.style.display = 'block';
});

proceed.addEventListener('click', () => {
  successfulAccountModal.style.display = 'none';
  overlayBg.style.display = 'none';
  window.location.href = '/home.html';
});

// User Profile Options
function toggleDropdown() {
  const dropdown = document.getElementById("profile-dropdown");
  dropdown.classList.toggle("hidden");
}

// Close the dropdown if clicked outside
window.addEventListener("click", function (event) {
  const dropdown = document.getElementById("profile-dropdown");
  const profileIcon = document.querySelector(".profile-icon");

  if (event.target !== dropdown && event.target !== profileIcon) {
    dropdown.classList.add("hidden");
  }
});




// Back Button Trigger
function toggleEventDetails() {
  const calendar = document.querySelector('.calendar-container');
  const eventDetails = document.querySelector('.event-details-container');

  if (eventDetails.classList.contains('active')) {
    eventDetails.classList.remove('active');
    calendar.classList.remove('shifted');
  } else {
    eventDetails.classList.add('active');
    calendar.classList.add('shifted');
  }
}



// Appointment Form - Pop Up Modal Styles - Confirmation





// Month Dynamically Change
// JavaScript to manage calendar navigation
document.addEventListener("DOMContentLoaded", function () {
  const calendarBody = document.querySelector(".calendar-table tbody");
  const monthYearLabel = document.querySelector(".calendar-container h4");

  let currentDate = new Date();

  // Helper function to render the calendar
  function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Update the month/year label
    monthYearLabel.textContent = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(date);

    // Get the first day of the month and the total days
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Clear previous calendar content
    calendarBody.innerHTML = "";

    // Create rows for the calendar
    let row = document.createElement("tr");

    // Fill in days from the previous month
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      const cell = document.createElement("td");
      cell.classList.add("faded");
      cell.textContent = prevMonthDays - i;
      row.appendChild(cell);
    }

    // Fill in the current month's days
    for (let day = 1; day <= totalDays; day++) {
      if (row.children.length === 7) {
        calendarBody.appendChild(row);
        row = document.createElement("tr");
      }
      const cell = document.createElement("td");
      cell.textContent = day;
      row.appendChild(cell);
    }

    // Fill in days from the next month to complete the last week
    let nextMonthDay = 1;
    while (row.children.length < 7) {
      const cell = document.createElement("td");
      cell.classList.add("faded");
      cell.textContent = nextMonthDay++;
      row.appendChild(cell);
    }
    calendarBody.appendChild(row);
  }

  // Event listeners for previous and next buttons
  document.querySelector("#prev-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  document.querySelector("#next-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  // Initial render of the calendar
  renderCalendar(currentDate);
});



