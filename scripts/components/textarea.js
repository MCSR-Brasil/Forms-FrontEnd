function textarea(props) {
    const label = props.label || '';
    const description = props.description || '';
    const placeholder = props.placeholder || '';
    const required = props.required !== false; // Default to true
    const id = props.id || 'textarea';
    const name = props.name;
    
    return `
        <div class="form-group">
            ${label ? `<label>${label}</label>` : ''}
            ${description ? `<div class="description">${description}</div>` : ''}
            <textarea 
                id="${id}" 
                name="${name}" 
                placeholder="${placeholder}" 
                ${required ? 'required' : ''}
                autocomplete="off"
                autofill="off"
            ></textarea>
        </div>
    `;
}
