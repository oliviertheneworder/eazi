document.addEventListener("DOMContentLoaded", function () {
    // Select all internal links
    const links = document.querySelectorAll("a[href^='/'], a[href^='./'], a[href^='../']");

    links.forEach((link) => {
        link.addEventListener("mouseover", () => {
            const href = link.getAttribute("href");
            if (href) { // Ensure href is defined before proceeding
                if (!link.dataset.preloaded) {
                    link.dataset.preloaded = "true"; // Mark link as preloaded
                    const linkEl = document.createElement("link");
                    linkEl.rel = "prefetch";
                    linkEl.href = href;
                    linkEl.as = "document"; // Set the appropriate 'as' value
                    document.head.appendChild(linkEl);
                    // console.log(`Preloaded link: ${href}`);
                }
            } else {
                console.warn("Href attribute is not defined for this link", link);
            }
        });
    });
});