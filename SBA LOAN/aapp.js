const button = document.querySelector('button');
const urlParams = new URLSearchParams(window.location.search);
const loanAmount = urlParams.get('loanAmount');
const interestRate = urlParams.get('interestRate');
const loanTerm = urlParams.get('loanTerm');

button.addEventListener('touchstart', () => {
  button.classList.add('touchstart');
});

button.addEventListener('touchend', () => {
  button.classList.remove('touchstart');
});

document.getElementById('loanForm').addEventListener('input', calculateLoan);

function calculateLoan() {
  // Retrieve user input
  var loanAmount = parseFloat(document.getElementById('loanAmount').value);
  var annualInterestRate = parseFloat(document.getElementById('interestRate').value);
  var loanTermYears = parseFloat(document.getElementById('loanTerm').value);

  // Convert annual interest rate to monthly interest rate
  var monthlyInterestRate = annualInterestRate / 100 / 12;

  // Calculate number of payments
  var numberOfPayments = loanTermYears * 12;

  // Calculate monthly payment using the formula for an amortizing loan
  var monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

  // Initialize variables for the amortization schedule
  var remainingBalance = loanAmount;
  var totalPayments = 0;
  var totalInterestPaid = 0;
  var scheduleBody = document.getElementById('scheduleBody');
  scheduleBody.innerHTML = ''; // Clear previous results

  // Generate amortization schedule using a loop
  for (var paymentNumber = 1; paymentNumber <= numberOfPayments; paymentNumber++) {
    var interestPayment = remainingBalance * monthlyInterestRate;
    var principalPayment = monthlyPayment - interestPayment;

    // Update the remaining balance
    remainingBalance -= principalPayment;

    // Add a row to the table for each payment
    var row = document.createElement('tr');
    row.innerHTML = `
        <td>${paymentNumber}</td>
        <td>$${principalPayment.toFixed(2)}</td>
        <td>$${interestPayment.toFixed(2)}</td>
        <td>$${remainingBalance.toFixed(2)}</td>
    `;

    // Append the row to the table body
    scheduleBody.appendChild(row);

    // Accumulate total payments and total interest paid
    totalPayments += monthlyPayment;
    totalInterestPaid += interestPayment;
  }

  // Display Monthly SBA Loan Payment, Total Financial Cost, Interest Paid, Total Amount, and Principal
  document.getElementById('monthlyPayment').innerText = `Monthly SBA Loan Payment: $${monthlyPayment.toFixed(2)}`;
  document.getElementById('totalfinancialcost').innerText = `Total Financial Cost: $${totalPayments.toFixed(2)}`;
  document.getElementById('totalInterestPaid').innerText = `Interest Paid: $${totalInterestPaid.toFixed(2)}`;
  document.getElementById('principal').innerText = `Principal: $${loanAmount.toFixed(2)}`;

  // Calculate and display total annual payments
  var totalAnnualPayments = (totalPayments / loanTermYears).toFixed(2);
  document.getElementById('totalAnnualPayments').innerText = `Total Annual Payments: $${totalAnnualPayments} /year`;

  // Display the summary and table
  document.getElementById('summary').style.display = 'block';
  document.getElementById('table').style.display = 'block';
  document.getElementById('recalculateButton').style.display = 'block';
}
var queryString = '?loanAmount=' + loanAmount +
  '&interestRate=' + annualInterestRate +
  '&loanTerm=' + loanTermYears;

// Redirect to the same page with the query string
window.location.search = queryString;
const recalculateButton = document.getElementById('recalculateButton');

recalculateButton.addEventListener('click', () => {
  // Show the container with input fields and labels
  const container = document.querySelector('.container');
  container.classList.remove('hide');

  // Hide the summary and table
  document.getElementById('summary').style.display = 'none';
  document.getElementById('table').style.display = 'none';
  document.getElementById('recalculateButton').style.display = 'none';

  // Reset the form values
  document.getElementById('loanAmount').value = '';
  document.getElementById('interestRate').value = '';
  document.getElementById('loanTerm').value = '';
});