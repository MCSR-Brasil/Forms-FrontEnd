function CheckboxGroup(props) {
    // Set default values
    const label = props.label || '';
    const name = props.name || 'checkbox-group';
    const description = props.description || '';
    const optionsStr = props.placeholder || ''; // Can be string or array
    const selectedValues = props.selectedValues || [];
    const id = props.id || 'checkbox-group';
    
    // Convert options string to array if needed
    const options = Array.isArray(optionsStr) 
        ? optionsStr 
        : (typeof optionsStr === 'string' && optionsStr.trim() !== ''
            ? optionsStr.split(',').map(opt => {
                const trimmed = opt.trim();
                return {
                    value: trimmed.toLowerCase().replace(/\s+/g, '-'),
                    label: trimmed
                };
            })
            : []);
    
    // Create checkboxes HTML
    const checkboxesHtml = options.map(option => {
        const checkboxId = `${id}-${option.value}`.toLowerCase().replace(/[^a-z0-9-]/g, '');
        const isChecked = selectedValues.includes(option.value);
        
        return `
            <label class="multi-select-option">
                <input 
                    type="checkbox" 
                    id="${checkboxId}" 
                    name="${name}" 
                    value="${option.value}" 
                    ${isChecked ? 'checked' : ''}
                >
                <span class="checkmark"></span>
                ${option.label || option.value}
            </label>
        `;
    }).join('');
    
    return `
        <div class="form-group">
            ${label ? `<label>${label}</label>` : ''}
            ${description ? `<div class="description">${description}</div>` : ''}
            <div class="multi-select">
                ${checkboxesHtml}
            </div>
        </div>
    `;
}

