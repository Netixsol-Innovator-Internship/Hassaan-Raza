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

const resturants = [
    {
        id: 1,
        name: "McDonald's London",
        logo: "./assets/img/Mac.png",
    },
    {
        id: 2,
        name: "Papa Johns",
        logo: "./assets/img/Papa.png",
    },
    {
        id: 3,
        name: "KFC West London",
        logo: "./assets/img/kfc.png",
    },
    {
        id: 4,
        name: "Texas Chicken",
        logo: "./assets/img/texas.png",
    },
    {
        id: 5,
        name: "Burger King",
        logo: "./assets/img/king.png",
    },
    {
        id: 6,
        name: "Shaurma 1",
        logo: "./assets/img/shaurma.png",
    },
];

//////////Reviews//////////
const customerReviews = [
    {
        id: 1,
        name: "St Gix",
        location: "South London",
        date: "24th September, 2023",
        rating: 5,
        comment:
            "The positive aspect was undoubtedly the efficiency of the service. The queue moved quickly, the staff was friendly, and the food was up to the usual McDonald's standard – hot and satisfying.",
        avatar: "./assets/img/review_user.png",
    },
    {
        id: 2,
        name: "Maria Lopez",
        location: "Manchester",
        date: "12th October, 2023",
        rating: 4,
        comment:
            "Loved the quick service and fresh food. Seating area could have been cleaner, but overall a great experience.",
        avatar: "./assets/img/review_user.png",
    },
    {
        id: 3,
        name: "James Smith",
        location: "Birmingham",
        date: "5th November, 2023",
        rating: 3,
        comment:
            "Average visit – food was okay, but the wait time was longer than expected during lunch hour.",
        avatar: "./assets/img/review_user.png",
    },
    {
        id: 4,
        name: "Emily Chen",
        location: "Glasgow",
        date: "18th November, 2023",
        rating: 5,
        comment:
            "Fantastic service! The team was attentive, and my order was perfect. Will definitely come again.",
        avatar: "./assets/img/review_user.png",
    },
    {
        id: 5,
        name: "Liam Patel",
        location: "Leeds",
        date: "3rd December, 2023",
        rating: 4,
        comment:
            "Food was tasty and served quickly. Would love to see more vegetarian options in the future.",
        avatar: "./assets/img/review_user.png",
    },
    {
        id: 6,
        name: "Sophie Williams",
        location: "Liverpool",
        date: "15th December, 2023",
        rating: 2,
        comment:
            "Disappointed with the cold fries and missing items in my takeaway order. Staff were apologetic though.",
        avatar: "./assets/img/review_user.png",
    },
];


// Item object structure
const item = {
    id: 0,
    name: "",
    price: 0,
    qty: 0,
    img: ""
};

// Cart object structure
const cart = {
    count: 0, // Total quantity of all items
    cartItems: [], // Array to hold item objects
    total: 0 // Total price (sum of qty * price of each item)
};


function updateCartSummary() {
    cart.count = cart.cartItems.reduce((sum, item) => sum + item.qty, 0);
    cart.total = cart.cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);
}

function addToCart(i) {
    const menuItem = menuItems.find((p)=>p.id==i);
    if(!menuItem) return;
    // if already in cart then
    const found = cart.cartItems.find(item => item.id == i);
    if (found) {
        found.qty += 1;
    } else {
        cart.cartItems.push({ ...menuItem, qty: 1 });
    }
    updateCartSummary();
    writeToCart();
}

function removeFromCart(itemId) {
    const found = cart.cartItems.find(i => i.id === itemId);
    if (found) {
        found.qty -= 1;
        if (found.qty <= 0) {
            cart.cartItems = cart.cartItems.filter(i => i.id !== itemId);
        }
    }
    updateCartSummary();
    writeToCart();
}


////////////////////




function writeMenuSection(category) {
    document.getElementById(`${category}-menu-grid`).innerHTML = "";
    const items = menuItems.filter(menuItem => menuItem.category === category);

    items.forEach(item => {
        document.getElementById(`${category}-menu-grid`).innerHTML +=
            `
     <!-- card -->
                <div
                    class="shadow-xl grid grid-cols-2 gap-1 xl:gap-2 p-8 text-black  dark:text-primary dark:bg-white/30 rounded-2xl">
                    <div class="flex flex-col justify-between">
                        <div class="text-lg lg:text-xl font-semibold ">${item.title}</div>
                        <div class="text-xs lg:text-sm dark:text-white ">${item.description}</div>
                        <div class="text-base lg:text-lg font-bold text-secondary dark:text-white">GBP ${item.price}</div>
                    </div>
                    <div class="place-self-end-safe">
                        <div class="relative">
                            <!-- food pic -->
                            <img src="${item.image}" alt="">
                            <!-- plus cart -->
                            <div
                                class="absolute right-0 bottom-0 w-[44%] h-[40%] bg-white/90 rounded-tl-[55%] dark:invert dark:bg-white/60">
                                <div
                                   onclick="addToCart(${item.id})" class="absolute left-[25%] top-[25%] dark:hover:invert active: transition-all duration-75 cursor-pointer">
                                    <img src="assets/img/Plus.png" alt="">
                                   ${cart.cartItems.find(i=>i.id==item.id ? `
                                    <div class="absolute left-[70%] top-0 font-bold text-xs  text-white w-4 h-4 pb-1 dark:invert-0 bg-primary rounded-full text-center ">${i.qty}</div>
                                    
                                    `:"" )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    `;
    });

}

function writeResturants() {
    document.getElementById('resturants').innerHTML = ""

    resturants.forEach(resturant => {

        document.getElementById('resturants').innerHTML +=
            `
      <!-- resturant card -->
                <div class="flex flex-col items-center">
                    <div class="rounded-t-xl">
                        <img src="${resturant.logo}" alt="">
                        <div
                            class="px-4 py-3 text-center bg-primary text-white font-bold text-sm sm:text-lg xl:text-sm 2xl:text-lg w-full rounded-b-xl">
                            ${resturant.name}
                        </div>
                    </div>
                </div>

    `

    });
}


function writeToCart(i) {

    document.getElementById('cart-item').innerHTML = '';
    cart.cartItems.forEach(cartItem => {
        document.getElementById('cart-item').innerHTML = `
           <div
                        class="group flex items-center justify-between cursor-pointer bg-[#D9D9D9]/60 p-4 rounded-lg hover:bg-secondary dark:bg-secondary">
                        <div class="flex items-center gap-3">
                            <img src="${cartItem.img}" alt=""
                                class="w-[25%] h-[25%] border-2 border-white rounded-full">
                            <div
                                class="w-0.25 h-12 sm:h-15 bg-black/40  group-hover:invert group-active:invert dark:invert">
                            </div>
                            <span
                                class="font-bold text-2xl pl-1 text-secondary group-hover:text-primary dark:group-hover:text-white group-active:text-primary  dark:text-primary">${cartItem.name}</span>
                        </div>
                        <div class="flex items-center gap-2 ">
                            <button
                                class="w-5 sm:w-8 lg:w-10 group-hover:invert group-active:invert dark:invert  cursor-pointer"
                                onclick="${addToCart(cartItem.id)}"><img src="assets/img/Minus.png" alt=""></button>
                            <div
                                class="relative w-10 h-10 sm:w-15 sm:h-15 self-center bg-white text-xl font-bold rounded-sm text-center">
                                <div class="absolute top-[25%] left-[40%]">${cartItem.qty}</div>
                            </div>
                            <button
                                class="w-5 sm:w-8 lg:w-10 group-hover:invert group-active:invert dark:invert  cursor-pointer"
                                onclick="${removeFromCart(cartItem.id)}"><img src="assets/img/MacOS Maximize.png" alt=""></button>
                        </div>
                    </div>
        `
    });

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


function openCloseCartModal() {
    document.getElementById('cart-modal-backdrop').classList.toggle('hidden');
}


darkModeToggler();

writeMenuSection('burger');
writeMenuSection('fries');
writeMenuSection('drinks');
writeResturants();