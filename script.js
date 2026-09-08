var trainDatabase = [
    { name: "National Rail Express", from: "London", to: "Manchester", time: "2h 15m", cost: 42.50 },
    { name: "Virgin Intercity", from: "London", to: "Manchester", time: "2h 45m", cost: 28.00 },
    { name: "CrossCountry Saver", from: "London", to: "Manchester", time: "3h 10m", cost: 22.00 },
    
    { name: "Midlands Transit", from: "Manchester", to: "London", time: "2h 50m", cost: 25.50 },
    { name: "Avanti West Coast", from: "Manchester", to: "London", time: "2h 08m", cost: 55.00 },

    { name: "West Midlands Trains", from: "London", to: "Birmingham", time: "1h 45m", cost: 15.00 },
    { name: "Chiltern Railways", from: "London", to: "Birmingham", time: "2h 00m", cost: 12.50 },

    { name: "Northern Rail Regional", from: "Liverpool", to: "Manchester", time: "0h 50m", cost: 8.50 },
    { name: "TransPennine Express", from: "Liverpool", to: "Manchester", time: "0h 35m", cost: 14.00 }
];

document.getElementById("ticketForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var fromStation = document.getElementById("origin").value;
    var toStation = document.getElementById("destination").value;
    
    var alertBox = document.getElementById("alert-box");
    var errorBox = document.getElementById("error-box");
    var table = document.getElementById("resultsTable");
    var tbody = document.getElementById("tableData");

    alertBox.style.display = "none";
    errorBox.style.display = "none";
    table.style.display = "none";
    tbody.innerHTML = "";

    if (fromStation === toStation) {
        alert("Error: Origin and Destination can't match.");
        return;
    }

    var matches = [];
    for (var i = 0; i < trainDatabase.length; i++) {
        if (trainDatabase[i].from === fromStation && trainDatabase[i].to === toStation) {
            matches.push(trainDatabase[i]);
        }
    }

    if (matches.length === 0) {
        errorBox.innerText = "No routes found for the selected stations.";
        errorBox.style.display = "block";
        return;
    }

    for (var x = 0; x < matches.length; x++) {
        for (var y = 0; y < matches.length - 1; y++) {
            if (matches[y].cost > matches[y + 1].cost) {
                var temp = matches[y];
                matches[y] = matches[y + 1];
                matches[y + 1] = temp;
            }
        }
    }

    var absoluteCheapest = matches[0];
    alertBox.innerHTML = "<b>Cheapest Choice:</b> " + absoluteCheapest.name + " ($" + absoluteCheapest.cost.toFixed(2) + ")";
    alertBox.style.display = "block";

    for (var k = 0; k < matches.length; k++) {
        var row = document.createElement("tr");
        
        if (k === 0) {
            row.className = "cheapest-row";
        }

        var colName = document.createElement("td");
        colName.innerText = matches[k].name + (k === 0 ? " [CHEAPEST]" : "");
        
        var colRoute = document.createElement("td");
        colRoute.innerText = matches[k].from + " to " + matches[k].to;
        
        var colTime = document.createElement("td");
        colTime.innerText = matches[k].time;
        
        var colPrice = document.createElement("td");
        colPrice.innerText = "$" + matches[k].cost.toFixed(2);

        row.appendChild(colName);
        row.appendChild(colRoute);
        row.appendChild(colTime);
        row.appendChild(colPrice);
        tbody.appendChild(row);
    }

    table.style.display = "table";
});
