document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 5); // Default to 5 days from now for demo
    // User can override this by setting a data attribute in HTML if they want specific date
    
    const banner = document.getElementById('launch-banner');
    if (!banner) return;
    
    // Check if user dismissed banner
    if (localStorage.getItem('launch-banner-dismissed')) {
       // banner.style.display = 'none'; // Uncomment to enable persistent dismissal
    }

    // Layout adjustment for fixed banner
    const header = document.querySelector('header.sticky-top');
    
    function adjustLayout() {
        if (banner.style.display === 'none') {
             document.body.style.paddingTop = '0px';
             if (header) header.style.top = '0px';
             return;
        }
        
        const height = banner.offsetHeight;
        document.body.style.paddingTop = height + 'px';
        if (header) {
            header.style.top = height + 'px';
        }
    }

    // Initial adjustment
    adjustLayout();

    // Listen for resize
    window.addEventListener('resize', adjustLayout);
    
    // Also use ResizeObserver if available to detect content changes (e.g. text wrapping)
    if (window.ResizeObserver) {
        new ResizeObserver(adjustLayout).observe(banner);
    }

    const closeBtn = banner.querySelector('.banner-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            banner.style.display = 'none';
            adjustLayout(); // Reset layout immediately
            localStorage.setItem('launch-banner-dismissed', 'true');
        });
    }

    function updateTimer() {
        const now = new Date().getTime();
        
        // Use data-date attribute if available, format: YYYY-MM-DDTHH:MM:SS
        const dataDate = banner.getAttribute('data-date');
        console.log(dataDate);
        const countTo = dataDate ? new Date(dataDate).getTime() : targetDate.getTime();
        
        const distance = countTo - now;

        if (distance < 0) {
            document.querySelector('.countdown-timer').innerHTML = "<div class='timer-item'><span>OFFER EXPIRED</span></div>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        updateElement('days', days);
        updateElement('hours', hours);
        updateElement('minutes', minutes);
        updateElement('seconds', seconds);
    }

    function updateElement(id, value) {
        const el = document.getElementById('timer-' + id);
        if (el) el.innerText = value < 10 ? '0' + value : value;
    }

    setInterval(updateTimer, 1000);
    updateTimer(); // Initial call
});
