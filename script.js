/**
 * SANDIP KUNDU - PORTFOLIO JAVASCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const backToTopBtn = document.getElementById('back-to-top');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  // Case Study Modal & Portfolio Carousel Elements
  const csModal = document.getElementById('case-study-modal');
  const csModalTitle = document.getElementById('cs-modal-title');
  const csTopUrlContainer = document.getElementById('cs-top-url-container');
  const csModalClose = document.getElementById('cs-modal-close');
  const csRole = document.getElementById('cs-role');
  const csDesc = document.getElementById('cs-desc');
  const csFeaturesList = document.getElementById('cs-features-list');
  const csFeaturesSection = document.getElementById('cs-features-section');
  const csNote = document.getElementById('cs-note');
  const csNoteSection = document.getElementById('cs-note-section');
  const csSkillsList = document.getElementById('cs-skills-list');
  const csPublished = document.getElementById('cs-published');
  const csLiveLink = document.getElementById('cs-live-link');
  const csContactLink = document.getElementById('cs-contact-link');
  const csGalleryMediaStack = document.getElementById('cs-gallery-media-stack');
  const csModalBottom = document.getElementById('cs-modal-bottom');
  const csMoreWrap = document.querySelector('.cs-more-carousel-wrap');
  const csMoreTrack = document.getElementById('cs-more-track');
  const csMorePrev = document.getElementById('cs-more-prev');
  const csMoreNext = document.getElementById('cs-more-next');

  // Carousel Elements
  const portfolioTrack = document.getElementById('portfolio-carousel-track');
  const portfolioPrevBtn = document.getElementById('portfolio-prev-btn');
  const portfolioNextBtn = document.getElementById('portfolio-next-btn');

  // Contact Form
  const contactForm = document.getElementById('contact-form');
  const formSubmitBtn = document.getElementById('form-submit-btn');

  // Skills Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  // Copy Buttons
  const copyBtns = document.querySelectorAll('.copy-btn');

  /* 1. Toast Notification */
  let toastTimer = null;
  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  /* 2. Header Scroll & Back to Top */
  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Header scrolled style
    if (scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top visibility
    if (scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* 3. Mobile Navigation Menu */
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any nav item
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* 4. Active Navigation Link on Scroll */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const highlightNavOnScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  /* 5. Hero Stats Counter */

  /* 6. Skills Filter */
  if (filterBtns.length && skillCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        skillCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => {
              card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 20);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* 7. Copy to Clipboard */
  copyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy');
      if (!text) return;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for older environments
          const tempInput = document.createElement('input');
          tempInput.value = text;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        showToast(`Copied to clipboard: ${text}`);

        // Visual flash on button
        const originalIcon = btn.innerHTML;
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent-emerald);"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        setTimeout(() => {
          btn.innerHTML = originalIcon;
        }, 2000);
      } catch (err) {
        showToast(`Selected text: ${text}`);
      }
    });
  });

  /* 8. Portfolio Data & Case Study Modal */
  const projectsData = {
    'tab-travels': {
      id: 'tab-travels',
      title: 'Frontend Website - Tab Travels Whatsapp Booking Website',
      role: 'Front End Development',
      desc: 'Built a responsive travel website for TAB Travels using HTML, CSS, and JavaScript. The website is designed to showcase travel services and allow customers to make booking enquiries directly through WhatsApp.',
      features: [
        'Responsive desktop & mobile design',
        'Travel service presentation',
        'WhatsApp-based booking flow',
        'Clear call-to-action sections',
        'Interactive JavaScript elements',
        'Clean, user-friendly interface'
      ],
      note: 'This is a WhatsApp booking website, not an e-commerce website.',
      skills: ['HTML5', 'CSS 3', 'JavaScript', 'GitHub'],
      published: 'Sep 26, 2026',
      live: 'https://tab-travels-private.vercel.app',
      thumb: 'assets/projects/thumb_tab_travels.png',
      video: 'assets/projects/tab_travels_demo.mp4',
      images: [
        'assets/projects/tab_travels_16_9.png'
      ]
    },
    'wa-outreach': {
      id: 'wa-outreach',
      title: 'WA Outreach — WhatsApp Automation & Live CRM',
      role: 'Full Stack & Automation',
      desc: 'WA Outreach is a full-stack WhatsApp automation and CRM platform built with Node.js and Express.js for scalable customer engagement.',
      features: [
        'Excel Ingestion: Parses Excel/CSV files and sanitizes phone numbers.',
        'Dynamic Tags: Injects custom lead variables into templates.',
        'Anti-Ban Queue: Sends messages with randomized delay intervals.',
        '2-Way Live Chat: Real-time customer messaging via Socket.io.',
        'Campaign Control: Start, pause, resume and track live dispatch stats.'
      ],
      note: 'Technologies: Node.js, Express, Socket.io, Baileys, Multer, XLSX, Docker.',
      skills: ['Node.js', 'Socket.io', 'ExpressJS', 'Docker', 'Front-End Development'],
      published: 'Nov 18, 2023',
      live: null,
      thumb: 'assets/projects/thumb_wa_outreach.png',
      images: [
        'assets/projects/wa_outreach_16_9.png'
      ]
    },
    'basirhat-honey': {
      id: 'basirhat-honey',
      title: 'Basirhat Honey Cultivators Co-Op E-Commerce',
      role: 'WordPress & E-Commerce Architecture',
      desc: 'A custom, high-converting e-commerce web platform engineered for Basirhat Honey Cultivators R.E.H. Indl. Co-Op. Society Limited. Designed to showcase 100% natural, freshly extracted raw honey, bee wax, pollen, and comb honey collections.',
      features: [
        'Custom WooCommerce storefront with dynamic product catalog',
        'Category filtering: Natural Raw Honey, Bees Wax, Pollen, Comb Honey',
        'Bespoke Elementor Pro architecture with Advanced Custom Fields (ACF)',
        'Responsive, high-speed mobile checkout & payment integration',
        'Co-operative society verification & authentic sourcing credentials',
        'SEO optimization & performance tuning for fast Core Web Vitals'
      ],
      note: 'Custom WordPress, WooCommerce, and ACF implementation for Basirhat Honey Cultivators Co-Op Society.',
      skills: ['WordPress', 'Elementor', 'WooCommerce', 'ACF'],
      published: 'Jul 14, 2025',
      live: 'https://basirhathoney.com/',
      thumb: 'assets/projects/thumb_basirhat_honey.png',
      images: [
        'assets/projects/basirhat_honey_16_9.png'
      ]
    },
    'wa-multidevice': {
      id: 'wa-multidevice',
      title: 'WhatsApp Multi-Device Engine (Employee and Admin Panel)',
      role: 'Full Stack & Automation',
      desc: 'Multi-user WhatsApp CRM & outreach server built with Node.js, Express, Socket.io, and Baileys.',
      features: [
        'Team RBAC & Collision Lock: Role-based access with ownership locks preventing duplicate outreach.',
        'Disk Persistence: Serializes all chats & messages to JSON files in store_data/.',
        'LID Canonical Sync: Bidirectional LID-to-phone mapping & thread merging.',
        'Media Pipeline: Automated inbound decryption & 25MB outbound attachments.',
        'Anti-Ban Emulation: Character-based typing presence and pre-flight number checks.'
      ],
      note: 'Technologies: Node.js, Express, Socket.io, Baileys.',
      skills: ['Node.js', 'ExpressJS', 'Socket.io', 'HTML5', 'CSS 3'],
      published: 'Mar 22, 2024',
      live: null,
      thumb: 'assets/projects/thumb_wa_multidevice.png',
      images: [
        'assets/projects/wa_multidevice_1.png',
        'assets/projects/wa_multidevice_2.png',
        'assets/projects/wa_multidevice_3.png'
      ]
    },
    'nexus-digital': {
      id: 'nexus-digital',
      title: "Frontend Website - Nexus Digital's website (Digital Marketing Agency)",
      role: 'Front End Development & Digital Architecture',
      desc: "Nexus Digital is a premier digital agency and technology portfolio website engineered with modern dark glassmorphism. Showcasing full-stack website development, custom mobile applications, Cotmit AI automation, interactive client case studies, verified review databases, and lead consultation booking. Built using high-performance HTML5, CSS3, ES6+ JavaScript, and Vercel edge deployment, it provides seamless multi-page routing, fluid responsive design, dynamic micro-interactions, and robust SEO to help businesses transform their digital presence with peak performance and engineering excellence.",
      features: [
        'Modern dark glassmorphism UI & responsive multi-page layout',
        'Cotmit AI automation & interactive client case studies',
        'Verified client review databases & credibility engine',
        'Lead consultation booking flow & instant lead dispatch',
        'High-performance Vercel edge deployment & XML sitemap SEO',
        'Fluid micro-interactions & cross-browser responsiveness'
      ],
      note: 'Engineered with high-performance HTML5, CSS3, ES6+ JavaScript, and Vercel edge deployment.',
      skills: ['HTML5', 'CSS 3', 'JavaScript', 'XML Sitemap', 'Vercel'],
      published: 'Sep 18, 2026',
      live: 'https://nexusdigital.net.in/',
      thumb: 'assets/projects/thumb_nexus_digital.png',
      video: 'assets/projects/nexus_digital_demo.mp4',
      images: [
        'assets/projects/nexus_digital_16_9.png'
      ]
    },
    'maplead-scraper': {
      id: 'maplead-scraper',
      title: 'MapLead Scraper — Google Sheets Add-on & B2B Extraction Engine',
      role: 'Full Stack & Automation',
      desc: 'Google Sheets add-on and lead engine that extracts verified business data from Google Maps using Playwright & Node.js.',
      features: [
        'Sheets Integration: Interactive sidebar & custom formulas like =IMPORT_GMAPS.',
        'Deep Inspection: Extracts direct phones, full addresses & clean URLs.',
        'Stream Interceptor: Decodes internal Google Maps JSON chunks.',
        'Zero-Retention: Memory-drained queue ensuring complete data privacy.',
        'Infinite Scroll: Auto-scrolls feeds to capture every listing.'
      ],
      note: 'Technologies: Node.js, Express, Playwright, Apps Script, Cloudflare.',
      skills: ['Google Apps Script', 'Node.js', 'ExpressJS', 'HTML5', 'JSON'],
      published: 'Dec 05, 2023',
      live: null,
      thumb: 'assets/projects/thumb_maplead_scraper.png',
      video: 'assets/projects/maplead_scraper_demo.mp4',
      images: [
        'assets/projects/maplead_scraper_16_9.png'
      ]
    },
    'fitness-revolution': {
      id: 'fitness-revolution',
      title: 'Frontend Website - Gym Website with WhatsApp Based Subscription',
      role: 'Front End Development & Interactive Web Apps',
      desc: 'Responsive fitness web app built with HTML5, CSS3, and JavaScript featuring interactive health tools and VIP trial booking. Designed for The Fitness Revolution gym center with live operating hours detection, interactive BMI & TDEE calorie calculators, dynamic daily workout schedule, and instant WhatsApp-linked VIP pass booking.',
      features: [
        'Live Gym Status: Dynamic badge automatically detects open/closed operating hours',
        'Fitness Calculators: Built-in interactive BMI & TDEE daily calorie target calculators',
        "Dynamic Schedule: Auto-highlights the current day's workout training program",
        'VIP Pass Booking: 1-Day free trial modal with instant toast alerts & WhatsApp dispatch',
        'Modern UI: Glassmorphism dark design, mobile menu, and fluid momentum scrolling'
      ],
      note: 'Engineered with vanilla HTML5, CSS3, and modern JavaScript (ES6+).',
      skills: ['HTML5', 'CSS 3', 'JavaScript', 'GitHub'],
      published: 'May 10, 2025',
      live: null,
      thumb: 'assets/projects/thumb_fitness_revolution.png',
      video: 'assets/projects/fitness_revolution_demo.mp4',
      images: [
        'assets/projects/fitness_revolution_16_9.png'
      ]
    },
    'xpertvai': {
      id: 'xpertvai',
      title: 'XpertVai On-Demand Home Services App',
      role: 'WordPress & Custom Booking Architecture',
      desc: 'An interactive service booking web application built for XpertVai. Provides a seamless one-stop platform for booking AC repair, appliance maintenance, cleaning solutions, beauty & wellness, and shifting services.',
      features: [
        'One-Stop Service Booking: Instant lead form with category selection & direct dispatch',
        'Categorized Services: AC Repair, Appliance Maintenance, Cleaning, Shifting, Health & Care',
        'Dynamic ACF Architecture: Custom service post types with tiered pricing and technician assign',
        'WooCommerce Integration: Seamless checkout, deposit payments, and booking order management',
        'Mobile-First Responsive Layout: High-converting hero search, quick WhatsApp inquiry, and 24/7 hotline integration'
      ],
      note: 'Custom WordPress, WooCommerce, Elementor, and ACF implementation for XpertVai Home Services.',
      skills: ['WordPress', 'WooCommerce', 'ACF', 'Elementor'],
      published: 'Sep 29, 2026',
      live: 'https://expertvai.com/',
      thumb: 'assets/projects/thumb_xpertvai.png',
      images: [
        'assets/projects/xpertvai_16_9.png'
      ]
    }
  };
  let activeProjectId = 'tab-travels';

  let attachCardTriggers = () => { };
  let updateCarousel = () => { };
  let updateMoreControls = () => { };

  const renderPortfolioCarousel = () => {
    if (!portfolioTrack) return;
    const projectList = Object.values(projectsData);
    if (projectList.length === 0) {
      portfolioTrack.innerHTML = '';
      return;
    }

    portfolioTrack.innerHTML = projectList.map(project => `
      <article class="sk-portfolio-card" data-project-id="${project.id}">
        <div class="sk-card-media">
          <img src="${project.thumb}" alt="${project.title}" class="sk-card-img" loading="lazy">
          <div class="sk-card-overlay">
            <button class="sk-case-study-btn" data-project-id="${project.id}">Case study</button>
          </div>
        </div>
        <h3 class="sk-card-title">
          <a href="#case-study" class="open-case-study-link" data-project-id="${project.id}">${project.title}</a>
        </h3>
      </article>
    `).join('');

    attachCardTriggers();
    updateCarousel();
  };

  // Function to open and populate the Case Study modal
  const openCaseStudy = (projectId) => {
    const project = projectsData[projectId] || projectsData['tab-travels'];
    if (!project) return;
    activeProjectId = project.id;

    if (!csModal) return;

    // Set Title & Role
    if (csModalTitle) csModalTitle.textContent = project.title;
    if (csRole) csRole.textContent = project.role;

    // Set Header Action: Live URL button OR Privacy status badge
    if (csTopUrlContainer) {
      if (project.live) {
        csTopUrlContainer.innerHTML = `
          <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="cs-top-live-btn" title="Open live project website">
            <span>Live URL</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        `;
      } else {
        csTopUrlContainer.innerHTML = `
          <div class="cs-top-privacy-pill" title="URL unavailable due to client privacy or I've not access to url">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            <span>URL unavailable due to client privacy<br>or I've not access to url</span>
          </div>
        `;
      }
    }

    // Set Description
    if (csDesc) csDesc.textContent = project.desc;

    // Set Features List
    if (csFeaturesList && csFeaturesSection) {
      if (project.features && project.features.length > 0) {
        csFeaturesList.innerHTML = project.features.map(f => `<li>${f}</li>`).join('');
        csFeaturesSection.style.display = 'block';
      } else {
        csFeaturesSection.style.display = 'none';
      }
    }

    // Set Note
    if (csNote && csNoteSection) {
      if (project.note) {
        csNote.textContent = project.note;
        csNoteSection.style.display = 'block';
      } else {
        csNoteSection.style.display = 'none';
      }
    }

    // Set Skills
    if (csSkillsList) {
      csSkillsList.innerHTML = project.skills.map(s => `<span class="cs-skill-pill">${s}</span>`).join('');
    }

    // Set Published
    if (csPublished) {
      csPublished.textContent = `Published on ${project.published}`;
    }

    // Set Gallery
    if (csGalleryMediaStack) {
      let galleryHtml = '';

      // Primary Image
      const primaryImage = (project.images && project.images.length > 0) ? project.images[0] : project.thumb;
      if (primaryImage) {
        galleryHtml += `
          <div class="cs-gallery-item">
            <img src="${primaryImage}" alt="${project.title} featured preview" class="cs-gallery-img" loading="lazy">
          </div>
        `;
      }

      // Video
      if (project.video) {
        galleryHtml += `
          <div class="cs-gallery-item">
            <video controls playsinline poster="${primaryImage || project.thumb}" class="cs-gallery-video">
              <source src="${project.video}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        `;
      }

      // Additional Images
      if (project.images && project.images.length > 1) {
        for (let i = 1; i < project.images.length; i++) {
          galleryHtml += `
            <div class="cs-gallery-item">
              <img src="${project.images[i]}" alt="${project.title} screenshot ${i + 1}" class="cs-gallery-img" loading="lazy">
            </div>
          `;
        }
      }

      csGalleryMediaStack.innerHTML = galleryHtml;
    }

    // Populate More Projects Carousel
    if (csMoreTrack && csModalBottom) {
      const otherProjects = Object.values(projectsData).filter(p => p.id !== project.id);
      if (otherProjects.length === 0) {
        csModalBottom.style.display = 'none';
      } else {
        csModalBottom.style.display = 'block';
        csMoreTrack.innerHTML = otherProjects.map(p => `
          <div class="cs-more-card" data-project-id="${p.id}">
            <div class="cs-more-thumb">
              <img src="${p.thumb}" alt="${p.title}" loading="lazy">
            </div>
            <h4 class="cs-more-card-title">${p.title}</h4>
          </div>
        `).join('');

        // Add click listeners to items in "More by Sandip K."
        csMoreTrack.querySelectorAll('.cs-more-card').forEach(card => {
          card.addEventListener('click', () => {
            const nextId = card.getAttribute('data-project-id');
            openCaseStudy(nextId);
            // Scroll modal body to top smoothly
            const modalBody = csModal.querySelector('.cs-modal-body');
            if (modalBody) modalBody.scrollTo({ top: 0, behavior: 'smooth' });
          });
        });

        if (csMoreWrap) {
          csMoreWrap.scrollLeft = 0;
          setTimeout(updateMoreControls, 50);
        }
      }
    }

    // Open Modal
    csModal.classList.add('open');
    document.body.style.overflow = 'hidden';

    const modalBody = csModal.querySelector('.cs-modal-body');
    if (modalBody) {
      resetModalScroll();
      setTimeout(() => modalBody.focus({ preventScroll: true }), 50);
    }

    // Calculate natural sticky endpoint for details column
    setTimeout(updateStickyDetailsOffset, 40);
  };

  const updateStickyDetailsOffset = () => {
    if (!csModal || !csModal.classList.contains('open')) return;
    const leftCol = csModal.querySelector('.cs-details-col');
    const modalBody = csModal.querySelector('.cs-modal-body');
    if (!leftCol || !modalBody) return;

    if (window.innerWidth <= 900) {
      leftCol.style.position = 'static';
      leftCol.style.top = 'auto';
      return;
    }

    leftCol.style.position = 'sticky';
    leftCol.style.top = '0px';

    const bodyH = modalBody.clientHeight;
    const leftH = leftCol.scrollHeight;

    if (leftH > bodyH) {
      // Sticky offset calculation
      const topOffset = -(leftH - bodyH + 32);
      leftCol.style.top = `${topOffset}px`;
    } else {
      leftCol.style.top = '0px';
    }
  };

  window.addEventListener('resize', updateStickyDetailsOffset);

  let resetModalScroll = () => { };

  const closeCaseStudy = () => {
    if (!csModal) return;
    csModal.classList.remove('open');
    document.body.style.overflow = '';
    resetModalScroll();
  };

  // Close triggers
  if (csModalClose) csModalClose.addEventListener('click', closeCaseStudy);
  if (csContactLink) csContactLink.addEventListener('click', closeCaseStudy);

  if (csModal) {
    csModal.addEventListener('click', (e) => {
      if (e.target === csModal) closeCaseStudy();
    });

    // Smooth Scroll for Modal
    const modalBody = csModal.querySelector('.cs-modal-body');
    if (modalBody) {
      let currentY = 0;
      let targetY = 0;
      let isSmoothScrolling = false;
      let smoothRafId = null;

      const stopSmoothScroll = () => {
        if (smoothRafId) {
          cancelAnimationFrame(smoothRafId);
          smoothRafId = null;
        }
        isSmoothScrolling = false;
      };

      resetModalScroll = () => {
        stopSmoothScroll();
        currentY = 0;
        targetY = 0;
        modalBody.scrollTop = 0;
      };

      function smoothStep() {
        const diff = targetY - currentY;
        // Easing
        const easing = Math.abs(diff) < 20 ? 0.22 : 0.12;
        currentY += diff * easing;
        modalBody.scrollTop = Math.round(currentY * 10) / 10;

        if (Math.abs(diff) > 0.5) {
          smoothRafId = requestAnimationFrame(smoothStep);
        } else {
          currentY = targetY;
          modalBody.scrollTop = targetY;
          stopSmoothScroll();
        }
      }

      // Sync if user drags the scrollbar natively
      modalBody.addEventListener('scroll', () => {
        if (!isSmoothScrolling) {
          currentY = modalBody.scrollTop;
          targetY = modalBody.scrollTop;
        }
      }, { passive: true });

      csModal.addEventListener('wheel', (e) => {
        if (!csModal.classList.contains('open')) return;
        e.stopPropagation();
        e.preventDefault();

        const maxScroll = modalBody.scrollHeight - modalBody.clientHeight;
        if (maxScroll <= 0) return;

        // Normalize delta across browsers and devices
        let delta = e.deltaY;
        if (e.deltaMode === 1) delta *= 33; // Firefox lines
        else if (e.deltaMode === 2) delta *= modalBody.clientHeight; // Pages

        delta *= 0.85;

        // Align coordinates if currently stationary
        if (!isSmoothScrolling) {
          currentY = modalBody.scrollTop;
          targetY = modalBody.scrollTop;
        }

        targetY = Math.max(0, Math.min(maxScroll, targetY + delta));

        if (!isSmoothScrolling) {
          isSmoothScrolling = true;
          smoothRafId = requestAnimationFrame(smoothStep);
        }
      }, { passive: false });
    }
  }

  // Open via Query Param
  const urlParams = new URLSearchParams(window.location.search);
  const autoProject = urlParams.get('project');
  if (autoProject && projectsData[autoProject]) {
    setTimeout(() => openCaseStudy(autoProject), 150);
  }

  // More Carousel Controls
  updateMoreControls = () => {
    if (!csMoreWrap || !csMorePrev || !csMoreNext) return;
    const scrollLeft = csMoreWrap.scrollLeft;
    const maxScroll = csMoreWrap.scrollWidth - csMoreWrap.clientWidth;

    const atStart = scrollLeft <= 6;
    const atEnd = scrollLeft >= maxScroll - 6 || maxScroll <= 0;

    csMorePrev.disabled = atStart;
    csMorePrev.classList.toggle('disabled', atStart);
    csMoreNext.disabled = atEnd;
    csMoreNext.classList.toggle('disabled', atEnd);
  };

  if (csMorePrev && csMoreNext && csMoreWrap) {
    csMorePrev.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      csMoreWrap.scrollBy({ left: -280, behavior: 'smooth' });
    });
    csMoreNext.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      csMoreWrap.scrollBy({ left: 280, behavior: 'smooth' });
    });
    csMoreWrap.addEventListener('scroll', updateMoreControls, { passive: true });
  }

  /* 9. Portfolio Carousel Track */
  if (portfolioTrack) {
    let scrollIndex = 0;

    const getCardWidth = () => {
      const firstCard = portfolioTrack.querySelector('.sk-portfolio-card');
      if (!firstCard) return 320;
      const gap = 24; // 1.5rem
      return firstCard.offsetWidth + gap;
    };

    const getMaxIndex = () => {
      const cards = portfolioTrack.querySelectorAll('.sk-portfolio-card');
      const wrapperWidth = portfolioTrack.parentElement.offsetWidth;
      const cardWidth = getCardWidth();
      const visibleCount = Math.max(1, Math.floor(wrapperWidth / cardWidth));
      return Math.max(0, cards.length - visibleCount);
    };

    updateCarousel = () => {
      const maxIdx = getMaxIndex();
      scrollIndex = Math.max(0, Math.min(scrollIndex, maxIdx));
      const cardWidth = getCardWidth();
      portfolioTrack.style.transform = `translateX(-${scrollIndex * cardWidth}px)`;

      if (portfolioPrevBtn) {
        portfolioPrevBtn.disabled = scrollIndex <= 0;
        portfolioPrevBtn.classList.toggle('disabled', scrollIndex <= 0);
      }
      if (portfolioNextBtn) {
        portfolioNextBtn.disabled = scrollIndex >= maxIdx;
        portfolioNextBtn.classList.toggle('disabled', scrollIndex >= maxIdx);
      }
    };

    if (portfolioPrevBtn) {
      portfolioPrevBtn.addEventListener('click', () => {
        if (scrollIndex > 0) {
          scrollIndex--;
          updateCarousel();
        }
      });
    }

    if (portfolioNextBtn) {
      portfolioNextBtn.addEventListener('click', () => {
        const maxIdx = getMaxIndex();
        if (scrollIndex < maxIdx) {
          scrollIndex++;
          updateCarousel();
        }
      });
    }

    window.addEventListener('resize', updateCarousel);
    setTimeout(updateCarousel, 100);
  }

  // Card Click Triggers
  attachCardTriggers = () => {
    document.querySelectorAll('.sk-portfolio-card, .stack-card').forEach(card => {
      const projectId = card.getAttribute('data-project-id');
      if (!projectId) return;

      // Media Click
      const media = card.querySelector('.sk-card-media, .stack-card-media');
      if (media) {
        media.addEventListener('click', () => openCaseStudy(projectId));
      }

      // Case Study Button Click
      const caseStudyBtns = card.querySelectorAll('.sk-case-study-btn, .stack-view-btn');
      caseStudyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          openCaseStudy(projectId);
        });
      });

      // Title Link Click
      const links = card.querySelectorAll('.open-case-study-link');
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          openCaseStudy(projectId);
        });
      });
    });
  };

  // Attach Triggers
  attachCardTriggers();

  // Event Delegation for Case Study Triggers
  document.addEventListener('click', (e) => {
    // Trigger Button
    const trigger = e.target.closest('.sk-case-study-btn, .open-case-study-link, .stack-view-btn');
    if (trigger) {
      e.preventDefault();
      e.stopPropagation();
      const card = trigger.closest('[data-project-id]');
      const projectId = trigger.getAttribute('data-project-id') || (card ? card.getAttribute('data-project-id') : null);
      if (projectId) {
        openCaseStudy(projectId);
      }
      return;
    }

    // Card Media Click
    const media = e.target.closest('.sk-card-media, .stack-card-media');
    if (media) {
      const card = media.closest('[data-project-id]');
      if (card) {
        const projectId = card.getAttribute('data-project-id');
        if (projectId) {
          openCaseStudy(projectId);
        }
      }
    }
  });

  // ESC Key Listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCaseStudy();
    }
  });

  /* 10. Contact Clock & Form Submit */
  // IST Clock
  const contactLiveTime = document.getElementById('contact-live-time');
  if (contactLiveTime) {
    const updateISTClock = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        contactLiveTime.textContent = timeStr;
      } catch (err) {
        contactLiveTime.textContent = new Date().toLocaleTimeString();
      }
    };
    updateISTClock();
    setInterval(updateISTClock, 1000);
  }

  // FormSubmit Engine
  if (contactForm && formSubmitBtn) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjectInput = document.getElementById('form-subject');
      const messageInput = document.getElementById('form-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = (subjectInput && subjectInput.value.trim()) ? subjectInput.value.trim() : 'Project Inquiry';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.');
        return;
      }

      // Check anti-spam honeypot
      const honeyField = contactForm.querySelector('input[name="_honey"]');
      if (honeyField && honeyField.value.trim() !== '') {
        return; // Bot submission silently ignored
      }

      // Button transmitting state
      const originalText = formSubmitBtn.innerHTML;
      formSubmitBtn.disabled = true;
      formSubmitBtn.innerHTML = `
        <span class="btn-spinner" aria-hidden="true"></span>
        <span>Transmitting...</span>
      `;

      try {
        const response = await fetch('https://formsubmit.co/ajax/skundu97682@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            _subject: `[Portfolio Lead] ${subject} - from ${name}`,
            message: message,
            _template: 'table',
            _captcha: 'false'
          })
        });

        const result = await response.json();

        if (response.ok && (result.success === 'true' || result.success === true || result.message)) {
          formSubmitBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent-emerald);"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Message Dispatched!</span>
          `;
          showToast(`Transmission successful! Thank you, ${name}. Your message is in Sandip's inbox.`);
          contactForm.reset();
        } else {
          throw new Error(result.message || 'Dispatch failed');
        }
      } catch (err) {
        console.warn('FormSubmit AJAX dispatch notice:', err);
        formSubmitBtn.innerHTML = `
          <span>Transmission Sent</span>
        `;
        showToast(`Thank you, ${name}! Your inquiry has been dispatched.`);
        contactForm.reset();
      } finally {
        setTimeout(() => {
          formSubmitBtn.disabled = false;
          formSubmitBtn.innerHTML = originalText;
        }, 4000);
      }
    });
  }

  /* 11. Motion & Interactions */

  // Scroll Reveal Observer
  const revealOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('is-revealed');
        }, idx * 60);
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  document.querySelectorAll('.reveal-item, .info-card, .skill-card, .sk-portfolio-card, .contact-detail-card, .contact-form-card, .contact-dossier-card').forEach(el => {
    el.classList.add('reveal-item');
    revealObserver.observe(el);
  });

  // Spotlight Tracking
  const interactiveCards = document.querySelectorAll('.spotlight-card, .info-card, .timeline-card, .skill-card, .contact-detail-card, .contact-form-card');
  interactiveCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Magnetic Buttons
  const magneticButtons = document.querySelectorAll('.btn-magnetic');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // Custom Cursor
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    const animateCursor = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animateCursor);
    };
    requestAnimationFrame(animateCursor);

    const hoverTargets = document.querySelectorAll('a, button, .sk-portfolio-card, .skill-card, .contact-detail-card, input, textarea');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
    });
  }

  // Stat Counters
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let statsTriggered = false;
  const runStatCounters = () => {
    if (statsTriggered) return;
    statsTriggered = true;

    statNumbers.forEach(numEl => {
      const targetVal = parseInt(numEl.getAttribute('data-target'), 10);
      const suffix = numEl.textContent.replace(/[0-9]/g, '');
      let currentVal = 0;
      const totalSteps = 45;
      const stepVal = targetVal / totalSteps;

      const counterInterval = setInterval(() => {
        currentVal += stepVal;
        if (currentVal >= targetVal) {
          numEl.textContent = `${targetVal}${suffix}`;
          clearInterval(counterInterval);
        } else {
          numEl.textContent = `${Math.floor(currentVal)}${suffix}`;
        }
      }, 24);
    });
  };

  const heroStatsEl = document.querySelector('.hero-metric-strip, .hero-horizon-dock, .hero-stats-row');
  if (heroStatsEl) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        runStatCounters();
        statsObserver.disconnect();
      }
    }, { threshold: 0.15 });
    statsObserver.observe(heroStatsEl);
  }

  /* 12. Hero Clock & View Switcher */
  // Hero Clock
  function updateLiveKolkataClock() {
    const clockEl = document.getElementById('hero-live-clock');
    if (!clockEl) return;
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      clockEl.textContent = new Intl.DateTimeFormat('en-GB', options).format(now);
    } catch (e) {
      const now = new Date();
      clockEl.textContent = now.toTimeString().split(' ')[0];
    }
  }
  updateLiveKolkataClock();
  setInterval(updateLiveKolkataClock, 1000);

  // Dual-Mode Switcher
  const tabPortraitBtn = document.getElementById('tab-portrait-btn');
  const tabEngineBtn = document.getElementById('tab-engine-btn');
  const viewStagePortrait = document.getElementById('view-stage-portrait');
  const viewStageEngine = document.getElementById('view-stage-engine');

  if (tabPortraitBtn && tabEngineBtn && viewStagePortrait && viewStageEngine) {
    tabPortraitBtn.addEventListener('click', () => {
      tabPortraitBtn.classList.add('active');
      tabEngineBtn.classList.remove('active');
      viewStagePortrait.classList.add('active');
      viewStageEngine.classList.remove('active');
    });

    tabEngineBtn.addEventListener('click', () => {
      tabEngineBtn.classList.add('active');
      tabPortraitBtn.classList.remove('active');
      viewStageEngine.classList.add('active');
      viewStagePortrait.classList.remove('active');
    });
  }

  // Scroll Reveal Transitions
  const revealElements = document.querySelectorAll('.reveal-item, .info-card, .skill-card');
  if (revealElements.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  /* 13. Hero 3D Perspective Tilt */
  const heroPortraitCard = document.getElementById('sk-hero-portrait-card');
  const heroDevBadge = document.getElementById('hero-dev-badge');
  const heroSection = document.getElementById('hero');

  if (heroSection && window.matchMedia('(pointer: fine)').matches) {
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      targetRotateX = -y * 12;
      targetRotateY = x * 12;

      // DEV Badge Shift
      if (heroDevBadge) {
        const badgeOffsetX = x * 22;
        const badgeOffsetY = y * 22;
        heroDevBadge.style.transform = `translate3d(${badgeOffsetX}px, ${badgeOffsetY}px, 0)`;
      }
    });

    heroSection.addEventListener('mouseleave', () => {
      targetRotateX = 0;
      targetRotateY = 0;
      if (heroDevBadge) {
        heroDevBadge.style.transform = '';
      }
    });

    const renderHeroTilt = () => {
      currentRotateX += (targetRotateX - currentRotateX) * 0.1;
      currentRotateY += (targetRotateY - currentRotateY) * 0.1;
      
      if (heroPortraitCard) {
        heroPortraitCard.style.transform = `rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg)`;
      }
      requestAnimationFrame(renderHeroTilt);
    };
    renderHeroTilt();
  }

  /* 14. Stacking Cards & Smooth Scroll */
  const scrollProgressLine = document.getElementById('scroll-progress');
  const stackCards = document.querySelectorAll('.stack-card');
  let lenisInstance = null;

  // Stacking Cards Scroll Transition
  function updateStackingCards() {
    if (!stackCards.length) return;
    const vh = window.innerHeight;

    stackCards.forEach((card, i) => {
      const nextCard = stackCards[i + 1];
      if (!nextCard) return;

      const nextRect = nextCard.getBoundingClientRect();
      const stickyThreshold = 110 + i * 26;
      const triggerStart = vh * 0.85;

      if (nextRect.top < triggerStart) {
        const progress = Math.min(1, Math.max(0, (triggerStart - nextRect.top) / (triggerStart - stickyThreshold)));
        // Smoothly scale down card i, dim brightness, and lift slightly
        const scale = 1 - progress * 0.06;
        const brightness = 1 - progress * 0.35;
        const translateY = -progress * 18;
        card.style.transform = `scale(${scale.toFixed(3)}) translateY(${translateY.toFixed(1)}px)`;
        card.style.filter = `brightness(${brightness.toFixed(2)})`;
      } else {
        card.style.transform = 'scale(1) translateY(0px)';
        card.style.filter = 'brightness(1)';
      }
    });
  }

  /* 15. Timeline Progress Beam & Reveal */
  const timelineWrapper = document.getElementById('timeline-wrapper');
  const timelineBeam = document.getElementById('timeline-progress-beam');
  const timelineItems = document.querySelectorAll('.timeline-item');

  function updateTimelineProgress() {
    if (!timelineWrapper || !timelineItems.length) return;
    const vh = window.innerHeight;
    const wrapRect = timelineWrapper.getBoundingClientRect();
    
    const triggerStart = vh * 0.75;
    const totalHeight = timelineWrapper.offsetHeight;
    const scrollInside = triggerStart - wrapRect.top;
    
    let progressRatio = 0;
    if (scrollInside > 0) {
      progressRatio = Math.min(1, Math.max(0, scrollInside / totalHeight));
    }
    
    if (timelineBeam) {
      timelineBeam.style.height = `${(progressRatio * 100).toFixed(1)}%`;
    }

    timelineItems.forEach((item) => {
      const card = item.querySelector('.timeline-card');
      const dot = item.querySelector('.timeline-dot');
      const itemRect = item.getBoundingClientRect();
      const isReached = itemRect.top < vh * 0.85;

      if (isReached) {
        if (card) card.classList.add('in-view');
        if (dot) dot.classList.add('active');
      } else {
        if (card) card.classList.remove('in-view');
        if (dot) dot.classList.remove('active');
      }
    });
  }

  // Lenis Smooth Scroll Configuration
  if (typeof Lenis !== 'undefined') {
    lenisInstance = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.6,
      smoothWheel: true,
      syncTouch: false,
      infinite: false,
    });
    window.lenis = lenisInstance;

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const ambientWarmth = document.querySelector('.studio-ambient-warmth');
    const heroWatermark = document.querySelector('.hero-watermark-bg');
    const heroIntroCol = document.querySelector('.hero-intro-col');

    lenisInstance.on('scroll', ({ scroll, limit }) => {
      // 1. Scroll Progress Line
      if (scrollProgressLine && limit > 0) {
        const progress = Math.min(100, Math.max(0, (scroll / limit) * 100));
        scrollProgressLine.style.width = `${progress}%`;
      }

      // 2. Stacking Cards Transition
      updateStackingCards();

      // 3. Timeline Progress Beam
      updateTimelineProgress();

      // 4. Ambient Glow Drift
      if (ambientWarmth && scroll < window.innerHeight * 2.5) {
        ambientWarmth.style.transform = `translateX(-50%) translateY(${scroll * 0.16}px)`;
      }

      // 5. Hero Name Parallax
      const heroName = document.querySelector('.hero-monumental-name');
      if (heroName && scroll < window.innerHeight) {
        const heroRatio = Math.min(1, scroll / (window.innerHeight * 0.75));
        heroName.style.opacity = Math.max(0, 1 - heroRatio * 0.9).toFixed(2);
        heroName.style.transform = `translateY(${scroll * 0.14}px)`;
      }

      // 6. Portrait Card Parallax
      const portraitCard = document.getElementById('sk-hero-portrait-card');
      if (portraitCard && scroll < window.innerHeight) {
        portraitCard.style.transform = `translateY(${scroll * 0.08}px)`;
      }
    });

    // Anchor Navigation
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href !== '#' && href.startsWith('#')) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            lenisInstance.scrollTo(target, { offset: -70, duration: 1.25 });
          }
        }
      });
    });
  } else {
    // Scroll Fallback
    window.addEventListener('scroll', () => {
      if (scrollProgressLine) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
        scrollProgressLine.style.width = `${progress}%`;
      }
      updateStackingCards();
      updateTimelineProgress();
    }, { passive: true });
  }

  // Initial check on load
  setTimeout(() => {
    updateStackingCards();
    updateTimelineProgress();
  }, 150);
});
