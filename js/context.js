function populate_context() {
    const query = window.location.search;
    const params = new URLSearchParams(query);
    const type = params.get('type');
    const room = params.get('room');

    let title = document.getElementById("room");
    title.innerText = room;

    let usage = document.getElementById("usage");
    let book = document.getElementById("book");
    switch (type) {
        case "lecturehall":
            usage.innerText = "max. " + Math.ceil(Math.random() * 250);
            book.style.display = "none";
            break;
        case "studyroom":
            let lower = Math.ceil(Math.random() * 20)
            let higher = Math.ceil(Math.random() * 20) + lower;
            usage.innerText = lower + "/" + higher + " available";
            book.style.removeProperty("display");
            break;
    }

    let current_class = document.getElementById("current_class");
    current_class.innerText = "10.45: CS";

    let next_class = document.getElementById("next_class");
    next_class.innerText = "12.30: AI"
}

function start_route() {
    document.location.href = "nav.html"
}

function book_room(btn) {
    var today = new Date();
    var starttime = today.getHours() + ":" + today.getMinutes();
    var endtime = (today.getHours() + 1) + ":" + today.getMinutes();

    btn.innerText = "Room booked for " + starttime + " - " + endtime;
    btn.classList.add("btn-outline-dark");
    btn.classList.remove("btn-dark");
}