document.addEventListener("DOMContentLoaded", function () {
    var interestRateSlider = document.getElementById("interestRateRange");
    var interestRateOutput = document.getElementById("outputRange");
    var interestRateOutputText = document.getElementById("outputText");

    interestRateOutput.innerHTML = interestRateSlider.value;
    interestRateOutputText.value = interestRateSlider.value;

    interestRateSlider.oninput = function () {
        interestRateOutput.innerHTML = this.value;
        interestRateOutputText.value = this.value;
    };

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
        const principal = parseFloat(document.getElementById("principal").value);
        const interestRate = parseFloat(document.getElementById("outputText").value);
        const tenure = parseInt(document.getElementById("outputtext").value);

        const monthlyInterestRate = interestRate / 1200;
        const totalMonths = tenure * 12;

        let totalAmount = 0;
        for (let month = 1; month <= totalMonths; month++) {
            totalAmount += principal;
            totalAmount += totalAmount * monthlyInterestRate;
        }

        document.getElementById('output').innerHTML = 'Total Amount: ₹' + totalAmount.toFixed(2);

        let balanceData = [];
        balanceData.push(principal.toFixed(2));
        balanceData.push((totalAmount - principal).toFixed(2));

        displayChart(balanceData);

    } catch (error) {
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
