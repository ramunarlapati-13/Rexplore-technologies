// ================================
// NAVIGATION
// ================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navigation on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ================================
// SMOOTH SCROLLING
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// ANIMATED COUNTER
// ================================

const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 95 ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 95 ? '%' : '+');
        }
    }, 16);
};

// Intersection Observer for counters
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            observer.unobserve(entry.target);
        }
    });
};

const counterObserver = new IntersectionObserver(observerCallback, observerOptions);

document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// ================================
// SCROLL ANIMATIONS
// ================================

const scrollElements = document.querySelectorAll('.service-card, .portfolio-item, .team-card, .testimonial-card, .feature-item');

const elementInView = (el, offset = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
    );
};

const displayScrollElement = (element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    if (elementInView(element)) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el)) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

// Initialize scroll animations
scrollElements.forEach(displayScrollElement);

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// ================================
// CONTACT FORM
// ================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Disable submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showFormMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }, 1500);

    // In production, replace the setTimeout above with actual API call:
    /*
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            showFormMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        showFormMessage('Oops! Something went wrong. Please try again later.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
    */
});

const showFormMessage = (message, type) => {
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
    formMessage.style.display = 'block';
};

// ================================
// NEWSLETTER FORM
// ================================

const newsletterForm = document.getElementById('newsletterForm');

newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value;
    const submitBtn = newsletterForm.querySelector('button');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Disable submit button
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '✓';
    submitBtn.disabled = true;

    // Simulate subscription (replace with actual API call)
    setTimeout(() => {
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1000);

    // In production, replace with actual API call:
    /*
    try {
        const response = await fetch('/api/newsletter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        
        if (response.ok) {
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        } else {
            throw new Error('Failed to subscribe');
        }
    } catch (error) {
        alert('Oops! Something went wrong. Please try again later.');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
    */
});

// ================================
// PARALLAX EFFECT
// ================================

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ================================
// CURSOR GLOW EFFECT (Optional)
// ================================

const createCursorGlow = () => {
    const cards = document.querySelectorAll('.service-card, .team-card, .testimonial-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
};

createCursorGlow();

// ================================
// LAZY LOADING IMAGES
// ================================

const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ================================
// TYPING EFFECT (Optional Enhancement)
// ================================

const typingEffect = (element, texts, speed = 100) => {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
        const currentText = texts[textIndex];

        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = speed;

        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(type, typeSpeed);
    };

    type();
};

// Uncomment to enable typing effect on hero subtitle
// const heroSubtitle = document.querySelector('.hero-subtitle');
// if (heroSubtitle) {
//     const texts = [
//         'We craft innovative technology solutions that empower businesses.',
//         'Your trusted partner in digital transformation.',
//         'From concept to deployment, we deliver excellence.'
//     ];
//     typingEffect(heroSubtitle, texts);
// }

// ================================
// PERFORMANCE OPTIMIZATION
// ================================

// Debounce function for scroll events
const debounce = (func, wait = 20, immediate = true) => {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    handleScrollAnimation();
}));

// ================================
// CONSOLE MESSAGE
// ================================

console.log('%c🚀 Rexplore Technologies', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%cBuilt with ❤️ and cutting-edge technology', 'color: #8b5cf6; font-size: 14px;');
console.log('%cInterested in joining our team? Visit our careers page!', 'color: #10b981; font-size: 12px;');

// ================================
// FIREBASE & TESTIMONIALS
// ================================
import { initializeApp, getApp, getApps } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, orderBy, limit, onSnapshot, serverTimestamp, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 1. Fetch Config Securely from Serverless API (with Local Fallback)
let firebaseConfig;
try {
    const configRes = await fetch('/api/config');
    if (!configRes.ok) throw new Error("API not available");
    firebaseConfig = await configRes.json();
} catch (err) {
    // Fallback for local development using npx serve or simple static server
    firebaseConfig = {
        apiKey: "AIzaSyBFL1bBugLHZ7VI9bqncqnYD_HqDkPrrC8",
        authDomain: "rexploretech.firebaseapp.com",
        projectId: "rexploretech",
        storageBucket: "rexploretech.firebasestorage.app",
        messagingSenderId: "502051542015",
        appId: "1:502051542015:web:a88b9d23b7be2b5aa04dca"
    };
    console.log("Using local fallback config");
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Dynamic Testimonials Loading
const testimonialsGrid = document.getElementById('testimonialsGrid');
if (testimonialsGrid) {
    // Only show "approved" testimonials on the main site
    const q = query(
        collection(db, "testimonials"), 
        where("status", "==", "approved"),
        limit(6)
    );
    onSnapshot(q, (snapshot) => {
        // Keep some static ones if empty, but clear for real data
        if (!snapshot.empty) {
            testimonialsGrid.innerHTML = '';
            snapshot.forEach((doc) => {
                const data = doc.data();
                const stars = '⭐'.repeat(data.rating || 5);
                const card = document.createElement('div');
                card.className = 'testimonial-card';
                card.innerHTML = `
                    <div class="testimonial-rating">${stars}</div>
                    <p class="testimonial-text">"${data.text}"</p>
                    <div class="testimonial-author">
                        <div class="author-info">
                            <h4>${data.name}</h4>
                            <p>Client</p>
                        </div>
                    </div>
                `;
                testimonialsGrid.appendChild(card);
            });
        }
    }, (error) => {
        console.error("Testimonials load error:", error);
    });
}

// Feedback Form Logic
const feedbackForm = document.getElementById('feedbackForm');
const ratingStars = document.querySelectorAll('.star-input');
let currentRating = 5;

ratingStars.forEach(star => {
    star.onclick = () => {
        currentRating = star.dataset.value;
        ratingStars.forEach(s => {
            s.style.color = s.dataset.value <= currentRating ? '#f59e0b' : '#475569';
        });
    };
});

// Modal Control
window.showModal = (title, message) => {
    const modal = document.getElementById('successModal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
};

window.closeModal = () => {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
};

if (feedbackForm) {
    feedbackForm.onsubmit = async (e) => {
        e.preventDefault();
        const btn = feedbackForm.querySelector('button');
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Submitting...';

        try {
            await addDoc(collection(db, "testimonials"), {
                name: document.getElementById('feedbackName').value,
                text: document.getElementById('feedbackText').value,
                rating: parseInt(currentRating),
                status: 'pending', // Default to pending until admin approves
                timestamp: serverTimestamp()
            });
            feedbackForm.reset();
            showModal('Thank You!', 'Your feedback has been received and added to our wall of love.');
        } catch (err) {
            console.error(err);
            if (err.message.includes('permission-denied')) {
                alert('Database Access Error: Your Firestore Security Rules may not be deployed. Please run "firebase deploy --only firestore:rules" in your terminal.');
            } else {
                alert('Submission failed: ' + err.message);
            }
        } finally {
            btn.disabled = false;
            btn.textContent = originalText;
        }
    };
}

// ================================
// FORM TRACKING LOGIC
// ================================

const trackModal = document.getElementById('trackModal');
const trackBtn = document.getElementById('trackBtn');
const trackingIdInput = document.getElementById('trackingIdInput');
const trackingResult = document.getElementById('trackingResult');
const trackError = document.getElementById('trackError');
const openTrackBtn = document.getElementById('openTrackModal');

const roadmapSteps = ['received', 'reviewed', 'in-progress', 'finalizing', 'live'];

function updateRoadmap(status) {
    const steps = document.querySelectorAll('.roadmap-step');
    const progressBar = document.getElementById('roadmapProgress');
    const liveLink = document.getElementById('liveStatusLink');
    
    // Map legacy 'pending' to 'received'
    if (status === 'pending') status = 'received';
    
    if (!status || status === 'rejected') {
        progressBar.style.width = '0%';
        steps.forEach(s => s.classList.remove('active', 'completed'));
        return;
    }

    const currentIndex = roadmapSteps.indexOf(status.toLowerCase());
    const progressWidth = (currentIndex / (roadmapSteps.length - 1)) * 100;
    
    progressBar.style.width = `${progressWidth}%`;
    
    steps.forEach((step, index) => {
        const stepName = step.dataset.step;
        step.classList.remove('active', 'completed');
        
        if (index < currentIndex) {
            step.classList.add('completed');
        } else if (index === currentIndex) {
            step.classList.add('active');
        }
    });

    if (status === 'live' && liveLink) {
        liveLink.style.display = 'block';
    } else if (liveLink) {
        liveLink.style.display = 'none';
    }
}

let activeTrackListener = null;

window.closeTrackModal = () => {
    trackModal.classList.remove('active');
    setTimeout(() => {
        trackModal.style.display = 'none';
        if (activeTrackListener) activeTrackListener(); // Unsubscribe
    }, 300);
};

if (openTrackBtn) {
    openTrackBtn.onclick = () => {
        trackModal.style.display = 'flex';
        setTimeout(() => trackModal.classList.add('active'), 10);
        trackingResult.style.display = 'none';
        trackError.style.display = 'none';
        trackingIdInput.value = '';
    };
}

if (trackBtn) {
    trackBtn.onclick = async () => {
        const inputId = trackingIdInput.value.trim();
        if (!inputId) return;

        const originalText = trackBtn.textContent;
        trackBtn.disabled = true;
        trackBtn.textContent = 'Searching...';
        trackError.style.display = 'none';
        trackingResult.style.display = 'none';

        if (activeTrackListener) activeTrackListener();

        try {
            // Check for the ID exactly as it is (case-sensitive)
            const docRef = doc(db, "demo_requests", inputId);
            let docSnap = await getDoc(docRef);

            // If not found, try the Uppercase version (for new 8-char IDs)
            if (!docSnap.exists() && inputId.toUpperCase() !== inputId) {
                const upRef = doc(db, "demo_requests", inputId.toUpperCase());
                docSnap = await getDoc(upRef);
            }

            if (docSnap.exists()) {
                const activeDocRef = docSnap.ref;
                activeTrackListener = onSnapshot(activeDocRef, (snap) => {
                    if (snap.exists()) renderTrackingData(snap.data());
                }, (err) => {
                    console.error("Listener error:", err);
                    if (err.code === 'permission-denied') {
                        showError("Database access denied. Please update your Firestore Rules.");
                    }
                });
                renderTrackingData(docSnap.data());
            } else {
                showError("Invalid Tracking ID. Please double-check capital/small letters.");
            }
        } catch (err) {
            console.error("Tracking error:", err);
            if (err.code === 'permission-denied') {
                showError("Permission Denied! Please update your Firestore Rules to allow public tracking.");
            } else {
                showError("An error occurred while searching. Please try again.");
            }
        } finally {
            trackBtn.disabled = false;
            trackBtn.textContent = originalText;
        }

        function showError(msg) {
            trackError.innerHTML = msg || "Invalid ID. Please re-enter correctly.";
            trackError.style.display = 'block';
            trackingResult.style.display = 'none';
        }

        function renderTrackingData(data) {
            trackingResult.style.display = 'block';
            trackError.style.display = 'none';
            
            document.getElementById('trackName').textContent = data.name || 'N/A';
            document.getElementById('trackService').textContent = data.interest || 'N/A';
            document.getElementById('trackTimeline').textContent = data.timeline || 'N/A';
            
            const timestamp = data.timestamp?.toDate();
            document.getElementById('trackTime').textContent = timestamp ? timestamp.toLocaleString() : 'Recent';
            
            // Map 'pending' to 'received' for old records
            const status = (data.status === 'pending') ? 'received' : (data.status || 'received');
            updateRoadmap(status);
        }
    };
}

// ================================
// INITIALIZE
// ================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Website loaded successfully!');
    handleScrollAnimation();
});
