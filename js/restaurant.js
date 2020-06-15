const restaurants = [{"name":"Restaurant HG", "opens":"09:00", "closes": "19:00", "availability":["very crowded","text-danger"], "description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."},
                    {"name":"Restaurant MF", "opens":"09:00", "closes": "16:30", "availability":["quiet","text-success"], "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
                    {"name":"Restaurant WN", "opens":"10:00", "closes": "18:00", "availability":["mildly crowded","text-primary"], "description":"Porttitor lacus luctus accumsan tortor posuere ac ut consequat."},
                    {"name":"Spar University", "opens":"08:30", "closes": "20:15", "availability":["very crowded","text-danger"], "description":"Vivamus arcu felis bibendum ut tristique et egestas quis."},
                    {"name":"Coffeebar HG", "opens":"09:15", "closes": "16:45", "availability":["crowded","text-danger"], "description":"Convallis a cras semper auctor neque vitae tempus quam."}];

// Make: <article class="pt-3 border-bottom"> for each restaurant
// Make: <h4>Restaurant 1</h4> for each restaurant
// Make: <span class="mr-3">09.00 - 16.30</span> for each time span
// Make: <span class="font-weight-bold text-danger">very crowded</span> for every availability
// Make: <p></p> for every decription

function fillRestaurants(array) {
    if (!(array instanceof Array))
        return;
    let listSection = document.getElementById('listSection');

    array.forEach(element => {
        let article = document.createElement('atricle');
        let title = document.createElement('h4');
        let openingHours = document.createElement('span');
        let availability = document.createElement('span');
        let description = document.createElement('p');

        article.setAttribute("class", "pt-3 border-bottom");
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
