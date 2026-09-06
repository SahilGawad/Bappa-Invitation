/**
 * =========================================================
 * GANPATI INVITATION — INTERACTIVE SCRIPTS
 * Traditional Sanctum Experience • Audio • Particles • RSVP
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /* =====================================================
       ELEMENT SELECTORS
    ===================================================== */
    const openingScreen = document.getElementById("openingScreen");
    const touchButton   = document.querySelector(".touch-button");
    const music         = document.getElementById("bgMusic");
    const musicBtn      = document.getElementById("musicBtn");
    const contactPopup  = document.getElementById("contactPopup");
    const bells         = document.querySelectorAll(".bell");

    /* State Flags */
    let opened = false;
    let sparkleInterval = null;
    let petalInterval   = null;

    /* Check Accessibility (Reduced Motion) */
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* =====================================================
       1. DOOR OPENING CEREMONY
    ===================================================== */
    function openDoors() {
        if (opened || !openingScreen) return;
        opened = true;

        // Mobile Haptic Feedback (Gentle double pulse)
        if ("vibrate" in navigator) {
            try {
                navigator.vibrate([40, 70, 50]);
            } catch (e) {
                // Ignore if permission denied
            }
        }

        // Golden Sparkler Burst
        if (!prefersReducedMotion) {
            createBurst();
        }

        // Start Divine Background Music (with Gentle Volume Fade-In)
        playMusicWithFade();

        // Trigger CSS Door Swing Animation
        openingScreen.classList.add("opening");

        // Dismiss the opening screen once doors have parted
        setTimeout(function () {
            openingScreen.classList.add("hide");

            // Start ambient floating petals & sparkles
            if (!prefersReducedMotion) {
                startBackgroundEffects();
            }
        }, 1600);
    }

    // Trigger door opening via touch medallion or anywhere on opening screen
    if (openingScreen) {
        openingScreen.addEventListener("click", openDoors);
        openingScreen.addEventListener("touchstart", openDoors, { passive: true });
    }

    /* =====================================================
       2. SACRED MUSIC CONTROLS (WITH SMOOTH FADE-IN)
    ===================================================== */
    function playMusicWithFade() {
        if (!music) return;

        music.volume = 0;
        const playPromise = music.play();

        if (playPromise !== undefined) {
            playPromise
                .then(function () {
                    updateMusicButtonState(true);
                    
                    // Smoothly fade volume up to 0.4 over 1.2 seconds
                    let currentVol = 0;
                    const fadeTimer = setInterval(function () {
                        currentVol += 0.05;
                        if (currentVol >= 0.4) {
                            music.volume = 0.4;
                            clearInterval(fadeTimer);
                        } else {
                            music.volume = currentVol;
                        }
                    }, 120);
                })
                .catch(function () {
                    // Autoplay prevented by browser policy
                    updateMusicButtonState(false);
                });
        }
    }

    function toggleMusic(event) {
        if (event) event.stopPropagation();
        if (!music) return;

        if (music.paused) {
            music.play().then(function () {
                updateMusicButtonState(true);
            });
        } else {
            music.pause();
            updateMusicButtonState(false);
        }
    }

    function updateMusicButtonState(isPlaying) {
        if (!musicBtn) return;
        if (isPlaying) {
            musicBtn.innerHTML = "🪕";
            musicBtn.classList.add("playing");
            musicBtn.setAttribute("aria-label", "संगीत थांबवा");
            musicBtn.title = "संगीत थांबवा";
        } else {
            musicBtn.innerHTML = "🔇";
            musicBtn.classList.remove("playing");
            musicBtn.setAttribute("aria-label", "संगीत सुरू करा");
            musicBtn.title = "संगीत सुरू करा";
        }
    }

    if (musicBtn) {
        musicBtn.addEventListener("click", toggleMusic);
    }

    /* =====================================================
       3. AMBIENT PARTICLES (BURST, SPARKLES, PETALS)
    ===================================================== */

    // Golden Sparkler Burst from Center
    function createBurst() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const particleCount = window.innerWidth < 600 ? 50 : 80;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("span");
            particle.className = "burst";
            particle.style.left = centerX + "px";
            particle.style.top = centerY + "px";

            // Radial distribution with random velocity
            const angle = Math.random() * Math.PI * 2;
            const distance = 70 + Math.random() * 260;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            // Random ember tint
            const isOrange = Math.random() > 0.65;
            if (isOrange) {
                particle.style.background = "#ff9933";
                particle.style.boxShadow = "0 0 10px #ff9933, 0 0 20px #e8630a";
            }

            particle.style.setProperty("--x", x + "px");
            particle.style.setProperty("--y", y + "px");

            document.body.appendChild(particle);

            setTimeout(function () {
                particle.remove();
            }, 1000);
        }
    }

    // Gentle Golden Sparkles rising up
    function createSparkle() {
        // Prevent DOM clogging: cap active sparkles
        if (document.querySelectorAll(".floating-sparkle").length > 25) return;

        const sparkle = document.createElement("span");
        sparkle.className = "floating-sparkle";
        sparkle.style.left = Math.random() * 98 + "vw";
        sparkle.style.top = 100 + Math.random() * 5 + "vh";
        sparkle.style.animationDuration = (6 + Math.random() * 6).toFixed(1) + "s";

        document.body.appendChild(sparkle);

        setTimeout(function () {
            sparkle.remove();
        }, 12000);
    }

    // Sacred Marigold & Hibiscus Flower Petals
    function createPetal() {
        // Cap active petals
        if (document.querySelectorAll(".petal").length > 15) return;

        const petal = document.createElement("span");
        petal.className = "petal";

        // Auspicious flowers
        const flowers = ["🌺", "🌼", "🏵️", "🌸"];
        petal.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];

        petal.style.left = Math.random() * 95 + "vw";
        petal.style.fontSize = (14 + Math.random() * 12) + "px";
        petal.style.animationDuration = (8 + Math.random() * 5).toFixed(1) + "s";

        document.body.appendChild(petal);

        setTimeout(function () {
            petal.remove();
        }, 14000);
    }

    // Start Loops
    function startBackgroundEffects() {
        if (sparkleInterval || petalInterval) return;

        // Sparkle every 850ms
        sparkleInterval = setInterval(createSparkle, 850);

        // Petal every 4s
        petalInterval = setInterval(createPetal, 4000);
    }

    function stopBackgroundEffects() {
        if (sparkleInterval) clearInterval(sparkleInterval);
        if (petalInterval) clearInterval(petalInterval);
        sparkleInterval = null;
        petalInterval = null;
    }

    // Battery & Performance Guard: Pause particles when user leaves tab
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            stopBackgroundEffects();
        } else if (opened && !prefersReducedMotion) {
            startBackgroundEffects();
        }
    });

    /* =====================================================
       4. INTERACTIVE TEMPLE BELLS
    ===================================================== */
    bells.forEach(function (bell) {
        bell.style.pointerEvents = "auto";
        bell.style.cursor = "pointer";

        bell.addEventListener("click", function () {
            // Haptic tap
            if ("vibrate" in navigator) {
                try { navigator.vibrate(30); } catch (e) {}
            }

            // Ring animation boost
            bell.style.animation = "none";
            // Trigger reflow
            void bell.offsetWidth;
            bell.style.animation = "bellSwing 1.2s ease-in-out 3";

            // Spawn mini sparkles near bell
            const rect = bell.getBoundingClientRect();
            for (let i = 0; i < 6; i++) {
                const sp = document.createElement("span");
                sp.className = "floating-sparkle";
                sp.style.left = (rect.left + Math.random() * rect.width) + "px";
                sp.style.top = (rect.bottom + Math.random() * 15) + "px";
                document.body.appendChild(sp);
                setTimeout(function () { sp.remove(); }, 2000);
            }
        });
    });

    /* =====================================================
       5. SCROLL REVEAL (INTERSECTION OBSERVER)
    ===================================================== */
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target); // Unobserve once animated
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(function (element) {
            observer.observe(element);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }

    /* =====================================================
       6. RSVP CONTACT POPUP
    ===================================================== */
    window.openContact = function () {
        if (!contactPopup) return;
        contactPopup.classList.add("active");
        contactPopup.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // Prevent background scroll
    };

    window.closeContact = function () {
        if (!contactPopup) return;
        contactPopup.classList.remove("active");
        contactPopup.setAttribute("aria-hidden", "true");
        document.body.style.overflow = ""; // Restore background scroll
    };

    // Close on Backdrop Click
    if (contactPopup) {
        contactPopup.addEventListener("click", function (event) {
            if (event.target === contactPopup) {
                closeContact();
            }
        });
    }

    // Close on Escape Key
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" || event.keyCode === 27) {
            closeContact();
        }
    });

});