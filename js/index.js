let lectureHalls = [{"building":"HG", "floor":"05", "wing": "A", "room":"01"},
                {"building":"HG", "floor":"04", "wing": "B", "room":"05"},
                {"building":"NU", "floor":"03", "wing": "C", "room":"10"},
                {"building":"HG", "floor":"02", "wing": "D", "room":"08"},
                {"building":"HG", "floor":"01", "wing": "E", "room":"01"},
                {"building":"TR", "floor":"00", "wing": "F", "room":"22"},
                {"building":"WN", "floor":"01", "wing": "KC", "room":"37"}];

let studyRooms = [{"building":"HG", "floor":"05", "wing": "A", "room":"01", "type":"1", "availability":"05", "total":"20"},
                {"building":"WN", "floor":"03", "wing": "F", "room":"56", "type":"2", "availability":"01", "total":"58"},
                {"building":"NU", "floor":"05", "wing": "G", "room":"32", "type":"1", "availability":"00", "total":"04"}]

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

// Make it an exclusive search, right now it selects if it contains the option, regardless of other selected options
function selectOption(option) {
    var newArray = [];
    var options = document.getElementsByTagName("option");
    for (let item of options) {
        if (item.selected) {
            studyRooms.forEach(element => {
                switch (item.value) {
                    case element.building: newArray.push(element); break;
                    case element.floor: newArray.push(element);break;
                    case element.wing: newArray.push(element);break;
                    case element.room: newArray.push(element);break;
                    case element.type: newArray.push(element);break;
                }
            });
        }
    }
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