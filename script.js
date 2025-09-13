// Get references to the file input button and the element where results will be displayed
const uploadBtn = document.getElementById("uploadBtn");
const resultBox = document.getElementById("result");

// Listen for changes in the file input (when user selects a file)
uploadBtn.addEventListener("change", function (event) {
  // Get the first selected file
  const file = event.target.files[0];

  // If no file is selected, exit the function
  if (!file) return;

  // Create a FileReader to read the uploaded image
  const reader = new FileReader();

  // When the file is loaded
  reader.onload = function () {
    // Create a new Image object
    const img = new Image();
    // Set the image source to the loaded file data
    img.src = reader.result;

    // When the image is fully loaded
    img.onload = function () {
      // Create a canvas element dynamically
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // Set canvas size to match the image dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image onto the canvas
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Get the pixel data from the canvas
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      // Use jsQR library to scan for a QR code in the image data
      const code = jsQR(imageData.data, canvas.width, canvas.height);

      // If a QR code is found, display its data
      if (code) {
        resultBox.innerText = "✅ QR Code: " + code.data;
      } else {
        // If no QR code is detected, display a message
        resultBox.innerText = "❌ No QR code found!";
      }
    };
  };

  // Read the selected image file as a Data URL (base64)
  reader.readAsDataURL(file);
});
