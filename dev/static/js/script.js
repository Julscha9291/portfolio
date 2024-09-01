document.addEventListener("DOMContentLoaded", function() {
    // Überprüfe, ob die URL bereits die Kontakt-Sektion anzeigt
    if (window.location.hash === '#contact') {
        const responseContainer = document.getElementById('response-container');
        const responseMessage = document.getElementById('response-message');
        
        // Hier kannst du die Nachricht aus der Session oder von einem Template-Tag holen
        const message = "{{ message }}"; // Diese Zeile wird durch Django ersetzt

        if (message) {
            responseMessage.textContent = message;
            responseContainer.style.display = 'block';
        }
    }
});



document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("message-popup");
    if (popup && popup.innerText.trim().length > 0) {
        alert(popup.innerText);
    }
});



document.getElementById("complete-cv-button").onclick = function() {
    window.open("/static/CV_Julian_Schaepermeier.pdf", "_blank");
};

document.getElementById("current-year").textContent = new Date().getFullYear();


const stackItems = document.querySelectorAll('.stack-item');

const toggleStackItemsVisibility = () => {
stackItems.forEach((item) => {
const itemOffset = item.getBoundingClientRect().top;
const windowHeight = window.innerHeight;
if (itemOffset < windowHeight * 0.8) {
    item.classList.add('visible');
}
});
};

window.addEventListener('scroll', toggleStackItemsVisibility);
toggleStackItemsVisibility();
 


const timelineSection = document.getElementById('timeline');
const timelineItems = document.querySelectorAll('#timeline .timeline-content');

const isInViewport = (element) => {
const rect = element.getBoundingClientRect();
return (
rect.top >= 0 &&
rect.left >= 0 &&
rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
rect.right <= (window.innerWidth || document.documentElement.clientWidth)
);
};

const activateTimelineItems = () => {
timelineItems.forEach((item, index) => {
if (isInViewport(item) && !item.classList.contains('visible')) {
    setTimeout(() => {
        item.classList.add('visible');
    }, index * 200); 
}
});
};

window.addEventListener('scroll', activateTimelineItems);
activateTimelineItems();




document.addEventListener('DOMContentLoaded', function() {
var menuBtn = document.querySelector('.menu-btn');
var mobileMenu = document.querySelector('.mobile-menu');
var closeBtn = document.querySelector('#close-btn'); 

menuBtn.addEventListener('click', function(e) {   
    e.preventDefault(); // Verhindere das Standardverhalten des Links
    mobileMenu.classList.toggle('open'); 
});

closeBtn.addEventListener('click', function() {
    mobileMenu.classList.remove('open');
});

document.addEventListener('click', function(event) {
    if (!mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
        mobileMenu.classList.remove('open');
    }
});

var menuLinks = document.querySelectorAll('.mobile-menu a');
menuLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
    });
});
});
