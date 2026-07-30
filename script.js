// =========================================
// LOADER
// =========================================

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    if (!loader) return;

    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

        setTimeout(() => {
            loader.remove();
        }, 500);

    }, 1200);
});


// =========================================
// FADE IN ANIMATION
// =========================================

const animatedElements = document.querySelectorAll(
    ".content, .invite, .card, .ganpati"
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");
            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.2
});

animatedElements.forEach((element) => {

    element.classList.add("hidden");
    observer.observe(element);

});


// =========================================
// RIPPLE BUTTON EFFECT
// =========================================

const buttons = document.querySelectorAll(".btn, .map-btn");

buttons.forEach((button) => {

    button.addEventListener("click", (e) => {

        const rect = button.getBoundingClientRect();

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;

        button.appendChild(ripple);

        ripple.addEventListener("animationend", () => {
            ripple.remove();
        });

    });

});


// =========================================
// SMOOTH SCROLL TO SECTION
// =========================================

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (e) => {

        const target = document.querySelector(
            link.getAttribute("href")
        );

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


// =========================================
// REVEAL ELEMENTS ON PAGE LOAD
// =========================================

window.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("loaded");

});


// =========================================
// CONSOLE MESSAGE
// =========================================

console.log(
    "%c🙏 Ganpati Bappa Morya 🙏",
    "color:#d4af37;font-size:22px;font-weight:bold;"
);

// =========================================
// SCROLL PROGRESS BAR
// =========================================

const progressBar = document.querySelector(".progress");

function updateProgressBar() {

    if (!progressBar) return;

    const scrollTop = window.scrollY;

    const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const percent = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = `${percent}%`;

}


// =========================================
// OPTIMIZED SCROLL
// =========================================

let ticking = false;

window.addEventListener("scroll", () => {

    if (!ticking) {

        window.requestAnimationFrame(() => {

            updateProgressBar();

            ticking = false;

        });

        ticking = true;

    }

});


// =========================================
// FLOATING SPARKLES
// =========================================

function createSparkle() {

    const sparkle = document.createElement("span");

    sparkle.className = "sparkle";

    sparkle.style.left = `${Math.random() * window.innerWidth}px`;

    const size = Math.random() * 6 + 4;

    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;

    sparkle.style.animationDuration =
        `${Math.random() * 2 + 3}s`;

    sparkle.style.opacity =
        (Math.random() * 0.6 + 0.3).toFixed(2);

    document.body.appendChild(sparkle);

    sparkle.addEventListener("animationend", () => {

        sparkle.remove();

    });

}


// Create sparkle every 700ms
setInterval(createSparkle, 700);


// =========================================
// FLOATING GANPATI IMAGE
// =========================================

const ganpatiImage = document.querySelector(".ganpati img");

if (ganpatiImage) {

    ganpatiImage.animate(

        [

            {
                transform: "translateY(0px)"
            },

            {
                transform: "translateY(-15px)"
            },

            {
                transform: "translateY(0px)"
            }

        ],

        {

            duration: 3500,
            iterations: Infinity,
            easing: "ease-in-out"

        }

    );

}


// =========================================
// PARALLAX DECORATION
// =========================================

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    if (!hero) return;

    const offset = window.scrollY * 0.15;

    hero.style.backgroundPositionY = `${offset}px`;

});


// =========================================
// INITIALIZE
// =========================================

updateProgressBar();

// =========================================
// BUTTON SHINE EFFECT
// =========================================

const shineButtons = document.querySelectorAll(".btn");

function shineButton(button) {

    button.classList.add("shine");

    setTimeout(() => {

        button.classList.remove("shine");

    }, 1000);

}

setInterval(() => {

    shineButtons.forEach(shineButton);

}, 4500);


// =========================================
// WELCOME HEADING ANIMATION
// =========================================

const heading = document.querySelector(".content h1");

function animateHeading() {

    if (!heading) return;

    heading.animate(

        [
            {
                opacity: 0,
                transform: "translateY(40px)",
                letterSpacing: "0px"
            },

            {
                opacity: 1,
                transform: "translateY(0)",
                letterSpacing: "3px"
            }

        ],

        {
            duration: 1200,
            easing: "ease-out",
            fill: "forwards"
        }

    );

}

window.addEventListener("load", () => {

    setTimeout(animateHeading, 1300);

});


// =========================================
// DISABLE ANIMATIONS WHEN TAB IS HIDDEN
// =========================================

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        document.documentElement.style.scrollBehavior = "auto";

    } else {

        document.documentElement.style.scrollBehavior = "smooth";

    }

});


// =========================================
// RESIZE HANDLER
// =========================================

window.addEventListener("resize", () => {

    updateProgressBar();

});


// =========================================
// BACK TO TOP (OPTIONAL)
// =========================================

const topButton = document.querySelector(".top-btn");

if (topButton) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            topButton.classList.add("show");

        } else {

            topButton.classList.remove("show");

        }

    });

    topButton.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}


// =========================================
// PREVENT IMAGE DRAGGING
// =========================================

document.querySelectorAll("img").forEach((img) => {

    img.setAttribute("draggable", "false");

});


// =========================================
// PRELOAD IMAGES
// =========================================

window.addEventListener("load", () => {

    document.querySelectorAll("img").forEach((img) => {

        if (img.complete) return;

        img.loading = "eager";

    });

});


// =========================================
// FINAL INITIALIZATION
// =========================================

console.clear();

console.log(
    "%c🙏 Ganpati Bappa Morya 🙏",
    "color:#d4af37;font-size:24px;font-weight:bold;"
);

console.log(
    "%cWebsite initialized successfully ✔",
    "color:#4CAF50;font-size:14px;"
);