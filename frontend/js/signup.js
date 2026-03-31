document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        
        if (response.ok) {
            const user = await response.json();
            localStorage.setItem('userId', user.id);
            localStorage.setItem('userName', user.name);
            alert('Account created successfully!');
            window.location.href = 'index.html';
        } else {
            const error = await response.text();
            alert('Signup failed: ' + error);
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('Error connecting to server');
    }
});