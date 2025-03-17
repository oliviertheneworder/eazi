// console.log('Manufacturer script loaded');

// Check if we're on a manufacturer page
if (window.location.pathname.includes('/manufacturer/')) {
    // Get the H1 text and convert it to a slug
    const h1Text = document.querySelector('h1')?.textContent || '';
    const manufacturerSlug = h1Text.toLowerCase().replace(/\s+/g, '-');

    // Find all links containing '/category/'
    const categoryLinks = document.querySelectorAll('a[href*="/category/"]');

    // Update each category link
    categoryLinks.forEach(link => {
        const currentUrl = new URL(link.href);

        // Only add the parameter if it doesn't already exist
        if (!currentUrl.searchParams.has('manufacturer')) {
            currentUrl.searchParams.set('manufacturer', manufacturerSlug);
            link.href = currentUrl.toString();
        }
    });
}

// if category page has ?manufacturer= query parameter then filter ".w-dyn-item" that has .product-heading that contains query parameter value (but in title Case and with spaces)
if (window.location.pathname.includes('/category/')) {
    const urlParams = new URLSearchParams(window.location.search);
    const manufacturerSlug = urlParams.get('manufacturer');
    
    // console.log('URL Search params:', window.location.search);
    // console.log('Manufacturer slug:', manufacturerSlug);

    if (manufacturerSlug) {
        const manufacturerTitle = manufacturerSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        console.log('Filtering by manufacturer:', manufacturerTitle);
        
        document.querySelectorAll('.w-dyn-item').forEach(item => {
            const productHeading = item.querySelector('.product-heading');
            if (productHeading) {
                // console.log('Product heading text:', productHeading.textContent);
                // console.log('Includes check:', productHeading.textContent.toLowerCase().includes(manufacturerTitle.toLowerCase()));
            }
            if (productHeading && productHeading.textContent.toLowerCase().includes(manufacturerTitle.toLowerCase())) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
}