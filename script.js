const uploadBtn = document.getElementById("uploadBtn");
const resultBox = document.getElementById("result");

uploadBtn.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function () {
    const img = new Image();
    img.src = reader.result;

    img.onload = function () {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);

      if (code) {
        resultBox.innerText = "✅ QR Code: " + code.data;
      } else {
        resultBox.innerText = "❌ No QR code found!";
      }
    };
  };
  reader.readAsDataURL(file);
});
