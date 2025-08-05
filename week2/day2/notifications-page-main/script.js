const notifications = [
    {
        userName:
    }
]
const notifications1 = [
    {
        name: "Mark Webber",
        action: "reacted to your recent post",
        time: "1m ago",
        target: "My first tournament today!",
        unread: true,
        avatar: "./assets/images/avatar-mark-webber.webp",
        chess: false,
        message: "Check out the post if you haven't already!",
    },
    {
        name: "Angela Gray",
        time: "5m ago",
        action: "followed you",
        unread: true,
        avatar: "./assets/images/avatar-angela-gray.webp",
        message: "Angela has started following you. Say hello!",
    },
    {
        name: "Jacob Thompson",
        time: "1 day ago",
        action: "has joined your group",
        target: "Chess Club",
        unread: true,
        chess: true,
        avatar: "./assets/images/avatar-jacob-thompson.webp",
        message: "Jacob just joined your group. Welcome him!",
    },
    {
        name: "Rizky Hasanuddin",
        time: "5 days ago",
        action: "sent you a private message",
        unread: false,
        chess: false,
        avatar: "./assets/images/avatar-rizky-hasanuddin.webp",
        message:
            "Hello, thanks for setting up the Chess Club. I’ve been a member for a few weeks now and I’m already having lots of fun and improving my game.",
    },
    {
        name: "Kimberly Smith",
        time: "1 week ago",
        action: "commented on your picture",
        unread: false,
        chess: false,
        avatar: "./assets/images/avatar-kimberly-smith.webp",
        message: "Nice picture!",
        picture: "./assets/images/cmntImage.png",
    },
    {
        name: "Nathan Peterson",
        time: "2 weeks ago",
        action: "reacted to your recent post",
        target: "5 end–game strategies to increase your win rate",
        unread: false,
        avatar: "./assets/images/avatar-nathan-peterson.webp",

        message: "Nathan liked your recent post!",
    },
    {
        name: "Anna Kim",
        time: "2 weeks ago",
        action: "left the group",
        target: "Chess Club",
        unread: false,
        chess: true,
        avatar: "./assets/images/avatar-anna-kim.webp",
        message: "Anna has left the group.",
    },
];





function writeNotification() {
    container = document.getElementById('notificationContainer').innerHTML +=
    `     
    <div class="flex gap-3 w-full p-3 bg-Navy-50 rounded-md">
        <!-- profile pic -->
        <div class="w-8 h-8 sm:w-15 sm:h-15 shadow rounded-full shrink-0">
          <img src="assets/images/avatar-angela-gray.webp" alt="" class="">
        </div>
        <!-- Notification content -->
        <div>
          <!-- Notification text -->
          <div class="flex justify-between gap-3">

            <p><span id="user-name" class="text-Navy-950 font-bold cursor-pointer hover:text-blue-900 active:text-blue-900 active:underline">Hassaan Raza</span>
              <span id="notify-txt" class="text-gray-600">recieved a message</span> <span id="txt-post"
                class="font-bold text-gray-600 cursor-pointer hover:text-blue-900 active:text-blue-900 active:underline">My day at NetixSol</span> <span id="txt-group"
                class="font-bold text-blue-950 cursor-pointer hover:text-blue-900 active:text-blue-900 active:underline">Chess Club</span> <span id="dot"
                class="bg-red-500 w-1.5 h-1.5 rounded-full inline-block align-middle"></span>
            </p>
            <div class="w-8 h-8 sm:w-15 sm:h-15 shadow shrink-0">
              <img src="assets/images/image-chess.webp" alt="">
            </div>
          </div>
          <!-- time -->
          <div>
            <p class="text-xs text-gray-500 font-medium"><span id="notify-time">1m</span> ago</p>
          </div>
          <!-- optional message box -->
          <div class="border-3 p-2 border-gray-100 rounded-xs text-gray-500 mt-3 cursor-pointer hover:bg-blue-100 active:text-blue-100">
            <p class="">Hello there</p>
          </div>
        </div>
      </div>
      `;


  }