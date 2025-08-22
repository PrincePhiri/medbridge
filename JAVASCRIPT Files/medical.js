document.addEventListener("DOMContentLoaded", () => {
  const sliderCards = [
  { title: "Advanced Physical Assessments", description: "Update on physical exam techniques and OSCE tips...", img: "/static/medicinePhotos/cardSliderPhotos/1.jpg" },
  { title: "Latest Drug Interactions", description: "New summaries on drug classes and nursing implications.", img: "/static/medicinePhotos/cardSliderPhotos/2.jpg" },
  { title: "Cardiovascular System Update", description: "Step-by-step heart exams, auscultation...", img: "/static/medicinePhotos/cardSliderPhotos/3.jpg" },
  { title: "Respiratory System Review", description: "Lung assessment, breath sound interpretation,...", img: "/static/medicinePhotos/cardSliderPhotos/4.jpg" },
  { title: "Neurological Assessment Essentials", description: "Cranial nerve testing, reflexes, neuroimaging ...", img: "/static/medicinePhotos/cardSliderPhotos/5.jpg" },
  { title: "Pediatric Growth & Development", description: "Growth charts, developmental milestones, pediatric...", img: "/static/medicinePhotos/cardSliderPhotos/6.jpg" },
  { title: "Emergency & Trauma Care", description: "ABCDE approach, vital signs, trauma assessment....", img: "/static/medicinePhotos/cardSliderPhotos/7.jpg" },
  { title: "Infection Control & Hygiene", description: "Hand hygiene techniques, PPE use, infection prevention...", img: "/static/medicinePhotos/cardSliderPhotos/8.jpg" },
  { title: "Gastrointestinal System", description: "Abdominal exam, bowel sounds, liver and spleen...", img: "/static/medicinePhotos/cardSliderPhotos/9.jpg" },
  { title: "Renal & Urinary System", description: "Kidney assessment, urinalysis interpretation, catheter care...", img: "/static/medicinePhotos/cardSliderPhotos/10.jpg" },
  { title: "Endocrine System Review", description: "Thyroid, adrenal, pituitary, diabetes management,...", img: "/static/medicinePhotos/cardSliderPhotos/11.jpg" },
  { title: "Musculoskeletal System", description: "Joint exams, range-of-motion tests, fracture management, and...", img: "/static/medicinePhotos/cardSliderPhotos/12.jpg" },
  { title: "Dermatology Updates", description: "Skin exams, rashes, wound care, dermatological procedures,...", img: "/static/medicinePhotos/cardSliderPhotos/13.jpg" },
  { title: "Ophthalmology Essentials", description: "Eye exams, vision tests, common eye conditions, and ...", img: "/static/medicinePhotos/cardSliderPhotos/14.jpg" },
  { title: "ENT System", description: "Ear, nose, throat assessments, audiometry, sinus exams....", img: "/static/medicinePhotos/cardSliderPhotos/15.jpg" },
  { title: "Obstetrics & Gynecology", description: "Antenatal care, pelvic exams, labor management, and ...", img: "/static/medicinePhotos/cardSliderPhotos/16.jpg" },
  { title: "Mental Health & Psychiatry", description: "Psychiatric assessments, mental state exams...", img: "/static/medicinePhotos/cardSliderPhotos/17.jpg" },
  { title: "Nutrition & Dietetics", description: "Diet assessments, nutritional planning, malnutrition...", img: "/static/medicinePhotos/cardSliderPhotos/18.jpg" },
  { title: "Pharmacology Updates", description: "New drugs, dosing protocols, side effects, and nursing...", img: "/static/medicinePhotos/cardSliderPhotos/19.jpg" },
  { title: "Cardiopulmonary Resuscitation (CPR)", description: "Stepwise CPR procedures, airway management,...", img: "/static/medicinePhotos/cardSliderPhotos/20.jpg" },
  { title: "Vaccination Guidelines", description: "Latest immunization schedules, cold chain management,...", img: "/static/medicinePhotos/cardSliderPhotos/21.PNG" },
  { title: "Diabetes Management", description: "Blood sugar monitoring, insulin therapy, dietary guidance...", img: "/static/medicinePhotos/cardSliderPhotos/22.jpg" },
  { title: "Hypertension Control", description: "Blood pressure monitoring, pharmacological and non-pharmacological....", img: "/static/medicinePhotos/cardSliderPhotos/23.jpg" },
  { title: "Cardiac Imaging Techniques", description: "ECG, echocardiography, stress tests, and latest...", img: "/static/medicinePhotos/cardSliderPhotos/24.jpg" },
  { title: "Respiratory Imaging & Procedures", description: "Chest X-ray, CT scans, bronchoscopy basics...", img: "/static/medicinePhotos/cardSliderPhotos/25.jpg" },
  { title: "Surgical Basics", description: "Pre-op assessment, aseptic technique, instrument handling,...", img: "/static/medicinePhotos/cardSliderPhotos/26.jpg" },
  { title: "Pain Management", description: "Analgesics, opioid protocols, non-pharmacological pain relief,...", img: "/static/medicinePhotos/cardSliderPhotos/27.jpg" },
  { title: "Laboratory Diagnostics", description: "Blood tests, urinalysis, microbiology, and interpretation...", img: "/static/medicinePhotos/cardSliderPhotos/28.jpg" },
  { title: "Radiology Basics", description: "X-ray, CT, MRI, safety precautions, and interpretation principles.", img: "/static/medicinePhotos/cardSliderPhotos/29.jpg" },
  { title: "Wound Care & Dressing", description: "Assessment, cleaning, dressing techniques, and infection....", img: "/static/medicinePhotos/cardSliderPhotos/30.jpg" },
  { title: "Patient Communication & Ethics", description: "Therapeutic communication, informed consent,...", img: "/static/medicinePhotos/cardSliderPhotos/31.jpg" },
  { title: "Clinical Guidelines Updates", description: "Latest WHO protocols, disease management, and evidence...", img: "/static/medicinePhotos/cardSliderPhotos/32.jpg" }
];


  const cardsContainer = document.querySelector(".cards-carousel");

  // Inject cards dynamically
  sliderCards.forEach((card, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("update-card", "tp-searchable");
    cardDiv.style.backgroundImage = `url('${card.img}')`;

    const overlay = document.createElement("div");
    overlay.classList.add("card-overlay");

    const title = document.createElement("h3");
    title.classList.add("card-title");
    title.textContent = card.title;

    const desc = document.createElement("p");
    desc.textContent = card.description;

    overlay.appendChild(title);
    overlay.appendChild(desc);
    cardDiv.appendChild(overlay);
    cardsContainer.appendChild(cardDiv);

    // ✅ Redirect to cardhero.html with card index in query string// ✅ Redirect to cardhero.html via Flask route
    cardDiv.addEventListener("click", () => {
      window.location.href = `/cardhero?card=${index}`;
    });

  });

  // ========================== SLIDER LOGIC ==========================
  document.querySelectorAll('.cards-slider').forEach((slider) => {
    const carousel = slider.querySelector('.cards-carousel');
    const leftArrow = slider.querySelector('.arrow.left');
    const rightArrow = slider.querySelector('.arrow.right');

    let isDragging = false;
    let startX, scrollLeft;
    const cardWidth = 260 + 16;
    let autoPlayInterval;
    let isHovered = false;

    leftArrow?.addEventListener('click', () => {
      carousel.scrollBy({ left: -cardWidth * 2, behavior: 'smooth' });
    });
    rightArrow?.addEventListener('click', () => {
      carousel.scrollBy({ left: cardWidth * 2, behavior: 'smooth' });
    });

    carousel.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      carousel.classList.add('dragging');
      carousel.style.scrollBehavior = 'auto';
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      carousel.classList.remove('dragging');
      carousel.style.scrollBehavior = 'smooth';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.5;
      carousel.scrollLeft = scrollLeft - walk;
    });

    slider.addEventListener('mouseenter', () => isHovered = true);
    slider.addEventListener('mouseleave', () => isHovered = false);

    function startAutoPlay() {
      autoPlayInterval = setInterval(() => {
        if (isHovered || isDragging) return;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        const nextScroll = carousel.scrollLeft + cardWidth;
        if (nextScroll >= maxScroll - 10) {
          carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }, 3500);
    }

    startAutoPlay();
  });
});

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------

// ================================ SEARCH BAR ===========================
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".tp-search-input");
  const suggestionsBox = document.querySelector(".tp-search-suggestions");
  const searchableItems = Array.from(document.querySelectorAll(".tp-searchable"));

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();

    // Clear previous suggestions
    suggestionsBox.innerHTML = "";

    // Reset hidden cards if query is empty
    if (!query) {
      searchableItems.forEach((item, index) => {
        if (index >= 3) {
          item.classList.add("hidden");
          item.classList.remove("show");
        } else {
          item.classList.remove("hidden");
        }
      });
      suggestionsBox.style.display = "none";
      return;
    }

    // Find matching elements by text content
    const matches = searchableItems.filter(item =>
      item.textContent.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      suggestionsBox.style.display = "none";
      return;
    }

    // Show matching cards (reveal hidden ones)
    searchableItems.forEach(item => {
      if (matches.includes(item)) {
        item.classList.remove("hidden");
        item.classList.add("show");
      } else if (searchableItems.indexOf(item) >= 3) {
        item.classList.add("hidden");
        item.classList.remove("show");
      }
    });

    // Build suggestion list items
    matches.forEach(item => {
      let suggestionText = "";

      // Try to get title or heading inside the element
      const titleElement = item.querySelector("h1, h2, h3, .card-title, .med-update-info h3");
      if (titleElement) {
        suggestionText = titleElement.textContent.trim();
      } else {
        suggestionText = item.textContent.trim().slice(0, 50) + (item.textContent.length > 50 ? "..." : "");
      }

      const li = document.createElement("li");
      li.textContent = suggestionText;

      li.addEventListener("click", () => {
        item.scrollIntoView({ behavior: "smooth", block: "center" });
        // Highlight the matched element briefly
        item.style.transition = "background-color 0.5s ease";
        item.style.backgroundColor = "#ffff99";
        setTimeout(() => {
          item.style.backgroundColor = "";
        }, 1500);

        searchInput.value = "";
        suggestionsBox.style.display = "none";

        // Reset hidden cards after search
        searchableItems.forEach((card, index) => {
          if (index >= 3) {
            card.classList.add("hidden");
            card.classList.remove("show");
          } else {
            card.classList.remove("hidden");
          }
        });
      });

      suggestionsBox.appendChild(li);
    });

    suggestionsBox.style.display = "block";
  });

  // Close suggestions when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
      suggestionsBox.style.display = "none";
    }
  });
});
// ---------------------------------------------------------------------------

// ========================================================================
// =============================RESOURCE SECTION===========================
document.querySelectorAll('.med-section').forEach(section => {
  const searchInput = section.querySelector('.section-search');
  const resources = section.querySelectorAll('.med-resources li');
  const showMoreBtn = section.querySelector('.show-more-btn');

  // Initially show only 4
  resources.forEach((item, index) => {
    if (index > 3) item.style.display = 'none';
  });

  // Search filter
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    let matchCount = 0;
    resources.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(query)) {
        item.style.display = '';
        matchCount++;
      } else {
        item.style.display = 'none';
      }
    });
    showMoreBtn.style.display = query ? 'none' : 'block';
  });

  // Show More toggle
  showMoreBtn.addEventListener('click', () => {
    const hidden = [...resources].filter(item => item.style.display === 'none');
    if (hidden.length > 0) {
      resources.forEach(item => item.style.display = '');
      showMoreBtn.textContent = 'Show Less';
    } else {
      resources.forEach((item, index) => {
        if (index > 3) item.style.display = 'none';
      });
      showMoreBtn.textContent = 'Show More';
    }
  });

  // ========================== TOGGLE RESOURCE CONTENT ==========================
  const links = section.querySelectorAll('.resource-link');
  const contents = document.querySelectorAll('.resource-content');

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('data-content-id');

      // Hide all resource contents
      contents.forEach(content => content.classList.add('hidden'));

      // Show the clicked one
      const target = document.getElementById(targetId);
      if (target) target.classList.remove('hidden');
    });
  });
});

// ---------------------------------------------------------------------------


// ======================================TOOLKIT JS================================
// Select all toolkit cards
const toolkitCards = document.querySelectorAll('.toolkit-card');

toolkitCards.forEach(card => {
  card.addEventListener('click', () => {
    // Get the data-tool attribute of the clicked card
    const tool = card.getAttribute('data-tool');
    
    // Redirect via Flask route with query string
    window.location.href = `/toolkit?tool=${tool}`;
  });
});



// =============================RESOURCES CONTENT============================
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("resource-modal");
  const modalBody = document.getElementById("resource-modal-body");
  const closeBtn = document.getElementById("close-resource-modal");
  const resourceLinks = document.querySelectorAll(".resource-link");

  resourceLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const group = link.getAttribute("data-group"); // nurses / doctors
      const contentId = link.getAttribute("data-content-id");

      // If grouped (nurses/doctors), show all resources in that group
      if (group) {
        const contents = document.querySelectorAll(`.resource-content[data-group="${group}"]`);
        modalBody.innerHTML = "";
        contents.forEach(section => {
          let cloned = section.cloneNode(true);
          cloned.classList.remove("hidden"); // ensure visible
          modalBody.innerHTML += cloned.innerHTML;
        });
      } 
      // Else just show the single resource
      else if (contentId) {
        const content = document.getElementById(contentId);
        if (content) {
          let cloned = content.cloneNode(true);
          cloned.classList.remove("hidden"); // ensure visible
          modalBody.innerHTML = cloned.innerHTML;
        }
      }

      modal.classList.add("show");
      document.body.style.overflow = "hidden"; // Prevent background scroll
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    modalBody.innerHTML = "";
    document.body.style.overflow = "";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      modalBody.innerHTML = "";
      document.body.style.overflow = "";
    }
  });

  // Optional: close modal on ESC key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      modal.classList.remove("show");
      modalBody.innerHTML = "";
      document.body.style.overflow = "";
    }
  });
});

// ======================================================================================
// ============================ MEDICAL UPDATES - FRONT 3 CARDS & SEARCH ===================
document.addEventListener("DOMContentLoaded", () => {
  const updatesGrid = document.getElementById("updatesGrid");
  if (!updatesGrid) return;

  const cards = Array.from(updatesGrid.querySelectorAll(".med-update-card"));

  // Show only first 3 cards on the front page
  cards.forEach((card, index) => {
    if (index < 3) {
      card.classList.add("show");
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
      card.classList.remove("show");
    }
  });

  // =======================================================================
  // ===================BUTTON REDIRECT TO ALL UPDATES======================
  // =======================================================================
    document.getElementById("toggleUpdatesBtn").addEventListener("click", () => {
        window.location.href = "/medupdates";
    });

  // ------------------------------------------------------------------------
  // ------------------------------------------------------------------------


  // ============================ SEARCH FUNCTION ===========================
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase().trim();

      cards.forEach((card, index) => {
        const text = card.textContent.toLowerCase();

        if (query && text.includes(query)) {
          // show matching card
          card.classList.add("show");
          card.classList.remove("hidden");
        } else if (index >= 3) {
          // hide cards beyond the first 3 if no match
          card.classList.add("hidden");
          card.classList.remove("show");
        }
      });
    });
  }
});


// ============================== CONTACT US FOOTER (EMAIL VERSION) ===========================
document.addEventListener("DOMContentLoaded", () => {
  const contactToggleBtn = document.getElementById("contact-toggle-btn");
  const contactModal = document.getElementById("contact-modal");
  const closeModalBtn = document.getElementById("close-contact-modal");
  const form = document.getElementById("contact-form");
  const feedback = form?.querySelector(".contact-feedback");

  // Ensure modal is hidden by default
  if (contactModal) {
    contactModal.style.display = "none";  // hide initially
    contactModal.classList.remove("show");
  }

  // Open modal on button click
  contactToggleBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    if (!contactModal) return;
    contactModal.style.display = "flex"; // show modal
    setTimeout(() => contactModal.classList.add("show"), 10); // smooth fade-in
    document.body.style.overflow = "hidden";
    if (feedback) {
      feedback.textContent = "";
      feedback.style.color = "";
    }
  });

  // Close modal function
  function closeModal() {
    if (!contactModal) return;
    contactModal.classList.remove("show");
    setTimeout(() => {
      contactModal.style.display = "none"; // hide after fade-out
      document.body.style.overflow = "auto";
      if (feedback) {
        feedback.textContent = "";
        feedback.style.color = "";
      }
      form?.reset();
    }, 200); // match transition duration
  }

  // Close modal events
  closeModalBtn?.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === contactModal) closeModal();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && contactModal.classList.contains("show")) {
      closeModal();
    }
  });

  // Form submit via email
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form || !feedback) return;

    const recipientEmail = form.to.value.trim();
    const senderName = form.name.value.trim();
    const senderEmail = form.email.value.trim();
    const userMessage = form.message.value.trim();

    if (!recipientEmail || !senderName || !senderEmail || !userMessage) {
      feedback.textContent = "Please fill in all fields and choose a recipient.";
      feedback.style.color = "red";
      return;
    }

    // Build mailto link
    const subject = encodeURIComponent(`Message from ${senderName}`);
    const body = encodeURIComponent(`Name: ${senderName}\nEmail: ${senderEmail}\n\n${userMessage}`);
    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    feedback.style.color = "#4A6FA5"; // professional blue
    feedback.textContent = "Opening your email client...";

    closeModal(); // close modal before redirect

    setTimeout(() => {
      window.location.href = mailtoLink; // open email client
    }, 400);
  });
});
// ---------------------------------------------------------------------------
