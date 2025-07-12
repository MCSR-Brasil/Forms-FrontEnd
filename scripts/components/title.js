function title(props) {
    const titleText = props.title || '';
    const subtitle = props.subtitle || '';
    const id = props.id || 'title';
    
    return `
        <h2 id="${id}">${titleText}</h2>
        ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ''}
    `;
}
