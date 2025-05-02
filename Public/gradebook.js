//TODO: Fetch data from the PostgreSQL database (to be implemented later)
function fetchGradeData() {
    console.log("Fetching grade data...");
    let xhr = new XMLHttpRequest();
    let apiRoute = "/api/grades";
    xhr.onreadystatechange = function(){
        let results;
        if(xhr.readyState === xhr.DONE){
            if(xhr.status !== 200){
                console.error(`Could not get grades. Status: ${xhr.status}`);
                return;
            }
            const data = JSON.parse(xhr.responseText);
            populateGradebook(data)
        }
    }.bind(this);
    xhr.open("get", apiRoute, true);
    xhr.send();
}

//TODO: Populate the table with grade data
function populateGradebook(data) {
    console.log("Populating gradebook with data:", data);
    let tableElm = document.getElementById("gradebook");
        data.forEach(function(assignment){
            let row = document.createElement("tr");
            let columns = [];
            columns.name = document.createElement('td');
            columns.name.appendChild(
                document.createTextNode(assignment.last_name + ", " + assignment.first_name)
            );
            columns.grade = document.createElement('td');
            columns.grade.appendChild(
                document.createTextNode(assignment.total_grade)
            );
            row.appendChild(columns.name);
            row.appendChild(columns.grade);
            tableElm.appendChild(row);
        });
}

fetchGradeData();