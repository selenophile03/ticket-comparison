// Hardcoded Local Database Grid Arrays
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

// Event Handling Hook
document.getElementById("ticketForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var fromStation = document.getElementById("origin").value;
    var toStation = document.getElementById("destination").value;
    
    var alertBox = document.getElementById("alert-box");
    var errorBox = document.getElementById("error-box");
    var table = document.getElementById("resultsTable");
    var tbody = document.getElementById("tableData");

    // Reset layout visibility structures
    alertBox.style.display = "none";
    errorBox.style.display = "none";
    table.style.display = "none";
    tbody.innerHTML = "";

    // Validation matching checks
    if (fromStation === toStation) {
        alert("Error: Origin and Destination can't match.");
        return;
    }

    // Filter loops array records match
    var matches = [];
    for (var i = 0; i < trainDatabase.length; i++) {
        if (trainDatabase[i].from === fromStation && trainDatabase[i].to === toStation) {
            matches.push(trainDatabase[i]);
        }
    }

    // Checking if route length exist
    if (matches.length === 0) {
        errorBox.innerText = "No routes found for the selected stations.";
        errorBox.style.display = "block";
        return;
    }

    // Standard JavaScript Bubble sort loop logic to find absolute cheapest item
    for (var x = 0; x < matches.length; x++) {
        for (var y = 0; y < matches.length - 1; y++) {
            if (matches[y].cost > matches[y + 1].cost) {
                var temp = matches[y];
                matches[y] = matches[y + 1];
                matches[y + 1] = temp;
            }
        }
    }

    // The first item in sorted array index is the cheapest value match
    var absoluteCheapest = matches[0];
    alertBox.innerHTML = "<b>Cheapest Choice:</b> " + absoluteCheapest.name + " ($" + absoluteCheapest.cost.toFixed(2) + ")";
    alertBox.style.display = "block";

    // Populate rows output manually
    for (var k = 0; k < matches.length; k++) {
        var row = document.createElement("tr");
        
        // Highlight first item row explicitly
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
