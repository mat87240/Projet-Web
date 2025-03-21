import { setLvlName } from "../globalAssets/transfer.js";

// Wait for the DOM content to load before executing the script
document.addEventListener("DOMContentLoaded", function () {
    let currentMenu = 0;

    // Cache menu elements
    const menus = {
        0: document.getElementById("menu-0"),
        1: document.getElementById("menu-1")
    };

    // Cache button elements
    const playButton = document.getElementById("playButton");
    const returnButton = document.getElementById("returnButton");
    const levelList = document.getElementById("levelList");

    // Level names to display in the menu
    const lvlNames = [
        "lvl1", "lvl2", "lvl3", "lvl4", "lvl5", "lvl6", "lvl7", "lvl8", "lvl9", "lvl10",
        "lvl11", "lvl12", "lvl13", "lvl14", "lvl15", "lvl16", "lvl17", "lvl18", "lvl19", "lvl20"
    ];

    // Create and append level list items
    lvlNames.forEach((lvlName, index) => {
        let li = document.createElement("li");
        li.textContent = `Level ${index + 1}`;
        levelList.appendChild(li);

        // Set the level name and redirect when a level is clicked
        li.addEventListener("click", () => {
            setLvlName(lvlName);  // Set the selected level name
            window.location.href = "../game/index.html";  // Redirect to the game page
        });
    });

    // Show the specified menu by toggling visibility
    function showMenu(id) {
        // Hide all menus
        Object.keys(menus).forEach(key => {
            menus[key].classList.add("hidden");
        });
        // Show the selected menu
        menus[id].classList.remove("hidden");
        currentMenu = id;
    }

    // Event listeners for menu navigation
    playButton.addEventListener("click", () => showMenu(1));  // Show level menu
    returnButton.addEventListener("click", () => showMenu(0));  // Show main menu

    // Initialize by showing the main menu
    showMenu(0);
});
