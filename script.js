function generateHexCode() {
  const randomHex = Math.floor(Math.random() * 16777215).toString(16);
  // return "#" + randomHex.padStart(6, "0");
  return randomHex.padStart(6, "0");
}

// Function to generate an array with two hex codes
function generateHexCodeArray() {
  return [generateHexCode(), generateHexCode()];
}

function applyColorsToCSS() {
  let color_top = generateHexCodeArray()[0];
  let color_bottom = generateHexCodeArray()[1];
  let root = document.querySelector(":root");
  root.style.setProperty("--color_top", "#" + color_top);
  root.style.setProperty("--color_bottom", "#" + color_bottom);
  console.log("Color1: " + color_top, "Color2: " + "#" + color_bottom);
  color_value_top.innerHTML = color_top;
  color_value_bottom.innerHTML = color_bottom;
}

// Click on Hex value for copy value
function copyHexValue(id) {
  navigator.clipboard
    .writeText(document.getElementById(id).textContent)
    .then(() => {
      let setValue = document.getElementById(id).textContent;
      document.getElementById(id).innerHTML = "Copied";
      setTimeout(function () {
        document.getElementById(id).innerHTML = setValue;
      }, 300);
    })
    .catch((err) => {
      let setValue = document.getElementById(id).textContent;
      document.getElementById(id).innerHTML = "Ooops.. Please retry";
      setTimeout(function () {
        document.getElementById(id).innerHTML = setValue;
      }, 1000);
    });
}
