document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       ELEMENTS
    ========================================== */

    const openingScreen =
        document.getElementById("openingScreen");

    const music =
        document.getElementById("bgMusic");

    const musicButton =
        document.getElementById("musicBtn");


    /* ==========================================
       OPENING SCREEN
       CLICK / TOUCH TO OPEN DOORS
    ========================================== */

    if (openingScreen) {

        let alreadyOpened = false;

        function openInvitation(event) {

            /* Prevent double triggering */
            if (alreadyOpened) {
                return;
            }

            alreadyOpened = true;


            /* ======================================
               START MUSIC
            ====================================== */

            if (music) {

                music.volume = 0.6;

                music.play()
                    .then(function () {

                        if (musicButton) {
                            musicButton.innerHTML = "❚❚";
                        }

                    })
                    .catch(function () {

                        console.log(
                            "Music autoplay blocked by browser."
                        );

                    });

            }


            /* ======================================
               OPEN BOTH DOORS
            ====================================== */

            openingScreen.classList.add("opened");


            /* ======================================
               REMOVE OPENING SCREEN
               AFTER DOOR ANIMATION
            ====================================== */

            setTimeout(function () {

                openingScreen.classList.add("hidden");

                /* Extra fallback */
                openingScreen.style.display = "none";

            }, 1900);

        }


        /* ======================================
           DESKTOP CLICK
        ====================================== */

        openingScreen.addEventListener(
            "click",
            openInvitation
        );


        /* ======================================
           MOBILE TOUCH
        ====================================== */

        openingScreen.addEventListener(
            "touchend",
            function (event) {

                event.preventDefault();

                openInvitation(event);

            },
            {
                passive: false
            }
        );

    }


    /* ==========================================
       MUSIC BUTTON
    ========================================== */

    if (musicButton && music) {

        musicButton.addEventListener(
            "click",
            function (event) {

                /*
                 * Prevent this click from
                 * affecting other elements.
                 */

                event.stopPropagation();


                /* ==============================
                   PLAY MUSIC
                ============================== */

                if (music.paused) {

                    music.play()
                        .then(function () {

                            musicButton.innerHTML =
                                "❚❚";

                        })
                        .catch(function () {

                            console.log(
                                "Music playback blocked."
                            );

                        });

                }


                /* ==============================
                   PAUSE MUSIC
                ============================== */

                else {

                    music.pause();

                    musicButton.innerHTML =
                        "♫";

                }

            }
        );

    }


    /* ==========================================
       SCROLL REVEAL
    ========================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if (revealElements.length > 0) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.08
                }
            );


        revealElements.forEach(
            function (element) {

                observer.observe(element);

            }
        );

    }


    /* ==========================================
       CONTACT POPUP
    ========================================== */

    window.openContact = function () {

        const popup =
            document.getElementById(
                "contactPopup"
            );


        if (popup) {

            popup.classList.add("active");

        }

    };


    /* ==========================================
       CLOSE CONTACT POPUP
    ========================================== */

    window.closeContact = function () {

        const popup =
            document.getElementById(
                "contactPopup"
            );


        if (popup) {

            popup.classList.remove("active");

        }

    };


    /* ==========================================
       CLOSE CONTACT POPUP
       WHEN CLICKING OUTSIDE BOX
    ========================================== */

    const contactPopup =
        document.getElementById(
            "contactPopup"
        );


    if (contactPopup) {

        contactPopup.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === contactPopup
                ) {

                    contactPopup.classList.remove(
                        "active"
                    );

                }

            }
        );

    }


});