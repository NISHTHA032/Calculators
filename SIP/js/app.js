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

function calculateSIP() {
    let monthlyInvestment = parseFloat(document.getElementById('principal').value);
    const interestRate = parseFloat(document.getElementById('outputText').value);
    const tenure = parseFloat(document.getElementById('outputtext').value);

    const monthlyInterestRate = interestRate / 1200;
    const totalMonths = tenure * 12;

    let totalAmount = 0;
    let balanceData = [];
    let totalInterest = 0;

    for (let month = 1; month <= totalMonths; month++) {
        totalAmount += monthlyInvestment;
        const interest = totalAmount * monthlyInterestRate;
        totalInterest += interest;
        totalAmount += interest;
        balanceData.push(totalAmount.toFixed(2));
    }

    // Calculate estimated returns
    const estReturns = totalInterest;

    // Display the estimated returns in the HTML
    const resultElement = document.getElementById("result");
    resultElement.innerText = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(estReturns);

    // Call the function to display the charts
    displayCharts(balanceData, totalInterest);
}

let pieChart; // Declare variables to store the Chart instances

function displayCharts(balanceData, totalInterest) {
    const totalInvestment = balanceData.length * parseFloat(document.getElementById('principal').value);

    const ctxPie = document.getElementById('pieChart').getContext('2d');

    // Check if there is an existing Chart instance for pie chart and destroy it
    if (pieChart) {
        pieChart.destroy();
    }

    pieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: ['Total Investment', 'Est Returns'],
            datasets: [{
                data: [totalInvestment, totalInterest],
                backgroundColor: ['#C99D3E', '#3AC5F4'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += new Intl.NumberFormat('en-IN', {
                                style: 'currency',
                                currency: 'INR'
                            }).format(context.parsed);
                            return label;
                        }
                    }
                }
            }
        }
    });
}
