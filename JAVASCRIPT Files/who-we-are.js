// ------------------------
// Elements
// ------------------------
const modal = document.getElementById("contact-modal");
const closeBtn = document.getElementById("close-contact-modal");
const contactButtons = document.querySelectorAll(".who-card__btn");
const contactToInput = document.getElementById("contact-to");
const contactForm = document.getElementById("contact-form");
const feedback = document.getElementById("contact-feedback");

// ------------------------
// Open Modal
// ------------------------
contactButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        contactToInput.value = btn.dataset.recipient; // Set recipient email
        modal.classList.add("show");
        document.body.style.overflow = "hidden"; // Prevent background scroll
        feedback.textContent = "";
    });
});

// ------------------------
// Close Modal
// ------------------------
function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
    contactForm.reset();
    feedback.textContent = "";
}

closeBtn.addEventListener("click", closeModal);

// Close when clicking outside modal
window.addEventListener("click", e => {
    if (e.target === modal) closeModal();
});

// ------------------------
// Submit Form via AJAX with mailto
// ------------------------
contactForm.addEventListener("submit", async e => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    try {
        const response = await fetch(contactForm.action || "/contact_staff", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.status === "success" && result.mailto) {
            feedback.textContent = result.message;
            feedback.style.color = "green";

            // Open user's email client
            window.location.href = result.mailto;

            // Close modal after 1.5 seconds
            setTimeout(closeModal, 1500);
        } else {
            feedback.textContent = result.message;
            feedback.style.color = "red";
        }

    } catch (error) {
        feedback.textContent = "An error occurred. Please try again.";
        feedback.style.color = "red";
        console.error("Contact form error:", error);
    }
});
