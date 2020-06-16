let current_route = 0;
let current_step = 0;

let routes = [
    {
        heat: 34,
        name: "route 1",
        steps: [
            {
                eta: 5,
                text: "Turn left",
                image: [
                    "../img/route1.png"
                ]
            },
        ]
    },
    {
        heat: 12,
        name: "route 2",
        steps: [
            {
                eta: 7,
                text: "Turn left1",
                image: [
                    "../img/route2.png"
                ]
            },
        ]
    },
    {
        heat: 13,
        name: "route 3",
        steps: [
            {
                eta: 2,
                text: "Turn left1",
                image: [
                    "../img/Down1from(128).png",
                ]
            },
            {
                eta: 1,
                text: "Turn left2",
                image: [
                    "../img/StairsToB52.png"
                ]
            },
        ],
    }
]

routes.sort(function(a, b) {
    return b.steps[0].eta - a.steps[0].eta;
});

function populate_options() {
    let next_button = document.getElementById("next_button");
    let prev_button = document.getElementById("prev_button");
    next_button.disabled = current_route === routes.length - 1;
    prev_button.disabled = current_route === 0;

    let route_text = document.getElementById("route_text");
    route_text.textContent = "Route " + (current_route + 1);

    let ETA = document.getElementById("ETA");
    ETA.textContent = "ETA: " + routes[current_route].steps[0].eta + "min";

    let heat = document.getElementById("heat");
    heat.textContent = (current_route * 22 + 21) + " people nearby";

    let map = document.getElementById("map");
    map.src = routes[current_route].steps[0].image;
}

function populate_routes() {
    let map = document.getElementById("map");
    map.src = routes[current_route].steps[current_step].image;

    let route_select = document.getElementById("route_selector");
    route_select.innerHTML = newFooterWhenRouteStarts(routes[current_route]);
    feather.replace();

    let prev_step_button = document.getElementById("prev_step_button");
    prev_step_button.disabled = current_step === 0;
}

function populate_end() {
    let route = document.getElementById("route");
    route.innerHTML = "PLACEHOLDER FOR MAP WITH ONLY PLACE ICON"

    let route_select = document.getElementById("route_selector");
    route_select.innerHTML = newFooterWhenRouteEnds();
    feather.replace();
}

function next_route() {
    if (current_route < routes.length - 1) {
        current_route++;
        populate_options();
    }
}
function prev_route() {
    if (current_route > 0) {
        current_route--;
        populate_options();
    }
}
function next_step() {
    let route = routes[current_route];
    if (current_step < route.steps.length - 1) {
        current_step++;
        populate_routes();
    } else {
        populate_end();
    }
}
function prev_step() {
    if (current_step > 0) {
        current_step--;
        populate_routes();
    }
}

function newFooterWhenRouteStarts (route) {
    return `
        <div class="d-flex justify-content-between align-items-center">
            <button onclick="prev_step()" class="btn btn-dark btn-lg active" role="button" id="prev_step_button"><i class="text-white" data-feather="arrow-left"></i></button>
            <h3 class="text-white" id="route_text">` + route.steps[current_step].text + `</h3>
            <button onclick="next_step()" class="btn btn-dark btn-lg active" role="button" id="next_step_button"><i class="text-white" data-feather="arrow-right"></i></button>
        </div>
        <div class="d-flex justify-content-between flex-wrap">
            <p class="box-icon-white w-auto px-2 mr-2 mt-2 mb-0" id="ETA">ETA: ` + route.steps[0].eta + `min</p>
            <a href="choose.html" class="box-icon-white w-auto px-2 mr-2 mt-2 mb-0"><i class="text-dark" data-feather="x"></i></a>
        </div>
    `
}

function newFooterWhenRouteEnds () {
    return `
        <div class="d-flex justify-content-between align-items-center">
            <h3 class="text-white p-0 m-0" id="route_text">Destination reached!</h3>
            <a href="../index.html" class="box-icon-white w-auto px-2 mr-2 mt-2 mb-0"><i class="text-dark" data-feather="x"></i></a>
        </div>
    `
}