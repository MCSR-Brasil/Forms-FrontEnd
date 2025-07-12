const url = "https://script.google.com/macros/s/AKfycbzodZXAXW0FFhY6Onlf08y3FWitHitTPUbCkUeTmKy51Kp3pLUkQqZbI7rd0Zy_S34r/exec";

function objectToParams(obj) {
    return Object.entries(obj)
        .map(([key, value]) => {
            if (Array.isArray(value)) {
                return value.map(v => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`).join('&');
            }
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        })
        .join('&');
}

async function postAnswer(formData) {
    try {
        const params = objectToParams(formData);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params
        });

        const resultText = await response.text();
        console.log('Response:', resultText);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return { status: 'success', result: resultText };
    } catch (error) {
        console.error('Error posting answer:', error);
        return { 
            status: 'error', 
            message: error.message || 'Failed to post answer' 
        };
    }
}
