const API_URL = "http://localhost:5000";

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const showRegisterLink = document.getElementById("showRegister");
const messageEl = document.getElementById("message");
const registerMessageEl = document.getElementById("registerMessage");

showRegisterLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  messageEl.textContent = "";

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      messageEl.textContent = data.message || "Login failed.";
      return;
    }

    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } catch (error) {
    messageEl.textContent = "Could not reach the server.";
  }
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  registerMessageEl.textContent = "";

  const name = document.getElementById("name").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      registerMessageEl.textContent = data.message || "Registration failed.";
      return;
    }

    registerMessageEl.textContent = "Registration successful. You can now log in.";
    registerForm.reset();
  } catch (error) {
    registerMessageEl.textContent = "Could not reach the server.";
  }
});
