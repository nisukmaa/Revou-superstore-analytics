//toggle menu
const toggleButton = document.getElementById('toggle-button');
const navLists = document.getElementById('nav-menu-right');
const navLinks = document.querySelectorAll('.nav-section-menu');

toggleButton.addEventListener('click', () => {
    navLists.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLists.classList.remove('active');
    });
});

//pop up
document.addEventListener('DOMContentLoaded', () => {
    const messageIcon = document.getElementById('messageIcon');
    const popupContainer = document.getElementById('popupContainer');
    const closePopup = document.getElementById('closePopup');
    const overlay = document.querySelector('.popup-overlay');
    const messageForm = document.getElementById('messageForm');
    const alertBox = document.getElementById('alert');
    const alertMessage = document.getElementById('alerttext');
  
    // menyembunyikan pop-up
    popupContainer.style.display = 'none';
    overlay.style.display = 'none';
  
    // Mengatur toggle pop-up saat icon diklik oleh user
    messageIcon.addEventListener('click', () => {
        const isVisible = popupContainer.style.display === 'block';
        popupContainer.style.display = isVisible ? 'none' : 'block';
        overlay.style.display = isVisible ? 'none' : 'block';
    });
  
    // mengklik close button untuk menutup pop up
    closePopup.addEventListener('click', () => {
        popupContainer.style.display = 'none';
        overlay.style.display = 'none';
    });
  
    // menutup pop-up ketika mengklik diluar message form
    overlay.addEventListener('click', () => {
        popupContainer.style.display = 'none';
        overlay.style.display = 'none';
    });
  
    // validasi form submission
    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();
  
        const nameInput = this.elements['name'];
        const emailInput = this.elements['email'];
        const messageInput = this.elements['message'];
  
        // Validate form inputs
        if (nameInput.value.trim() === '') {
            showAlert('Name is required!');
            return;
        }
        if (emailInput.value.trim() === '') {
            showAlert('Email is required!');
            return;
        }
        if (messageInput.value.trim() === '') {
            showAlert('Message is required!');
            return;
        }
  
        this.reset();
        showAlert('Thank you for the message!');
    });
  
    // Show alert message
    function showAlert(message) {
        alertBox.style.display = 'block';
        alertMessage.innerHTML = '<span class="material-symbols-outlined">error</span> ' + message;
        setTimeout(() => {
            alertBox.style.display = 'none';
        }, 1500);
    }
  });  

  // mengtap box-member
function toggleAnimation(element) {
    element.classList.toggle('animate');

    var boxes = document.querySelectorAll('.box-member');
    boxes.forEach(function(box) {
        if (box !== element) {
        box.classList.remove('animate');
        }
    });
  }

  document.addEventListener('click', function(event) {
    var isClickInside = event.target.closest('.box-member');
    if (!isClickInside) {
        var boxes = document.querySelectorAll('.box-member');
        boxes.forEach(function(box) {
            box.classList.remove('animate');
        });
    }
    });

//menyembunyikan message icon yang berada di footer area
const messageIcon = document.getElementById('messageIcon');
const footerSide = document.querySelector('.footer-side');

// Function to handle visibility of messageIcon based on scroll
function handleScroll() {
    if (isMessageIconInFooter()) {
        messageIcon.style.visibility = 'hidden';
    } else {
        messageIcon.style.visibility = 'visible';
    }
}

// Function to check if messageIcon is within footer-side
function isMessageIconInFooter() {
    const iconRect = messageIcon.getBoundingClientRect();
    const footerRect = footerSide.getBoundingClientRect();

    // Check if messageIcon's bottom is less than footer-side's top
    return iconRect.bottom > footerRect.top && iconRect.top < footerRect.bottom;
}

// Event listener for scroll
window.addEventListener('scroll', handleScroll);

// Initial check on page load
handleScroll();
