// Function to handle "Remember Me" functionality
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("rememberMe").checked;
    const spinner = document.getElementById("spinner");
    const message = document.getElementById("message");

    message.textContent = '';  // Clear any previous messages

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(username)) {
        message.textContent = "Please enter a valid email address.";
        return;
    }

    // Password complexity validation (at least 6 characters)
    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters long.";
        return;
    }

    // Save username to localStorage if "Remember Me" is checked
    if (rememberMe) {
        localStorage.setItem("rememberedUsername", username);
        localStorage.setItem("rememberedUserpassword",password);
    } else {
        localStorage.removeItem("rememberedUsername");
    }

    // Show loading spinner
    spinner.style.display = 'block';

    // Mock API call using fetch (replace with actual API endpoint)
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        spinner.style.display = 'none'; // Hide spinner
        message.style.color = 'green';
        message.textContent = 'Login successful!'; // Mock success response
    })
    .catch(error => {
        spinner.style.display = 'none'; // Hide spinner
        message.style.color = 'red';
        message.textContent = 'Error during login. Please try again.';
        console.error('Error during login:', error); // Log error details for debugging
    });
});
// Populate the username field with the remembered value
window.addEventListener('load', () => {
    const rememberedUsername = localStorage.getItem("rememberedUsername");
    const rememberedUserpassword=localStorage.getItem("rememberedUserpassword");
    if (rememberedUsername) {
        document.getElementById("username").value = rememberedUsername;
        document.getElementById("password").value=rememberedUserpassword;
        document.getElementById("rememberMe").checked = true;
    }
});

// Show/Hide password functionality
document.getElementById("showPassword").addEventListener("change", function() {
    const passwordField = document.getElementById("password");
    passwordField.type = this.checked ? "text" : "password";
});
