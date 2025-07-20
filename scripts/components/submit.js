function submit(props) {
    const label = props.label || 'Submit';
    const note = props.note || '';
    const id = props.id || 'submit';
    const name = props.name;

    const formId = 'form-container';

    setTimeout(() => {
        const form = document.getElementById(formId);
        const submitBtn = document.getElementById(id);

        if (form && submitBtn) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const originalText = submitBtn.textContent;

                try {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Enviando...';

                    const data = {};

                    // Step 1: Handle all non-checkbox inputs
                    const inputs = form.querySelectorAll('input:not([type="checkbox"]), select, textarea');
                    inputs.forEach(input => {
                        if (input.name) {
                            data[input.name] = input.value;
                        }
                    });
                    
                    // Step 2: Handle checkboxes (group by name)
                    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
                    checkboxes.forEach(checkbox => {
                        if (checkbox.checked) {
                            const key = checkbox.name;
                            const value = checkbox.value;
                    
                            if (!data[key]) {
                                data[key] = [];
                            }
                    
                            data[key].push(value);
                        }
                    });

                    const result = await postAnswer(data);

                    alert(result.status === 'success'
                        ? 'Form submitted successfully!'
                        : result.message || 'Error submitting form');

                    if (result.status === 'success') {
                        form.reset();
                    }
                } catch (error) {
                    console.error('Form submission error:', error);
                    alert('Error, refresh and try again');
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            });
        }
    }, 0);

    return `
        <div class="form-group" id="${id}" name="${name}">
            <button type="submit" id="${id}">${label}</button>
            ${note ? `<div class="note"><p class="note-text">${note}</p></div>` : ''}
        </div>
    `;
}