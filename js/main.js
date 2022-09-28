const log = console.log;

window.QRcodeURL = window.QRcodeURL || ``;


const autoGo = (url = ``) => {
  const btn = document.querySelector(`[type="button"]`);
  if(btn && url) {
    const once = btn.dataset.flag || false;
    if(!once) {
      btn.dataset.flag = true;
      btn.addEventListener(`click`, () => {
        window.open(url, `_blank`);
      })
    }
  } else {
    alert("No QRCode URL be found!");
  }
}

function openQRCamera(node) {
  const reader = new FileReader();
  reader.onload = function() {
    node.value = "";
    qrcode.callback = function(res) {
      if(res instanceof Error) {
        alert("No QR code found. Please make sure the QR code is within the camera's frame and try again.");
      } else {
        
        log(`res`, res);
        
        window.QRcodeURL = res.replace(/http\:/i, `https:`);
        node.parentNode.previousElementSibling.value = res.replace(/http\:/i, `https:`);
        autoGo(window.QRcodeURL)
      }
    };
    const qr = qrcode.decode(reader.result);
    log(`qr`, qr);
    
    log(`reader.result`, reader.result)
  };
  log(`node.files[0]`, node.files[0])
  reader.readAsDataURL(node.files[0]);
}


const input = document.querySelector(`input[type="text"]`);


log(`input`, input)


input.addEventListener(`drop`, function(e) {
  e.preventDefault();
  e.stopPropagation();
  log(`e.target`, e, e.target)
  let uid = e.dataTransfer.getData("text/plain");
});

