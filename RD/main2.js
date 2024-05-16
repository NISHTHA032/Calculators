
document.addEventListener("DOMContentLoaded", function () {
    // Interest rate slider
    var interestRateSlider = document.getElementById("interestRateRange");
    var interestRateOutput = document.getElementById("outputRange");
    var interestRateOutputText = document.getElementById("outputText");

    interestRateOutput.innerHTML = interestRateSlider.value;
    interestRateOutputText.value = interestRateSlider.value;

    interestRateSlider.oninput = function () {
        interestRateOutput.innerHTML = this.value;
        interestRateOutputText.value = this.value;
    };

    // Tenure slider
    var tenureSlider = document.getElementById("tenure");
    var tenureOutput = document.getElementById("outputrange");
    var tenureOutputText = document.getElementById("outputtext");

    tenureOutput.innerHTML = tenureSlider.value;
    tenureOutputText.value = tenureSlider.value;

    tenureSlider.oninput = function () {
        tenureOutput.innerHTML = this.value;
        tenureOutputText.value = this.value;
    };
});


function calculateRD() {
    let principal = parseFloat(document.getElementById('principal').value);
    let interestRate = parseFloat(document.getElementById('outputText').value);
    let tenure = parseFloat(document.getElementById('outputtext').value);

    let monthlyInterestRate = interestRate / 1200; // Convert annual rate to monthly rate
    let totalMonths = tenure * 12; // Convert tenure to months

    let totalAmount = 0;

    for (let month = 1; month <= totalMonths; month++) {
        totalAmount += principal;
        totalAmount += totalAmount * monthlyInterestRate;
    }

    // Display the result
    document.getElementById('output').innerHTML = 'Total Amount: ₹' + totalAmount.toFixed(2);

    displayChart([principal, totalAmount - principal]); // Corrected function call
}

var myChart;

function displayChart(balanceData) { // Corrected function name
    var ctx = document.getElementById('myChart').getContext('2d');

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Principal', 'Interest'],
            datasets: [{
                data: balanceData,
                backgroundColor: ['#C99D3E', '#3AC5F4'],
            }]
        },
        options: {
            responsive: true,
        }
    });
}


