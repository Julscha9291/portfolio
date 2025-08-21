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

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // nur einmal animieren
    }
  });
}, { threshold: 0.2 }); // 20% sichtbar

stackItems.forEach(item => observer.observe(item));
 


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


document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert den Standard-Formularversand

    var form = event.target;
    var formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        }
    })
    .then(response => response.json())  // Erwartet eine JSON-Antwort vom Server
    .then(data => {
        let successMessage, errorMessage;

        if (currentLanguage === 'en') {
            successMessage = 'Thank you for your message!';
            errorMessage = 'There was a problem sending your message.';
        } else if (currentLanguage === 'de') {
            successMessage = 'Danke für die Nachricht!';
            errorMessage = 'Es gab ein Problem beim Senden Ihrer Nachricht.';
        }

        if (data.status === 'success') {
            document.getElementById('response-message').textContent = successMessage;
            // Leeren der Formularfelder nach erfolgreichem Senden
            form.reset();
        } else {
            document.getElementById('response-message').textContent = errorMessage;
        }

        document.getElementById('response-container').style.display = 'flex';
    })
    .catch(error => {
        console.error('Fehler:', error);
        let errorMessage;

        if (currentLanguage === 'en') {
            errorMessage = 'There was a problem sending your message.';
        } else if (currentLanguage === 'de') {
            errorMessage = 'Es gab ein Problem beim Senden Ihrer Nachricht.';
        }

        document.getElementById('response-message').textContent = errorMessage;
        document.getElementById('response-container').style.display = 'flex';
    });
});

// Übersetzungen und Sprachwechsel-Funktion bleiben gleich
