const themeToggler = document.getElementById("mode_toggler");
const themeIcon = document.getElementById("theme-icon");

// Check saved preference
if (localStorage.getItem("theme") === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
    themeIcon.src = "assets/img/sun.png";
}

themeToggler.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeIcon.src = isDark ? "assets/img/sun.png" : "assets/img/moon.png";
});
