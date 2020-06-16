const lectureHalls = [{"building":"HG", "floor":"05", "wing": "A", "room":"01"},
                {"building":"HG", "floor":"04", "wing": "B", "room":"05"},
                {"building":"NU", "floor":"03", "wing": "C", "room":"10"},
                {"building":"HG", "floor":"02", "wing": "D", "room":"08"},
                {"building":"HG", "floor":"01", "wing": "E", "room":"01"},
                {"building":"TR", "floor":"00", "wing": "F", "room":"22"},
                {"building":"WN", "floor":"01", "wing": "KC", "room":"37"}];

const studyRooms = [{"building":"HG", "floor":"05", "wing": "A", "room":"01", "type":"true", "availability":"05", "total":"20"},
                {"building":"WN", "floor":"03", "wing": "F", "room":"56", "type":"false", "availability":"01", "total":"58"},
                {"building":"NU", "floor":"01", "wing": "F", "room":"32", "type":"true", "availability":"00", "total":"04"},
                {"building":"HG", "floor":"01", "wing": "B", "room":"32", "type":"true", "availability":"21", "total":"45"},
                {"building":"TR", "floor":"04", "wing": "C", "room":"32", "type":"false"    , "availability":"23", "total":"31"},
                {"building":"WN", "floor":"02", "wing": "A", "room":"32", "type":"true", "availability":"01", "total":"04"}]

function filterByKeyword(keyword) {
    let newArray = [];
    let pattern = new RegExp(keyword.value.toUpperCase());
    lectureHalls.forEach(element => {
        if (pattern.test(toString(element))) {
            newArray.push(element);
        }
    });
    refreshTable(newArray);
}

function filterByCategories(i, array, selected) {
    let newArray = array;
    if (i >= 0 && selected[i].value == "null") {
        return filterByCategories(--i, array, selected);
    }
    else switch (i) {
        case 0:
            newArray = array.filter(element => element.type == selected[i].value);
            return filterByCategories(--i, newArray, selected);
        case 1:
            newArray = array.filter(element => element.building == selected[i].value);
            return filterByCategories(--i, newArray, selected);
        case 2:
            newArray = array.filter(element => element.wing == selected[i].value);
            return filterByCategories(--i, newArray, selected);
        case 3:
            newArray = array.filter(element => element.floor == selected[i].value);
            return filterByCategories(--i, newArray, selected);
    }
    return newArray;
}

function selectOption() {
    let newArray, selected = [];
    for (let item of document.getElementsByTagName("option")) {
        if (item.selected)
            selected.push(item);
    }

    newArray = filterByCategories(selected.length - 1, studyRooms, selected);
    refreshTable(newArray);
}

function setStudyRoomAttributes(tr, element, type) {
    tr.setAttribute("attr-type", element.type);
    tr.setAttribute("attr-building", element.building);
    tr.setAttribute("attr-wing", element.wing);
    tr.setAttribute("attr-floor", element.floor);
    tr.setAttribute("onclick", "room_info('" + toString(element) + "', '" + type + "')");
}

function deleteOldTable() {
    let section = document.getElementById("tableSection");
    let table = document.getElementById("table");
    if (table != null)
        section.removeChild(table);
}

function createNewTable(array) {
    if (!(array instanceof Array))
        return;
    let tableSection = document.getElementById('tableSection');
    let table = document.createElement('table');
    table.setAttribute("class", "table mb-0 roomlist");
    table.setAttribute("id", "table");

    array.forEach(element => {
        let text = document.createTextNode(toString(element));
        let tr = document.createElement('tr');
        let td = document.createElement('td');

        td.appendChild(text);
        tr.appendChild(td);

        if (array == studyRooms) {
            setStudyRoomAttributes(tr, element, "studyroom");
            td = document.createElement('td');
            text = document.createTextNode("(" + element.availability + "/" + element.total + ")");
            td.setAttribute("class","text-right");
            td.appendChild(text);
            tr.appendChild(td);
        } else {
            setStudyRoomAttributes(tr, element, "lecturehall");
        }

        table.appendChild(tr);
    });
    tableSection.appendChild(table);
    document.body.insertBefore(tableSection, document.getElementsByTagName("footer")[0]);
}

function refreshTable(array) {
    deleteOldTable();
    createNewTable(array);
}

function toString(element) {
    return element.building + "-" + element.floor + element.wing + element.room;
}

function room_info(room, type) {
    window.location.href = "../routes/context.html?type=" + type + "&room=" + room;
}

function emergency() {
    alert("AN EMERGENCY SIGNAL HAS BEEN SENT OUT. Please press to `OK` to select an evacuation route.");
    window.location.href="routes/nav.html";
}