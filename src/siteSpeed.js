// Preload links to improve site speed
document.addEventListener("DOMContentLoaded", function () {
    // Select all internal links
    const links = document.querySelectorAll("a[href^='/'], a[href^='./'], a[href^='../']");

    links.forEach((link) => {
        link.addEventListener("mouseover", () => {
            const href = link.getAttribute("href");
            if (href && !link.dataset.preloaded) {
                link.dataset.preloaded = "true"; // Mark link as preloaded
                const linkEl = document.createElement("link");
                linkEl.rel = "prefetch";
                linkEl.href = href;
                document.head.appendChild(linkEl);
            }
        });
    });
});