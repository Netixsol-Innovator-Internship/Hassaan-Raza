        // Initialize theme from localStorage or default to dark
        if (!localStorage.getItem('theme')) {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
        } else {
            if (localStorage.getItem('theme') === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }



        //////////////////////////////
        
        document.addEventListener('DOMContentLoaded', function() {
            // Dark/Light Mode Toggler
            const modeToggler = document.querySelector('.mode_toggler');
            const darkBtn = document.querySelector('.mode_toggler .dark');
            const lightBtn = document.querySelector('.mode_toggler .light');
            
            // Update toggle button appearance
            function updateToggleAppearance() {
                const isDark = document.documentElement.classList.contains('dark');
                
                if (isDark) {
                    darkBtn.classList.add('bg-black');
                    darkBtn.querySelector('i').classList.add('text-white');
                    darkBtn.querySelector('i').classList.remove('text-black');
                    lightBtn.classList.remove('bg-black');
                    lightBtn.querySelector('i').classList.add('text-black');
                    lightBtn.querySelector('i').classList.remove('text-white');
                } else {
                    lightBtn.classList.add('bg-black');
                    lightBtn.querySelector('i').classList.add('text-white');
                    lightBtn.querySelector('i').classList.remove('text-black');
                    darkBtn.classList.remove('bg-black');
                    darkBtn.querySelector('i').classList.add('text-black');
                    darkBtn.querySelector('i').classList.remove('text-white');
                }
            }
            
            // Initialize toggle appearance
            updateToggleAppearance();
            
            // Toggle functionality
            modeToggler.addEventListener('click', function() {
                const isDark = document.documentElement.classList.contains('dark');
                
                if (isDark) {
                    // Switch to light mode
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                } else {
                    // Switch to dark mode
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                }
                
                updateToggleAppearance();
            });
            
            // Hamburger menu toggle (if needed)
            const navToggle = document.getElementById('nav-toggle');
            const navMenu = document.getElementById('nav-menu');
            if (navToggle && navMenu) {
                navToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('hidden');
                });
            }
        });
