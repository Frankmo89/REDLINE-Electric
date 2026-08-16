// Redline Electric — EN/ES site translations.
// Static UI copy only. Never used for Supabase-sourced content
// (job photo titles/categories, reviews, business_info fields) —
// those stay exactly as entered regardless of language.
(function () {
  var LANG_KEY = 'redline-lang';
  var SUGGESTED_KEY = 'redline-lang-suggested';

  var TRANSLATIONS = {
    nav_home: { en: 'Home', es: 'Inicio' },
    nav_services: { en: 'Services', es: 'Servicios' },
    nav_why_us: { en: 'Why Choose Us', es: 'Por Qué Elegirnos' },
    nav_work: { en: 'Our Work', es: 'Nuestros Trabajos' },
    nav_contact: { en: 'Contact', es: 'Contacto' },

    cta_call_now: { en: 'Call Now', es: 'Llame Ahora' },
    cta_see_all_work: { en: 'See All Work', es: 'Ver Todos los Trabajos' },

    hero_eyebrow: { en: 'San Diego · License C-10 #1153394', es: 'San Diego · Licencia C-10 #1153394' },
    hero_title: { en: 'Power you can <span>trust.</span>', es: 'La energía en la que puedes <span>confiar.</span>' },
    hero_subtitle: {
      en: 'Redline Electric — residential and commercial installation, repair, and maintenance across San Diego. Emergency service available.',
      es: 'Redline Electric — instalación, reparación y mantenimiento eléctrico residencial y comercial en todo San Diego. Servicio de emergencia disponible.'
    },

    services_heading: { en: 'Services', es: 'Servicios' },
    services_subheading: {
      en: 'Residential, commercial, and emergency work, done by a licensed and insured contractor.',
      es: 'Trabajo residencial, comercial y de emergencia, hecho por un contratista licenciado y asegurado.'
    },

    service_1_title: { en: 'New Construction', es: 'Construcción Nueva' },
    service_1_desc: { en: 'Electrical wiring for new builds from the ground up.', es: 'Cableado eléctrico para construcciones nuevas desde cero.' },
    service_2_title: { en: 'Remodels', es: 'Remodelaciones' },
    service_2_desc: { en: 'Updating electrical systems as part of a home or business renovation.', es: 'Actualización de sistemas eléctricos como parte de una remodelación residencial o comercial.' },
    service_3_title: { en: 'Retrofits', es: 'Modernización Eléctrica' },
    service_3_desc: { en: 'Upgrading older electrical systems to meet current standards.', es: 'Actualizamos sistemas eléctricos antiguos para que cumplan con los estándares actuales.' },
    service_4_title: { en: 'Art Lighting', es: 'Iluminación para Arte' },
    service_4_desc: { en: 'Custom lighting design to highlight art and architectural features.', es: 'Diseño de iluminación a la medida para resaltar arte y detalles arquitectónicos.' },
    service_5_title: { en: 'EV Chargers', es: 'Cargadores para Autos Eléctricos' },
    service_5_desc: { en: 'Electric vehicle charger installation at home or on-site.', es: 'Instalación de cargadores para vehículos eléctricos en su hogar o negocio.' },
    service_6_title: { en: 'Service Calls', es: 'Llamadas de Servicio' },
    service_6_desc: { en: 'Diagnosis and repair for electrical issues at your property.', es: 'Diagnóstico y reparación de problemas eléctricos en su propiedad.' },

    emergency_heading: { en: 'Electrical Emergency?', es: '¿Emergencia Eléctrica?' },
    emergency_text: {
      en: 'We handle emergency electrical calls — sparking outlets, power outages, exposed wiring, and more.',
      es: 'Atendemos llamadas de emergencia eléctrica — contactos chispeando, apagones, cables expuestos y más.'
    },

    why_us_heading: { en: 'Why Choose Us', es: 'Por Qué Elegirnos' },
    why_us_subheading: {
      en: "Hiring an electrician means trusting someone with your home's safety. Here's what you get with Redline Electric.",
      es: 'Contratar a un electricista significa confiarle la seguridad de su hogar a alguien. Esto es lo que obtiene con Redline Electric.'
    },
    why_1_title: { en: 'Licensed & Insured', es: 'Licenciados y Asegurados' },
    why_1_desc: {
      en: "C-10 license #1153394, verifiable with the California State License Board. Fully insured, so you're protected if anything goes wrong on your property.",
      es: 'Licencia C-10 #1153394, verificable con el California State License Board. Totalmente asegurados, para que usted esté protegido si algo sale mal en su propiedad.'
    },
    why_2_title: { en: 'We Pull the Permits', es: 'Nosotros Tramitamos los Permisos' },
    why_2_desc: {
      en: 'Panel upgrades and major work need permits in San Diego. We handle that paperwork ourselves — you should never be asked to pull your own permit.',
      es: 'Las actualizaciones de panel y los trabajos mayores requieren permisos en San Diego. Nosotros nos encargamos de ese papeleo — nunca debería tener que tramitar su propio permiso.'
    },
    why_3_title: { en: 'Up to Current Code', es: 'Al Código Vigente' },
    why_3_desc: {
      en: 'California runs on the 2023 NEC. Every job is done to current code — GFCI and AFCI placement, surge protection, tamper-resistant receptacles — so it passes inspection and stays safe.',
      es: 'California opera bajo el NEC 2023. Cada trabajo se hace conforme al código vigente — colocación de GFCI y AFCI, protección contra sobrevoltaje, contactos a prueba de manipulación — para que pase inspección y sea seguro.'
    },
    why_4_title: { en: 'Clear Pricing, On Time', es: 'Precio Claro, a Tiempo' },
    why_4_desc: {
      en: 'You get the price before we start, not after. We show up when we say we will, and leave the work site clean.',
      es: 'Le damos el precio antes de empezar, no después. Llegamos cuando decimos que llegaremos, y dejamos el área de trabajo limpia.'
    },

    work_heading: { en: 'Our Work', es: 'Nuestros Trabajos' },
    work_teaser_sub: { en: 'Placeholder intro text goes here.', es: 'Aquí va el texto de introducción.' },
    work_page_sub: {
      en: 'A look at recent electrical projects across San Diego.',
      es: 'Un vistazo a nuestros proyectos eléctricos recientes en San Diego.'
    },
    work_empty: { en: 'Photos coming soon.', es: 'Fotos próximamente.' },
    work_empty_filtered: { en: 'No photos in this category yet.', es: 'Aún no hay fotos en esta categoría.' },
    work_filter_all: { en: 'All', es: 'Todos' },

    testimonials_heading: { en: 'What Customers Say', es: 'Lo Que Dicen Nuestros Clientes' },
    testimonials_subheading: {
      en: 'Real feedback from San Diego homeowners and businesses.',
      es: 'Opiniones reales de propietarios y negocios de San Diego.'
    },
    testimonials_empty: { en: 'Reviews coming soon.', es: 'Reseñas próximamente.' },

    quote_heading: { en: 'Request a Quote', es: 'Solicite una Cotización' },
    quote_subheading: { en: "Tell us about the job and we'll get back to you.", es: 'Cuéntenos sobre el trabajo y nos pondremos en contacto.' },
    form_label_name: { en: 'Name*', es: 'Nombre*' },
    form_label_phone: { en: 'Phone*', es: 'Teléfono*' },
    form_label_email: { en: 'Email', es: 'Correo Electrónico' },
    form_label_service: { en: 'Service Interested In', es: 'Servicio de Interés' },
    form_option_select: { en: 'Select a service', es: 'Seleccione un servicio' },
    form_label_message: { en: 'Message', es: 'Mensaje' },
    form_submit: { en: 'Request a Quote', es: 'Solicitar Cotización' },
    form_error_required: { en: 'Name and phone are required.', es: 'El nombre y el teléfono son obligatorios.' },
    form_error_generic: {
      en: 'Something went wrong submitting your request. Please try calling us instead.',
      es: 'Algo salió mal al enviar su solicitud. Por favor intente llamarnos.'
    },
    form_success: {
      en: "Thanks — we've got your request and will be in touch soon.",
      es: 'Gracias — recibimos su solicitud y nos pondremos en contacto pronto.'
    },

    contact_call_or_text: { en: 'Call or Text', es: 'Llame o Envíe un Mensaje' },
    contact_label_email: { en: 'Email', es: 'Correo Electrónico' },
    contact_label_hours: { en: 'Hours', es: 'Horario' },

    areas_served_heading: { en: 'Areas We Serve', es: 'Áreas Que Atendemos' },

    badge_license: { en: 'License', es: 'Licencia' },
    badge_insurance: { en: 'Insurance', es: 'Seguro' },
    badge_insurance_value: { en: 'Fully covered', es: 'Totalmente cubierto' },
    badge_service_area: { en: 'Service Area', es: 'Área de Servicio' },

    footer_tagline: {
      en: 'Licensed and insured electrical contractor serving San Diego County.',
      es: 'Contratista eléctrico licenciado y asegurado, sirviendo a todo el Condado de San Diego.'
    },
    footer_quick_links: { en: 'Quick Links', es: 'Enlaces Rápidos' },
    footer_credentials: { en: 'Credentials', es: 'Credenciales' },
    footer_license: { en: 'C-10 License #1153394', es: 'Licencia C-10 #1153394' },
    footer_rights: { en: 'All rights reserved.', es: 'Todos los derechos reservados.' },

    notfound_eyebrow: { en: '404 · Page Not Found', es: '404 · Página No Encontrada' },
    notfound_heading: { en: 'This page took a wrong turn.', es: 'Esta página se perdió en el camino.' },
    notfound_text: {
      en: "The page you're looking for doesn't exist or may have moved. Here's how to get back on track.",
      es: 'La página que busca no existe o pudo haberse movido. Aquí le mostramos cómo volver al camino.'
    },
    notfound_back_home: { en: 'Back to Home', es: 'Volver al Inicio' }
  };

  var currentLang = 'en';

  function t(key) {
    var entry = TRANSLATIONS[key];
    if (!entry) return null;
    return entry[currentLang] != null ? entry[currentLang] : entry.en;
  }

  function applyLanguage(lang) {
    currentLang = lang === 'es' ? 'es' : 'en';
    document.documentElement.lang = currentLang;
    document.documentElement.setAttribute('data-lang', currentLang);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var val = t(el.getAttribute('data-i18n'));
      if (val != null) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var val = t(el.getAttribute('data-i18n-html'));
      if (val != null) el.innerHTML = val;
    });
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang-btn') === currentLang;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  function setLanguage(lang) {
    lang = lang === 'es' ? 'es' : 'en';
    localStorage.setItem(LANG_KEY, lang);
    applyLanguage(lang);
    document.dispatchEvent(new CustomEvent('redline:languagechange', { detail: { lang: lang } }));
  }

  function initLangSwitchButtons() {
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLanguage(btn.getAttribute('data-lang-btn'));
      });
    });
  }

  function initSuggestionBanner() {
    var banner = document.getElementById('lang-banner');
    if (!banner) return;

    var storedLang = localStorage.getItem(LANG_KEY);
    var alreadySuggested = localStorage.getItem(SUGGESTED_KEY);
    var browserIsSpanish = (navigator.language || '').toLowerCase().indexOf('es') === 0;

    if (!storedLang && !alreadySuggested && browserIsSpanish) {
      banner.hidden = false;
    }

    var switchBtn = banner.querySelector('[data-lang-banner-switch]');
    var dismissBtn = banner.querySelector('[data-lang-banner-dismiss]');

    if (switchBtn) {
      switchBtn.addEventListener('click', function () {
        localStorage.setItem(SUGGESTED_KEY, '1');
        setLanguage('es');
        banner.hidden = true;
      });
    }
    if (dismissBtn) {
      dismissBtn.addEventListener('click', function () {
        localStorage.setItem(SUGGESTED_KEY, '1');
        banner.hidden = true;
      });
    }
  }

  var storedLang = localStorage.getItem(LANG_KEY);
  applyLanguage(storedLang === 'es' ? 'es' : 'en');
  initLangSwitchButtons();
  initSuggestionBanner();

  window.i18n = {
    t: t,
    setLanguage: setLanguage,
    getLanguage: function () { return currentLang; }
  };
})();
