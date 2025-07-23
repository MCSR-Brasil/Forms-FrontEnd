async function fetchConfig() {
    const url = 'https://script.google.com/macros/s/AKfycbzodZXAXW0FFhY6Onlf08y3FWitHitTPUbCkUeTmKy51Kp3pLUkQqZbI7rd0Zy_S34r/exec?action=config';
    try { //https://script.google.com/macros/s/AKfycbzodZXAXW0FFhY6Onlf08y3FWitHitTPUbCkUeTmKy51Kp3pLUkQqZbI7rd0Zy_S34r/exec?action=config
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching config:', error);
        return { config: [] };
    }
}

function renderForm(html, containerSelector = '#myForm', title) {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.warn(`Container "${containerSelector}" not found`);
        return false;
    }
    container.innerHTML = html;
    document.title = title;
    return true;
}

function formatConfig(configArray = []) {
    if (!Array.isArray(configArray) || !configArray.length) return '';
    
    return configArray.map((item, index) => {
        const props = {
            id: `field-${index}`,
            name: `field-${index}`,
            label: item.title,
            description: item.subtitle,
            placeholder: item.placeholder,
            required: true
        };

        const componentMap = {
            title: () => title({ title: item.title, subtitle: item.subtitle }),
            text: () => text(props),
            textarea: () => textarea(props),
            checkmark: () => CheckboxGroup(props),
            submit: () => submit({ label: item.title, note: item.subtitle }),
            section: () => section(props)
        };
        
        return componentMap[item.type]?.() || '';
    }).join('\n');
}

function getWebsiteConfig(configArray = []) {
    if (!Array.isArray(configArray) || !configArray.length) return '';

    const websiteTitle = configArray.find(item => item.websiteTitle)?.websiteTitle || 'MCSR Form';
    
    return websiteTitle;
}
    

/**
 * Initializes the form by fetching config and rendering it
 * @param {string} containerSelector - CSS selector for the form container
 * @returns {Promise<boolean>} Whether initialization was successful
 */
async function initForm(containerSelector = '#myForm') {
    try {
        const config = await fetchConfig();
        const html = formatConfig(config.config || []);
        const title = getWebsiteConfig(config.config);
        return renderForm(html, containerSelector, title);
    } catch (error) {
        console.error('Failed to initialize form:', error);
        return false;
    }
}