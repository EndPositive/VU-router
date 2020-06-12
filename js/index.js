let lectureHalls = [{"building":"HG", "floor":"05", "wing": "A", "room":"01", "type":"solo"},
                {"building":"HG", "floor":"04", "wing": "B", "room":"05", "type":"group"},
                {"building":"NU", "floor":"03", "wing": "C", "room":"10", "type":"solo"},
                {"building":"HG", "floor":"02", "wing": "D", "room":"08", "type":"group"},
                {"building":"HG", "floor":"01", "wing": "E", "room":"01", "type":"solo"},
                {"building":"TR", "floor":"00", "wing": "F", "room":"22", "type":"group"},
                {"building":"WN", "floor":"01", "wing": "KC", "room":"37", "type":"solo"}];

dynamic_table(lectureHalls);

function searchTable(keyword) {
    var newArray = [];
    lectureHalls.forEach(element => {
        if (toString(element).includes(keyword.value.toUpperCase())) {
            console.log(toString(element));
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
