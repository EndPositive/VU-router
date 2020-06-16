const restaurants = [{"name":"Restaurant HG", "opens":"09:00", "closes": "19:00", "availability":["very crowded","text-danger"], "description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."},
                    {"name":"Restaurant MF", "opens":"09:00", "closes": "16:30", "availability":["quiet","text-success"], "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
                    {"name":"Restaurant WN", "opens":"10:00", "closes": "18:00", "availability":["mildly crowded","text-primary"], "description":"Porttitor lacus luctus accumsan tortor posuere ac ut consequat."},
                    {"name":"Spar University", "opens":"08:30", "closes": "20:15", "availability":["very crowded","text-danger"], "description":"Vivamus arcu felis bibendum ut tristique et egestas quis."},
                    {"name":"Coffeebar HG", "opens":"09:15", "closes": "16:45", "availability":["crowded","text-danger"], "description":"Convallis a cras semper auctor neque vitae tempus quam."}];

function filterByKeyword(keyword) {
    let newArray = [];
    let pattern = new RegExp(keyword.value.toUpperCase());
    restaurants.forEach(element => {
        if (pattern.test(toString(element))) {
            newArray.push(element);
        }
    });
    deleteOldList();
    fillRestaurants(newArray);
}

function fillRestaurants(array) {
    if (!(array instanceof Array))
        return;
    let listSection = document.createElement("section");
    listSection.setAttribute("class", "px-3 flex-grow-1");
    listSection.setAttribute("id", "listSection");

    array.forEach(element => {
        let article = document.createElement('article');
        let title = document.createElement('h4');
        let openingHours = document.createElement('span');
        let availability = document.createElement('span');
        let description = document.createElement('p');

        article.setAttribute("class", "pt-3 border-bottom");
        article.setAttribute("onclick", "room_info('" + element.name + "')");

        openingHours.setAttribute("class", "mr-3");
        availability.setAttribute("class", "font-weight-bold " + element.availability[1]);

        title.innerText = element.name;
        description.innerText = element.description;
        openingHours.innerText = element.opens + " - " + element.closes;
        availability.innerText = element.availability[0];

        article.appendChild(title);
        article.appendChild(openingHours);
        article.appendChild(availability);
        article.appendChild(description);
        article.setAttribute("class", "pt-3 border-bottom");


        listSection.appendChild(article);
    });
    document.body.insertBefore(listSection, document.getElementsByTagName("footer")[0]);
}

function deleteOldList() {
    let section = document.getElementById("listSection");
    if (section != null) {
        document.body.removeChild(section);
    }
}

function toString(element) {
    return (element.name + element.opens + element.closes + element.availability[0] + element.description).toUpperCase();
}

function room_info(room, type) {
    window.location.href = "../routes/context.html?type=restaurant&room=" + room;
}