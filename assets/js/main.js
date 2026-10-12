/* ==========================================================================
   Gautam Buddha Nagar Vikas Samiti (GBNVS) - Official NGO Website JS
   Interactive Features, Animations & UPI Scanner Modal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initAnimatedCounters();
  initDonationCalculator();
  initProjectFilters();
  initFormHandlers();
  initGalleryFilters();
  initLightboxModal();
  initFloatingSideBar();
  initTestimonialCarousel();
  initFloatingFeedbackPill();
  initHeroSlideshow();
});

// Sticky Header & Navbar Scroll Effect
function initStickyHeader() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile Menu Drawer
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const closeBtn = document.querySelector('.drawer-close');
  const overlay = document.querySelector('.drawer-overlay');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);
}

// Animated Impact Counter Numbers
function initAnimatedCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length === 0) return;

  const observerOptions = { threshold: 0.5 };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetNumber = parseInt(target.getAttribute('data-counter'), 10);
        const prefix = target.getAttribute('data-prefix') || '';
        const suffix = target.getAttribute('data-suffix') || '';
        const duration = 2000;
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = targetNumber / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= targetNumber) {
            target.textContent = prefix + targetNumber.toLocaleString('en-IN') + suffix;
            clearInterval(timer);
          } else {
            target.textContent = prefix + Math.floor(current).toLocaleString('en-IN') + suffix;
          }
        }, stepTime);

        observer.unobserve(target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

// Interactive Donation Impact Tier Calculator
function initDonationCalculator() {
  const amountBtns = document.querySelectorAll('.amount-btn');
  const customInput = document.querySelector('.custom-amount-input');
  const impactTitle = document.getElementById('impact-title');
  const impactDesc = document.getElementById('impact-desc');
  const donateSubmitBtn = document.getElementById('donate-submit-btn');

  if (!amountBtns.length) return;

  const impactTiers = {
    '500': {
      title: '📚 Primary Education Starter Kit',
      desc: 'Sponsors school bag, textbooks, uniform and stationeries for 1 underprivileged child in Gautam Buddha Nagar.'
    },
    '1500': {
      title: '🧵 Women Vocational Skill Module',
      desc: 'Provides sewing machine access & 1 month raw material training for 1 woman to build self-sustaining livelihood.'
    },
    '5000': {
      title: '🩺 Free Rural Health Checkup Camp',
      desc: 'Funds diagnostic kits, free medicines & doctor consultation for up to 50 senior citizens in rural villages.'
    },
    '10000': {
      title: '🌳 Clean Green Plantation Drive',
      desc: 'Plants & nurtures 100 native shade trees with guard fences across community grounds and rural school premises.'
    }
  };

  function updateImpactText(amount) {
    if (donateSubmitBtn) {
      donateSubmitBtn.textContent = `Proceed to Donate ₹${amount.toLocaleString('en-IN')}`;
    }

    if (impactTiers[amount]) {
      if (impactTitle) impactTitle.textContent = impactTiers[amount].title;
      if (impactDesc) impactDesc.textContent = impactTiers[amount].desc;
    } else {
      if (impactTitle) impactTitle.textContent = '🌟 Collective Development Impact';
      if (impactDesc) impactDesc.textContent = `Your generous contribution of ₹${amount.toLocaleString('en-IN')} directly supports GBNVS's integrated rural development programs.`;
    }
  }

  amountBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      amountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const val = btn.getAttribute('data-amount');
      if (customInput) customInput.value = val;
      updateImpactText(parseInt(val, 10));
    });
  });

  if (customInput) {
    customInput.addEventListener('input', () => {
      const val = parseInt(customInput.value, 10) || 0;
      amountBtns.forEach(b => {
        if (b.getAttribute('data-amount') === String(val)) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
      updateImpactText(val);
    });
  }
}

// Initiatives & Projects Filter Tabs
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          card.style.opacity = '0';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Form Handlers & UPI Scanner Modal Trigger
function initFormHandlers() {
  const forms = document.querySelectorAll('form[data-handle]');
  forms.forEach(form => {
    // Dynamic Volunteer Fee Button update
    const feeOptions = form.querySelectorAll('input[name="volunteer_fee"]');
    const volSubmitBtn = form.querySelector('#volunteer-submit-btn');
    if (feeOptions.length > 0 && volSubmitBtn) {
      feeOptions.forEach(opt => {
        opt.addEventListener('change', () => {
          const val = opt.value;
          volSubmitBtn.innerHTML = `<i data-lucide="check-circle-2"></i> Pay Registration Fee (₹${val}) & Register`;
          if (window.lucide) window.lucide.createIcons();

          const feeCards = form.querySelectorAll('.fee-option-card');
          feeCards.forEach(c => {
            c.classList.remove('active');
            c.style.borderColor = 'rgba(255,255,255,0.15)';
          });
          const parentCard = opt.closest('.fee-option-card');
          if (parentCard) {
            parentCard.classList.add('active');
            parentCard.style.borderColor = 'var(--primary)';
          }
        });
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formType = form.getAttribute('data-handle');

      if (formType === 'donation') {
        const customInput = form.querySelector('.custom-amount-input');
        let amount = customInput ? (parseInt(customInput.value, 10) || 500) : 500;
        openUpiScannerModal(amount, form, 'Donation');
      } else if (formType === 'volunteer') {
        const selectedFee = form.querySelector('input[name="volunteer_fee"]:checked');
        let fee = selectedFee ? (parseInt(selectedFee.value, 10) || 250) : 250;
        openUpiScannerModal(fee, form, 'Volunteer Registration Fee');
      } else if (formType === 'contact') {
        showToast('✉️ Message sent successfully! We will get back to you within 24 hours.');
        form.reset();
      }
    });
  });
}

// Open Interactive UPI QR Scanner Modal
function openUpiScannerModal(amount, targetForm, purpose = 'Donation') {
  let modalOverlay = document.getElementById('gbnvs-upi-modal');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'gbnvs-upi-modal';
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);
  }

  const isVolunteer = (purpose === 'Volunteer Registration Fee');
  const modalTitle = isVolunteer ? '⚡ Volunteer Registration Fee UPI QR' : '⚡ UPI Payment QR Code';
  const modalNote = isVolunteer ? 'Official Volunteer ID & Kit will be dispatched upon payment.' : '🔒 80G Tax Exemption Receipt will be emailed instantly upon submission.';
  const upiTn = isVolunteer ? 'GBNVS+Volunteer+Fee' : 'GBNVS+Donation';

  const formattedAmount = amount.toLocaleString('en-IN');
  const upiUrl = `upi://pay?pa=gbnvsamiti@sbi&pn=GAUTAM+BUDDHA+NAGAR+VIKAS+SAMITI&am=${amount}&cu=INR&tn=${upiTn}`;
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(upiUrl)}`;

  modalOverlay.innerHTML = `
    <div class="modal-card">
      <div class="modal-header">
        <h3>${modalTitle}</h3>
        <button type="button" class="modal-close" onclick="closeUpiModal()">&times;</button>
      </div>

      <div class="modal-body">
        <div class="upi-amount-badge">₹ ${formattedAmount}</div>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
          Payee: <strong>GAUTAM BUDDHA NAGAR VIKAS SAMITI</strong><br>
          <span style="font-size: 0.8rem; color: var(--primary);">${purpose}</span>
        </p>

        <div class="qr-wrapper">
          <div class="scan-line"></div>
          <img src="${qrApiUrl}" alt="UPI QR Code for ₹${amount}">
        </div>

        <div class="upi-id-box">
          <span>UPI ID: <strong>gbnvsamiti@sbi</strong></span>
          <button type="button" style="background: none; border: none; color: var(--primary-dark); cursor: pointer; font-weight: 700;" onclick="copyUpiId('gbnvsamiti@sbi')">📋 Copy</button>
        </div>

        <div style="display: flex; justify-content: center; gap: 12px; margin-bottom: 1.25rem; font-size: 0.78rem; color: var(--text-muted);">
          <span>📱 GPay</span> • <span>PhonePe</span> • <span>Paytm</span> • <span>BHIM</span> • <span>Any UPI App</span>
        </div>

        <div style="text-align: left; margin-bottom: 1.25rem;">
          <label style="display: block; font-size: 0.82rem; font-weight: 700; color: var(--dark-bg); margin-bottom: 4px;">Enter 12-Digit UPI Ref / UTR No (Optional):</label>
          <input type="text" id="upi-utr-input" placeholder="e.g. 426810984123" style="width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.9rem;">
        </div>

        <button type="button" id="confirm-payment-btn" class="btn btn-accent" style="width: 100%; padding: 14px; font-size: 1.05rem;" onclick="submitConfirmedDonation('${purpose}')">
          <i data-lucide="check-circle"></i> Confirm Payment & Submit Form
        </button>

        <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 10px;">
          ${modalNote}
        </p>
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  window.activeDonationForm = targetForm;
}

window.closeUpiModal = function () {
  const modalOverlay = document.getElementById('gbnvs-upi-modal');
  if (modalOverlay) modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
};

window.copyUpiId = function (text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('📋 UPI ID gbnvsamiti@sbi copied to clipboard!');
  });
};

window.submitConfirmedDonation = function (purpose = 'Donation') {
  closeUpiModal();
  if (purpose === 'Volunteer Registration Fee') {
    showToast('🎉 Volunteer Registration Confirmed! Welcome to GBNVS. Your Official Volunteer Kit will be issued shortly.');
  } else {
    showToast('🙏 Payment Confirmed! Thank you for supporting Gautam Buddha Nagar Vikas Samiti. 80G Tax Receipt generated!');
  }
  if (window.activeDonationForm) {
    window.activeDonationForm.reset();
  }
};

// Notification Toast Popup
function showToast(msg) {
  let toast = document.getElementById('gbnvs-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'gbnvs-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: var(--dark-bg, #0f172a);
      color: #ffffff;
      padding: 16px 26px;
      border-radius: 12px;
      box-shadow: 0 15px 40px rgba(0,0,0,0.3);
      border: 1px solid var(--primary, #059669);
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      font-size: 0.95rem;
      z-index: 999999;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: all 0.4s ease;
      opacity: 0;
      transform: translateY(20px);
    `;
    document.body.appendChild(toast);
  }

  toast.innerHTML = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
  }, 4500);
}

// Gallery Category Filter Tabs Handler
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-card[data-category]');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (cat === 'all' || itemCat === cat) {
          item.style.display = 'block';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Gallery Lightbox Modal Handler
function initLightboxModal() {
  const modal = document.getElementById('gallery-lightbox-modal');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  if (!modal || !galleryCards.length) return;

  const modalImg = modal.querySelector('#lightbox-img');
  const modalTitle = modal.querySelector('#lightbox-title');
  const modalCategory = modal.querySelector('#lightbox-category');
  const modalDesc = modal.querySelector('#lightbox-desc');
  const modalMeta = modal.querySelector('#lightbox-meta');

  let currentIndex = 0;
  let visibleCards = [];

  function updateVisibleCards() {
    visibleCards = Array.from(document.querySelectorAll('.gallery-card')).filter(card => card.style.display !== 'none');
  }

  function showImage(index) {
    updateVisibleCards();
    if (visibleCards.length === 0) return;

    if (index < 0) index = visibleCards.length - 1;
    if (index >= visibleCards.length) index = 0;

    currentIndex = index;
    const card = visibleCards[currentIndex];

    const img = card.querySelector('.gallery-thumb img');
    const title = card.getAttribute('data-title') || card.querySelector('.gallery-title')?.textContent || '';
    const category = card.getAttribute('data-category-name') || card.querySelector('.gallery-badge')?.textContent || '';
    const desc = card.getAttribute('data-desc') || 'Community outreach initiative by Gautam Buddha Nagar Vikas Samiti.';
    const date = card.getAttribute('data-date') || '';
    const location = card.getAttribute('data-location') || 'Gautam Buddha Nagar, UP';

    if (modalImg && img) {
      modalImg.src = img.src;
      modalImg.alt = img.alt || title;
    }
    if (modalTitle) modalTitle.textContent = title;
    if (modalCategory) modalCategory.textContent = category;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalMeta) {
      modalMeta.innerHTML = `📍 <strong>${location}</strong> &nbsp;•&nbsp; 📅 <strong>${date}</strong> &nbsp;•&nbsp; Image ${currentIndex + 1} of ${visibleCards.length}`;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  galleryCards.forEach((card) => {
    card.addEventListener('click', () => {
      updateVisibleCards();
      const idx = visibleCards.indexOf(card);
      showImage(idx !== -1 ? idx : 0);
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentIndex + 1);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });
}

// Injects Floating Right Edge Action Buttons (Donate, Volunteer, WhatsApp Channel)
function initFloatingSideBar() {
  if (document.querySelector('.floating-side-bar')) return;

  const floatingBar = document.createElement('div');
  floatingBar.className = 'floating-side-bar';
  floatingBar.innerHTML = `
    <a href="donate.html" class="floating-side-btn btn-side-donate" title="Donate Now to GBNVS">
      <span class="side-icon"><i data-lucide="heart" style="width: 20px; height: 20px;"></i></span>
      <span class="side-text">Donate Now</span>
    </a>
    <a href="volunteer.html" class="floating-side-btn btn-side-volunteer" title="Register as Volunteer">
      <span class="side-icon"><i data-lucide="heart-handshake" style="width: 20px; height: 20px;"></i></span>
      <span class="side-text">Volunteer</span>
    </a>
    <a href="https://www.whatsapp.com/channel/0029VaahfkN545uynHIrEl3T" target="_blank" rel="noopener noreferrer" class="floating-side-btn btn-side-whatsapp" title="Join GBNVS Official WhatsApp Channel">
      <span class="side-icon"><i data-lucide="message-circle" style="width: 20px; height: 20px;"></i></span>
      <span class="side-text">WhatsApp Channel</span>
    </a>
  `;

  document.body.appendChild(floatingBar);
  if (window.lucide) window.lucide.createIcons();
}

// Interactive Responsive Testimonials Carousel
function initTestimonialCarousel() {
  const track = document.getElementById('testimonial-track');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const dotsContainer = document.getElementById('testimonial-dots');
  const wrapper = document.querySelector('.testimonial-carousel-wrapper');

  if (!track || !prevBtn || !nextBtn) return;

  const slides = Array.from(track.children);
  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;

  function getVisibleSlidesCount() {
    const width = window.innerWidth;
    if (width <= 640) return 1;
    if (width <= 992) return 2;
    return 3;
  }

  function getMaxIndex() {
    const visibleCount = getVisibleSlidesCount();
    return Math.max(0, slides.length - visibleCount);
  }

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const maxIdx = getMaxIndex();
    const dotsCount = maxIdx + 1;

    for (let i = 0; i < dotsCount; i++) {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${i === currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(i);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    const maxIdx = getMaxIndex();
    if (index < 0) {
      currentIndex = maxIdx;
    } else if (index > maxIdx) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = 24;
    const moveAmount = currentIndex * (slideWidth + gap);
    track.style.transform = `translateX(-${moveAmount}px)`;
    updateDots();
  }

  prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
    resetAutoplay();
  });

  nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
    resetAutoplay();
  });

  // Touch and drag swipe support
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    stopAutoplay();
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    const diff = startX - currentX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
    }
    startAutoplay();
  });

  // Autoplay functionality with smooth pause on hover
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 4500);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAutoplay);
    wrapper.addEventListener('mouseleave', startAutoplay);
  }

  window.addEventListener('resize', () => {
    const maxIdx = getMaxIndex();
    if (currentIndex > maxIdx) currentIndex = maxIdx;
    renderDots();
    goToSlide(currentIndex);
  });

  renderDots();
  goToSlide(0);
  startAutoplay();
}

// Injects Bottom Floating Feedback & Testimonial Pill Trigger
function initFloatingFeedbackPill() {
  if (document.getElementById('floating-feedback-pill')) return;

  const pill = document.createElement('div');
  pill.id = 'floating-feedback-pill';
  pill.className = 'floating-feedback-pill';
  pill.innerHTML = `
    <button type="button" class="feedback-pill-btn" onclick="openTestimonialFeedbackModal()" title="Share Your Feedback & Testimonial">
      <span class="feedback-pill-icon"><i data-lucide="message-square-heart" style="width: 18px; height: 18px;"></i></span>
      <span class="feedback-pill-text">Share Feedback</span>
      <span class="feedback-pill-badge">✨</span>
    </button>
  `;

  document.body.appendChild(pill);
  if (window.lucide) window.lucide.createIcons();
}

// Interactive Feedback & Testimonial Modal
window.selectedStarRating = 5;

window.openTestimonialFeedbackModal = function () {
  let modal = document.getElementById('gbnvs-testimonial-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'gbnvs-testimonial-modal';
    modal.className = 'feedback-modal-overlay';
    document.body.appendChild(modal);
  }

  window.selectedStarRating = 5;

  modal.innerHTML = `
    <div class="feedback-modal-card">
      <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(5,150,105,0.15); display: flex; align-items: center; justify-content: center; color: var(--primary); flex-shrink: 0;">
            <i data-lucide="message-square-heart" style="width: 24px; height: 24px;"></i>
          </div>
          <div>
            <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--dark-bg); margin: 0; line-height: 1.2;">Share Your Feedback & Story</h3>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin: 2px 0 0 0;">Your voice helps showcase genuine grassroots impact across Gautam Buddha Nagar.</p>
          </div>
        </div>
        <button type="button" onclick="closeTestimonialFeedbackModal()" style="background: none; border: none; font-size: 1.8rem; line-height: 1; color: #94a3b8; cursor: pointer; padding: 0 4px;" aria-label="Close Modal">&times;</button>
      </div>

      <form id="testimonial-feedback-form" onsubmit="handleTestimonialSubmit(event)">
        <!-- Star Rating Picker -->
        <div style="margin-bottom: 1.25rem; background: #f8fafc; border: 1px solid var(--border-color); border-radius: 12px; padding: 12px 16px;">
          <label style="display: block; font-size: 0.85rem; font-weight: 700; color: var(--dark-bg); margin-bottom: 4px;">Your Experience Rating:</label>
          <div class="feedback-star-picker" id="star-picker">
            <button type="button" class="star-pick-btn selected" data-value="1"><i data-lucide="star"></i></button>
            <button type="button" class="star-pick-btn selected" data-value="2"><i data-lucide="star"></i></button>
            <button type="button" class="star-pick-btn selected" data-value="3"><i data-lucide="star"></i></button>
            <button type="button" class="star-pick-btn selected" data-value="4"><i data-lucide="star"></i></button>
            <button type="button" class="star-pick-btn selected" data-value="5"><i data-lucide="star"></i></button>
            <span id="star-label" style="font-size: 0.85rem; font-weight: 700; color: #d97706; margin-left: 8px;">⭐ 5 - Exceptional Experience</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 4px; color: var(--dark-bg);">Full Name *</label>
            <input type="text" id="tf-name" required placeholder="e.g. Ramesh Kumar" style="width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.9rem;">
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 4px; color: var(--dark-bg);">I Am A... *</label>
            <select id="tf-role" required style="width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.9rem; background: #ffffff;">
              <option value="Community Volunteer">Community Volunteer</option>
              <option value="Beneficiary / Village Resident">Beneficiary / Village Resident</option>
              <option value="Donor / Contributor">Donor / Contributor</option>
              <option value="Corporate CSR Partner">Corporate CSR Partner</option>
              <option value="School Educator / Principal">School Educator / Principal</option>
              <option value="Village Panchayat Member">Village Panchayat Member</option>
              <option value="Well-Wisher">Well-Wisher</option>
            </select>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 4px; color: var(--dark-bg);">Location / Village</label>
            <input type="text" id="tf-location" placeholder="e.g. Jewar, Dadri, Greater Noida" style="width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.9rem;">
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 4px; color: var(--dark-bg);">Related Initiative</label>
            <select id="tf-category" style="width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.9rem; background: #ffffff;">
              <option value="Women Empowerment">Women Empowerment</option>
              <option value="Child Education">Child Education & School Drives</option>
              <option value="Youth Volunteer">Youth Volunteering</option>
              <option value="Healthcare Outreach">Free Health Camps</option>
              <option value="Tree Plantation">Green Tree Drives</option>
              <option value="General Impact">General Social Impact</option>
            </select>
          </div>
        </div>

        <div style="margin-bottom: 1.25rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 4px; color: var(--dark-bg);">Your Testimonial / Feedback Message *</label>
          <textarea id="tf-message" rows="4" required placeholder="Write your authentic feedback or story... How did GBNVS impact your life, village or volunteering journey?" style="width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.9rem; resize: vertical;"></textarea>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <label style="display: flex; align-items: flex-start; gap: 8px; font-size: 0.82rem; color: #64748b; cursor: pointer;">
            <input type="checkbox" id="tf-consent" checked style="margin-top: 3px;">
            <span>I agree to allow Gautam Buddha Nagar Vikas Samiti to feature my feedback & testimonial on official media channels.</span>
          </label>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px; font-size: 1rem; border-radius: 10px; display: flex; align-items: center; justify-content: center; gap: 8px;">
          <i data-lucide="send" style="width: 18px; height: 18px;"></i> Submit Feedback
        </button>
      </form>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (window.lucide) window.lucide.createIcons();

  setupStarPicker();
};

window.closeTestimonialFeedbackModal = function () {
  const modal = document.getElementById('gbnvs-testimonial-modal');
  if (modal) {
    modal.classList.remove('active');
  }
  document.body.style.overflow = '';
};

// Handle Star Picker Interactions
function setupStarPicker() {
  const starBtns = document.querySelectorAll('.star-pick-btn');
  const label = document.getElementById('star-label');
  const starDescriptions = {
    '1': '⭐ 1 - Needs Improvement',
    '2': '⭐ 2 - Satisfactory',
    '3': '⭐ 3 - Good Experience',
    '4': '⭐ 4 - Very Impressive',
    '5': '⭐ 5 - Exceptional Experience'
  };

  starBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = parseInt(btn.getAttribute('data-value'));
      window.selectedStarRating = val;
      starBtns.forEach(b => {
        const bVal = parseInt(b.getAttribute('data-value'));
        b.classList.toggle('selected', bVal <= val);
      });
      if (label) label.textContent = starDescriptions[val] || `⭐ ${val} Stars`;
    });

    btn.addEventListener('mouseenter', () => {
      const val = parseInt(btn.getAttribute('data-value'));
      starBtns.forEach(b => {
        const bVal = parseInt(b.getAttribute('data-value'));
        b.classList.toggle('hovered', bVal <= val);
      });
    });

    btn.addEventListener('mouseleave', () => {
      starBtns.forEach(b => b.classList.remove('hovered'));
    });
  });
}

// Handle Testimonial Form Submission
window.handleTestimonialSubmit = function (e) {
  e.preventDefault();
  const name = document.getElementById('tf-name')?.value.trim() || 'Anonymous';
  const role = document.getElementById('tf-role')?.value || 'Community Supporter';
  const location = document.getElementById('tf-location')?.value.trim() || 'Gautam Buddha Nagar';
  const category = document.getElementById('tf-category')?.value || 'Community Welfare';
  const message = document.getElementById('tf-message')?.value.trim() || '';
  const stars = window.selectedStarRating || 5;

  const card = document.querySelector('.feedback-modal-card');
  if (card) {
    card.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem;">
        <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(5,150,105,0.15); color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto;">
          <i data-lucide="check-circle" style="width: 36px; height: 36px;"></i>
        </div>
        <h3 style="font-size: 1.45rem; font-weight: 800; color: var(--dark-bg); margin-bottom: 8px;">Thank You, ${name}! 🎉</h3>
        <p style="font-size: 0.95rem; color: #475569; line-height: 1.6; margin-bottom: 1.5rem;">
          Your feedback and testimonial have been successfully recorded. Stories like yours inspire more citizens, donors, and volunteers to come together for rural development in Gautam Buddha Nagar.
        </p>
        <button type="button" class="btn btn-primary" onclick="closeTestimonialFeedbackModal()" style="padding: 10px 24px;">
          Close
        </button>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  }

  // If on the homepage where testimonial-track exists, append the new testimonial to the carousel!
  const track = document.getElementById('testimonial-track');
  if (track) {
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'GB';
    const newSlide = document.createElement('div');
    newSlide.className = 'testimonial-slide';

    let starsHtml = '';
    for (let i = 0; i < stars; i++) {
      starsHtml += '<i data-lucide="star"></i>';
    }

    newSlide.innerHTML = `
      <div class="testimonial-card">
        <div>
          <span class="testimonial-tag" style="background: rgba(5, 150, 105, 0.12); color: var(--primary);">
            ${category}
          </span>
          <div class="testimonial-stars">
            ${starsHtml}
          </div>
          <p class="testimonial-text">
            “${message}”
          </p>
        </div>
        <div class="testimonial-author">
          <div class="testimonial-avatar" style="background: linear-gradient(135deg, #059669, #34d399);">
            ${initials}
          </div>
          <div class="testimonial-info">
            <h4>${name}</h4>
            <p>${role} • ${location}</p>
          </div>
        </div>
      </div>
    `;

    track.appendChild(newSlide);
    if (window.lucide) window.lucide.createIcons();

    // Re-initialize or update dots
    const dotsContainer = document.getElementById('testimonial-dots');
    if (dotsContainer) {
      const slides = Array.from(track.children);
      const width = window.innerWidth;
      const visibleCount = width <= 640 ? 1 : (width <= 992 ? 2 : 3);
      const maxIdx = Math.max(0, slides.length - visibleCount);
      dotsContainer.innerHTML = '';
      for (let i = 0; i <= maxIdx; i++) {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${i === maxIdx ? 'active' : ''}`;
        dotsContainer.appendChild(dot);
      }
      const slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${maxIdx * (slideWidth + 24)}px)`;
    }
  }

  setTimeout(() => {
    closeTestimonialFeedbackModal();
  }, 3500);
};

// Global click and key listeners for modal closing
document.addEventListener('click', (e) => {
  const modal = document.getElementById('gbnvs-testimonial-modal');
  if (modal && modal.classList.contains('active') && e.target === modal) {
    closeTestimonialFeedbackModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeTestimonialFeedbackModal();
  }
});

// Interactive Hero Banner Slideshow
function initHeroSlideshow() {
  const container = document.getElementById('hero-slideshow');
  if (!container) return;

  const slides = container.querySelectorAll('.hero-slide');
  const prevBtn = document.getElementById('hero-slide-prev');
  const nextBtn = document.getElementById('hero-slide-next');
  const dotsContainer = document.getElementById('hero-slide-dots');

  if (!slides.length) return;

  let currentIdx = 0;
  let autoplayTimer = null;

  // Dynamically render indicator dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `hero-slide-dot ${idx === currentIdx ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to hero slide ${idx + 1}`);
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(idx);
        resetTimer();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(idx) {
    slides[currentIdx].classList.remove('active');
    currentIdx = (idx + slides.length) % slides.length;
    slides[currentIdx].classList.add('active');

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.hero-slide-dot');
      dots.forEach((dot, dIdx) => {
        dot.classList.toggle('active', dIdx === currentIdx);
      });
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(currentIdx - 1);
      resetTimer();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(currentIdx + 1);
      resetTimer();
    });
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      goToSlide(currentIdx + 1);
    }, 4500);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetTimer() {
    stopAutoplay();
    startAutoplay();
  }

  container.addEventListener('mouseenter', stopAutoplay);
  container.addEventListener('mouseleave', startAutoplay);

  // Mobile Touch Swipe Support
  let touchStartX = 0;
  container.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    stopAutoplay();
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goToSlide(currentIdx + 1);
      } else {
        goToSlide(currentIdx - 1);
      }
    }
    startAutoplay();
  });

  startAutoplay();
}



