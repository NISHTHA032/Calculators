// Function to get URL parameters
function getURLParameter(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to initialize input fields based on URL parameters
function initializeInputsFromURL() {
    var incomeParam = getURLParameter('income');
    var paidIncomeParam = getURLParameter('paid_income');

    if (incomeParam !== null && paidIncomeParam !== null) {
        document.getElementById('income').value = parseFloat(incomeParam).toFixed(2);
        document.getElementById('paid_income').value = parseFloat(paidIncomeParam).toFixed(2);
    }
}
// Call initializeInputsFromURL when the page loads
document.addEventListener('DOMContentLoaded', function () {
    initializeInputsFromURL();
    calculateTax(); // Recalculate tax based on initial input values
});

function calculateTax() {
    var income = parseFloat(document.getElementById('income').value);
    var paid_income = parseFloat(document.getElementById('paid_income').value);

    if (isNaN(income) || isNaN(paid_income)) {
        return false;
    }

    var socialSecurityTax = income * 0.124;
    if (socialSecurityTax > 12400) {
        socialSecurityTax = 12400;
    }

    var medicareTax = income * 0.029;
    var totalTax = socialSecurityTax + medicareTax;

    // Update query parameters in the URL
    var queryString = '?income=' + income + '&paid_income=' + paid_income;
    history.pushState(null, null, queryString);

    var socialSecurityTaxElement = document.getElementById('socialSecurityTax');
    socialSecurityTaxElement.textContent = "Social Security Tax: $" + socialSecurityTax.toFixed(2);

    var medicareTaxElement = document.getElementById('medicareTax');
    medicareTaxElement.textContent = "Medicare Tax: $" + medicareTax.toFixed(2);

    var totalTaxElement = document.getElementById('totalTax');
    totalTaxElement.textContent = "Total Self-Employment Tax: $" + totalTax.toFixed(2);

    const firstContainer = document.querySelector('.container');
    firstContainer.style.display = 'block';

    const summaryContainer = document.querySelector('.container:nth-child(2)');
    summaryContainer.style.display = 'block';
}

//function recalculateTax() {
    // Reset input value
   // document.getElementById('income').value = 0.00;
   // document.getElementById('paid_income').value = 0.00;
    // Hide the second container
    //const summaryContainer = document.querySelector('.container:nth-child(2)');
   // summaryContainer.style.display = 'none'; // Change display to 'none' to hide the container

    // Call the calculateTax() function to recalculate the tax  
    //calculateTax();
//}
