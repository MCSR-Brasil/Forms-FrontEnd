function text(props) {
    const label = props.label || '';
    const description = props.description || '';
    const placeholder = props.placeholder || '';
    const required = props.required || true;
    const id = props.id || 'text';
    const name = props.name;
    
    return `
        <div class="form-group">
            ${label ? `<label>${label}</label>` : ''}
            ${description ? `<div class="description">${description}</div>` : ''}
            <input 
                type="text" 
                name="${name}" 
                id="${id}"
                placeholder="${placeholder}"
                required="${required}" 
                autocomplete="off" 
                autofill="off"
            >
        </div>
    `;
}

