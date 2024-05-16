let pieChart, lineChart; // Declare variables to store the Chart instances

function calculateRD() {
    let monthlyDeposit = parseFloat(document.getElementById('monthlyDeposit').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const tenure = parseFloat(document.getElementById('tenure').value);

    const monthlyInterestRate = interestRate / 1200;
    const totalMonths = tenure;

    let totalAmount = 0;
    let balanceData = [];

    for (let month = 1; month <= totalMonths; month++) {
        totalAmount += monthlyDeposit;
        const interest = totalAmount * monthlyInterestRate;
        totalAmount += interest;
        balanceData.push(totalAmount.toFixed(2));
    }

    displayCharts(balanceData);
}

function displayCharts(balanceData) {
    const ctxPie = document.getElementById('pieChart').getContext('2d');
    const ctxLine = document.getElementById('lineChart').getContext('2d');

    // Check if there is an existing Chart instance for pie chart and destroy it
    if (pieChart) {
        pieChart.destroy();
    }

    // Check if there is an existing Chart instance for line chart and destroy it
    if (lineChart) {
        lineChart.destroy();
    }

    pieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: ['Principal', 'Interest'],
            datasets: [{
                data: [balanceData[0], balanceData[balanceData.length - 1] - balanceData[0]],
                backgroundColor: ['#3498db', '#e74c3c'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
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

    lineChart = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: Array.from({ length: balanceData.length }, (_, i) => (i + 1).toString()),
            datasets: [{
                label: 'Total Amount',
                data: balanceData,
                borderColor: '#3498db',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                },
                y: {
                    type: 'linear',
                    position: 'left',
                }
            }
        }
    });
}
