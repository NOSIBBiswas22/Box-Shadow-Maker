const box = document.querySelector("#box");
const boxContainer = document.querySelector(".box-container");
const boxBackground = document.querySelector("#box-background");
const boxContainerBackground = document.querySelector("#box-container-background");

const generatedCss = document.querySelector("#generated-css");

const settings = document.querySelectorAll(".settings input");
const hOffset = document.querySelector("#h-offset");
const vOffset = document.querySelector("#v-offset");
const blurRadius = document.querySelector("#blur-radius");
const spreadRadius = document.querySelector("#spread-radius");
const color = document.querySelector("#color");
const opacity = document.querySelector("#opacity");
const inset = document.querySelector("#inset");

boxBackground.addEventListener("input", event => {
  box.style.backgroundColor = event.currentTarget.value;
});
boxContainerBackground.addEventListener("input", event => {
  boxContainer.style.backgroundColor = event.currentTarget.value;
});

settings.forEach(setting => {
  setting.addEventListener("input", updateBoxShadow);
});

function updateBoxShadow(event) {
  if(event.currentTarget===blurRadius) {
    if(blurRadius.value<0) blurRadius.value = 0;
  }
  if(event.currentTarget===opacity) {
    if(opacity.value<0) opacity.value = 0;
    if(opacity.value>1) opacity.value = 1;
  }
  
  const boxShadow = `${hOffset.value}px ${vOffset.value}px ${blurRadius.value}px ${spreadRadius.value}px rgba(${hexToRGB(color.value).join(", ")}, ${opacity.value})${inset.checked ? " inset" : ""}`;
  box.style.boxShadow = boxShadow;
  generatedCss.textContent = `box-shadow: ${boxShadow};`;
}

// Copy to Clipboard (using the Clipboard API which is available on the navigator.clipboard object)

if (navigator.clipboard) {
  const generatedCssCopyBtn = document.querySelector("#generated-css-copy-btn");
  
  generatedCssCopyBtn.addEventListener("click", generatedCssCopyBtnClick);

  function generatedCssCopyBtnClick() {
    generatedCssCopyBtn.disabled = true;
    navigator.clipboard.writeText(generatedCss.textContent).then(function() { /* clipboard successfully set */
      generatedCssCopyBtn.textContent = "Copied!";
      generatedCssCopyBtn.classList.add("success");
      setTimeout(() => {
        generatedCssCopyBtn.classList.remove("success"); 
        generatedCssCopyBtn.textContent = "Copy";
        generatedCssCopyBtn.disabled = false;
      }, 1000);
    }, function(err) { /* clipboard write failed */
      generatedCssCopyBtn.textContent = "Error";
      generatedCssCopyBtn.classList.add("error");
      console.error(`Failed to copy to clipboard! ${err}`);
      setTimeout(() => {
        generatedCssCopyBtn.classList.remove("error"); 
        generatedCssCopyBtn.textContent = "Copy";
        generatedCssCopyBtn.disabled = false;
      }, 1000);    
    });
  }
}

// Create the "Copy to Clipboard" button only if "navigator.clipboard" is supported by the browser
if (navigator.clipboard) {
    const generatedCssContainer = document.querySelector(".generated-css-container");
    const generatedCssCopyBtn = document.createElement("button");
    generatedCssCopyBtn.id = "generated-css-copy-btn";
    generatedCssCopyBtn.textContent = "Copy";
    // generatedCssContainer.appendChild(generatedCssCopyBtn);
}

// Auxiliary Functions

function hexToRGB(h) {
  let r = 0;
  let g = 0;
  let b = 0;

  // 3 digits
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

  // 6 digits
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }
  return [+r, +g, +b];
  // return `rgb(${+r}, ${+g}, ${+b})`;
}



