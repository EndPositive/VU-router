let current_route = 0;
let max_routes = 3;

function populate_routes() {
    let next_button = document.getElementById("next_button");
    let prev_button = document.getElementById("prev_button");
    next_button.disabled = current_route === max_routes - 1;
    prev_button.disabled = current_route === 0;

    const path_to_route_image = random_path();

    let route_text = document.getElementById("route_text");
    route_text.textContent = "Route " + (current_route + 1);

    let ETA = document.getElementById("ETA");
    ETA.textContent = "ETA: " + (current_route * current_route + 3) + "min";

    let steps = document.getElementById("steps");
    steps.textContent = (current_route * current_route * 10 + 54) + " steps";

    let heat = document.getElementById("heat");
    heat.textContent = (current_route * 22 + 21) + " nearby";

    let route = document.getElementById("route");
    route.innerHTML = '<img src="' +  path_to_route_image + '" >';

}

function next_route() {
    if (current_route < max_routes - 1) {
        current_route++;
        populate_routes();
    }
}
function prev_route() {
    if (current_route > 0) {
        current_route--;
        populate_routes();
    }
}

function random_path() {
    const path = Math.floor(Math.random() * 100) % 4
    var path_to_route_image = "../routes/";
    switch (path) {
        case 0: 
            path_to_route_image += "route1.png"
            break;
        case 1:
            path_to_route_image += "route2.png"
            break;
        case 2:
            path_to_route_image += "route2.png"
            break;
        default:
            path_to_route_image += "route2.png"
            break;
    }
    console.log(path)
    console.log(path_to_route_image);
    return path_to_route_image;
}