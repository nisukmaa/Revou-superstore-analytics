 // Toggle menu
 const toggleButton = document.getElementById('toggle-button');
 const navLists = document.getElementById('nav-menu-right');

 toggleButton.addEventListener('click', () => {
     navLists.classList.toggle('active');
 });

 // Slider
 let list = document.querySelector('.slider .list');
 let items = document.querySelectorAll('.slider .list .item--slider');
 let dots = document.querySelectorAll('.slider .dots li');
 let prev = document.getElementById('prev');
 let next = document.getElementById('next');

 let active = 0;
 let lengthItems = items.length + 1;

 next.onclick = function(){
    if (active + 1 > lengthItems){
        active =0;
    }else{
        active = active + 1;
    }
    reloadSlider();
 }

 prev.onclick = function(){
    if (active + 1 < 0){
        active = lengthItems;
    }else {
        active = active - 1;
    }
    reloadSlider();
 }

 function reloadSlider() {
     let checkLeft = items[active].offsetLeft;
     list.style.left = -checkLeft + 'px';

     let lastActiveDot = document.querySelector('.slider .dots li.active');
     if (lastActiveDot) lastActiveDot.classList.remove('active');
     dots[active].classList.add('active');
 }

 dots.forEach((li, key) => {
     li.addEventListener('click', function() {
         active = key;
         reloadSlider();
     });
 });
 
// Handle touch events for mobile devices
list.addEventListener('scroll', () => {
  let scrollLeft = list.scrollLeft;
  items.forEach((item, index) => {
      if (scrollLeft >= item.offsetLeft && scrollLeft < item.offsetLeft + item.offsetWidth) {
          active = index;
          reloadSlider();
      }
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

//tap tool tip
document.addEventListener('DOMContentLoaded', () => {
  const tooltips = document.querySelectorAll('.tooltip');

  tooltips.forEach(tooltip => {
      tooltip.addEventListener('click', () => {
          tooltip.classList.toggle('active');
      });

      document.addEventListener('click', event => {
          if (!tooltip.contains(event.target)) {
              tooltip.classList.remove('active');
          }
      });
  });
});

// pop-up in analysis area
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');
    const closeButton = document.querySelectorAll('.close-btn');
    const infoBoxes = {
      infoicon1: document.getElementById('infoBox1'),
      infoicon2: document.getElementById('infoBox2'),
      infoicon3: document.getElementById('infoBox3'),
      infoicon4: document.getElementById('infoBox4'),
      infoicon5: document.getElementById('infoBox5'),
      infoicon6: document.getElementById('infoBox6')
    };
  
    // Sembunyikan semua pop-up pada awalnya
    Object.values(infoBoxes).forEach(infoBox => {
      infoBox.style.display = 'none';
    });
    overlay.style.display = 'none';
  
    // Fungsi untuk toggle pop-up
    function togglePopup(infoIconId) {
      const infoBox = infoBoxes[infoIconId];
      const isVisible = infoBox.style.display === 'block';
      
      // Sembunyikan semua pop-up
      Object.values(infoBoxes).forEach(box => {
        box.style.display = 'none';
      });
  
      // Tampilkan atau sembunyikan pop-up yang diklik
      infoBox.style.display = isVisible ? 'none' : 'block';
      overlay.style.display = isVisible ? 'none' : 'block';
    }
  
    // Pasang event listener untuk ikon info
    document.getElementById('infoicon1').addEventListener('click', () => togglePopup('infoicon1'));
    document.getElementById('infoicon2').addEventListener('click', () => togglePopup('infoicon2'));
    document.getElementById('infoicon3').addEventListener('click', () => togglePopup('infoicon3'));
    document.getElementById('infoicon4').addEventListener('click', () => togglePopup('infoicon4'));
    document.getElementById('infoicon5').addEventListener('click', () => togglePopup('infoicon5'));
    document.getElementById('infoicon6').addEventListener('click', () => togglePopup('infoicon6'));
  
    // Sembunyikan pop-up saat mengklik di luar form pesan
    overlay.addEventListener('click', () => {
      Object.values(infoBoxes).forEach(infoBox => {
        infoBox.style.display = 'none';
      });
      overlay.style.display = 'none';
    });

    // Sembunyikan pop-up saat mengklik close button
    closeButton.forEach(button => {
        button.addEventListener('click', (event) => {
            const infoBox = event.target.closest('.info-box');
            infoBox.style.display = 'none';
            overlay.style.display = 'none';
        });
    });
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