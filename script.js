document.addEventListener('DOMContentLoaded', () => {

    // --- Active Class Toggling for Navbars ---
    function setupActiveClassToggle(containerSelector, itemSelector, activeClass = 'active') {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        // Set default active item if none is set
        if (!container.querySelector(`.${activeClass}`)) {
            const firstItem = container.querySelector(itemSelector);
            if (firstItem) {
                firstItem.classList.add(activeClass);
            }
        }

        container.addEventListener('click', (e) => {
            const clickedItem = e.target.closest(itemSelector);
            if (!clickedItem || clickedItem.classList.contains(activeClass)) return;

            // Remove active class from the current active item
            const currentActive = container.querySelector(`.${activeClass}`);
            if (currentActive) {
                currentActive.classList.remove(activeClass);
            }

            // Add active class to the clicked item
            clickedItem.classList.add(activeClass);
        });
    }

    setupActiveClassToggle('.subject-nav-scroll', '.subject-item');
    setupActiveClassToggle('.bottom-nav', '.bottom-nav-item');


    // --- Drag-to-Scroll for Subject Navbar ---
    const scrollContainer = document.querySelector('.subject-nav-scroll');
    if (scrollContainer) {
        let isDown = false;
        let startX;
        let scrollLeft;

        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            scrollContainer.style.cursor = 'grabbing';
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        });

        scrollContainer.addEventListener('mouseleave', () => {
            isDown = false;
            scrollContainer.style.cursor = 'grab';
        });

        scrollContainer.addEventListener('mouseup', () => {
            isDown = false;
            scrollContainer.style.cursor = 'grab';
        });

        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2; // The '2' is a scroll multiplier
            scrollContainer.scrollLeft = scrollLeft - walk;
        });

        scrollContainer.style.cursor = 'grab';
    }

    // --- Video Description Toggle ---
    const titleToggle = document.getElementById('video-title-toggle');
    const descriptionBox = document.getElementById('video-description');

    if (titleToggle && descriptionBox) {
        titleToggle.addEventListener('click', () => {
            descriptionBox.classList.toggle('show');
            const icon = titleToggle.querySelector('.material-icons');
            if (icon) {
                // We'll add a 'rotated' class to handle the animation in CSS
                icon.classList.toggle('rotated');
            }
        });
    }
});
