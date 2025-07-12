document.addEventListener('DOMContentLoaded', async () => {
    try {
        const success = await initForm('#form-container');
        if (!success) {
            console.error('Failed to initialize form');
        }
    } catch (error) {
        console.error('Unexpected error:', error);
    }
});