tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#4A86E8',
                secondary: '#63B3ED',
                accent: '#213053',
                dark: '#121212',
                darkcard: '#1E1E1E',
                darklight: '#2A2A2A',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
        },
    },
}

// Initialize AOS
AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-in-out'
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('py-2', 'shadow-md');
        navbar.classList.remove('py-3');
    } else {
        navbar.classList.add('py-3');
        navbar.classList.remove('py-2', 'shadow-md');
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu if open
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// Typing Effect
const typingText = document.getElementById('typing-text');
const phrases = ['Python Developer', 'FastAPI Developer', 'Django', 'Backend Developer','Scrapping'];
let phraseIndex = 0;
let letterIndex = 0;
let currentPhrase = '';
let isDeleting = false;

function typeEffect() {
    if (!isDeleting && letterIndex <= phrases[phraseIndex].length) {
        currentPhrase = phrases[phraseIndex].substring(0, letterIndex);
        letterIndex++;
    } else if (isDeleting && letterIndex > 0) {
        currentPhrase = phrases[phraseIndex].substring(0, letterIndex);
        letterIndex--;
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    typingText.innerHTML = currentPhrase;
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();

// Animate project cards with fade-in effect on scroll
const projectCards = document.querySelectorAll('.project-card');

const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
};

const handleScroll = () => {
    projectCards.forEach((card, index) => {
        if (isInViewport(card)) {
            setTimeout(() => card.classList.add('fade-in'), 100 * index);
        }
    });
};

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// Project filtering
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active', 'bg-primary', 'text-white'));
        filterBtns.forEach(b => b.classList.add('bg-darklight', 'text-gray-300'));
        btn.classList.add('active', 'bg-primary', 'text-white');
        btn.classList.remove('bg-darklight', 'text-gray-300');

        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.classList.remove('fade-in');
                setTimeout(() => card.classList.add('fade-in'), 50);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Form validation
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }

    alert('Your message has been sent successfully!');
    contactForm.reset();
});