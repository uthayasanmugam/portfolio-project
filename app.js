"use strict";

/*==================================================
    PORTFOLIO SCRIPT
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==========================================
        ELEMENTS
    ==========================================*/

    const header = document.querySelector(".header");
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");
    const navLinks = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll("section");
    const scrollBtn = document.getElementById("scrollTopBtn");

    /*==========================================
        MOBILE MENU
    ==========================================*/

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            nav.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (nav.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            }
            else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    }

    /*==========================================
        CLOSE MOBILE MENU
    ==========================================*/

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            if (menuToggle) {

                const icon = menuToggle.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    });

    /*==========================================
        SMOOTH SCROLL
    ==========================================*/

    navLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

    /*==========================================
        TYPING EFFECT
    ==========================================*/

    const typingText = document.getElementById("typing-text");

    if (typingText) {

        const roles = [

            ".NET Fullstack Developer",

            "Software Engineer",

            "ASP.NET Core Developer",

            "C# Developer",

            "REST API Developer"

        ];

        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {

            const current = roles[roleIndex];

            if (!deleting) {

                typingText.textContent = current.substring(0, charIndex++);

                if (charIndex > current.length) {

                    deleting = true;

                    setTimeout(typeEffect, 1500);

                    return;

                }

            }
            else {

                typingText.textContent = current.substring(0, charIndex--);

                if (charIndex === 0) {

                    deleting = false;

                    roleIndex++;

                    if (roleIndex >= roles.length)
                        roleIndex = 0;

                }

            }

            setTimeout(typeEffect, deleting ? 40 : 90);

        }

        typeEffect();

    }

    /*==========================================
        EXPERIENCE
    ==========================================*/

    function calculateExperience(startYear, startMonth) {

        const start = new Date(startYear, startMonth - 1);
        const now = new Date();

        let years = now.getFullYear() - start.getFullYear();
        let months = now.getMonth() - start.getMonth();

        if (months < 0) {

            years--;
            months += 12;

        }

        let text = "";

        if (years > 0)
            text += `${years} Year${years > 1 ? "s" : ""}`;

        if (months > 0) {

            if (text !== "")
                text += " ";

            text += `${months} Month${months > 1 ? "s" : ""}`;

        }

        return text;

    }

    const exp = document.getElementById("litech-experience");

    if (exp) {

        exp.textContent =
            `May 2025 – Present · ${calculateExperience(2025,5)}`;

    }

    /*==========================================
        SCROLL EVENTS
    ==========================================*/

    function onScroll() {

        /* Sticky Header */

        if (window.scrollY > 80) {

            header.classList.add("sticky");

        }
        else {

            header.classList.remove("sticky");

        }

        /* Scroll Button */

        if (scrollBtn) {

            if (window.scrollY > 500) {

                scrollBtn.classList.add("showBtn");

            }
            else {

                scrollBtn.classList.remove("showBtn");

            }

        }

        /* Active Menu */

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 180;

            if (window.scrollY >= top) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", onScroll);

    onScroll();

});

/*==================================================
    PART 2
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==========================================
        PRELOADER
    ==========================================*/

    window.addEventListener("load", () => {

        const preloader = document.getElementById("preloader");

        if (preloader) {

            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";

            setTimeout(() => {

                preloader.remove();

            }, 500);

        }

    });

    /*==========================================
        SCROLL TO TOP
    ==========================================*/

    const scrollBtn = document.getElementById("scrollTopBtn");

    if (scrollBtn) {

        scrollBtn.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    /*==========================================
        COUNTER ANIMATION
    ==========================================*/

    const counters = document.querySelectorAll(".counter");

    const startCounter = () => {

        counters.forEach(counter => {

            const target = +counter.dataset.target;

            const updateCounter = () => {

                const current = +counter.innerText;

                const increment = target / 80;

                if (current < target) {

                    counter.innerText = Math.ceil(current + increment);

                    requestAnimationFrame(updateCounter);

                }
                else {

                    counter.innerText = target + "+";

                }

            };

            updateCounter();

        });

    };

    /*==========================================
        SCROLL REVEAL
    ==========================================*/

    const revealElements = document.querySelectorAll(

        ".hero-content, \
        .hero-image, \
        .about-content, \
        .about-stats, \
        .stat-card, \
        .skill-card, \
        .experience-item, \
        .education-item, \
        .project-card, \
        .contact-card"

    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                if (entry.target.classList.contains("stat-card")) {

                    startCounter();

                }

            }

        });

    }, {

        threshold: .15

    });

    revealElements.forEach(item => {

        item.classList.add("hidden");

        observer.observe(item);

    });

    /*==========================================
        FLOATING CARD DELAY
    ==========================================*/

    const floatingCards = document.querySelectorAll(".floating-card");

    floatingCards.forEach((card, index) => {

        card.style.animationDelay = `${index * .4}s`;

    });

    /*==========================================
        CUSTOM CURSOR
    ==========================================*/

    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    if (cursorDot && cursorOutline) {

        window.addEventListener("mousemove", e => {

            cursorDot.style.left = e.clientX + "px";
            cursorDot.style.top = e.clientY + "px";

            cursorOutline.animate({

                left: e.clientX + "px",

                top: e.clientY + "px"

            }, {

                duration: 250,

                fill: "forwards"

            });

        });

    }

    /*==========================================
        HERO IMAGE PARALLAX
    ==========================================*/

    const heroImage = document.querySelector(".hero-image");

    if (heroImage) {

        window.addEventListener("mousemove", e => {

            const x = (window.innerWidth / 2 - e.clientX) / 45;
            const y = (window.innerHeight / 2 - e.clientY) / 45;

            heroImage.style.transform = `translate(${x}px,${y}px)`;

        });

    }

    /*==========================================
        ACTIVE BUTTON RIPPLE
    ==========================================*/

    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.style.transform = "translateY(-4px) scale(1.03)";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });

    /*==========================================
        SKILL CARD TILT
    ==========================================*/

    document.querySelectorAll(".skill-card").forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = (rect.height / 2 - y) / 15;
            const rotateY = (x - rect.width / 2) / 15;

            card.style.transform =
                `perspective(700px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

    /*==========================================
        PROJECT CARD HOVER
    ==========================================*/

    document.querySelectorAll(".project-card").forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transition = ".35s";

        });

    });

    /*==========================================
        CONSOLE MESSAGE
    ==========================================*/

    console.log("%cPortfolio Loaded Successfully",

        "color:#3B82F6;font-size:18px;font-weight:bold;");

});
