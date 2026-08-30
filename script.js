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
       OPEN BY CLICK / TOUCH ANYWHERE
    ========================================== */

    if (openingScreen) {

        let alreadyOpened = false;

        function openInvitation() {

            /* Prevent double triggering */

            if (alreadyOpened) {
                return;
            }

            alreadyOpened = true;


            /* Start music */

            if (music) {

                music.play()
                    .then(function () {

                        if (musicButton) {
                            musicButton.innerHTML = "❚❚";
                        }

                    })
                    .catch(function () {

                        console.log(
                            "Music autoplay blocked."
                        );

                    });

            }


            /* Opening animation */

            openingScreen.classList.add("opened");


            /* Remove opening screen */

            setTimeout(function () {

                openingScreen.style.display = "none";

            }, 1300);

        }


        /* Laptop mouse */

        openingScreen.addEventListener(
            "click",
            openInvitation
        );


        /* Mobile touch */

        openingScreen.addEventListener(
            "touchend",
            function (event) {

                event.preventDefault();

                openInvitation();

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

                /* Don't reopen invitation */

                event.stopPropagation();


                if (music.paused) {

                    music.play()
                        .then(function () {

                            musicButton.innerHTML =
                                "❚❚";

                        });

                }

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
       CLOSE CONTACT POPUP OUTSIDE
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