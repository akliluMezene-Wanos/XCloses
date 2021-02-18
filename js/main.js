let clothes = [];

function compareClothes(a, b) {
    if (a.clothesCode < b.clothesCode) return -1;
    if (a.clothesCode > b.clothesCode) return 1;

    if (a.manufacturerId < b.manufacturerId) return -1;
    if (a.manufacturerId > b.manufacturerId) return 1;

    return 0;

}

function updateClothes(index) {
    // will make AJAX request instead
    const req = new XMLHttpRequest();
    req.open("POST", "http://127.0.0.1:3000/clothes/PUT", true);
    // set headers
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // callback when the the request is served
    req.onload = () => {
        console.log("Data sent to the server");
        loadFromServer();
    }
    console.log("Updating data to the server");
    req.send("id=" + clothes[index].id + "&code=" + clothes[index].code + "&manufacturer_id=" + clothes[index].manufacturer_id + "&image_filename=" + clothes[index].image_filename + "&short_description=" + clothes[index].short_description + "&description_more=" + clothes[index].description_more );
}

function addClothes() {
    //will make AJAX request instead
    const req = new XMLHttpRequest();
    req.open("POST", "http://127.0.0:3000/clothes", true );
    //set headers
    req.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    //callback when the request is served
    req.onload = () => {
        console.log("data is sent to server");
        loadFromServer();
    }
    console.log("sending information to the server");
    req.send("&clothesCode=" + document.getElementById("clothesCode").value + "&manufacturerId=" + document.getElementById("manufacturerId").value + "&imageFilename=" + document.getElementById("imageFilename").value + "&shortDescription=" + document.getElementById("shortDescription").value + "&descriptionMore=" + document.getElementById("descriptionMore").value + "&availablePromo=" + document.getElementById("availablePromo").value);
    
    resetDataEntryFields();
} 

function resetDataEntryFields() {
    //reset form
    document.getElementById("clothesCode").value = "";
    document.getElementById("manufacturerId").value = "";
    document.getElementById("imageFilename").value = "";
    document.getElementById("shortDescription").value = "";
    document.getElementById("descriptionMore").value = "";
    document.getElementById("availablePromo").value = "";
}

function displayTableClothes() {
    clothes.sort(compareClothes);
    
    var body = document.getElementById("clothesTableBody");
    body.innerHTML = ""; //remove previous child elements


    for (var i = 0; i < clothes.length; i++) {
        var row = document.createElement("tr");

        var cell = document.createElement("td");
             cell.contentEditable = true;
             cell.addEventListener("input", (ev) => {
                 clothes[i].code = ev.target.innerHTML;
             });
             cell.innerHTML = clothes[i].clothesCode;
             row.appendChild(cell);

             cell = document.createElement("td");
             cell.contentEditable = true;
             cell.addEventListener("input", (ev) => {
                 clothes[i].code = ev.target.innerHTML;
             });
             cell.innerHTML = clothes[i].manufacturerId;
             row.appendChild(cell);

             cell = document.createElement("td");
             cell.contentEditable = true;
             cell.addEventListener("input", (ev) => {
                 clothes[i].code = ev.target.innerHTML;
             });
             cell.innerHTML = clothes[i].imageFilename;
             row.appendChild(cell);

             cell = document.createElement("td");
             cell.contentEditable = true;
             cell.addEventListener("input", (ev) => {
                 clothes[i].code = ev.target.innerHTML;
             });
             cell.innerHTML = clothes[i].shortDescription;
             row.appendChild(cell);

             cell = document.createElement("td");
             cell.contentEditable = true;
             cell.addEventListener("input", (ev) => {
                 clothes[i].code = ev.target.innerHTML;
             });
             cell.innerHTML = clothes[i].descriptionMore;
             row.appendChild(cell);

             cell = document.createElement("td");
             cell.contentEditable = true;
             cell.addEventListener("input", (ev) => {
                 clothes[i].code = ev.target.innerHTML;
             });
             cell.innerHTML = clothes[i].availablePromo;
             row.appendChild(cell);

             cell = document.createElement("td");
             let button = document.createElement("button");
             button.innerHTML = "Delete";
             button.addEventListener("click", (event) => {
                    deleteOnServer(clothes[i].id);
             });
             cell.appendChild(button);

             cell = document.createElement("td");
             button = document.createElement("button");
             button.innerHTML = "Update";
             button.addEventListener("click", () => {
                 updateClothes(i);
                });
                cell.appendChild(button);
                 row.appendChild(cell);

                 body.appendChild(row);
    }
}

function loadFromServer() {
    //AJAX request for the server
    const req = new XMLHttpRequest();
    req.open("GET", "http://127.0.0.1:3000/clothes");
    req.onload = function () {
                 if(req.status == 200) {
                     clothes = JSON.parse(req.response);
                     displayTableClothes();
                 } else {
                     clothes = [];
                     displayTableClothes();
                     console.error("Problem loading clothes " + req.status);
                 }

    };
    req.send;
}

function deleteOnServer(id) {
    console.log("Deleting from the server " + id);
    //AJAX request
    var req = new XMLHttpRequest();
    //Since DELETE method is not working
    //Instead we use GET and add the DELETE Path.
    req.open("GET", "http://127.0.0.1:300/clothes/DELETE/" + id);
    req.onload = function () {
        if (req.status == 200) {
            loadFromServer();
        } else {
            alert("could not deleting");
            console.error("Problem deleting from clothes " + req.status);
        }
    };
    req.send
}

function searchOnServer() {
    //AJAX request on the server
    var req = new XMLHttpRequest();
    var filter = document.getElementById("SearchOnCode").value;
    req.open("GET", "http://127.0.0.1:3000/clothes?code=" + filter);
    req.onload = function () {
     if (req.status == 200) {
         clothes = JSON.parse(req.response);
         displayTableClothes();
        } else {
            alert("Error searching");
            clothes = [];
            displayTableClothes();
            console.error("Problem loading: " + req.status);
        }
    };
    req.send;
}

