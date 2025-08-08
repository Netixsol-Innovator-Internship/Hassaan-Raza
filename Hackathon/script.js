    // Mobile menu toggle functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Dark/light mode toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIconDark = document.getElementById('theme-icon-dark');
    const themeIconLight = document.getElementById('theme-icon-light');
    
    // Check for saved user preference or use system preference
    if (localStorage.getItem('color-theme') === 'dark' || 
        (!localStorage.getItem('color-theme') && 
        window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        themeIconLight.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        themeIconDark.classList.remove('hidden');
    }
    
    themeToggle.addEventListener('click', () => {
        // Toggle icons
        themeIconDark.classList.toggle('hidden');
        themeIconLight.classList.toggle('hidden');
        
        // Toggle dark class on html element
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    });
