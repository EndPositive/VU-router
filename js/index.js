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

function searchByKeyword(keyword) {
    let newArray = [];
    let pattern = new RegExp(keyword.value.toUpperCase());
    lectureHalls.forEach(element => {
        if (pattern.test(toString(element))) {
            newArray.push(element);
        }
    });
    deleteOldTable();
    dynamic_table(newArray);
}

function filterByCategories(i, array, selected) {
    let newArray = array;
    if (i >= 0 && selected[i].value == "null") {
        return filterByCategories(--i, array, selected);
    }
    else if (i == 0) {
        newArray = array.filter(element => element.type == selected[i].value);
        return filterByCategories(--i, newArray, selected);
    }
    else if (i == 1) {
        newArray = array.filter(element => element.building == selected[i].value);
        return filterByCategories(--i, newArray, selected);
    }
    else if (i == 2) {
        newArray = array.filter(element => element.wing == selected[i].value);
        return filterByCategories(--i, newArray, selected);
    }
    else if (i == 3) {
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

    deleteOldTable();
    dynamic_table(newArray);
}

function setStudyRoomAttributes(tr, element) {
    tr.setAttribute("attr-type", element.type);
    tr.setAttribute("attr-building", element.building);
    tr.setAttribute("attr-wing", element.wing);
    tr.setAttribute("attr-floor", element.floor);
}

function deleteOldTable() {
    let section = document.getElementById("tableSection");
    let table = document.getElementById("table");
    if (table != null)
        section.removeChild(table);
}

function toString(element) {
    return element.building + "-" + element.floor + element.wing + element.room;
}
              
function dynamic_table(array) {
    if (array == null)
        return;
    var tableSection = document.getElementById('tableSection');
    var table = document.createElement('table');
    table.setAttribute("class", "table mb-0 roomlist");
    table.setAttribute("id", "table");

    array.forEach(element => {
        var text = document.createTextNode(toString(element));
        var tr = document.createElement('tr');
        var td = document.createElement('td');

        td.appendChild(text);
        tr.appendChild(td);

        if (array == studyRooms) {
            setStudyRoomAttributes(tr, element);
            var td = document.createElement('td');
            var text = document.createTextNode("(" + element.availability + "/" + element.total + ")");
            td.setAttribute("class","text-right");
            td.appendChild(text);
            tr.appendChild(td);
        }

        table.appendChild(tr);
    });
    tableSection.appendChild(table);
    document.body.insertBefore(tableSection, document.getElementsByTagName("footer")[0]);
}