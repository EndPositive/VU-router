let current_route = 0;
let max_routes = 3;

let route1 = {
    eta: 5,
    heat: 34,
    steps: 1,
    name: "route 1",
    path_to_route_image1: "../img/route1.png",
    path_to_route_image2: null
};
let route2 = {
    eta: 7,
    heat: 12,
    steps: 1,
    name: "route 2",
    path_to_route_image1: "../img/route2.png",
    path_to_route_image2: null
};
let route3 = {
    eta: 3,
    heat: 13,
    steps: 2,
    name: "route 3",
    path_to_route_image1: "../img/Down1from(128).png",
    path_to_route_image2: "../img/StairsToB52.png"
};

function newFooterWhenRouteStarts (ETAleft, stepsleft, heatleft) {
    return `
        <div class="d-flex justify-content-between flex-wrap">
            <p class="box-icon-white w-auto px-2 mr-2 mt-2 mb-0" id="ETA">ETA: ` + ETAleft + `</p>
            <p class="box-icon-white w-auto px-2 mr-2 mt-2 mb-0" id="steps">steps: ` + stepsleft + `</p>
            <p class="box-icon-white w-auto px-2 mr-2 mt-2 mb-0" id="heat">nearby: ` + heatleft + `</p>
            <button class="btn btn-success active mt-2 flex-grow-1" 
            `
            + ((stepsleft === 1) ? " onclick='go_home()'>End" : " onclick='next_step()'>Next step!" ) +
            `
            </button>
        </div>
    `
}

function populate_routes(curr_route) {
    if (curr_route == null) {curr_route = get_route()}
    let next_button = document.getElementById("next_button");
    let prev_button = document.getElementById("prev_button");
    next_button.disabled = current_route === max_routes - 1;
    prev_button.disabled = current_route === 0;

    let route_text = document.getElementById("route_text");
    route_text.textContent = "Route " + (current_route + 1);

    let ETA = document.getElementById("ETA");
    ETA.textContent = "ETA: " + (current_route * current_route + 3) + "min";

    let steps = document.getElementById("steps");
    steps.textContent = curr_route.steps + " steps";

    let heat = document.getElementById("heat");
    heat.textContent = (current_route * 22 + 21) + " nearby";

    let route = document.getElementById("route");
    route.innerHTML = '<img alt="route" src="' +  curr_route.path_to_route_image1 + '" style="width: 100%; ">';
}

function next_route() {
    if (current_route < max_routes - 1) {
        current_route++;
        populate_routes(get_route());
    }
}
function prev_route() {
    if (current_route > 0) {
        current_route--;
        populate_routes(get_route());
    }
}

function get_route() {
    switch (current_route) {
        case 0:
            return route1;
        case 1:
            return route2;
        case 2:
            return route3;
    }
    return null;
}

function start_route() {
    let route = get_route(); //number is stored here
    let route_select= document.getElementById("route_selector");
    let routehtml = document.getElementById("route");
    routehtml.innerHTML = '<img alt="route" src="' +  route.path_to_route_image1 + '" style="width: 100%; ">';
    route_select.innerHTML = newFooterWhenRouteStarts(route.eta, route.steps, route.heat); //make footer do new stuff :O
}

function next_step() {
    let route = get_route();
    route.steps --;
    let routehtml = document.getElementById("route");
    let route_select= document.getElementById("route_selector");
    routehtml.innerHTML = '<img alt="route" src="' +  route.path_to_route_image2 + '" style="width: 100%; ">';
    route_select.innerHTML = newFooterWhenRouteStarts(route.eta/2, route.steps, route.heat/2); //make footer do new stuff :O
}

function go_home() {
    window.alert("Sending you to the home page...");
    location.href="../index.html";
}