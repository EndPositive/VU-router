let common_view = document.getElementById("common");
let search_view = document.getElementById("search");
let list = document.getElementById("search").children[1].children[1].children;
let search_back = document.getElementById("search-back");
let search_title = document.getElementById("search-title");
let type;


function searchAll(input) {
    let value = input.value.toLowerCase();
    if (value.length === 0) return hideSearch();

    showSearch(input);
    for (let i = 0; i < list.length; i++) {
        let text = list[i].children[0].textContent.toLowerCase();
        if (text.indexOf(value) >= 0) show(list[i]);
        else hide(list[i]);
    }

    type = input.name;
}

function select(room) {
    let input;
    if (type === "src") input = document.getElementsByName("src")[0];
    else if (type === "dest") input = document.getElementsByName("dest")[0];
    input.value = room;
    hideSearch();
}

function route_now() {
    document.location.href = "routes/nav.html?ty"
}

function showSearch(input) {
    show(search_back);
    type = input.name;
    if (type === "src") search_title.textContent = "Select starting location";
    else if (type === "dest") search_title.textContent = "Select destination";
    for (let i = 1; i < list.length; i++) show(list[i]);
    common_view.classList.remove("flex-grow-1");
    common_view.style.height = 0;
    search_view.classList.add("flex-grow-1");
    search_view.style.height = "100%";
}

function hideSearch() {
    hide(search_back);
    common_view.classList.add("flex-grow-1");
    common_view.style.height = "100%";
    search_view.classList.remove("flex-grow-1");
    search_view.style.height = "0";
}

function show(el) {
    el.style.removeProperty("display");
}

function hide(el) {
    el.style.display = "none";
}