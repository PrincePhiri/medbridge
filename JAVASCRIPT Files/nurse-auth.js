// ======================= Nurse Auth JS =======================
document.addEventListener("DOMContentLoaded", () => {
  // ===== Elements =====
  const showLoginBtn = document.getElementById("showLogin");
  const showRegisterBtn = document.getElementById("showRegister");
  const loginForm = document.getElementById("nurseLoginForm");
  const registerForm = document.getElementById("nurseRegisterForm");

  if (!showLoginBtn || !showRegisterBtn || !loginForm || !registerForm) {
    console.error("Auth swap elements not found in DOM.");
    return;
  }

  // ===== Helper function to toggle forms =====
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

  // ===== Toggle form buttons =====
  showLoginBtn.addEventListener("click", () => setActive(true));
  showRegisterBtn.addEventListener("click", () => setActive(false));

  // ===== Default to login form on load =====
  setActive(true);
});
