document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".mb-search-input");
  const suggestions = document.querySelector(".mb-search-suggestions");
  const items = Array.from(document.querySelectorAll(".mb-searchable"));
  const showMoreBtn = document.getElementById("showMoreBtn");
  const toggleButtons = document.querySelectorAll(".mb-toggle-button");

  const maxVisible = 6;
  let expanded = false;

  // ========================= INITIAL CARD HIDE =========================
  function updateCardVisibility() {
    items.forEach((item, index) => {
      if (index >= maxVisible) {
        item.classList.add("hidden");
      } else {
        item.classList.remove("hidden");
      }
    });
    showMoreBtn.textContent = "Show More Procedures";
    expanded = false;
  }
  updateCardVisibility();

  // ========================= SEARCH FUNCTION =========================
  function resetSearch() {
    input.value = "";
    suggestions.innerHTML = "";
    suggestions.style.display = "none";
    items.forEach(item => item.style.display = "block");
    updateCardVisibility();
  }

  function renderSuggestions(matches) {
    suggestions.innerHTML = "";
    matches.forEach(item => {
      const title = item.querySelector("h3")?.textContent || "Procedure";
      const li = document.createElement("li");
      li.textContent = title;
      li.addEventListener("click", () => {
        item.scrollIntoView({ behavior: "smooth", block: "center" });
        resetSearch();
      });
      suggestions.appendChild(li);
    });
    suggestions.style.display = matches.length ? "block" : "none";
  }

  function performSearch() {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      resetSearch();
      return;
    }

    const matches = items.filter(item =>
      item.textContent.toLowerCase().includes(query)
    );

    items.forEach(item => {
      item.style.display = matches.includes(item) ? "block" : "none";
    });

    renderSuggestions(matches);
  }

  input.addEventListener("input", performSearch);
  document.querySelector(".mb-search-icon").addEventListener("click", performSearch);

  document.addEventListener("click", e => {
    if (!e.target.closest(".mb-search-wrapper")) {
      suggestions.style.display = "none";
    }
  });

  // ========================= TOGGLE DETAILS PANEL =========================
  toggleButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      const target = document.getElementById(targetId);
      if (target) {
        const isOpen = target.classList.toggle("open");
        button.textContent = isOpen ? "▲ Hide Steps" : "▼ View Steps";
      }
    });
  });

  // ========================= SHOW MORE / LESS =========================
  showMoreBtn.addEventListener("click", () => {
    expanded = !expanded;

    items.forEach((item, index) => {
      if (index >= maxVisible) {
        if (expanded) {
          item.classList.remove("hidden");
          item.classList.add("fade-in");
        } else {
          item.classList.add("hidden");
          item.classList.remove("fade-in");
        }
      }
    });

    showMoreBtn.textContent = expanded ? "Show Less Procedures" : "Show More Procedures";
  });
});

// ==========================SMOOTH SCROLLING==========================
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for procedure links
  const procedureLinks = document.querySelectorAll(".procedure-link");

  procedureLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetID = link.getAttribute("href").substring(1);
      const targetEl = document.getElementById(targetID);

      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        // Optionally update URL hash without jumping
        history.pushState(null, null, `#${targetID}`);
      }
    });
  });

  // Back to Top button
  const backToTopBtn = document.getElementById("backToTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
