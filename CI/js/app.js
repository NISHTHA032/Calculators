document.addEventListener("DOMContentLoaded", function () {
    // Estimated rate slider
    var estimatedRateSlider = document.getElementById("estimatedRateRange");
    var estimatedRateOutput = document.getElementById("outputRange");
    var estimatedRateOutputText = document.getElementById("outputText");

    estimatedRateOutput.innerHTML = estimatedRateSlider.value;
    estimatedRateOutputText.value = estimatedRateSlider.value;

    estimatedRateSlider.oninput = function () {
        estimatedRateOutput.innerHTML = this.value;
        estimatedRateOutputText.value = this.value;
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

function calculateGrowth() {
    try {
        const initialAmount = parseFloat(document.getElementById("initial").value);
        const estimatedRate = parseFloat(document.getElementById("outputText").value);
        const tenure = parseInt(document.getElementById("outputtext").value);
        const compoundInterval = parseInt(document.getElementById("compound").value);

        let balanceData = [];

        // Calculate compound interest and maturity amount
        const compoundInterest = initialAmount * Math.pow(1 + (estimatedRate / 100) / compoundInterval, compoundInterval * tenure) - initialAmount;
        const maturityAmount = initialAmount + compoundInterest;

        // Populate balanceData with initial amount and compound interest
        balanceData.push(initialAmount.toFixed(2));
        balanceData.push(compoundInterest.toFixed(2));

        // Display the compound result in the HTML
        document.getElementById("compoundresult").innerText = compoundInterest.toFixed(2);

        // Display the pie chart
        displayChart(balanceData);

    } catch (error) {
        console.error(error);
    }
}

var myChart;

function displayChart(balanceData) {
    var ctx = document.getElementById('chart').getContext('2d');

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Initial Amount', 'Compound Interest'],
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
