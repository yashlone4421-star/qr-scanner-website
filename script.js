// ✅ QR SCANNER (only on scanner.html)
function onScanSuccess(decodedText) {
  document.getElementById("result").innerHTML =
    `<b>✅ Decoded Text:</b><br> ${decodedText} <br><br>
     <a href="${decodedText}" target="_blank" style="color: #ffd700;">Open Link</a>`;
}

function onScanError(errorMessage) {
  console.log("Scan error: ", errorMessage);
}

if (document.getElementById("reader")) {
  const html5QrCode = new Html5Qrcode("reader");

  // Ask for camera devices
  Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
      const cameraId = devices[0].id; // use first camera
      html5QrCode.start(
        cameraId,
        { fps: 10, qrbox: { width: 250, height: 250 } },
        onScanSuccess,
        onScanError
      );
    }
  }).catch(err => {
    console.error("Camera access error:", err);
    document.getElementById("result").innerText = "❌ Camera not accessible.";
  });

  // File upload
  document.getElementById("qr-input-file").addEventListener("change", e => {
    if (e.target.files.length == 0) return;
    const file = e.target.files[0];
    html5QrCode.scanFile(file, true)
      .then(decodedText => {
        document.getElementById("result").innerHTML =
          `<b>✅ Decoded Text:</b><br> ${decodedText} <br><br>
           <a href="${decodedText}" target="_blank" style="color: #ffd700;">Open Link</a>`;
      })
      .catch(err => {
        document.getElementById("result").innerHTML = "❌ Error decoding file.";
        console.error(err);
      });
  });
}