const API_BASE_URL = "http://localhost:8080";
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Admin test login
    if (email === "admin@gmail.com" && password === "admin") {
        localStorage.setItem('userId', "0");
        localStorage.setItem('userName', "Admin");
        alert("Admin login successful");
        window.location.href = 'index.html';
        return;
    }

    // try {
    //     const response = await fetch(`${API_BASE_URL}/auth/login`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ email, password })
    //     });
        
    //     if (response.ok) {
    //         const user = await response.json();
            
    //         if (user && user.id) {
    //             localStorage.setItem('userId', user.id);
    //             localStorage.setItem('userName', user.name);
    //             window.location.href = 'index.html';
    //         } else {
    //             alert('Invalid credentials');
    //         }
    //     } else {
    //         alert('Login failed. Please check your credentials.');
    //     }
    // } catch (error) {
    //     console.error('Login error:', error);
    //     alert('Error connecting to server');
    // }

    try {
    const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    console.log("Response status:", response.status);

    const data = await response.json();
    console.log("Server response:", data);

} catch (error) {
    console.error("Full error:", error);
}
});