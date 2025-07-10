const form = document.getElementById('myForm');
const msg = document.getElementById('msg');
const submitBtn = form.querySelector('button[type="submit"]');
const originalBtnText = submitBtn.innerHTML;
const url = 'https://script.google.com/macros/s/AKfycbzodZXAXW0FFhY6Onlf08y3FWitHitTPUbCkUeTmKy51Kp3pLUkQqZbI7rd0Zy_S34r/exec';

form.addEventListener('submit', e => {
  e.preventDefault();
  
  // Disable button and show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner"></span>Enviando...';
  submitBtn.style.cursor = 'wait';
  msg.textContent = '';
  
  const data = new FormData(form);
  
  fetch(url, {
    method: 'POST',
    body: new URLSearchParams(data)
  })
  .then(r => r.json())
  .then(res => {
    if(res.status === 'success') {
      msg.textContent = 'Obrigado! ';
      msg.className = 'message success';
      form.reset();
    } else {
      msg.textContent = 'Algo deu errado. Tente novamente.';
      msg.className = 'message error';
    }
  })
  .catch(() => {
    msg.textContent = 'Erro de conexão. Verifique sua internet.';
    msg.className = 'message error';
  })
  .finally(() => {
    // Re-enable button and restore original text
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
    submitBtn.style.cursor = 'pointer';
  });
});