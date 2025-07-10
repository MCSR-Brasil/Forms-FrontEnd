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
  
  // Get all form data
  const formData = new FormData(form);
  
  // Convert FormData to object, properly handling multiple values
  const formDataObj = {};
  for (const [key, value] of formData.entries()) {
    if (formDataObj[key] === undefined) {
      formDataObj[key] = value;
    } else {
      // If the key already exists, convert to array or push to existing array
      formDataObj[key] = Array.isArray(formDataObj[key])
        ? [...formDataObj[key], value]
        : [formDataObj[key], value];
    }
  }
  
  // Log form data to console
  console.log('Submitting form data:', formDataObj);
  
  // Convert form data to URLSearchParams, combining multiple values with commas
  const params = new URLSearchParams();
  Object.entries(formDataObj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Join array values with commas for better compatibility with Google sheets
      params.append(key, value.join(','));
    } else {
      params.append(key, value);
    }
  });
  
  fetch(url, {
    method: 'POST',
    body: params
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