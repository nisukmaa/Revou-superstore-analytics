// slider
let list = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let dots = document.querySelectorAll('.slider .dots li');

let active = 0;

let refreshSlider = setInterval(() => { 
dots[active].click(); 
}, 5000); 

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

setInterval(() => {
  active = (active + 1) % items.length;
  reloadSlider();
}, 5000); 

//pop up
const messageIcon = document.getElementById('messageIcon');
const popupContainer = document.getElementById('popupContainer');
const closePopup = document.getElementById('closePopup');
const overlay = document.querySelector('.popup-overlay');

let popupOpened = false; // menandakan apakah pop-up sudah pernah dibuka

window.addEventListener('DOMContentLoaded', () => {
    // mengatur agar popup message tidak muncul saat pertama kali membuka webpage
    popupContainer.style.display = 'none';
    overlay.style.display = 'none';
});

messageIcon.addEventListener('click', () => {
    if (!popupOpened) {
        popupContainer.style.display = 'block';
        overlay.style.display = 'block'; 
        popupOpened = true;
    }
});

closePopup.addEventListener('click', () => {
    popupContainer.style.display = 'none';
    overlay.style.display = 'none'; 
});

// menutup pop-up box jika user mengklik di luar box area
overlay.addEventListener('click', () => {
    popupContainer.style.display = 'none';
    overlay.style.display = 'none';
});