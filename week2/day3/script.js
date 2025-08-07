// Menu data
const menuItems = [
    {
        id: 'burger1',
        category: 'burger',
        title: 'Royal Cheese Burger with extra Fries',
        description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
        price: 23.10,
        image: './assets/img/Burger1.png',
    },
    {
        id: 'burger2',
        category: 'burger',
        title: 'The classics for 3',
        description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
        price: 23.10,
        image: './assets/img/Burger2.png',
    },
    {
        id: 'burger3',
        category: 'burger',
        title: 'The classics for 3',
        description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
        price: 23.10,
        image: './assets/img/Burger3.png',
    },
    {
        id: 'burger4',
        category: 'burger',
        title: 'The classics for 3',
        description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
        price: 23.10,
        image: './assets/img/Burger4.png',
    },
    {
        id: 'burger5',
        category: 'burger',
        title: 'The classics for 3',
        description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
        price: 23.10,
        image: './assets/img/Burger5.png',
    },
    {
        id: 'burger6',
        category: 'burger',
        title: 'The classics for 3',
        description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
        price: 23.10,
        image: './assets/img/Burger6.png',
    },
    {
        id: 'fries1',
        category: 'fries',
        title: 'Royal Cheese Burger with extra Fries',
        description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
        price: 23.10,
        image: './assets/img/Fries1.png',
    },
    {
        id: 'fries2',
        category: 'fries',
        title: 'The classics for 3',
        description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
        price: 23.10,
        image: './assets/img/Fries2.png',
    },
    {
        id: 'fries3',
        category: 'fries',
        title: 'The classics for 3',
        description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
        price: 23.10,
        image: './assets/img/Fries3.png',
    },
    {
        id: 'fries4',
        category: 'fries',
        title: 'The classics for 3',
        description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
        price: 23.10,
        image: './assets/img/Fries4.png',
    },
    {
        id: 'fries5',
        category: 'fries',
        title: 'The classics for 3',
        description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
        price: 23.10,
        image: './assets/img/Fries5.png',
    },
    {
        id: 'fries6',
        category: 'fries',
        title: 'The classics for 3',
        description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
        price: 23.10,
        image: './assets/img/Fries6.png',
    },
    {
        id: 'drink1',
        category: 'drinks',
        title: 'Royal Cheese Burger with extra Fries',
        description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
        price: 23.10,
        image: './assets/img/Drink1.png',
    },
    {
        id: 'drink2',
        category: 'drinks',
        title: 'The classics for 3',
        description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
        price: 23.10,
        image: './assets/img/Drink2.png',
    },
    {
        id: 'drink3',
        category: 'drinks',
        title: 'The classics for 3',
        description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
        price: 23.10,
        image: './assets/img/Drink3.png',
    },
    {
        id: 'drink4',
        category: 'drinks',
        title: 'The classics for 3',
        description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
        price: 23.10,
        image: './assets/img/Drink4.png',
    },
    {
        id: 'drink5',
        category: 'drinks',
        title: 'The classics for 3',
        description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
        price: 23.10,
        image: './assets/img/Drink5.png',
    },
    {
        id: 'drink6',
        category: 'drinks',
        title: 'The classics for 3',
        description: '1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium sized French Fries, 3 cold drinks',
        price: 23.10,
        image: './assets/img/Drink6.png',
    },
];



function writeMenuSection() {
    
}

// Dark mode Toggleer
function darkModeToggler() {


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

}

darkModeToggler();