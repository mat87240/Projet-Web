export function setLvlName(name) {    
    localStorage.setItem("levelName", name);
}

export function getLvlName() {
    return localStorage.getItem("levelName");
}
