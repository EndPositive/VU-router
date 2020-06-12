let lectureHalls = [{"building":"HG", "floor":"05", "wing": "A", "room":"01"},
                {"building":"HG", "floor":"04", "wing": "B", "room":"05"},
                {"building":"NU", "floor":"03", "wing": "C", "room":"10"},
                {"building":"HG", "floor":"02", "wing": "D", "room":"08"},
                {"building":"HG", "floor":"01", "wing": "E", "room":"01"},
                {"building":"TR", "floor":"00", "wing": "F", "room":"22"},
                {"building":"WN", "floor":"01", "wing": "KC", "room":"37"}];

let studyRooms = [{"building":"HG", "floor":"05", "wing": "A", "room":"01", "type":"solo", "availability":"5", "total":"20"},
                {"building":"WN", "floor":"03", "wing": "F", "room":"56", "type":"group", "availability":"1", "total":"58"},
                {"building":"NU", "floor":"05", "wing": "G", "room":"32", "type":"solo", "availability":"0", "total":"4"}]

dynamic_table(lectureHalls);

function searchByKeyword(keyword) {
    var newArray = [];
    lectureHalls.forEach(element => {
        if (toString(element).includes(keyword.value.toUpperCase())) {
            newArray.push(element);
        }
    });
    deleteOldTable();
    dynamic_table(newArray);
}

function deleteOldTable() {
    let section = document.getElementById("tableSection");
    let table = document.getElementById("table");
    section.removeChild(table);
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

        table.appendChild(tr);
    });
    tableSection.appendChild(table);
    document.body.insertBefore(tableSection, document.getElementsByTagName("footer")[0]);
}

function toString(element) {
    return element.building + "-" + element.floor + element.wing + element.room;
}

//document.getElementById("button").addEventListener("click", dynamic_table);
