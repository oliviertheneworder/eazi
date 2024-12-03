// GSAP registration for ScrollTrigger and ScrollToPlugin
window.Webflow ||= [];
window.Webflow.push(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Define a reusable easing variable
    const easeType = "power3.out"; // Change this to any of the options below

    /**
     * Available GSAP Easing Options:
     * - "power1.in", "power1.out", "power1.inOut" (slight acceleration and deceleration)
     * - "power2.in", "power2.out", "power2.inOut" (more pronounced easing)
     * - "power3.in", "power3.out", "power3.inOut" (stronger easing)
     * - "power4.in", "power4.out", "power4.inOut" (very sharp easing)
     * - "back.in(1.7)", "back.out(1.7)", "back.inOut(1.7)" (elastic ease with overshoot)
     * - "elastic.in(1, 0.3)", "elastic.out(1, 0.3)", "elastic.inOut(1, 0.3)" (bouncy effect)
     * - "bounce.in", "bounce.out", "bounce.inOut" (realistic bounce)
     * - "steps(5)" (discrete steps)
     * - "linear" (no easing)
     */

    // Hide / Show the Nav with buffer at the top
    let lastScrollY = 0;
    const buffer = 300; // Buffer zone in pixels
    gsap.to(".nav", {
        y: "-100%", // Moves the nav out of view upwards
        ease: easeType, // Use the reusable easing variable
        duration: 0.3,
        scrollTrigger: {
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                const currentScrollY = Math.max(self.scroll(), 0); // Prevent negative values
                if (currentScrollY <= buffer) {
                    // If within buffer zone, reset nav to visible
                    gsap.to(".nav", { y: "0%", ease: easeType, duration: 0.3 });
                } else if (currentScrollY > lastScrollY) {
                    // Scrolling down
                    gsap.to(".nav", { y: "-100%", ease: easeType, duration: 0.6 });
                } else {
                    // Scrolling up
                    gsap.to(".nav", { y: "0%", ease: easeType, duration: 0.3 });
                }
                lastScrollY = currentScrollY;
            },
            scrub: false, // Allows smoother detection
        },
    });

    // GSAP animation for .w-dyn-item elements (machine images)
    gsap.utils.toArray('.w-dyn-item img').forEach((item) => {
        gsap.fromTo(
            item,
            { scale: 0.5 }, // Start smaller
            {
                scale: 1, // End at full size
                scrollTrigger: {
                    trigger: item,
                    start: "top bottom",
                    end: "top 50%",
                    scrub: true,
                    toggleActions: "restart pause reverse pause",
                    // markers: true, // Debugging markers
                },
                ease: easeType, // Use the reusable easing variable
            }
        );
    });

    // GSAP script to sequentially slide in .grid-1, .grid-2, and .grid-4
    const grids = gsap.utils.toArray('.grid-1, .grid-2, .grid-4, .footer_1_wrap');
    console.log(grids); // Debug: check elements

    gsap.fromTo(
        grids,
        {
            autoAlpha: 0, // Combines opacity and visibility
            y: 100, // Start below the viewport
        },
        {
            autoAlpha: 1, // Ensures visibility is set to visible
            y: 0, // Reset position
            duration: 2,
            ease: easeType, // Smooth easing
            stagger: 0.3, // Animates sequentially
        }
    );
});