function section(props) {
    const { id, label, description, placeholder } = props;
    return `
        <div class="section" id="${id}">
            <p class="section-title">${label}</p>
            <p class="section-description">${description}</p>
            <p class="section-footnote">${placeholder}</p>
        </div>
    `;
}