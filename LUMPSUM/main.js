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


function calculateFD() {
    try {
            var principal = parseFloat(document.getElementById('principal').value);
            var interestRate = parseFloat(document.getElementById('outputText').value);
            var tenure = parseFloat(document.getElementById('outputtext').value);
          
            var interest = (principal * interestRate * tenure) / 100;
            var totalAmount = principal + interest;
          
            // Display the total amount
        document.getElementById('output').innerHTML = 'Total Amount: ₹' + totalAmount.toFixed(2);

        let balanceData = [];

        // Populate balanceData with principal and interestRate
        balanceData.push(principal.toFixed(2));
        balanceData.push(interest.toFixed(2));

        // Display the pie chart
        displayChart(balanceData);

    } 
    catch (error) {
        console.error(error);
    }
}

var myChart;

function displayChart(balanceData) {
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
