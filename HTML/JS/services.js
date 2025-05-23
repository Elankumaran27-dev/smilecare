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

let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
  
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }

  function showNextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  
function goToSlide(index) {
    showSlide(index);
  }

setInterval(showNextSlide, 5000); // Change slide every 5 seconds

// -------------login starts------------------
 
  // Function to create the modal dynamically
// This function will create and display the OTP modal when the user clicks on the Login link.
// Event listener to trigger the modal
// Event listener to trigger the modal when "Login / Sign Up" button is clicked
// Event listener to trigger the modal when "Login / Sign Up" button is clicked
// Login button click panna modal create panna
// Login button click panna modal create panna
// Login button click panna first stage modal open
// Open Login Modal
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

// -----------Achievements counter-animation.js starts---------
// counter-animation.js

document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll('.number');
    const speed = 200; // lower = faster
  
    counters.forEach(counter => {
      const animate = () => {
        const value = +counter.getAttribute('data-number');
        const data = +counter.innerText;
  
        const increment = value / speed;
  
        if (data < value) {
          counter.innerText = Math.ceil(data + increment);
          setTimeout(animate, 20);
        } else {
          counter.innerText = value;
        }
      };
  
      animate();
    });
  });
  
  // -----------Achievements counter-animation.js ends---------

  // -------------Pricing card Section Starts------------

// pricingData.js

const pricingPlans = [
    {
      title: "Basic",
      price: "$49",
      period: "/Session",
      features: [
        "Routine Checkups",
        "Basic Cleaning",
        "Oral Health Consultation",
        "General Treatment",
      ]
    },
    {
      title: "Standard",
      price: "$99",
      period: "/Session",
      features: [
        "Advanced Cleaning",
        "Fillings Included",
        "Fluoride Treatment",
        "Free Dental X-rays",
      ]
    },
    {
      title: "Premium",
      price: "$149",
      period: "/Session",
      features: [
        "Whitening Services",
        "Root Canal Treatments",
        "Cosmetic Dentistry",
        "Priority Scheduling",
      ]
    },
    {
      title: "platinum",
      price: "$199",
      period: "/Session",
      features: [
        "4 Family Members Included",
        "Orthodontic Consultations",
        "Emergency Services",
        "Annual Health Checkup",
      ]
    }
  ];
  
  const containers = document.getElementById('pricingCards');
  
  pricingPlans.forEach(plan => {
    const card = document.createElement('div');
    card.classList.add('pricing-card');
    
    card.innerHTML = `
      <h3>${plan.title}</h3>
      <div class="price">${plan.price}</div>
      <div class="period">${plan.period}</div>
      <ul>
        ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
      <a href="#" class="pricing-btn">Choose Plan</a>
    `;
    
    containers.appendChild(card);
  });
  
  // -----------------pricing card section ends---------------

  document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 1000,      // animation duration in ms
    offset: 100,         // trigger offset from top
    once: true           // animation happens only once
  });
});