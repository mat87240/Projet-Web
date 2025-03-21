import { setLvlName } from "../globalAssets/transfer.js";

document.addEventListener("DOMContentLoaded", function () {
    let currentMenu = 0;

    const menus = {
        0: document.getElementById("menu-0"),
        1: document.getElementById("menu-1")
    };

    const playButton = document.getElementById("playButton");
    const returnButton = document.getElementById("returnButton");
    const levelList = document.getElementById("levelList");

    const lvlNames = [
        "lvl1", "lvl2", "lvl3", "lvl4", "lvl5", "lvl6", "lvl7", "lvl8", "lvl9", "lvl10",
        "lvl11", "lvl12", "lvl13", "lvl14", "lvl15", "lvl16", "lvl17", "lvl18", "lvl19", "lvl20"
    ];

    lvlNames.forEach((lvlName, index) => {
        let li = document.createElement("li");
        li.textContent = `Level ${index + 1}`;
        levelList.appendChild(li);

        li.addEventListener("click", () => {
            setLvlName(lvlName);
            window.location.href = "../game/index.html";
        });
    });

    function showMenu(id) {
        Object.keys(menus).forEach(key => {
            menus[key].classList.add("hidden");
        });
        menus[id].classList.remove("hidden");
        currentMenu = id;
    }

    playButton.addEventListener("click", () => showMenu(1));
    returnButton.addEventListener("click", () => showMenu(0));

    showMenu(0);
});
