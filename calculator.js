
const necCableData = [
    ["14", { "maxAmps60": 20, "maxAmps75": 25, "maxAmps90": 30, "res": 2.525}],
    ["12", { "maxAmps60": 25, "maxAmps75": 30, "maxAmps90": 35, "res": 1.588}],
    ["10", { "maxAmps60": 30, "maxAmps75": 35, "maxAmps90": 40, "res": 0.9989 }],
    ["8", { "maxAmps60": 40, "maxAmps75": 50, "maxAmps90": 55, "res": 0.6282 }],
    ["6", { "maxAmps60": 55, "maxAmps75": 65, "maxAmps90": 75, "res": 0.3951 }],
    ["4", { "maxAmps60": 70, "maxAmps75": 85, "maxAmps90": 95, "res": 0.2485 }],
    ["3", { "maxAmps60": 85, "maxAmps75": 100, "maxAmps90": 110, "res": 0.1970 }],
    ["2", { "maxAmps60": 95, "maxAmps75": 115, "maxAmps90": 130, "res": 0.1563 }],
    ["1", { "maxAmps60": 110, "maxAmps75": 130, "maxAmps90": 150, "res": 0.1239}],
    ["1/0", { "maxAmps60": 125, "maxAmps75": 150, "maxAmps90": 170, "res": 0.09827 }],
    ["2/0", { "maxAmps60": 145, "maxAmps75": 175, "maxAmps90": 195, "res": 0.07793}],
    ["3/0", { "maxAmps60": 165, "maxAmps75": 200, "maxAmps90": 225, "res": 0.06180 }],
    ["4/0", { "maxAmps60": 195, "maxAmps75": 230, "maxAmps90": 260, "res": 0.04901 }],
    ["250", { "maxAmps60": 215, "maxAmps75": 255, "maxAmps90": 290, "res": 2.525 }],
    ["300", { "maxAmps60": 240, "maxAmps75": 285, "maxAmps90": 320, "res": 2.525 }],
    ["350", { "maxAmps60": 260, "maxAmps75": 310, "maxAmps90": 350, "res": 2.525 }],
    ["400", { "maxAmps60": 280, "maxAmps75": 335, "maxAmps90": 380, "res": 2.525 }],
    ["500", { "maxAmps60": 320, "maxAmps75": 380, "maxAmps90": 430, "res": 2.525 }],
    
    
    
    
    
    // Further wire sizes can be added as needed
];



const tbody = document.getElementById('cableTable').getElementsByTagName('tbody')[0];
necCableData.forEach(data => {
    const row = tbody.insertRow();
    row.id = `row-${data[0]}`; // Assign an ID to each row

    // Add wire size
    const cell1 = row.insertCell(0);
    cell1.innerHTML = data[0];

    // Add maxAmps60
    const cell2 = row.insertCell(1);
    cell2.innerHTML = data[1].maxAmps60;

    // Add maxAmps75
    const cell3 = row.insertCell(2);
    cell3.innerHTML = data[1].maxAmps75;

    // Add maxAmps90
    const cell4 = row.insertCell(3);
    cell4.innerHTML = data[1].maxAmps90;
});
let termRatingUserInput = false;
let lastAmps;
let cableResistance;
let threePhase;
let voltage;
let amps;
let lenghtInput;
let maxVoltageDrop;
function calculateCableSize() {
    lenghtInput =parseInt(document.getElementById("lengthInput").value);
    let powerInput = parseInt(document.getElementById("num1").value);
    voltage = parseInt(document.getElementById("VoltageSelect").value);
    threePhase = document.getElementById("inputThreePhase").checked;
    let powerUnit = document.getElementById("powerUnitSelect").value;
    maxVoltageDrop =parseInt(document.getElementById("maxVoltageDrop").value);
     amps = 0;
    let powerW = 0;
    let powerVA = 0;
    let tempRating = document.getElementById("termRatingSelect").value;
console.log(threePhase);

    // Remove any existing highlight
    const highlightedRow = document.querySelector('.green-highlight'); // Add a dot before the class name

    if (highlightedRow) {
        highlightedRow.classList.remove('green-highlight');
    }

if(powerUnit == "KW"){
    powerInput = powerInput*1000;
}
    
// Calculate Power from User Input:
switch (powerUnit) {
    case "A":
      amps = powerInput;
      if (threePhase) {
        powerW = amps * voltage * Math.sqrt(3);
        powerVA = powerW; // Assuming power factor of 1 for simplicity
      } else {
        powerW = amps * voltage;
        powerVA = powerW; // Assuming power factor of 1 for simplicity
      }
      break;
    case "W":
      powerW = powerInput;
      if (threePhase) {
        powerVA = powerW; // Assuming power factor of 1 for simplicity
        amps = powerW / (voltage * Math.sqrt(3));
      } else {
        powerVA = powerW; // Assuming power factor of 1 for simplicity
        amps = powerW / voltage;
      }
      case "KW":
        powerW = powerInput;
        if (threePhase) {
          powerVA = powerW; // Assuming power factor of 1 for simplicity
          amps = powerW / (voltage * Math.sqrt(3));
        } else {
          powerVA = powerW; // Assuming power factor of 1 for simplicity
          amps = powerW / voltage;
        }
      break;
    case "VA":
      powerVA = powerInput;
      if (threePhase) {
        powerW = powerVA; // Assuming power factor of 1 for simplicity
        amps = powerVA / (voltage * Math.sqrt(3));
      } else {
        powerW = powerVA; // Assuming power factor of 1 for simplicity
        amps = powerVA / voltage;
      }
      break;


  }
  if(lastAmps != amps){
    termRatingUserInput=false;
  }
        //stablize units:
        lastAmps=amps;
        amps=amps.toFixed(1);
        powerW=powerW.toFixed(1);
        powerVA=powerVA.toFixed(1);
  
//Update term rating based on Amps
if(termRatingUserInput==false){
    if(amps >100){
        document.getElementById("termRatingSelect").value=75;
    }
    else{
        document.getElementById("termRatingSelect").value=60;
    }
}
tempRating = document.getElementById("termRatingSelect").value;


  console.log("Amps: " + amps + " Watts: " + powerW + " VA: " + powerVA);


    let cableSize;
    let maxAmps;
    let prevMaxAmps=0;
    let ampsRange;
    let ampsinRange;


    //Update reultsValues
    document.getElementById("resultsVoltage").innerHTML = voltage+ " (V)";
    document.getElementById("resultsAmps").innerHTML = amps + " (A)";
    if(powerW <1000){
        document.getElementById("resultsPower").innerHTML = powerW + " (W)";
    }
    else{
        document.getElementById("resultsPower").innerHTML = (powerW/1000).toFixed(1) + " (KW)";
    }

//Cable sizing Logic
// Store a multiplier
let sets = 1;

while (true) { // Keep looping until a suitable cable size is found or some exit condition is met
    for (let i = 0; i < necCableData.length; i++) {
        let key = necCableData[i][0];
        let data = necCableData[i][1];

        maxAmps = data[`maxAmps${tempRating}`] * sets;

        if (amps <= maxAmps) {
            cableSize = key;
            cableResistance=data.res;
            // Determine the column to highlight based on the temperature rating
            let columnIndex = 0;
            switch (tempRating) {
                case "60":
                    columnIndex = 1;
                    break;
                case "75":
                    columnIndex = 2;
                    break;
                case "90":
                    columnIndex = 3;
                    break;
                default:
                    columnIndex = 1; // Default to maxAmps60 if no valid tempRating provided
            }
            // Highlight the appropriate cell
            const cellToHighlight = document.getElementById(`row-${cableSize}`).cells[columnIndex];
            if (cellToHighlight) {
                cellToHighlight.classList.add('green-highlight'); // or 'bg-warning'
                cellToHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            break; // Stop the loop once a suitable cable size is found
        }

        prevMaxAmps = maxAmps;  // update the previous max amps
    }

    if (cableSize) {
        break; // Exit the while loop if a suitable cable size is found
    }

    sets ++; // Double the multiplier

    if(sets>100){console.log("Abort Calc, Amps to High!");
        break;}

}
    if(cableSize) {
        console.log(sets);
        ampsRange = maxAmps - prevMaxAmps;
        ampsinRange = amps - prevMaxAmps;
        let progressBar = document.querySelector('.progress-bar');
        let cableCapacity = Math.round((ampsinRange/ampsRange) * 100);
        document.getElementById("resultCable").innerHTML = cableSize;
        if(sets>1){document.getElementById("resultCableUnit").innerHTML = "X "+sets + " Parallel Runs";}
        else{document.getElementById("resultCableUnit").innerHTML = ""}
        document.getElementById("capacityLow").textContent = prevMaxAmps;
        document.getElementById("capacityHigh").textContent = maxAmps;
        document.getElementById("progressBar").setAttribute('aria-valuenow', amps);
        progressBar.style.width = `${cableCapacity}%`;
        progressBar.innerText = `${cableCapacity}%`;
    
        progressBar.classList.remove('bg-success', 'bg-warning', 'bg-danger'); // Remove any existing class
    
        if (cableCapacity > 85) {
            progressBar.classList.add('bg-danger');
        }
        else if(cableCapacity > 75) {
            progressBar.classList.add('bg-warning');
        }
        else {
            progressBar.classList.add('bg-success');
        }



        voltageDrop();

    } else {//This runs if no cable sizes are found

        document.getElementById("resultCable").textContent = 'X';
    }

    
}

document.addEventListener('keydown', function(event) {
    if (event.keyCode === 13 || event.key === 'Enter') {
        event.preventDefault();
        calculateCableSize();
        return false;
    }
});


function termRating() {
    termRatingUserInput =true;
    calculateCableSize();

}



//Listeners:
// Attach a change event listener to the input elements and selectors.
document.getElementById("num1").addEventListener("change", calculateCableSize);
document.getElementById("VoltageSelect").addEventListener("change", calculateCableSize);
document.getElementById("termRatingSelect").addEventListener("change", termRating);
document.getElementById("inputSinglePhase").addEventListener("change", calculateCableSize);
document.getElementById("inputThreePhase").addEventListener("change", calculateCableSize);


calculateCableSize();
var myChart;
var voltageDropPercentChart;

function voltageDrop() {
    // Define the arrays to hold the lengths and voltage drops
    let lengths = [0];
    let voltageDrops = [voltage];
    let voltageDropPercents = [0]; 
    let maxVoltageDrops = [maxVoltageDrop]; 
    let voltageDrop;
    let endVoltage;
    let voltageDropPercent;
  
    // Loop through 10 different lengths
    console.log(lenghtInput);
    for (let i = 1; i <= 10; i++) {
      let length = i * lenghtInput/10; // You can change this to have different length values

      // single-phase calc
      if (threePhase) {
        console.log("Three Phase Code");
      } else {
        voltageDrop = 2 * (length) * (cableResistance / 1000) * amps;
        console.log("Voltage Drop at length " + length + " is: " + voltageDrop);
      }
  
      // Add the length and voltage drop to the arrays
      lengths.push(length);
      endVoltage = voltage-voltageDrop;
      voltageDropPercent = (voltageDrop/voltage)*100;
      voltageDrops.push(endVoltage);
      voltageDropPercents.push(voltageDropPercent.toFixed(2));
      maxVoltageDrops.push(maxVoltageDrop);


    }
    document.getElementById("resultsVoltageDropPercent").textContent = voltageDropPercent.toFixed(2) +"%";
    document.getElementById("resultsVoltageDropVoltage").textContent = endVoltage.toFixed(2) +" V";
    document.getElementById("resultsVoltageDropCable").textContent = endVoltage;

  
    // Chart configuration

    var ctx = document.getElementById('myChart').getContext('2d');
    if (myChart) {
        myChart.destroy();
      }
     myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: lengths, // Use the lengths array for the x-axis
        datasets: [{
          label: 'End Voltage',
          data: voltageDrops, // Use the voltageDrops array for the y-axis
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
    ]
      },
      options: {
        aspectRatio: 3,
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });

    //Voltage Drop % Chart
    var ctx = document.getElementById('voltageDropPercentChart').getContext('2d');
    if (voltageDropPercentChart) {
        voltageDropPercentChart.destroy();
      }
     voltageDropPercentChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: lengths, // Use the lengths array for the x-axis
        datasets: [{
          label: '% Voltage Drop',
          data: voltageDropPercents, //Y-Axis
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
            label: '% Voltage Drop',
            data: maxVoltageDrops, //Y-Axis
            backgroundColor: '#8E0129',
            borderColor: '#8E0129',
            borderWidth: 1
          }
    ]
      },
      options: {
        aspectRatio: 3,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });





  }
  


