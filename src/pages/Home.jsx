import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';


import { Component as SpotlightCursor } from '../components/ui/spotlight-cursor';

const Home = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [rating, setRating] = useState(0);
    const [stats, setStats] = useState({ projects: 0, satisfaction: 0, members: 0 });

    useEffect(() => {
        // Load approved testimonials
        const q = query(collection(db, "testimonials"), where("status", "==", "approved"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = [];
            snapshot.forEach(doc => items.push(doc.data()));
            setTestimonials(items);
        });

        // Intersection Observer for Scroll Reveals
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

        // Cursor Glow Effect
        const handleMouseMove = (e) => {
            const cards = document.querySelectorAll('.service-card, .team-card, .testimonial-card, .portfolio-card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) { // Check if navbar exists before trying to modify it
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }

            // Parallax Effect
            const bg = document.querySelector('.hero-background');
            if (bg) {
                const speed = 0.5;
                const yPos = -(window.scrollY * speed);
                bg.style.transform = `translateY(${yPos}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        // Stats Counter Animation (Triggered on Scroll)
        const statsSection = document.querySelector('.hero-stats');
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const targets = { projects: 150, satisfaction: 95, members: 50 };
                const duration = 2000;
                const startTime = Date.now();

                const animate = () => {
                    const now = Date.now();
                    const progress = Math.min((now - startTime) / duration, 1);
                    
                    setStats({
                        projects: Math.floor(targets.projects * progress),
                        satisfaction: Math.floor(targets.satisfaction * progress),
                        members: Math.floor(targets.members * progress)
                    });

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };
                requestAnimationFrame(animate);
                statsObserver.disconnect();
            }
        }, { threshold: 0.5 });

        if (statsSection) statsObserver.observe(statsSection);

        return () => {
            unsubscribe();
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            revealObserver.disconnect();
            statsObserver.disconnect();
        };
    }, []);

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.feedbackName.value;
        const text = e.target.feedbackText.value;
        
        if (rating === 0) {
            alert("Please select a rating!");
            return;
        }

        try {
            await addDoc(collection(db, "testimonials"), {
                name,
                text,
                rating,
                status: 'pending',
                timestamp: serverTimestamp()
            });
            alert("Thank you! Your feedback has been submitted for review.");
            e.target.reset();
            setRating(0);
        } catch (err) {
            console.error(err);
            alert("Error submitting feedback.");
        }
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section id="home" className="hero">
                <div className="hero-background"></div>
                <div className="container hero-container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            <span className="gradient-text">Transforming Ideas</span>
                            <br />Into Digital Reality
                        </h1>
                        <p className="hero-subtitle">We craft innovative technology solutions that empower businesses to thrive in the digital age. From concept to deployment, we're your trusted technology partner.</p>
                        <div className="hero-buttons">
                            <a href="/book-a-demo" className="btn btn-primary">Book a Project</a>
                            <a href="#portfolio" className="btn btn-secondary">View Our Work</a>
                        </div>
                        <div className="hero-stats">
                            <div className="stat-item">
                                <h3 className="stat-number">{stats.projects}+</h3>
                                <p className="stat-label">Projects Completed</p>
                            </div>
                            <div className="stat-item">
                                <h3 className="stat-number">{stats.satisfaction}%</h3>
                                <p className="stat-label">Client Satisfaction</p>
                            </div>
                            <div className="stat-item">
                                <h3 className="stat-number">{stats.members}+</h3>
                                <p className="stat-label">Team Members</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="scroll-indicator">
                    <div className="mouse"></div>
                </div>
            </section>


            {/* Desktop Only Spotlight Effect */}
            <SpotlightCursor className="hidden md:block" size={300} />

            {/* About Section */}
            <section id="about" className="about reveal">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">ABOUT US</span>
                        <h2 className="section-title">Building Tomorrow's Technology Today</h2>
                        <p className="section-description">At Rexplore Technologies, we combine cutting-edge technology with creative innovation to deliver solutions that drive real business results.</p>
                    </div>
                    <div className="about-content">
                        <div className="about-text">
                            <h3>Our Mission</h3>
                            <p>To empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage. We believe in creating sustainable digital ecosystems that evolve with your business needs.</p>
                            <div className="about-features">
                                <div className="feature-item reveal">
                                    <div className="feature-icon">🚀</div>
                                    <div className="feature-text">
                                        <h4>Innovation First</h4>
                                        <p>Cutting-edge solutions powered by the latest technologies</p>
                                    </div>
                                </div>
                                <div className="feature-item reveal">
                                    <div className="feature-icon">🤝</div>
                                    <div className="feature-text">
                                        <h4>Client Focused</h4>
                                        <p>Your success is our primary measure of achievement</p>
                                    </div>
                                </div>
                                <div className="feature-item reveal">
                                    <div className="feature-icon">💎</div>
                                    <div className="feature-text">
                                        <h4>Quality Driven</h4>
                                        <p>Excellence in every line of code and pixel of design</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="about-image reveal">
                            <div className="image-card">
                                <img src="/assets/illustration.png" alt="Rexplore Innovation" className="illustration-img" />
                                <div className="card-glow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="services reveal">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">SERVICES</span>
                        <h2 className="section-title">Our Services</h2>
                        <p className="section-description">Comprehensive technology solutions tailored to your business needs</p>
                    </div>
                    <div className="services-grid">
                        {[
                            { icon: '💻', title: 'Web Development', desc: 'Custom websites and web applications built with modern frameworks.' },
                            { icon: '📱', title: 'Mobile App Development', desc: 'Native and cross-platform apps for iOS and Android.' },
                            { icon: '🎨', title: 'UI/UX Design', desc: 'Intuitive interfaces that enhance user engagement.' }
                        ].map(svc => (
                            <div key={svc.title} className="service-card reveal">
                                <div className="service-icon">{svc.icon}</div>
                                <h3>{svc.title}</h3>
                                <p>{svc.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <section id="portfolio" className="portfolio reveal">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">OUR WORK</span>
                        <h2 className="section-title">Featured Projects</h2>
                        <p className="section-description">Discover how we've helped businesses transform through technology</p>
                    </div>
                    <div className="portfolio-grid">
                        {[
                            { 
                                title: 'E-Commerce Platform', 
                                desc: 'Full-stack web application with real-time inventory management',
                                tags: ['React', 'Node.js', 'MongoDB'], 
                                img: '/assets/project-webdev.png' 
                            },
                            { 
                                title: 'FinTech Mobile App', 
                                desc: 'Cross-platform mobile application for financial management',
                                tags: ['React Native', 'Firebase', 'AI/ML'], 
                                img: '/assets/project-mobile.png' 
                            }
                        ].map(proj => (
                            <div key={proj.title} className="portfolio-card reveal">
                                <div className="portfolio-image">
                                    <img src={proj.img} alt={proj.title} />
                                    <div className="portfolio-overlay">
                                        <h3>{proj.title}</h3>
                                        <p>{proj.desc}</p>
                                        <div className="portfolio-tags">
                                            {proj.tags.map(tag => (
                                                <span key={tag} className="tag-pill">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section id="team" className="team reveal">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">TEAM</span>
                        <h2 className="section-title">Meet Our Team</h2>
                        <p className="section-description">A passionate group of developers, designers, and strategists.</p>
                    </div>
                    <div className="team-grid">
                        {[
                            { name: 'Alex Rivera', role: 'CEO & Founder', img: '/assets/team-1.png' },
                            { name: 'Sarah Chen', role: 'Technical Director', img: '/assets/team-2.png' },
                            { name: 'Michael Ross', role: 'Lead Designer', img: '/assets/team-3.png' }
                        ].map(m => (
                            <div key={m.name} className="team-card reveal">
                                <div className="team-image">
                                    <img src={m.img} alt={m.name} />
                                    <div className="team-social">
                                        <a href="#"><i className="fab fa-linkedin"></i></a>
                                        <a href="#"><i className="fab fa-twitter"></i></a>
                                    </div>
                                </div>
                                <div className="team-info">
                                    <h3>{m.name}</h3>
                                    <p className="team-role">{m.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact reveal">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">GET IN TOUCH</span>
                        <h2 className="section-title">Ready to Start Your Project?</h2>
                    </div>
                    <div className="contact-content">
                        <div className="contact-info">
                            <div className="info-card reveal">
                                <div className="info-icon">📍</div>
                                <h3>Location</h3>
                                <p>Tech Hub South, Silicon Valley, CA</p>
                            </div>
                            <div className="info-card reveal">
                                <div className="info-icon">✉️</div>
                                <h3>Email</h3>
                                <p>contact@rexplore.tech</p>
                            </div>
                        </div>
                        <form className="contact-form reveal">
                            <div className="form-group">
                                <input type="text" placeholder="Your Name" required />
                            </div>
                            <div className="form-group">
                                <input type="email" placeholder="Email Address" required />
                            </div>
                            <div className="form-group">
                                <textarea placeholder="How can we help?" rows="4" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={(e) => { e.preventDefault(); alert('Message sent!'); }}>Send Message</button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="testimonials reveal">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">CLIENT REVIEWS</span>
                        <h2 className="section-title">What Our Clients Say</h2>
                    </div>
                    <div className="testimonials-grid">
                        {testimonials.map((t, i) => (
                            <div key={i} className="testimonial-card reveal">
                                <div className="testimonial-rating">
                                    {"⭐".repeat(t.rating)}
                                </div>
                                <p className="testimonial-text">"{t.text}"</p>
                                <div className="testimonial-author">
                                    <h4>{t.name}</h4>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Feedback Form */}
                    <div className="feedback-container reveal">
                        <div className="section-header">
                            <h3>Share Your Feedback</h3>
                        </div>
                        <form className="feedback-form" onSubmit={handleFeedbackSubmit}>
                             <div className="rating-input">
                                {[1, 2, 3, 4, 5].map(v => (
                                    <span 
                                        key={v} 
                                        className={`star-input ${rating >= v ? 'active' : ''}`}
                                        onClick={() => setRating(v)}
                                    >★</span>
                                ))}
                            </div>
                            <input type="text" name="feedbackName" placeholder="Your Name" required />
                            <textarea name="feedbackText" placeholder="Your Feedback" rows="3" required></textarea>
                            <button type="submit" className="btn btn-primary">Submit Feedback</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
