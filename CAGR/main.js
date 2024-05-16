
document.addEventListener("DOMContentLoaded", function () {
  // Number of periods slider
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

function calculateCAGR() {
  const initialValue = parseFloat(document.getElementById('principal').value);
  const finalValue = parseFloat(document.getElementById('outputText').value);
  const periods = parseFloat(document.getElementById('outputtext').value);

  const cagr = (Math.pow(finalValue / initialValue, 1 / periods) - 1) * 100;

  // Display CAGR
  document.getElementById('cagrResult').textContent = `${cagr.toFixed(2)}%`;
}

 
  