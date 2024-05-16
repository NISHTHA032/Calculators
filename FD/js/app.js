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
        const principal = parseInt(document.getElementById("principal").value);
        const interestRate = parseFloat(document.getElementById("outputText").value);
        const tenure = parseInt(document.getElementById("outputtext").value);
        const compoundType = parseInt(document.getElementById("compound").value);

        let balanceData = [];

        // Calculate interest and maturity amount based on compound type
        let interest;
        if (compoundType === 4) {
            // Simple Interest
            interest = (principal * interestRate * tenure) / 100;
        } else {
            // Compound Interest
            const n = compoundType === 1 ? 1 : compoundType === 2 ? 4 : 2; // yearly, quarterly, half-yearly
            const r = interestRate / (n * 100);
            const nt = n * tenure;
            interest = principal * (Math.pow(1 + r, nt) - 1);
        }

        const maturityAmount = principal + interest;

        // Populate balanceData with principal and interest
        balanceData.push(principal.toFixed(2));
        balanceData.push(interest.toFixed(2));

        // Display the interest result in the HTML
        document.getElementById("interestresult").innerText = interest.toFixed(2);

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
