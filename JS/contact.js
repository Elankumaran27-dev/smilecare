// ✅ Highlight Active Nav Link and Footer Link Based on Current Page
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();

  document.querySelectorAll("a").forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage || (linkPage === "index.html" && currentPage === "")) {
      link.classList.add("active-link");
    }
  });
});

// 🟡 Get the menu icon and nav menu
const menuIcon = document.getElementById('menu-icon');
const navCenter = document.getElementById('nav-center');

// ✅ Toggle class on click
menuIcon.addEventListener('click', () => {
  navCenter.classList.toggle('active');
});

// let currentSlide = 0;
// const slides = document.querySelectorAll('.hero-slide');
// const dots = document.querySelectorAll('.dot');

// login starts:-
const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', () => {
    createLoginModal();
});

function createLoginModal() {
    // Create modal background
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.id = 'loginModal';
    document.body.appendChild(modalOverlay);

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    modalContent.innerHTML = `
        <span class="close-btn" id="closeModal">&times;</span>
        <h2>Login with OTP</h2>
        <input type="text" id="mobileNumber" placeholder="Enter Mobile Number" maxlength="10" />
        <button id="sendOtpBtn">Send OTP</button>
        <div id="otpSection" style="display:none;">
            <div class="otp-inputs">
                <input type="text" maxlength="1" class="otp-input" />
                <input type="text" maxlength="1" class="otp-input" />
                <input type="text" maxlength="1" class="otp-input" />
                <input type="text" maxlength="1" class="otp-input" />
                <input type="text" maxlength="1" class="otp-input" />
                <input type="text" maxlength="1" class="otp-input" />
            </div>
            <div id="timer">10</div>
            <button id="verifyOtpBtn">Verify OTP</button>
            <p id="otpStatus"></p>
        </div>
    `;

    modalOverlay.appendChild(modalContent);

    // Add event listeners after creating elements
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('sendOtpBtn').addEventListener('click', sendOtp);
    document.getElementById('verifyOtpBtn').addEventListener('click', verifyOtp);

    focusNextOtpInput();
}

function closeModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.remove();
    }
}

function sendOtp() {
    const mobile = document.getElementById('mobileNumber').value.trim();
    if (mobile.length !== 10) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
    }

    // Hide send button, show OTP inputs
    document.getElementById('sendOtpBtn').style.display = 'none';
    document.getElementById('mobileNumber').style.display = 'none';
    document.getElementById('otpSection').style.display = 'block';

    startTimer();
}

function startTimer() {
    let timeLeft = 10;
    const timerElement = document.getElementById('timer');
    timerElement.innerText = timeLeft;

    const countdown = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerElement.innerText = "OTP expired!";
        }
    }, 1000);
}

function verifyOtp() {
    let enteredOtp = '';
    const otpInputs = document.querySelectorAll('.otp-input');
    otpInputs.forEach(input => {
        enteredOtp += input.value;
    });

    const statusMsg = document.getElementById('otpStatus');

    if (enteredOtp === '123456') {
        statusMsg.style.color = 'green';
        statusMsg.innerHTML = '✔ OTP Verified Successfully!';

        // After 1 second, close the login modal
        setTimeout(() => {
            closeModal();
            showSuccessMessage();
        }, 1000);

    } else {
        statusMsg.style.color = 'red';
        statusMsg.innerText = 'Invalid OTP. Please try again.';
    }
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'login-success-message';
    successDiv.innerHTML = '✅ Login Successful!';

    document.body.appendChild(successDiv);

    // Auto hide after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

function focusNextOtpInput() {
    document.addEventListener('input', function(e) {
        if (e.target.classList.contains('otp-input')) {
            const nextInput = e.target.nextElementSibling;
            if (nextInput && nextInput.classList.contains('otp-input') && e.target.value !== '') {
                nextInput.focus();
            }
        }
    });
}



// --------------login ends-------------------

// --------------Make an Appointment starts-------------
// Get the container where we want to inject the modal
// Get the button and container
// Get the button and container
const appointmentBtn = document.getElementById('appointmentBtn');
const appointmentContainer = document.getElementById('appointmentContainer');

// Function to create and show modal content
function showAppointmentModal() {
  // Modal HTML content
  const modalHTML = `
    <div class="modal" id="appointmentModal">
      <div class="modal-content">
        <span class="close-button" id="closeBtn">&times;</span>
        <h2>Make an Appointment</h2>
        <form class="modal-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="tel" placeholder="Your Mobile Number" required pattern="[0-9]{10}" />
          <input type="date" placeholder="Preferred Date" required />
          <input type="time" placeholder="Preferred Time" required />
          <textarea placeholder="Message" required></textarea>
          <button type="submit" class="modal-btn">Submit</button>
        </form>
      </div>
    </div>
  `;

  // Insert the modal HTML into the container
  appointmentContainer.innerHTML = modalHTML;

  // Show the modal
  const modal = document.getElementById('appointmentModal');
  modal.style.display = 'block';

  // Close button functionality
  const closeButton = document.getElementById('closeBtn');
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none'; // Hide modal when close button is clicked
  });

  // Click outside the modal to close
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// Event listener for the button click
appointmentBtn.addEventListener('click', showAppointmentModal);


// --------------Make an appointment ends---------------

document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
  });

  // Other custom JS can go here
});
