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

let pieChartInstance = null;

function calculate() {
    try {
        const initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
        const annualReturnRate = parseFloat(document.getElementById('outputText').value);
        const investmentPeriod = parseInt(document.getElementById('outputtext').value);

        const monthlyReturnRate = (1 + annualReturnRate / 100) ** (1 / 12) - 1;
        const totalMonths = investmentPeriod * 12;

        const investmentData = Array.from({ length: totalMonths }, (_, month) => {
            const monthNumber = month + 1;
            const futureValue = initialInvestment * (1 + monthlyReturnRate) ** monthNumber;
            return futureValue;
        });

        // Calculate estimated returns
        const estReturns = investmentData[totalMonths - 1] - initialInvestment;

        // Display the estimated returns in the HTML
        document.getElementById("result").innerText = estReturns.toFixed(2);

        const pieChartData = [initialInvestment, estReturns];

        if (pieChartInstance) {
            pieChartInstance.destroy();
        }

        // Pie Chart
        const pieCtx = document.getElementById('pieChart').getContext('2d');
        pieChartInstance = new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: ['Invested Amount', 'Est Returns'],
                datasets: [{
                    data: pieChartData,
                    backgroundColor: ['#C99D3E', '#3AC5F4']
                }]
            }
        });
    } catch (error) {
        console.error(error);
    }
}
