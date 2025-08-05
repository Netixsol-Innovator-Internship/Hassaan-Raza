const notifications = [
    {
        name: "Mark Webber",
        avatar: "./assets/images/avatar-mark-webber.webp",
        notifyText: "reacted to your recent post",
        txtPost: "My first tournament today!",
        txtGroup: "",
        time: "1m ago",
        isRead: false,
        post: "",
        message: "",
    },
    {
        name: "Angela Gray",
        avatar: "./assets/images/avatar-angela-gray.webp",
        notifyText: "followed you",
        txtPost: "",
        txtGroup: "",
        time: "5m ago",
        isRead: false,
        post: "",
        message: "",
    },
    {
        name: "Jacob Thompson",
        avatar: "./assets/images/avatar-jacob-thompson.webp",
        notifyText: "has joined your group",
        txtPost: "",
        txtGroup: "Chess Club",
        time: "1 day ago",
        isRead: true,
        post: "",
        message: "",
    },
    {
        name: "Rizky Hasanuddin",
        avatar: "./assets/images/avatar-rizky-hasanuddin.webp",
        notifyText: "sent you a private message",
        txtPost: "",
        txtGroup: "",
        time: "5 days ago",
        isRead: false,
        post: "",
        message: "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
    },
    {
        name: "Kimberly Smith",
        avatar: "./assets/images/avatar-kimberly-smith.webp",
        notifyText: "commented on your picture",
        txtPost: "",
        txtGroup: "",
        time: "1 week ago",
        isRead: false,
        post: "./assets/images/image-chess.webp",
        message: "",
    },
    {
        name: "Nathan Peterson",
        avatar: "./assets/images/avatar-nathan-peterson.webp",
        notifyText: "reacted to your recent post",
        txtPost: "5 end-game strategies to increase your win rate",
        txtGroup: "",
        time: "2 weeks ago",
        isRead: false,
        post: "",
        message: "",
    },
    {
        name: "Anna Kim",
        avatar: "./assets/images/avatar-anna-kim.webp",
        notifyText: "left the group",
        txtPost: "",
        txtGroup: "Chess Club",
        time: "2 weeks ago",
        isRead: false,
        post: "",
        message: "",
    }
];

function writeNotification() {
    document.getElementById('notificationContainer').innerHTML = '';
    notifications.forEach((notification, i) => {
        document.getElementById('notificationContainer').innerHTML +=
            `     
    <div ${notification.isRead ? "" : `onclick="notificationRead(${i})"`} class="flex gap-3 w-full p-3 bg-Navy-50 ${notification.isRead ? `bg-white` : ""} rounded-md">
        <!-- profile pic -->
        <div class="w-8 h-8 sm:w-15 sm:h-15 shadow rounded-full shrink-0">
          <img src="${notification.avatar}" alt="" class="">
        </div>
        <!-- Notification content -->
        <div class="w-full">
          <!-- Notification text -->
          <div class="flex justify-between gap-3">
            <p><span id="user-name" class="text-Navy-950 font-bold cursor-pointer hover:text-blue-900 active:text-blue-900 active:underline">${notification.name}</span>
              <span id="notify-txt" class="text-gray-600">${notification.notifyText}</span> <span id="txt-post"
                class="font-bold text-gray-600 cursor-pointer hover:text-blue-900 active:text-blue-900 active:underline">${notification.txtPost}</span> <span id="txt-group"
                class="font-bold text-blue-950 cursor-pointer hover:text-blue-900 active:text-blue-900 active:underline">${notification.txtGroup}</span> 
               ${notification.isRead ? '' : `<span id="dot"
                class="bg-red-500 w-1.5 h-1.5 rounded-full inline-block align-middle"></span>` }
            </p>
            ${notification.post ?
                ` <div class="w-8 h-8 sm:w-15 sm:h-15 shadow shrink-0">
              <img src="${notification.post}" alt="">
            </div>`: ""}
          </div>
          
          <!-- time -->
          <div>
            <p class="text-xs text-gray-500 font-medium">${notification.time}</p>
          </div>
          ${notification.message ? `
          <!-- optional message box - initially hidden -->
          <div id="message-${i}" class="border-3 p-2 border-gray-100 rounded-lg text-gray-500 mt-3 cursor-pointer hover:bg-blue-100 hidden">
            <p>${notification.message}</p>
          </div>
          <div onclick="event.stopPropagation(); toggleMessage(${i})" class="text-xs text-blue-500 cursor-pointer mt-1">
            Click to ${notification.isRead ? 'show' : 'view'} message
          </div>
          ` : ""}
        </div>
      </div>
      `;
    });
}

function toggleMessage(index) {
    const messageBox = document.getElementById(`message-${index}`);
    messageBox.classList.toggle('hidden');
}

function notificationRead(i) {
    if (notifications[i].isRead == false) {
        notifications[i].isRead = true;
        writeNotification();
    }
    countUnRead();
}

function countUnRead() {
    let count = 0;
    notifications.forEach(notification => {
        if (notification.isRead == false) {
            count++;
        }
    });
    document.getElementById('counter').innerText = count;
    return count;
}

function markAllAsRead(){
    notifications.forEach(notification => {
        notification.isRead = true;
    });
    writeNotification();
    countUnRead();
}

// Initialize the page
writeNotification();
countUnRead();