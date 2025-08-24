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

    // --- Public Profile Page Logic ---
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        const showLoginBtn = document.getElementById('show-login-btn');
        const showRegisterBtn = document.getElementById('show-register-btn');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');

        // --- Form Toggling ---
        showLoginBtn.addEventListener('click', () => {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            showLoginBtn.classList.add('active');
            showRegisterBtn.classList.remove('active');
        });

        showRegisterBtn.addEventListener('click', () => {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            showRegisterBtn.classList.add('active');
            showLoginBtn.classList.remove('active');
        });

        // --- Registration Logic ---
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const userClass = document.getElementById('register-class').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const rePassword = document.getElementById('register-re-password').value;

            if (password !== rePassword) {
                alert("Passwords do not match.");
                return;
            }

            const users = JSON.parse(localStorage.getItem('publicUsers')) || [];
            const existingUser = users.find(user => user.email === email);

            if (existingUser) {
                alert("A user with this email already exists.");
                return;
            }

            const newUser = { name, class: userClass, email, password };
            users.push(newUser);
            localStorage.setItem('publicUsers', JSON.stringify(users));

            // Set current user and redirect
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            alert("Registration successful! Redirecting to your profile...");
            window.location.href = 'public-profile-home.html';
        });

        // --- Login Logic ---
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            const users = JSON.parse(localStorage.getItem('publicUsers')) || [];
            const user = users.find(user => user.email === email);

            if (!user || user.password !== password) {
                alert("Invalid email or password.");
                return;
            }

            localStorage.setItem('currentUser', JSON.stringify(user));
            alert("Login successful! Redirecting to your profile...");
            window.location.href = 'public-profile-home.html';
        });
    }

    // --- Public Profile Home Page Logic ---
    const profileHomeContainer = document.querySelector('.profile-home-container');
    if (profileHomeContainer) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        // Protect the page - redirect if not logged in
        if (!currentUser) {
            window.location.href = 'public-profile.html';
            return; // Stop executing script on this page
        }

        // Populate user data
        const profileNameEl = document.getElementById('profile-name');
        if (profileNameEl) {
            profileNameEl.textContent = currentUser.name;
        }

        // Handle logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('currentUser');
                alert('You have been logged out.');
                window.location.href = 'index.html';
            });
        }
    }
    // --- Global Navigation Logic ---
    const profileNavLink = document.getElementById('profile-nav-link');
    if (profileNavLink) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            profileNavLink.href = 'public-profile-home.html';
        } else {
            profileNavLink.href = 'public-profile.html';
        }
    }
});
