document.addEventListener("DOMContentLoaded", () => {
  const showLoginBtn = document.getElementById("docShowLogin");
  const showRegisterBtn = document.getElementById("docShowRegister");
  const loginForm = document.getElementById("docLoginForm");
  const registerForm = document.getElementById("docRegisterForm");

  const setActive = (isLogin) => {
    if (isLogin) {
      showLoginBtn.classList.add("active");
      showRegisterBtn.classList.remove("active");
      loginForm.classList.remove("hidden");
      registerForm.classList.add("hidden");
    } else {
      showLoginBtn.classList.remove("active");
      showRegisterBtn.classList.add("active");
      loginForm.classList.add("hidden");
      registerForm.classList.remove("hidden");
    }
  };

  showLoginBtn.addEventListener("click", () => setActive(true));
  showRegisterBtn.addEventListener("click", () => setActive(false));

  // Optional: default to login form on page load
  setActive(true);
});
