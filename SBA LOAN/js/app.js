const button = document.querySelector('button');
const urlParams = new URLSearchParams(window.location.search);
const loanAmount = urlParams.get('loanAmount');
const interestRate = urlParams.get('interestRate');
const loanTerm = urlParams.get('loanTerm');

// Corrected line to set values
document.getElementById("loanAmount").value = loanAmount;
document.getElementById("interestRate").value = interestRate;
document.getElementById("loanTerm").value = loanTerm;

if (loanAmount && interestRate) {
  calculateLoan();
} else {
  //alert('Please provide both a loan amount and an interest rate!');
}

button.addEventListener('touchstart', () => {
  button.classList.add('touchstart');
});

button.addEventListener('touchend', () => {
  button.classList.remove('touchstart');
});

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

  // Hide the container with input fields and labels
  const container = document.querySelector('.container');
  container.classList.add('hide');

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

  var queryString = '?loanAmount=' + loanAmount +
    '&interestRate=' + annualInterestRate +
    '&loanTerm=' + loanTermYears;

  // Redirect to the same page with the query string
  history.pushState(null, null, queryString);
  // Add the button to the DOM

  const button = document.createElement('button');
  button.id = 'recalculateButton';
  button.classList.add('recalculate-button');
  button.innerText = 'Recalculate';
  document.getElementById('table').appendChild(button);


  // Add event listener to the button
  button.addEventListener('click', () => {

    // Show the container with input fields and labels
    const container = document.querySelector('.container');
    container.classList.remove('hide');

  });

  const recalculateButton = document.getElementById('recalculateButton');

  recalculateButton.addEventListener('click', () => {
    // Show the container with input fields and labels
    const container = document.querySelector('.container');
    container.classList.remove('hide');


    // Hide the summary and table
    document.getElementById('summary').style.display = 'none';
    document.getElementById('table').style.display = 'none';
    document.getElementById('recalculateButton').style.display = 'none';
  });

  // Include the script at the end of the function
  const script = document.createElement('script');
  script.src = 'js/app.js';
  document.body.appendChild(script);
}
