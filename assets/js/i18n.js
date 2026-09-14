// Redline Electric — EN/ES site translations.
// Static UI copy only. Never used for Supabase-sourced content
// (job photo titles/categories, reviews, business_info fields) —
// those stay exactly as entered regardless of language.
(function () {
  var LANG_KEY = 'redline-lang';
  var SUGGESTED_KEY = 'redline-lang-suggested';

  var TRANSLATIONS = {
    // Skip link — first focusable element on every page (WCAG 2.4.1).
    skip_to_content: { en: 'Skip to main content', es: 'Saltar al contenido principal' },
    nav_home: { en: 'Home', es: 'Inicio' },
    nav_services: { en: 'Services', es: 'Servicios' },
    nav_why_us: { en: 'Why Choose Us', es: 'Por Qué Elegirnos' },
    nav_work: { en: 'Our Work', es: 'Nuestros Trabajos' },
    nav_contact: { en: 'Contact', es: 'Contacto' },

    cta_call_now: { en: 'Call Now', es: 'Llame Ahora' },
    // Formal "usted" register to match cta_call_now and contact_call_or_text —
    // the whole Spanish translation set addresses the customer formally.
    cta_text_us: { en: 'Text Us', es: 'Envíenos un Mensaje' },
    cta_see_all_work: { en: 'See All Work', es: 'Ver Todos los Trabajos' },

    hero_eyebrow: { en: 'San Diego · License C-10 #1153394', es: 'San Diego · Licencia C-10 #1153394' },

    // Service-page hero eyebrows. Each names its own service plus the
    // location, instead of repeating the home page's license line on all six
    // pages. The home page keeps hero_eyebrow — the license is the right
    // trust signal for a first impression. Spanish service names are reused
    // verbatim from service_N_title so terminology stays consistent sitewide.
    svc_newconstruction_eyebrow: { en: 'New Construction · San Diego, CA', es: 'Construcción Nueva · San Diego, CA' },
    svc_remodels_eyebrow: { en: 'Remodels · San Diego, CA', es: 'Remodelaciones · San Diego, CA' },
    svc_retrofits_eyebrow: { en: 'Retrofits · San Diego, CA', es: 'Modernización Eléctrica · San Diego, CA' },
    svc_artlighting_eyebrow: { en: 'Art Lighting · San Diego, CA', es: 'Iluminación para Arte · San Diego, CA' },
    svc_evchargers_eyebrow: { en: 'EV Chargers · San Diego, CA', es: 'Cargadores para Autos Eléctricos · San Diego, CA' },
    svc_servicecalls_eyebrow: { en: 'Service Calls · San Diego, CA', es: 'Llamadas de Servicio · San Diego, CA' },
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

    about_heading: { en: "Who You're Working With", es: 'Con Quién Está Trabajando' },
    about_credential_1: { en: 'Licensed & Insured (C-10 #1153394)', es: 'Licenciados y Asegurados (C-10 #1153394)' },
    about_credential_2: { en: 'Serving San Diego County', es: 'Sirviendo al Condado de San Diego' },

    work_heading: { en: 'Our Work', es: 'Nuestros Trabajos' },
    work_teaser_sub: {
      en: 'Recent electrical work across San Diego County — panel upgrades, EV chargers, lighting, and full remodels.',
      es: 'Trabajos eléctricos recientes en el Condado de San Diego — actualizaciones de panel, cargadores para autos eléctricos, iluminación y remodelaciones completas.'
    },
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

    // Google aggregate block. These are UI chrome, not review content — the
    // reviews themselves stay in whatever language they were written in, per
    // the note at the top of this file.
    //
    // {n} and {date} are substituted by the caller, not by t(). t() returns a
    // flat string and applyTranslations assigns it with textContent, so there
    // is no interpolation in this layer; the reviews script does its own
    // replace on the template it gets back. Singular and plural are separate
    // keys because English needs review/reviews and Spanish reseña/reseñas —
    // a bare '{n} reviews' reads wrong at exactly 1 in both languages.
    reviews_eyebrow: { en: 'Google Reviews', es: 'Reseñas de Google' },
    reviews_count: {
      en: 'Based on {n} Google reviews',
      es: 'Basado en {n} reseñas de Google'
    },
    reviews_count_one: {
      en: 'Based on 1 Google review',
      es: 'Basado en 1 reseña de Google'
    },
    // {date} arrives from toLocaleDateString as a bare month + year
    // ('September 2026' / 'septiembre de 2026'). Spanish cannot use 'al' here
    // -- 'al' is a + el and needs a day ('al 5 de septiembre'), so 'al
    // septiembre de 2026' is wrong. 'actualizado en' reads naturally with a
    // bare month and carries the same meaning: these numbers are from then.
    reviews_asof: { en: 'as of {date}', es: 'actualizado en {date}' },
    reviews_read_all: { en: 'Read all on Google', es: 'Ver todas en Google' },
    // Single spoken sentence for the aggregate; the visible pieces are
    // aria-hidden so this is not announced three times over.
    reviews_aria: {
      en: '{rating} out of 5 stars, based on {n} Google reviews.',
      es: '{rating} de 5 estrellas, basado en {n} reseñas de Google.'
    },
    reviews_aria_one: {
      en: '{rating} out of 5 stars, based on 1 Google review.',
      es: '{rating} de 5 estrellas, basado en 1 reseña de Google.'
    },
    opens_new_tab: { en: ' (opens in a new tab)', es: ' (se abre en una pestaña nueva)' },
    // Card star rows. {rating} is an integer 1-5 — the reviews table has a
    // check constraint to that effect — so no plural handling is needed.
    reviews_card_aria: {
      en: '{rating} out of 5 stars',
      es: '{rating} de 5 estrellas'
    },
    // Expander on review cards whose text the six-line clamp cut off. Applied
    // by the reviews script, not data-i18n, because the button only exists on
    // the cards that actually overflow.
    reviews_read_more: { en: 'Read more', es: 'Leer más' },
    reviews_read_less: { en: 'Read less', es: 'Leer menos' },

    quote_heading: { en: 'Request a Quote', es: 'Solicite una Cotización' },
    quote_subheading: { en: "Tell us about the job and we'll get back to you.", es: 'Cuéntenos sobre el trabajo y nos pondremos en contacto.' },
    form_label_name: { en: 'Name*', es: 'Nombre*' },
    form_label_phone: { en: 'Phone*', es: 'Teléfono*' },
    form_label_email: { en: 'Email', es: 'Correo Electrónico' },
    form_label_service: { en: 'Service Interested In', es: 'Servicio de Interés' },
    form_option_select: { en: 'Select a service', es: 'Seleccione un servicio' },
    form_label_message: { en: 'Message', es: 'Mensaje' },

    // TCPA consent, shown beside the checkbox immediately above the submit
    // button. Wording is fixed legal copy, not marketing copy -- if it changes,
    // it changes because a lawyer said so. Rendered at full --ink on --bg2
    // (12.4:1) at body size rather than the dim 12px uppercase used for field
    // labels: a consent disclosure has to be conspicuous, and styling it like
    // chrome is the thing that gets these challenged.
    form_label_sms_consent: {
      en: 'I agree to receive calls and text messages from Redline Electric about my request, including by autodialer. Message and data rates may apply. Reply STOP to opt out.',
      es: 'Acepto recibir llamadas y mensajes de texto de Redline Electric sobre mi solicitud, incluso mediante marcación automática. Pueden aplicar tarifas de mensajes y datos. Responda STOP para darse de baja.'
    },
    form_error_sms_consent: {
      en: 'Please check the box agreeing to be contacted by call and text.',
      es: 'Marque la casilla para aceptar ser contactado por llamada y mensaje de texto.'
    },
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
    form_success_with_email: {
      en: "Thanks — we've got your request and will be in touch soon. Check your email for confirmation.",
      es: 'Gracias — recibimos su solicitud y nos pondremos en contacto pronto. Revise su correo electrónico para la confirmación.'
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

    nav_faq: { en: 'FAQ', es: 'Preguntas Frecuentes' },

    faq_heading: { en: 'Frequently Asked Questions', es: 'Preguntas Frecuentes' },
    faq_subheading: {
      en: 'Answers to the questions we hear most from homeowners and businesses in San Diego.',
      es: 'Respuestas a las preguntas que más escuchamos de propietarios y negocios en San Diego.'
    },

    faq_q_permit: { en: 'Do I need a permit for electrical work in San Diego?', es: '¿Necesito un permiso para trabajo eléctrico en San Diego?' },
    faq_a_permit: {
      en: "Most electrical work in San Diego County requires a permit — including panel upgrades, new circuits, and EV charger installations. Skipping a permit can cause problems later, like issues with an insurance claim or when selling your home. Redline Electric pulls all required permits as part of the job — you're never asked to pull your own.",
      es: 'La mayoría del trabajo eléctrico en el Condado de San Diego requiere un permiso — incluyendo actualizaciones de panel, circuitos nuevos e instalaciones de cargadores para autos eléctricos. Omitir un permiso puede causar problemas más adelante, como inconvenientes con un reclamo de seguro o al vender su casa. Redline Electric tramita todos los permisos necesarios como parte del trabajo — usted nunca tiene que tramitar el suyo.'
    },

    faq_q_panel_cost: { en: 'How much does an electrical panel upgrade cost?', es: '¿Cuánto cuesta una actualización de panel eléctrico?' },
    faq_a_panel_cost: {
      en: "Cost depends on the panel size, your home's current electrical setup, and the scope of the work — there's no single number that applies to every home. We provide a free quote after seeing the job in person. Request a quote online or give us a call and we'll get you an accurate number.",
      es: 'El costo depende del tamaño del panel, la instalación eléctrica actual de su casa y el alcance del trabajo — no hay un número único que aplique a todas las casas. Ofrecemos una cotización gratuita después de ver el trabajo en persona. Solicite una cotización en línea o llámenos y le daremos un número preciso.'
    },

    faq_q_ev_cost: { en: 'How much does EV charger installation cost?', es: '¿Cuánto cuesta la instalación de un cargador para auto eléctrico?' },
    faq_a_ev_cost: {
      en: "Cost varies based on factors like your panel's available capacity and the distance from the panel to where the charger will be mounted. Because every home is different, we provide a free quote after assessing your site — request a quote or call us to get started.",
      es: 'El costo varía según factores como la capacidad disponible de su panel y la distancia entre el panel y el lugar donde se montará el cargador. Como cada casa es diferente, ofrecemos una cotización gratuita después de evaluar su propiedad — solicite una cotización o llámenos para comenzar.'
    },

    faq_q_panel_signs: { en: 'How do I know if my panel needs to be upgraded?', es: '¿Cómo sé si mi panel necesita una actualización?' },
    faq_a_panel_signs: {
      en: "A few common warning signs it's worth having your panel looked at: breakers that trip frequently, flickering lights, a panel cover that feels warm or looks discolored, a burning smell near the panel, or running out of open breaker slots when you want to add a circuit. If you're noticing any of these, it's worth having it assessed.",
      es: 'Algunas señales comunes de que vale la pena revisar su panel: breakers que se disparan con frecuencia, luces que parpadean, una cubierta del panel que se siente caliente o se ve descolorida, olor a quemado cerca del panel, o quedarse sin espacios disponibles para breakers cuando quiere agregar un circuito. Si nota alguna de estas señales, vale la pena que lo evaluemos.'
    },

    faq_q_licensed: { en: 'Is Redline Electric licensed and insured?', es: '¿Redline Electric está licenciado y asegurado?' },
    faq_a_licensed: {
      en: 'Yes. Redline Electric holds a C-10 electrical contractor license (#1153394) and is fully insured. You can verify our license directly with the California State License Board (CSLB).',
      es: 'Sí. Redline Electric tiene una licencia de contratista eléctrico C-10 (#1153394) y está totalmente asegurado. Puede verificar nuestra licencia directamente con el California State License Board (CSLB).'
    },

    faq_q_areas: { en: 'What areas do you serve?', es: '¿Qué áreas atienden?' },
    faq_a_areas: {
      en: 'We serve San Diego County, including San Diego, La Jolla, Pacific Beach, Point Loma, Mission Valley, Clairemont, Kearny Mesa, Chula Vista, National City, Coronado, La Mesa, El Cajon, Santee, Poway, Rancho Bernardo, Del Mar, Encinitas, Carlsbad, Oceanside, and Escondido.',
      es: 'Atendemos el Condado de San Diego, incluyendo San Diego, La Jolla, Pacific Beach, Point Loma, Mission Valley, Clairemont, Kearny Mesa, Chula Vista, National City, Coronado, La Mesa, El Cajon, Santee, Poway, Rancho Bernardo, Del Mar, Encinitas, Carlsbad, Oceanside y Escondido.'
    },

    faq_q_emergency: { en: 'Do you handle emergency calls?', es: '¿Atienden llamadas de emergencia?' },
    faq_a_emergency: {
      en: "Yes — we handle emergency electrical calls, including sparking outlets, power outages, and exposed wiring. If you're facing an active electrical hazard, call us right away.",
      es: 'Sí — atendemos llamadas de emergencia eléctrica, incluyendo contactos chispeando, apagones y cables expuestos. Si enfrenta un peligro eléctrico activo, llámenos de inmediato.'
    },

    faq_q_retrofit_vs_remodel: { en: "What's the difference between a retrofit and a remodel?", es: '¿Cuál es la diferencia entre un retrofit y una remodelación?' },
    faq_a_retrofit_vs_remodel: {
      en: "A retrofit upgrades the electrical system already in your home — most often the panel — without a full renovation, usually because the panel is outdated or undersized for today's loads. A remodel is electrical work done as part of a larger renovation, like a kitchen or bathroom update, where wiring and circuits change to match a new layout. The two can overlap: a remodel often triggers the same code-required upgrades as a retrofit.",
      es: 'Un retrofit actualiza el sistema eléctrico que ya existe en su casa — con mayor frecuencia el panel — sin una renovación completa, normalmente porque el panel está anticuado o es insuficiente para las cargas actuales. Una remodelación es trabajo eléctrico hecho como parte de una renovación más grande, como una actualización de cocina o baño, donde el cableado y los circuitos cambian para adaptarse a un nuevo diseño. Ambos pueden combinarse: una remodelación a menudo requiere las mismas actualizaciones de código que un retrofit.'
    },

    cookie_banner_text: {
      en: 'We use analytics to improve this site.',
      es: 'Usamos análisis para mejorar este sitio.'
    },
    cookie_banner_accept: { en: 'Accept', es: 'Aceptar' },

    notfound_eyebrow: { en: '404 · Page Not Found', es: '404 · Página No Encontrada' },
    notfound_heading: { en: 'This page took a wrong turn.', es: 'Esta página se perdió en el camino.' },
    notfound_text: {
      en: "The page you're looking for doesn't exist or may have moved. Here's how to get back on track.",
      es: 'La página que busca no existe o pudo haberse movido. Aquí le mostramos cómo volver al camino.'
    },
    notfound_back_home: { en: 'Back to Home', es: 'Volver al Inicio' },

    // ---- Service detail pages (shared strings) ----
    cta_get_quote: { en: 'Get a Quote', es: 'Solicitar Cotización' },
    svc_process_heading: { en: 'How It Works', es: 'Cómo Funciona' },
    svc_included_heading: { en: "What's Included", es: 'Qué Incluye' },
    svc_when_heading: { en: 'When You Need This', es: 'Cuándo Lo Necesita' },
    svc_expect_heading: { en: 'What to Expect', es: 'Qué Esperar' },
    svc_related_heading: { en: 'Explore Our Other Services', es: 'Explore Nuestros Otros Servicios' },

    // ---- New Construction ----
    svc_newconstruction_hero_title: { en: 'New Construction Electrical Wiring in San Diego, CA', es: 'Cableado Eléctrico para Construcción Nueva en San Diego, CA' },
    svc_newconstruction_hero_subtitle: {
      en: 'Full electrical systems for new homes, ADUs, and commercial builds — designed, installed, and inspected to 2023 NEC code.',
      es: 'Sistemas eléctricos completos para casas nuevas, ADUs y construcciones comerciales — diseñados, instalados e inspeccionados conforme al código NEC 2023.'
    },
    svc_newconstruction_what_heading: { en: 'What Is New Construction Electrical Work?', es: '¿Qué Es el Trabajo Eléctrico de Construcción Nueva?' },
    svc_newconstruction_p1: {
      en: "New construction electrical work is the full electrical system for a building that doesn't have one yet — the service panel, every branch circuit, and the wiring behind each outlet, switch, light, and appliance connection. It's typically done in two phases: rough-in, when wiring is run through open studs and joists before drywall goes up, and trim-out, when devices, fixtures, and the panel are installed and tested after the walls are closed.",
      es: 'El trabajo eléctrico de construcción nueva es el sistema eléctrico completo de un edificio que aún no lo tiene — el panel de servicio, cada circuito derivado, y el cableado detrás de cada contacto, interruptor, luz y conexión de electrodoméstico. Normalmente se hace en dos fases: el cableado inicial (rough-in), cuando se pasa el cableado por los travesaños abiertos antes de instalar el tablaroca, y el acabado final (trim-out), cuando se instalan y prueban los dispositivos, accesorios y el panel después de cerrar las paredes.'
    },
    svc_newconstruction_p2: {
      en: "As your electrical subcontractor on the job, we work from your architect's or builder's plans, run load calculations to size the panel and circuits correctly for the building, and coordinate our site visits around your general contractor's schedule so the electrical work doesn't hold up the rest of the build.",
      es: 'Como su subcontratista eléctrico en el proyecto, trabajamos con los planos de su arquitecto o constructor, hacemos los cálculos de carga para dimensionar correctamente el panel y los circuitos del edificio, y coordinamos nuestras visitas al sitio con el calendario de su contratista general para que el trabajo eléctrico no retrase el resto de la construcción.'
    },
    svc_newconstruction_item1: { en: 'Load calculations and main panel sizing for the building', es: 'Cálculos de carga y dimensionamiento del panel principal del edificio' },
    svc_newconstruction_item2: { en: 'Rough-in wiring for every room, circuit, and dedicated appliance line', es: 'Cableado inicial para cada habitación, circuito y línea dedicada de electrodomésticos' },
    svc_newconstruction_item3: { en: 'Panel installation, breaker assignment, and circuit labeling', es: 'Instalación del panel, asignación de breakers y etiquetado de circuitos' },
    svc_newconstruction_item4: { en: 'Trim-out: outlets, switches, fixtures, and final terminations', es: 'Acabado final: contactos, interruptores, accesorios y conexiones finales' },
    svc_newconstruction_item5: { en: 'Permits pulled and inspections scheduled in our name', es: 'Tramitamos los permisos y programamos las inspecciones a nuestro nombre' },
    svc_newconstruction_when_p: {
      en: "If you're building a new home, an accessory dwelling unit (ADU), or a commercial space from the ground up anywhere in San Diego County, the building needs a complete electrical system designed and installed before it can pass inspection and be occupied. This work is scoped as part of your overall build, alongside your general contractor and other trades.",
      es: 'Si está construyendo una casa nueva, una unidad de vivienda accesoria (ADU) o un espacio comercial desde cero en cualquier parte del Condado de San Diego, el edificio necesita un sistema eléctrico completo diseñado e instalado antes de poder pasar la inspección y ser habitado. Este trabajo se define como parte de su construcción general, junto con su contratista general y otros oficios.'
    },
    svc_newconstruction_expect_p: {
      en: "We typically come to the site twice — once for rough-in, while the framing is still open and other trades can see where our wiring runs, and again for trim-out after drywall and paint are finished. Because we pull the permits ourselves, you're not responsible for tracking down inspections; we schedule those around each phase and are on-site to walk the inspector through the work.",
      es: 'Normalmente visitamos el sitio dos veces — una para el cableado inicial, mientras el entramado sigue abierto y otros oficios pueden ver por dónde pasa nuestro cableado, y otra para el acabado final después de instalar tablaroca y pintura. Como nosotros tramitamos los permisos, usted no tiene que encargarse de las inspecciones; las programamos según cada fase y estamos en el sitio para guiar al inspector durante el trabajo.'
    },
    svc_newconstruction_photos_heading: { en: 'New Construction Work in San Diego', es: 'Trabajos de Construcción Nueva en San Diego' },
    svc_newconstruction_step1_title: { en: 'Contact Us', es: 'Contáctenos' },
    svc_newconstruction_step1_desc: { en: 'Call, text, or send a quote request and tell us about your build.', es: 'Llame, envíe un mensaje o solicite una cotización y cuéntenos sobre su construcción.' },
    svc_newconstruction_step2_title: { en: 'Plan Review & Quote', es: 'Revisión de Planos y Cotización' },
    svc_newconstruction_step2_desc: { en: 'We review your plans, run load calculations, and quote the electrical scope.', es: 'Revisamos sus planos, hacemos los cálculos de carga y cotizamos el alcance eléctrico.' },
    svc_newconstruction_step3_title: { en: 'Permit & Rough-In / Trim-Out', es: 'Permiso y Cableado Inicial / Acabado' },
    svc_newconstruction_step3_desc: { en: 'We pull the permit and complete rough-in, then return for trim-out once walls are closed.', es: 'Tramitamos el permiso y completamos el cableado inicial, luego regresamos para el acabado final una vez cerradas las paredes.' },
    svc_newconstruction_step4_title: { en: 'Inspection & Walkthrough', es: 'Inspección y Recorrido Final' },
    svc_newconstruction_step4_desc: { en: 'We coordinate inspections at each phase and walk the finished work with you.', es: 'Coordinamos las inspecciones en cada fase y recorremos con usted el trabajo terminado.' },

    // ---- Remodels ----
    svc_remodels_hero_title: { en: 'Electrical Remodel Wiring in San Diego, CA', es: 'Cableado Eléctrico para Remodelaciones en San Diego, CA' },
    svc_remodels_hero_subtitle: {
      en: 'Updated wiring, circuits, and code compliance for kitchen, bath, and whole-home remodels across San Diego.',
      es: 'Actualización de cableado, circuitos y cumplimiento de código para remodelaciones de cocina, baño y toda la casa en San Diego.'
    },
    svc_remodels_what_heading: { en: 'What Is Remodel Electrical Work?', es: '¿Qué Es el Trabajo Eléctrico de Remodelación?' },
    svc_remodels_p1: {
      en: "Remodel electrical work updates or adds to the wiring already inside your home to match the new layout, new fixtures, and new code requirements that come with a renovation. That might mean moving outlets and switches when a wall comes down, adding circuits for a new kitchen island or bathroom vanity, or upgrading lighting throughout a room that's being reworked.",
      es: 'El trabajo eléctrico de remodelación actualiza o amplía el cableado que ya existe en su hogar para adaptarlo al nuevo diseño, los nuevos accesorios y los nuevos requisitos de código que trae una renovación. Esto puede significar mover contactos e interruptores cuando se derriba una pared, agregar circuitos para una nueva isla de cocina o tocador de baño, o actualizar la iluminación de una habitación que se está remodelando.'
    },
    svc_remodels_p2: {
      en: "Because remodels open up existing walls, they're also the point where a lot of older wiring gets brought up to current standards — GFCI protection in kitchens and bathrooms, AFCI protection on bedroom circuits, and tamper-resistant receptacles, all required under the 2023 NEC. We assess what's already there before we start so you know what's being reused and what needs to be replaced.",
      es: 'Como las remodelaciones abren las paredes existentes, también son el momento en que se actualiza mucho del cableado antiguo a los estándares actuales — protección GFCI en cocinas y baños, protección AFCI en circuitos de recámaras, y contactos a prueba de manipulación, todos requeridos bajo el NEC 2023. Evaluamos lo que ya existe antes de empezar para que usted sepa qué se reutiliza y qué necesita reemplazarse.'
    },
    svc_remodels_item1: { en: 'Assessment of existing wiring and panel capacity for the remodel scope', es: 'Evaluación del cableado existente y la capacidad del panel para el alcance de la remodelación' },
    svc_remodels_item2: { en: 'New circuits for kitchens, bathrooms, laundry, and other remodeled spaces', es: 'Circuitos nuevos para cocinas, baños, lavandería y otros espacios remodelados' },
    svc_remodels_item3: { en: 'Code-required upgrades: GFCI, AFCI, and tamper-resistant devices', es: 'Actualizaciones requeridas por código: dispositivos GFCI, AFCI y a prueba de manipulación' },
    svc_remodels_item4: { en: 'Lighting layout changes, including recessed and under-cabinet lighting', es: 'Cambios en el diseño de iluminación, incluyendo luces empotradas y bajo gabinetes' },
    svc_remodels_item5: { en: 'Permits for work that requires one, and inspection coordination', es: 'Permisos para el trabajo que los requiera, y coordinación de inspecciones' },
    svc_remodels_when_p: {
      en: "Any remodel that touches the layout of a room — a kitchen or bathroom renovation, a room addition, converting a garage, or opening up a floor plan — usually needs electrical work, even if the original scope was framing and finishes. It's worth looping us in early, since electrical rough-in has to happen before drywall goes back up.",
      es: 'Cualquier remodelación que cambie el diseño de una habitación — una renovación de cocina o baño, una ampliación, convertir un garaje, o abrir la distribución de un piso — normalmente necesita trabajo eléctrico, incluso si el alcance original era solo enmarcado y acabados. Vale la pena incluirnos desde el principio, ya que el cableado inicial debe hacerse antes de volver a instalar el tablaroca.'
    },
    svc_remodels_expect_p: {
      en: "We'll walk the space with you or your contractor to confirm what's changing, quote the electrical scope, and pull permits where the work requires them. On remodels, timing matters — we coordinate our rough-in visit with your framing and drywall schedule so we're not the reason a wall stays open longer than it needs to.",
      es: 'Recorremos el espacio con usted o su contratista para confirmar qué va a cambiar, cotizamos el alcance eléctrico y tramitamos los permisos donde el trabajo los requiera. En las remodelaciones el tiempo importa — coordinamos nuestra visita de cableado inicial con su calendario de enmarcado y tablaroca para no ser la razón de que una pared quede abierta más tiempo del necesario.'
    },
    svc_remodels_photos_heading: { en: 'Remodel Work in San Diego', es: 'Trabajos de Remodelación en San Diego' },
    svc_remodels_step1_title: { en: 'Contact Us', es: 'Contáctenos' },
    svc_remodels_step1_desc: { en: "Tell us about your remodel and what's changing.", es: 'Cuéntenos sobre su remodelación y qué va a cambiar.' },
    svc_remodels_step2_title: { en: 'On-Site Assessment & Quote', es: 'Evaluación en el Sitio y Cotización' },
    svc_remodels_step2_desc: { en: 'We look at the existing wiring and quote the electrical scope.', es: 'Revisamos el cableado existente y cotizamos el alcance eléctrico.' },
    svc_remodels_step3_title: { en: 'Permit & Coordinated Work', es: 'Permiso y Trabajo Coordinado' },
    svc_remodels_step3_desc: { en: 'We pull permits where needed and time our visits with your remodel schedule.', es: 'Tramitamos los permisos necesarios y programamos nuestras visitas según su calendario de remodelación.' },
    svc_remodels_step4_title: { en: 'Inspection & Walkthrough', es: 'Inspección y Recorrido Final' },
    svc_remodels_step4_desc: { en: 'We coordinate inspections and walk the finished work with you.', es: 'Coordinamos las inspecciones y recorremos con usted el trabajo terminado.' },

    // ---- Retrofits ----
    svc_retrofits_hero_title: { en: 'Electrical Panel & System Retrofits in San Diego, CA', es: 'Modernización de Paneles y Sistemas Eléctricos en San Diego, CA' },
    svc_retrofits_hero_subtitle: {
      en: 'Upgrading older electrical systems and panels across San Diego to meet current code and handle modern loads.',
      es: 'Actualizamos sistemas y paneles eléctricos antiguos en todo San Diego para cumplir con el código vigente y soportar las cargas modernas.'
    },
    svc_retrofits_what_heading: { en: 'What Is an Electrical Retrofit?', es: '¿Qué Es una Modernización Eléctrica (Retrofit)?' },
    svc_retrofits_p1: {
      en: 'A retrofit upgrades the electrical system already in a building — most often the main panel, but sometimes the wiring behind it — without a full remodel. Many homes across San Diego County were built decades ago with panels sized for a much smaller electrical load than modern households actually use, or with wiring types (like ungrounded two-wire circuits or aluminum branch wiring) that don\'t meet current safety standards.',
      es: 'Un retrofit actualiza el sistema eléctrico que ya existe en un edificio — con mayor frecuencia el panel principal, pero a veces también el cableado detrás de él — sin necesidad de una remodelación completa. Muchas casas en el Condado de San Diego se construyeron hace décadas con paneles dimensionados para una carga eléctrica mucho menor a la que usan los hogares modernos, o con tipos de cableado (como circuitos de dos hilos sin tierra o cableado de aluminio) que no cumplen con los estándares de seguridad actuales.'
    },
    svc_retrofits_p2: {
      en: 'A panel upgrade typically means replacing an undersized or outdated panel with a new one that has enough capacity and breaker space for your home\'s actual load, including things like central air, an EV charger, or a home addition. Panel work always requires a permit in San Diego, and we handle that paperwork and the inspection that comes with it.',
      es: 'Una actualización de panel normalmente significa reemplazar un panel insuficiente o anticuado por uno nuevo con suficiente capacidad y espacio de breakers para la carga real de su hogar, incluyendo cosas como aire acondicionado central, un cargador para auto eléctrico o una ampliación de la casa. El trabajo de panel siempre requiere un permiso en San Diego, y nosotros nos encargamos de ese papeleo y de la inspección correspondiente.'
    },
    svc_retrofits_item1: { en: 'Assessment of your existing panel, wiring, and grounding', es: 'Evaluación de su panel, cableado y conexión a tierra existentes' },
    svc_retrofits_item2: { en: 'Panel replacement or capacity upgrade sized to your actual load', es: 'Reemplazo o actualización de capacidad del panel según su carga real' },
    svc_retrofits_item3: { en: 'Rewiring or partial rewiring where older wiring types are present', es: 'Recableado total o parcial donde existan tipos de cableado antiguos' },
    svc_retrofits_item4: { en: 'Grounding corrections where a system lacks a proper ground', es: 'Corrección de la conexión a tierra donde el sistema no tenga una tierra adecuada' },
    svc_retrofits_item5: { en: 'Permits and inspection for all panel and service work', es: 'Permisos e inspección para todo el trabajo de panel y de servicio' },
    svc_retrofits_when_p: {
      en: "Common signs a retrofit is worth looking at: a fuse box instead of breakers, a panel rated well under 200 amps, frequently tripped breakers, or a home that can't support the load of an EV charger, a new HVAC system, or an addition without an upgrade. If your home was built before the 1980s and hasn't had panel work done, it's worth having it assessed.",
      es: 'Señales comunes de que vale la pena evaluar un retrofit: una caja de fusibles en lugar de breakers, un panel con capacidad muy por debajo de 200 amperios, breakers que se disparan con frecuencia, o una casa que no puede soportar la carga de un cargador para auto eléctrico, un sistema de aire acondicionado nuevo o una ampliación sin una actualización. Si su casa se construyó antes de 1980 y no ha tenido trabajo de panel, vale la pena que la evaluemos.'
    },
    svc_retrofits_expect_p: {
      en: 'We start with an on-site assessment of your panel and wiring to figure out what the retrofit actually needs to include, then quote the work and pull the required permit. Panel replacements involve a brief power shutoff for the property, which we schedule with you in advance, and the work is inspected before we consider it finished.',
      es: 'Empezamos con una evaluación en el sitio de su panel y cableado para determinar qué debe incluir el retrofit, y luego cotizamos el trabajo y tramitamos el permiso requerido. El reemplazo de panel implica un corte breve de energía en la propiedad, que programamos con usted con anticipación, y el trabajo se inspecciona antes de considerarlo terminado.'
    },
    svc_retrofits_photos_heading: { en: 'Retrofit Work in San Diego', es: 'Trabajos de Modernización en San Diego' },
    svc_retrofits_step1_title: { en: 'Contact Us', es: 'Contáctenos' },
    svc_retrofits_step1_desc: { en: "Tell us what's prompting the retrofit (an old panel, tripped breakers, an addition).", es: 'Cuéntenos qué está motivando el retrofit (un panel antiguo, breakers que se disparan, una ampliación).' },
    svc_retrofits_step2_title: { en: 'System Assessment & Quote', es: 'Evaluación del Sistema y Cotización' },
    svc_retrofits_step2_desc: { en: 'We assess your panel and wiring, then quote the retrofit.', es: 'Evaluamos su panel y cableado, y cotizamos el retrofit.' },
    svc_retrofits_step3_title: { en: 'Permit & Retrofit Work', es: 'Permiso y Trabajo de Retrofit' },
    svc_retrofits_step3_desc: { en: 'We pull the required permit and complete the upgrade.', es: 'Tramitamos el permiso requerido y completamos la actualización.' },
    svc_retrofits_step4_title: { en: 'Inspection & Walkthrough', es: 'Inspección y Recorrido Final' },
    svc_retrofits_step4_desc: { en: 'We schedule the inspection and walk you through the finished system.', es: 'Programamos la inspección y recorremos con usted el sistema terminado.' },

    // ---- Art Lighting ----
    svc_artlighting_hero_title: { en: 'Custom Art & Accent Lighting Installation in San Diego, CA', es: 'Instalación de Iluminación Personalizada para Arte en San Diego, CA' },
    svc_artlighting_hero_subtitle: {
      en: 'Lighting design and wiring that highlights your art, architecture, and outdoor spaces — installed by a licensed electrician.',
      es: 'Diseño e instalación de iluminación que resalta su arte, arquitectura y espacios exteriores — instalada por un electricista licenciado.'
    },
    svc_artlighting_what_heading: { en: 'What Is Art & Accent Lighting?', es: '¿Qué Es la Iluminación para Arte y Acentos?' },
    svc_artlighting_p1: {
      en: 'Art lighting is wiring and fixture work designed around what you want highlighted — a painting, a sculpture, a stairwell, an exterior facade, or landscaping — rather than just lighting a room for general use. It typically involves adjustable fixtures like picture lights, monopoint or track heads, and low-voltage landscape fixtures, often paired with dimmers so the light level can be tuned to the piece or space.',
      es: 'La iluminación para arte es trabajo de cableado y accesorios diseñado alrededor de lo que usted quiere resaltar — una pintura, una escultura, una escalera, una fachada exterior o un jardín — en lugar de simplemente iluminar una habitación para uso general. Normalmente incluye accesorios ajustables como luces para cuadros, cabezales de riel o monopunto, y accesorios de bajo voltaje para exteriores, a menudo combinados con reguladores de intensidad para ajustar el nivel de luz a la pieza o el espacio.'
    },
    svc_artlighting_p2: {
      en: 'This kind of work sits at the intersection of design and wiring: fixture placement matters as much as the electrical work behind it, so we walk the space with you first to figure out where fixtures should go and what they should be aimed at, then handle the wiring, circuits, and controls to make it happen.',
      es: 'Este tipo de trabajo combina diseño y cableado: la ubicación de los accesorios importa tanto como el trabajo eléctrico detrás de ellos, así que primero recorremos el espacio con usted para definir dónde deben ir los accesorios y hacia dónde deben apuntar, y luego nos encargamos del cableado, los circuitos y los controles.'
    },
    svc_artlighting_item1: { en: 'On-site walkthrough to plan fixture placement and aiming', es: 'Recorrido en el sitio para planear la ubicación y orientación de los accesorios' },
    svc_artlighting_item2: { en: 'Wiring for picture lights, track and monopoint fixtures, and accent lighting', es: 'Cableado para luces de cuadros, accesorios de riel, monopunto e iluminación de acento' },
    svc_artlighting_item3: { en: 'Low-voltage wiring for landscape and exterior lighting', es: 'Cableado de bajo voltaje para iluminación de jardín y exteriores' },
    svc_artlighting_item4: { en: 'Dimmer and lighting control installation', es: 'Instalación de reguladores de intensidad y controles de iluminación' },
    svc_artlighting_item5: { en: 'New dedicated circuits where the lighting plan calls for them', es: 'Circuitos dedicados nuevos donde el plan de iluminación los requiera' },
    svc_artlighting_when_p: {
      en: "If you're displaying art or want to highlight architectural details, built-ins, a stairwell, or your home's exterior and landscaping, dedicated lighting design makes a real difference over standard overhead fixtures. This also comes up during a remodel or new build, when it's easiest to run wiring for accent lighting before walls close.",
      es: 'Si usted exhibe arte o quiere resaltar detalles arquitectónicos, muebles empotrados, una escalera, o el exterior y jardín de su casa, un diseño de iluminación dedicado hace una diferencia real frente a los accesorios estándar de techo. Esto también surge durante una remodelación o construcción nueva, cuando es más fácil pasar el cableado para iluminación de acento antes de cerrar las paredes.'
    },
    svc_artlighting_expect_p: {
      en: 'We start with a walkthrough of the space to understand what you want highlighted and how you want it controlled, then wire and install the fixtures and controls. If the plan uses circuits already in place, the work is usually straightforward; if it calls for new dedicated circuits or panel capacity, we handle the permit for that portion of the job.',
      es: 'Empezamos con un recorrido del espacio para entender qué quiere resaltar y cómo quiere controlarlo, y luego cableamos e instalamos los accesorios y controles. Si el plan usa circuitos ya existentes, el trabajo suele ser sencillo; si requiere circuitos dedicados nuevos o capacidad adicional del panel, nos encargamos del permiso para esa parte del trabajo.'
    },
    svc_artlighting_photos_heading: { en: 'Art Lighting Work in San Diego', es: 'Trabajos de Iluminación para Arte en San Diego' },
    svc_artlighting_step1_title: { en: 'Contact Us', es: 'Contáctenos' },
    svc_artlighting_step1_desc: { en: 'Tell us what you want to highlight.', es: 'Cuéntenos qué quiere resaltar.' },
    svc_artlighting_step2_title: { en: 'Design Consultation & Quote', es: 'Consulta de Diseño y Cotización' },
    svc_artlighting_step2_desc: { en: 'We walk the space with you and quote the lighting plan.', es: 'Recorremos el espacio con usted y cotizamos el plan de iluminación.' },
    svc_artlighting_step3_title: { en: 'Installation', es: 'Instalación' },
    svc_artlighting_step3_desc: { en: 'We wire and install the fixtures and controls, pulling a permit if new circuits are needed.', es: 'Cableamos e instalamos los accesorios y controles, tramitando un permiso si se necesitan circuitos nuevos.' },
    svc_artlighting_step4_title: { en: 'Walkthrough & Adjustment', es: 'Recorrido Final y Ajuste' },
    svc_artlighting_step4_desc: { en: 'We walk through the finished lighting with you and fine-tune fixture aim.', es: 'Recorremos con usted la iluminación terminada y ajustamos la orientación de los accesorios.' },

    // ---- EV Chargers ----
    svc_evchargers_hero_title: { en: 'EV Charger Installation in San Diego, CA', es: 'Instalación de Cargadores para Autos Eléctricos en San Diego, CA' },
    svc_evchargers_hero_subtitle: {
      en: 'Level 2 EV charger installation for homes and businesses, with the load calculation and permit handled for you.',
      es: 'Instalación de cargadores de Nivel 2 para casas y negocios, con el cálculo de carga y el permiso incluidos.'
    },
    svc_evchargers_what_heading: { en: 'What Is EV Charger Installation?', es: '¿Qué Es la Instalación de un Cargador para Auto Eléctrico?' },
    svc_evchargers_p1: {
      en: "Installing a home or commercial EV charger means running a dedicated electrical circuit sized to the charger's amperage draw, mounting the charger where you'll actually use it (garage, driveway, or a business parking area), and wiring it to a disconnect and breaker in your panel. Most Level 2 chargers draw significantly more power than a typical outlet circuit, so the panel needs enough spare capacity to support it safely.",
      es: 'Instalar un cargador para auto eléctrico en casa o en un negocio significa pasar un circuito eléctrico dedicado dimensionado para el consumo en amperios del cargador, montar el cargador donde realmente lo va a usar (garaje, entrada o un área de estacionamiento comercial), y conectarlo a un desconectador y un breaker en su panel. La mayoría de los cargadores de Nivel 2 consumen mucha más energía que un circuito de contacto típico, así que el panel necesita suficiente capacidad disponible para soportarlo de forma segura.'
    },
    svc_evchargers_p2: {
      en: "Permits are required for EV charger installations in San Diego, and any electrical work involving your panel is inspected before it's signed off. We handle that permit and inspection process as part of the installation — you shouldn't be asked to pull it yourself.",
      es: 'En San Diego se requiere un permiso para instalar cargadores de auto eléctrico, y cualquier trabajo eléctrico que involucre su panel se inspecciona antes de aprobarse. Nosotros nos encargamos de ese permiso y del proceso de inspección como parte de la instalación — usted no debería tener que tramitarlo por su cuenta.'
    },
    svc_evchargers_item1: { en: "Load calculation to confirm your panel has capacity for the charger", es: 'Cálculo de carga para confirmar que su panel tiene capacidad para el cargador' },
    svc_evchargers_item2: { en: "Dedicated circuit sized to the charger manufacturer's requirements", es: 'Circuito dedicado dimensionado según los requisitos del fabricante del cargador' },
    svc_evchargers_item3: { en: 'Charger mounting and wiring (garage, exterior, or commercial lot)', es: 'Montaje y cableado del cargador (garaje, exterior o lote comercial)' },
    svc_evchargers_item4: { en: 'Disconnect and breaker installation per code', es: 'Instalación del desconectador y breaker conforme al código' },
    svc_evchargers_item5: { en: 'Permit for the electrical work and coordination of the inspection', es: 'Permiso para el trabajo eléctrico y coordinación de la inspección' },
    svc_evchargers_when_p: {
      en: "Anyone installing a Level 2 EV charger at a home or business needs this — a standard wall outlet isn't built for the sustained draw of daily EV charging. It's also worth having your panel assessed before you buy a charger, since capacity varies a lot by home, and older panels sometimes need an upgrade first.",
      es: 'Cualquier persona que instale un cargador de Nivel 2 en casa o en un negocio necesita este trabajo — un contacto de pared estándar no está diseñado para el consumo sostenido de la carga diaria de un auto eléctrico. También vale la pena evaluar su panel antes de comprar un cargador, ya que la capacidad varía mucho según la casa, y a veces los paneles antiguos necesitan actualizarse primero.'
    },
    svc_evchargers_expect_p: {
      en: "We start with a site visit to look at your panel and confirm capacity, then quote the circuit and charger installation. If your panel doesn't have room for the new circuit, we'll quote a panel upgrade alongside it. Once the work is done, we schedule the inspection required to close out the permit.",
      es: 'Empezamos con una visita al sitio para revisar su panel y confirmar la capacidad, y luego cotizamos el circuito y la instalación del cargador. Si su panel no tiene espacio para el circuito nuevo, cotizamos una actualización de panel junto con el trabajo. Una vez terminado, programamos la inspección requerida para cerrar el permiso.'
    },
    svc_evchargers_photos_heading: { en: 'EV Charger Installations in San Diego', es: 'Instalaciones de Cargadores en San Diego' },
    svc_evchargers_step1_title: { en: 'Contact Us', es: 'Contáctenos' },
    svc_evchargers_step1_desc: { en: 'Tell us about your vehicle and where you want the charger.', es: 'Cuéntenos sobre su vehículo y dónde quiere el cargador.' },
    svc_evchargers_step2_title: { en: 'Site Assessment & Quote', es: 'Evaluación del Sitio y Cotización' },
    svc_evchargers_step2_desc: { en: "We check your panel's capacity and quote the circuit and installation.", es: 'Revisamos la capacidad de su panel y cotizamos el circuito y la instalación.' },
    svc_evchargers_step3_title: { en: 'Permit & Installation', es: 'Permiso e Instalación' },
    svc_evchargers_step3_desc: { en: 'We pull the required permit and install the circuit and charger.', es: 'Tramitamos el permiso requerido e instalamos el circuito y el cargador.' },
    svc_evchargers_step4_title: { en: 'Inspection & Walkthrough', es: 'Inspección y Recorrido Final' },
    svc_evchargers_step4_desc: { en: 'We schedule the inspection and walk you through the finished install.', es: 'Programamos la inspección y recorremos con usted la instalación terminada.' },

    // ---- Service Calls ----
    svc_servicecalls_hero_title: { en: 'Electrical Repair & Service Calls in San Diego, CA', es: 'Reparaciones Eléctricas y Llamadas de Servicio en San Diego, CA' },
    svc_servicecalls_hero_subtitle: {
      en: 'Diagnosis and repair for electrical problems at your home or business, including emergency calls.',
      es: 'Diagnóstico y reparación de problemas eléctricos en su hogar o negocio, incluyendo llamadas de emergencia.'
    },
    svc_servicecalls_what_heading: { en: 'What Is an Electrical Service Call?', es: '¿Qué Es una Llamada de Servicio Eléctrico?' },
    svc_servicecalls_p1: {
      en: 'A service call is a diagnostic and repair visit for an existing electrical problem — an outlet or switch that\'s stopped working, a breaker that keeps tripping, flickering lights, a sparking outlet, exposed wiring, or a partial loss of power somewhere in the building. Unlike a planned project, service calls usually start with "something\'s wrong" rather than a scoped-out job.',
      es: 'Una llamada de servicio es una visita de diagnóstico y reparación para un problema eléctrico existente — un contacto o interruptor que dejó de funcionar, un breaker que se dispara repetidamente, luces parpadeantes, un contacto chispeando, cableado expuesto, o una pérdida parcial de energía en algún punto del edificio. A diferencia de un proyecto planeado, las llamadas de servicio normalmente empiezan con "algo anda mal" en lugar de un trabajo ya definido.'
    },
    svc_servicecalls_p2: {
      en: "We also handle service calls tied to home inspections — if an inspection report flags electrical issues during a home sale, we can assess and repair what's listed so it's resolved before closing. For anything that looks or feels like an active hazard — sparking, burning smells, exposed wiring — we treat it as an emergency call.",
      es: 'También atendemos llamadas de servicio relacionadas con inspecciones de compraventa de vivienda — si un reporte de inspección señala problemas eléctricos durante la venta de una casa, podemos evaluar y reparar lo indicado para resolverlo antes del cierre. Ante cualquier cosa que parezca o se sienta como un peligro activo — chispas, olor a quemado, cableado expuesto — lo tratamos como una llamada de emergencia.'
    },
    svc_servicecalls_item1: { en: 'On-site diagnosis to find the actual cause of the problem', es: 'Diagnóstico en el sitio para encontrar la causa real del problema' },
    svc_servicecalls_item2: { en: 'Repair or replacement of the faulty wiring, device, or breaker', es: 'Reparación o reemplazo del cableado, dispositivo o breaker defectuoso' },
    svc_servicecalls_item3: { en: 'Code-compliant fixes, including GFCI and AFCI protection where required', es: 'Reparaciones conforme al código, incluyendo protección GFCI y AFCI donde se requiera' },
    svc_servicecalls_item4: { en: 'Repairs tied to home inspection reports ahead of a sale', es: 'Reparaciones relacionadas con reportes de inspección antes de una venta' },
    svc_servicecalls_item5: { en: 'Emergency response for hazards like sparking outlets or exposed wiring', es: 'Respuesta de emergencia ante peligros como contactos chispeando o cableado expuesto' },
    svc_servicecalls_when_p: {
      en: "Call for a service visit any time something electrical stops working correctly, feels warm or smells off, or a breaker won't stay reset — these are usually signs of an underlying issue rather than something to wait out. For anything that looks actively dangerous, treat it as an emergency and call right away.",
      es: 'Llame para una visita de servicio cada vez que algo eléctrico deje de funcionar correctamente, se sienta caliente o huela raro, o un breaker no se quede activado — normalmente son señales de un problema de fondo y no algo para esperar a que pase. Ante cualquier cosa que parezca activamente peligrosa, trátela como una emergencia y llame de inmediato.'
    },
    svc_servicecalls_expect_p: {
      en: "When you call, tell us what you're seeing — that helps us show up prepared for the right repair. We diagnose the issue on-site, explain what's causing it, and quote the repair before we do the work. If the fix turns out to be bigger than expected, like a panel issue, we'll walk you through the options before moving forward.",
      es: 'Cuando llame, cuéntenos qué está observando — eso nos ayuda a llegar preparados para la reparación correcta. Diagnosticamos el problema en el sitio, le explicamos la causa, y cotizamos la reparación antes de hacer el trabajo. Si la solución resulta ser más grande de lo esperado, como un problema de panel, le explicamos las opciones antes de continuar.'
    },
    svc_servicecalls_photos_heading: { en: 'Service Call Work in San Diego', es: 'Trabajos de Llamadas de Servicio en San Diego' },
    svc_servicecalls_step1_title: { en: 'Contact Us', es: 'Contáctenos' },
    svc_servicecalls_step1_desc: { en: 'Call or text and describe what\'s happening.', es: 'Llame o envíe un mensaje y describa lo que está pasando.' },
    svc_servicecalls_step2_title: { en: 'Schedule a Visit', es: 'Programe una Visita' },
    svc_servicecalls_step2_desc: { en: 'We schedule a time to come diagnose the issue.', es: 'Programamos un horario para ir a diagnosticar el problema.' },
    svc_servicecalls_step3_title: { en: 'On-Site Diagnosis & Repair', es: 'Diagnóstico y Reparación en el Sitio' },
    svc_servicecalls_step3_desc: { en: 'We find the cause, quote the repair, and complete the work.', es: 'Encontramos la causa, cotizamos la reparación y hacemos el trabajo.' },
    svc_servicecalls_step4_title: { en: 'Walkthrough & Code Check', es: 'Recorrido Final y Verificación de Código' },
    svc_servicecalls_step4_desc: { en: "We walk you through what was fixed and confirm it meets code.", es: 'Le explicamos qué se reparó y confirmamos que cumple con el código.' },

    // ======================================================================
    // Legal pages — privacy.html and terms.html.
    //
    // Written against what this site actually does as of 2026-09-07: the quote
    // form (Supabase), owner-uploaded job photos (Supabase storage), GA4 behind
    // Consent Mode v2, Resend notification email from a verified domain, and
    // the server-side Places API rating fetch. Nothing here describes a feature
    // that does not exist — when one ships, updating this text is part of
    // shipping it.
    //
    // Spanish is a translation for comprehension, not a second legal instrument.
    // terms_s12_p says the English version controls where the two diverge, which
    // is what keeps a bilingual policy from becoming two different policies.
    // ======================================================================

    footer_legal: { en: 'Legal', es: 'Legal' },
    nav_privacy: { en: 'Privacy Policy', es: 'Política de Privacidad' },
    nav_terms: { en: 'Terms of Service', es: 'Términos de Servicio' },
    legal_updated: { en: 'Last updated: September 7, 2026', es: 'Última actualización: 7 de septiembre de 2026' },
    legal_contact_heading: { en: 'How to Reach Us', es: 'Cómo Contactarnos' },

    // ---- Privacy Policy ----
    privacy_page_title: { en: 'Privacy Policy', es: 'Política de Privacidad' },
    privacy_intro: {
      en: 'This policy explains what information Redline Electric collects through redlinesd.com, why we collect it, who else handles it, and what choices you have. It covers this website. It does not cover what you tell us in person, on a phone call, or in a signed work agreement — we treat that information with the same care, but it sits outside this document.',
      es: 'Esta política explica qué información recopila Redline Electric a través de redlinesd.com, por qué la recopilamos, quién más la maneja y qué opciones tiene usted. Cubre este sitio web. No cubre lo que usted nos diga en persona, por teléfono o en un acuerdo de trabajo firmado — esa información la tratamos con el mismo cuidado, pero queda fuera de este documento.'
    },

    privacy_s1_h: { en: 'Who We Are', es: 'Quiénes Somos' },
    privacy_s1_p: {
      en: 'Redline Electric is a licensed electrical contractor serving San Diego County, California, holding CSLB license C-10 #1153394. We are the business responsible for the information described below, and we are the ones who decide what is done with it.',
      es: 'Redline Electric es un contratista eléctrico licenciado que atiende el condado de San Diego, California, con la licencia CSLB C-10 #1153394. Somos el negocio responsable de la información descrita a continuación y quienes decidimos qué se hace con ella.'
    },

    privacy_s2_h: { en: 'What We Collect', es: 'Qué Recopilamos' },
    privacy_s2a_h: { en: 'What you send us', es: 'Lo que usted nos envía' },
    privacy_s2a_p1: {
      en: 'The quote form asks for your name and phone number, and optionally your email address, the service you are interested in, and a description of the job. It also asks you to tick a box agreeing that we may call and text you about the request; the box is never ticked for you, and the form will not submit without it. That is the whole list. No field is pre-filled from another source, and nothing on this site asks for payment details, account numbers, a Social Security number, or any other government identifier.',
      es: 'El formulario de cotización pide su nombre y número de teléfono, y de forma opcional su correo electrónico, el servicio que le interesa y una descripción del trabajo. También le pide marcar una casilla aceptando que podemos llamarle y enviarle mensajes de texto sobre su solicitud; la casilla nunca viene marcada, y el formulario no se envía sin ella. Esa es la lista completa. Ningún campo se llena previamente desde otra fuente, y en este sitio no se pide información de pago, números de cuenta, número de Seguro Social ni ningún otro identificador gubernamental.'
    },
    privacy_s2a_p2: {
      en: 'What you submit is stored in our database, which is hosted by Supabase, and a copy is emailed to us so we can respond. Stored alongside it is the fact that you ticked the consent box and the time you did, because that record is what shows the call or text you get from us was authorised. If you gave an email address, an automatic confirmation is also sent back to you.',
      es: 'Lo que usted envía se guarda en nuestra base de datos, alojada por Supabase, y se nos envía una copia por correo electrónico para poder responderle. Junto con eso se guarda el hecho de que usted marcó la casilla de consentimiento y el momento en que lo hizo, porque ese registro es lo que demuestra que la llamada o el mensaje que reciba de nosotros estaba autorizado. Si proporcionó un correo electrónico, también se le envía una confirmación automática.'
    },
    privacy_s2b_h: { en: 'What is collected automatically', es: 'Lo que se recopila automáticamente' },
    privacy_s2b_p1: {
      en: 'If you accept analytics, Google Analytics 4 records ordinary usage data: which pages you viewed, an approximate region derived from your connection, your device and browser type, and a small set of actions such as tapping a call button, submitting the quote form, or switching the site to Spanish. If you do not accept, none of that is recorded.',
      es: 'Si usted acepta las estadísticas, Google Analytics 4 registra datos de uso comunes: qué páginas vio, una región aproximada derivada de su conexión, el tipo de dispositivo y navegador, y un pequeño conjunto de acciones como presionar un botón de llamada, enviar el formulario de cotización o cambiar el sitio a español. Si no acepta, nada de eso se registra.'
    },
    privacy_s2b_p2: {
      en: 'Separately, Cloudflare — the company that hosts and delivers this site — processes technical request data, including your IP address, as a normal part of serving the page and protecting the site from abuse. This happens for every visitor, before any choice about analytics, because it is the mechanism by which the page reaches you at all.',
      es: 'Por separado, Cloudflare — la empresa que aloja y distribuye este sitio — procesa datos técnicos de la solicitud, incluida su dirección IP, como parte normal de entregar la página y proteger el sitio contra abusos. Esto ocurre con cada visitante, antes de cualquier decisión sobre estadísticas, porque es el mecanismo por el cual la página llega a usted.'
    },
    privacy_s2c_h: { en: 'What stays in your browser', es: 'Lo que queda en su navegador' },
    privacy_s2c_p: {
      en: 'This site keeps three small values in your browser storage: whether you accepted analytics, which language you chose, and whether we have already offered to switch you to Spanish. They stay on your device, only this site can read them, and clearing your browsing data removes them.',
      es: 'Este sitio guarda tres valores pequeños en el almacenamiento de su navegador: si aceptó las estadísticas, qué idioma eligió y si ya le ofrecimos cambiar a español. Permanecen en su dispositivo, solo este sitio puede leerlos, y borrar los datos de navegación los elimina.'
    },

    privacy_s3_h: { en: 'Photos of Completed Work', es: 'Fotos de Trabajos Terminados' },
    privacy_s3_p: {
      en: 'The photo galleries on this site are uploaded by us and show electrical work we have completed. There is no photo upload for visitors — nothing you do on this site puts an image anywhere. The photos are stored in Supabase storage. We photograph the work rather than the people or belongings around it, and we do not caption a photo with a customer name or address. If a photo of your project shows something you would rather not have published, tell us and we will take it down.',
      es: 'Las galerías de fotos de este sitio las subimos nosotros y muestran trabajos eléctricos que hemos completado. No hay carga de fotos para visitantes — nada de lo que usted haga en este sitio coloca una imagen en ningún lado. Las fotos se guardan en el almacenamiento de Supabase. Fotografiamos el trabajo, no a las personas ni las pertenencias a su alrededor, y no acompañamos una foto con el nombre o la dirección de un cliente. Si una foto de su proyecto muestra algo que usted preferiría no publicar, díganos y la quitamos.'
    },

    privacy_s4_h: { en: 'The Google Rating on This Site', es: 'La Calificación de Google en Este Sitio' },
    privacy_s4_p1: {
      en: 'The star rating and review count shown on this site come from our Google Business Profile. Our own server requests those two numbers from the Google Places API and caches them for a day at a time. That request is made by us, on our own behalf. Your visit sends nothing to Google through this feature, and Google is not told that you looked at the page.',
      es: 'La calificación de estrellas y el número de reseñas que aparecen en este sitio provienen de nuestro Perfil de Empresa en Google. Nuestro propio servidor solicita esos dos números a la API de Google Places y los guarda en caché por un día a la vez. Esa solicitud la hacemos nosotros, por nuestra cuenta. Su visita no envía nada a Google mediante esta función, y a Google no se le informa que usted vio la página.'
    },
    privacy_s4_p2: {
      en: 'The review text and reviewer names shown on the site were written by our customers and published publicly by them on Google. Because that content originates with a third party, we do not control it and cannot correct it. If a review is yours and you want it changed or removed, that is done through Google rather than through us.',
      es: 'El texto de las reseñas y los nombres de quienes las escribieron fueron redactados por nuestros clientes y publicados públicamente por ellos en Google. Como ese contenido se origina con un tercero, no lo controlamos ni podemos corregirlo. Si una reseña es suya y quiere cambiarla o eliminarla, eso se hace a través de Google y no con nosotros.'
    },

    privacy_s5_h: { en: 'What We Use It For', es: 'Para Qué la Usamos' },
    privacy_s5_i1: { en: 'Responding to your quote request and answering your questions', es: 'Responder a su solicitud de cotización y contestar sus preguntas' },
    privacy_s5_i2: { en: 'Contacting you about the job, scheduling, and follow-up work', es: 'Contactarlo sobre el trabajo, la programación y el seguimiento' },
    privacy_s5_i3: { en: 'Sending you a confirmation that your request came through', es: 'Enviarle una confirmación de que su solicitud llegó' },
    privacy_s5_i4: { en: 'Understanding, in aggregate, which pages and services people actually use', es: 'Entender, de forma agregada, qué páginas y servicios usa realmente la gente' },
    privacy_s5_i5: { en: 'Keeping the site working, and keeping records of work we have performed', es: 'Mantener el sitio funcionando y conservar registros del trabajo que hemos realizado' },
    privacy_s5_i6: { en: 'Meeting legal, licensing, tax, and insurance obligations', es: 'Cumplir obligaciones legales, de licencia, fiscales y de seguros' },
    privacy_s5_p: {
      en: 'We do not sell your personal information. We do not share it for cross-context behavioral advertising, and we do not run advertising retargeting on this site.',
      es: 'No vendemos su información personal. No la compartimos para publicidad conductual entre contextos, y no usamos remarketing publicitario en este sitio.'
    },

    privacy_s6_h: { en: 'Who Else Handles It', es: 'Quién Más la Maneja' },
    privacy_s6_intro: {
      en: 'Running this site takes a handful of outside services. Each one handles information on our instructions and for our purposes, not for its own:',
      es: 'Operar este sitio requiere algunos servicios externos. Cada uno maneja la información siguiendo nuestras instrucciones y para nuestros fines, no para los suyos:'
    },
    privacy_s6_i1: { en: 'Supabase — the database that holds quote requests, and the storage that holds job photos', es: 'Supabase — la base de datos que guarda las solicitudes de cotización y el almacenamiento con las fotos de trabajos' },
    privacy_s6_i2: { en: 'Resend — sends the notification email to us and the confirmation email to you, from a verified redlinesd.com address', es: 'Resend — envía el correo de notificación a nosotros y el de confirmación a usted, desde una dirección verificada de redlinesd.com' },
    privacy_s6_i3: { en: 'Google Analytics — usage statistics, and only after you accept', es: 'Google Analytics — estadísticas de uso, y solo después de que usted acepte' },
    privacy_s6_i4: { en: 'Cloudflare — hosting and content delivery for the site itself', es: 'Cloudflare — alojamiento y distribución de contenido del sitio' },
    privacy_s6_p: {
      en: 'Beyond those, we disclose information only where the law requires it, or where we need it to establish or defend a legal claim. If the business is ever sold or merged, customer records would transfer as part of that, and the new owner would be bound by this policy for information collected under it.',
      es: 'Aparte de esos, divulgamos información únicamente cuando la ley lo exige, o cuando la necesitamos para presentar o defender una reclamación legal. Si el negocio llegara a venderse o fusionarse, los registros de clientes se transferirían como parte de eso, y el nuevo propietario quedaría sujeto a esta política respecto de la información recopilada bajo ella.'
    },

    privacy_s7_h: { en: 'Analytics and Your Choice', es: 'Estadísticas y Su Decisión' },
    privacy_s7_p1: {
      en: 'Analytics is off until you turn it on. Every page sets Google Consent Mode v2 to denied before any analytics call is made, so no analytics identifier is stored and no measurable hit is sent until you press Accept on the notice at the bottom of the screen. Ignoring the notice, or scrolling past it, leaves analytics off.',
      es: 'Las estadísticas están desactivadas hasta que usted las activa. Cada página establece el Modo de Consentimiento v2 de Google en denegado antes de cualquier llamada de estadísticas, así que no se guarda ningún identificador ni se envía ninguna medición hasta que usted presione Aceptar en el aviso al pie de la pantalla. Ignorar el aviso, o pasar de largo, deja las estadísticas desactivadas.'
    },
    privacy_s7_p2: {
      en: 'To reverse a choice you already made, clear this site’s stored data in your browser settings. The notice will appear again on your next visit, and analytics stays off until you accept again. Most browsers also offer a setting that blocks analytics scripts outright, and this site works normally with that enabled.',
      es: 'Para revertir una decisión que ya tomó, borre los datos guardados de este sitio en la configuración de su navegador. El aviso volverá a aparecer en su próxima visita y las estadísticas seguirán desactivadas hasta que acepte de nuevo. La mayoría de los navegadores también ofrecen una opción que bloquea los scripts de estadísticas, y este sitio funciona normalmente con esa opción activada.'
    },

    privacy_s8_h: { en: 'How Long We Keep It', es: 'Cuánto Tiempo la Conservamos' },
    privacy_s8_p: {
      en: 'We keep quote requests and job records for as long as we need them to serve the customer and to document work we performed — electrical work carries obligations that outlast the visit, and a job can come back years later. Analytics data is kept according to the retention setting on our Google Analytics property. If you want a quote request you sent us deleted, ask and we will delete it, unless we are required to keep it.',
      es: 'Conservamos las solicitudes de cotización y los registros de trabajo mientras los necesitemos para atender al cliente y documentar el trabajo realizado — el trabajo eléctrico conlleva obligaciones que duran más que la visita, y un trabajo puede volver años después. Los datos de estadísticas se conservan según la configuración de retención de nuestra propiedad de Google Analytics. Si desea que eliminemos una solicitud de cotización que nos envió, pídalo y la eliminaremos, salvo que estemos obligados a conservarla.'
    },

    privacy_s9_h: { en: 'Security', es: 'Seguridad' },
    privacy_s9_p: {
      en: 'The site is served only over HTTPS, so what you type into the form is encrypted in transit. Our database is configured so the public site can write a quote request but cannot read any back — a visitor’s browser has no path to anyone else’s submission. The area where we manage photos and requests is password-protected and is not indexed by search engines. No system is perfectly secure, and we will not tell you otherwise.',
      es: 'El sitio se entrega únicamente por HTTPS, así que lo que usted escribe en el formulario viaja cifrado. Nuestra base de datos está configurada de modo que el sitio público puede escribir una solicitud de cotización pero no puede leer ninguna — el navegador de un visitante no tiene forma de llegar al envío de otra persona. El área donde administramos fotos y solicitudes está protegida con contraseña y no se indexa en buscadores. Ningún sistema es perfectamente seguro, y no le diremos lo contrario.'
    },

    privacy_s10_h: { en: 'California Privacy Rights', es: 'Derechos de Privacidad en California' },
    privacy_s10_p1: {
      en: 'We are a San Diego business and most of the people who contact us are California residents, so we extend the rights below to anyone who asks, whether or not the law obligates us in a particular case. Under the California Consumer Privacy Act, as amended by the California Privacy Rights Act, you may ask us to tell you what personal information we have collected about you, to give you a copy of it, to correct it if it is wrong, or to delete it. You may also limit the use of sensitive personal information — though as described above, we do not collect any.',
      es: 'Somos un negocio de San Diego y la mayoría de quienes nos contactan residen en California, así que extendemos los derechos siguientes a cualquier persona que los solicite, la ley nos obligue o no en un caso particular. Bajo la Ley de Privacidad del Consumidor de California, reformada por la Ley de Derechos de Privacidad de California, usted puede pedirnos que le digamos qué información personal hemos recopilado sobre usted, que le demos una copia, que la corrijamos si está mal, o que la eliminemos. También puede limitar el uso de información personal sensible — aunque, como se describe arriba, no recopilamos ninguna.'
    },
    privacy_s10_p2: {
      en: 'In the categories that statute uses, we collect identifiers (your name, phone number, and email address), commercial information (the service you asked about and what you described), and internet activity (the analytics described above, and only with your consent). We collect them for the business purposes listed under What We Use It For. We have not sold or shared personal information in the preceding twelve months, and we do not knowingly collect or sell the personal information of anyone under 16.',
      es: 'En las categorías que usa esa ley, recopilamos identificadores (su nombre, teléfono y correo electrónico), información comercial (el servicio que consultó y lo que describió) y actividad en internet (las estadísticas descritas arriba, y solo con su consentimiento). Las recopilamos para los fines comerciales enumerados en Para Qué la Usamos. No hemos vendido ni compartido información personal en los doce meses anteriores, y no recopilamos ni vendemos a sabiendas información personal de menores de 16 años.'
    },
    privacy_s10_p3: {
      en: 'To make a request, write to the privacy address below, or call or text us, and say what you want. We will ask you enough to confirm you are the person whose information it is — usually the phone number you used to contact us — and we will not use what you give us for that verification for anything else. You will not be charged, and you will not be treated differently for asking. We aim to respond within 45 days.',
      es: 'Para hacer una solicitud, escriba a la dirección de privacidad que aparece abajo, o llámenos o envíenos un mensaje, y diga qué desea. Le pediremos lo suficiente para confirmar que usted es la persona a la que corresponde la información — normalmente el número de teléfono con el que nos contactó — y no usaremos para nada más lo que nos dé para esa verificación. No se le cobrará ni se le tratará distinto por preguntar. Buscamos responder dentro de 45 días.'
    },

    privacy_s11_h: { en: 'Children', es: 'Menores de Edad' },
    privacy_s11_p: {
      en: 'This site is for adults arranging electrical work on a property. It is not directed at children, and we do not knowingly collect information from anyone under 16. If you believe a child sent us something through this site, tell us and we will delete it.',
      es: 'Este sitio es para adultos que gestionan trabajo eléctrico en una propiedad. No está dirigido a menores, y no recopilamos a sabiendas información de personas menores de 16 años. Si cree que un menor nos envió algo a través de este sitio, avísenos y lo eliminaremos.'
    },

    privacy_s12_h: { en: 'Changes to This Policy', es: 'Cambios a Esta Política' },
    privacy_s12_p: {
      en: 'When this site gains a feature that handles information differently, this policy is updated in the same release. The date at the top of the page is the date of the most recent change. Continuing to use the site after a change means the current version applies to you.',
      es: 'Cuando este sitio incorpore una función que maneje información de otra manera, esta política se actualiza en la misma publicación. La fecha en la parte superior de la página es la del cambio más reciente. Seguir usando el sitio después de un cambio significa que la versión vigente le aplica.'
    },

    privacy_s13_p: {
      en: 'Questions about this policy, or a request about your own information, can go to the privacy address below. Phone and text reach us as well, and are quicker for anything urgent.',
      es: 'Las preguntas sobre esta política, o una solicitud sobre su propia información, pueden dirigirse a la dirección de privacidad que aparece abajo. El teléfono y los mensajes también nos llegan, y son más rápidos para cualquier asunto urgente.'
    },

    // ---- Terms of Service ----
    terms_page_title: { en: 'Terms of Service', es: 'Términos de Servicio' },
    terms_intro: {
      en: 'These terms govern your use of redlinesd.com. By using the site, you accept them. If you do not accept them, please do not use the site. They are about the website — the work we perform for you is governed by the written agreement you sign for that work.',
      es: 'Estos términos rigen su uso de redlinesd.com. Al usar el sitio, usted los acepta. Si no los acepta, por favor no use el sitio. Se refieren al sitio web — el trabajo que realizamos para usted se rige por el acuerdo escrito que usted firma para ese trabajo.'
    },

    terms_s1_h: { en: 'Contractor License Disclosure', es: 'Divulgación de Licencia de Contratista' },
    terms_s1_p: {
      en: 'Redline Electric is a licensed electrical contractor in the State of California, holding CSLB license C-10 #1153394. The license, its current status, its classification, and any disciplinary history are public record and can be checked directly with the Contractors State License Board at cslb.ca.gov. We encourage you to check it before hiring anyone, ourselves included.',
      es: 'Redline Electric es un contratista eléctrico licenciado en el Estado de California, con la licencia CSLB C-10 #1153394. La licencia, su estado actual, su clasificación y cualquier historial disciplinario son registro público y pueden consultarse directamente con el Contractors State License Board en cslb.ca.gov. Le recomendamos verificarlo antes de contratar a cualquiera, nosotros incluidos.'
    },

    terms_s2_h: { en: 'This Site Is Information, Not Electrical Advice', es: 'Este Sitio Es Información, No Asesoría Eléctrica' },
    terms_s2_p1: {
      en: 'Everything published here — service descriptions, the explanations of what a job typically involves, the answers in the FAQ — is general information written to help you understand the kind of work we do and what to expect. It is not professional advice about your property, your panel, or your wiring, and it is not a substitute for having a licensed electrician look at the actual system in front of you.',
      es: 'Todo lo publicado aquí — descripciones de servicios, explicaciones de lo que normalmente implica un trabajo, las respuestas de las preguntas frecuentes — es información general escrita para ayudarle a entender el tipo de trabajo que hacemos y qué esperar. No es asesoría profesional sobre su propiedad, su panel o su cableado, ni sustituye que un electricista licenciado revise el sistema real que usted tiene enfrente.'
    },
    terms_s2_p2: {
      en: 'Electrical work is dangerous, and conditions vary enormously from one building to the next. Do not use anything on this site to decide whether something in your home or business is safe, and do not use it as instructions for doing the work yourself. If you think you have an active hazard — sparking, a burning smell, exposed conductors, heat at an outlet or panel — stop using the circuit and call a licensed electrician, your utility, or emergency services.',
      es: 'El trabajo eléctrico es peligroso y las condiciones varían enormemente de un edificio a otro. No use nada de este sitio para decidir si algo en su casa o negocio es seguro, ni lo use como instrucciones para hacer el trabajo usted mismo. Si cree que tiene un peligro activo — chispas, olor a quemado, conductores expuestos, calor en un contacto o panel — deje de usar el circuito y llame a un electricista licenciado, a su compañía de servicios o a los servicios de emergencia.'
    },

    terms_s3_h: { en: 'Quotes and Estimates', es: 'Cotizaciones y Estimados' },
    terms_s3_p1: {
      en: 'Any figure we give you through this site, by phone, or by text before we have seen the property is a preliminary estimate based on what you described. It is not a fixed price, it is not an offer you can accept to form a contract, and it does not obligate either of us.',
      es: 'Cualquier cifra que le demos por este sitio, por teléfono o por mensaje antes de haber visto la propiedad es un estimado preliminar basado en lo que usted describió. No es un precio fijo, no es una oferta que pueda aceptar para formar un contrato, y no obliga a ninguna de las partes.'
    },
    terms_s3_p2: {
      en: 'The price is set after an on-site assessment, because that is the first point at which the job is actually knowable. Panel capacity, the condition and type of existing wiring, what is behind a wall, access, material costs, and what the permit and inspection require can each move a number substantially, and some of it is not visible until work begins. If the scope changes once we are underway, we tell you before we proceed rather than after.',
      es: 'El precio se fija después de una evaluación en el sitio, porque ese es el primer momento en que el trabajo se puede conocer de verdad. La capacidad del panel, el estado y tipo del cableado existente, lo que hay detrás de una pared, el acceso, el costo de materiales y lo que exijan el permiso y la inspección pueden mover una cifra de forma sustancial, y parte de eso no es visible hasta que empieza el trabajo. Si el alcance cambia una vez comenzado, se lo decimos antes de continuar, no después.'
    },
    terms_s3_p3: {
      en: 'Work is performed under a separate written agreement. Where that agreement and anything on this site differ, the agreement controls.',
      es: 'El trabajo se realiza bajo un acuerdo escrito por separado. Donde ese acuerdo y cualquier cosa de este sitio difieran, prevalece el acuerdo.'
    },

    terms_s4_h: { en: 'Calls and Text Messages', es: 'Llamadas y Mensajes de Texto' },
    terms_s4_p1: {
      en: 'The quote form will not submit until you tick the consent box above the submit button. Ticking it is your agreement that we may contact you at the number you gave us, by phone call and by text message, about your request and the work related to it. The box is never ticked for you, and we record both that you ticked it and when. That is the purpose of the number and the only thing we use it for.',
      es: 'El formulario de cotización no se envía hasta que usted marque la casilla de consentimiento que está sobre el botón de envío. Marcarla es su acuerdo de que podemos contactarlo al número que nos dio, por llamada telefónica y por mensaje de texto, sobre su solicitud y el trabajo relacionado. La casilla nunca viene marcada, y registramos tanto que usted la marcó como el momento en que lo hizo. Ese es el propósito del número y lo único para lo que lo usamos.'
    },
    terms_s4_p2: {
      en: 'Message and data rates may apply, depending on your plan. Message frequency depends entirely on your job — there is no campaign and no recurring series. Reply STOP to any text to stop texts, or HELP for help. Opting out of texts does not stop us from returning your call about a request you sent, and it does not withdraw or change a quote.',
      es: 'Pueden aplicar tarifas de mensajes y datos, según su plan. La frecuencia de los mensajes depende enteramente de su trabajo — no hay campaña ni serie recurrente. Responda STOP a cualquier mensaje para dejar de recibirlos, o HELP para obtener ayuda. Darse de baja de los mensajes no impide que le devolvamos la llamada sobre una solicitud que envió, ni retira ni modifica una cotización.'
    },
    terms_s4_p3: {
      en: 'We do not use your number for marketing campaigns, we do not add it to a promotional list, and we do not sell or rent it to anyone.',
      es: 'No usamos su número para campañas de marketing, no lo agregamos a una lista promocional, y no lo vendemos ni lo rentamos a nadie.'
    },

    terms_s5_h: { en: 'Using the Site', es: 'Uso del Sitio' },
    terms_s5_intro: { en: 'Ordinary use is welcome. What is not:', es: 'El uso normal es bienvenido. Lo que no lo es:' },
    terms_s5_i1: { en: 'Attempting to reach any part of the site, database, or account that is not public', es: 'Intentar acceder a cualquier parte del sitio, la base de datos o una cuenta que no sea pública' },
    terms_s5_i2: { en: 'Automated scraping, bulk copying, or commercial reuse of the content or photographs', es: 'Extracción automatizada, copia masiva o reutilización comercial del contenido o las fotografías' },
    terms_s5_i3: { en: 'Submitting false information, or someone else’s contact details without their permission', es: 'Enviar información falsa, o los datos de contacto de otra persona sin su permiso' },
    terms_s5_i4: { en: 'Using the forms to send unsolicited commercial messages, or to interfere with the operation of the site', es: 'Usar los formularios para enviar mensajes comerciales no solicitados o para interferir con el funcionamiento del sitio' },

    terms_s6_h: { en: 'Content and Ownership', es: 'Contenido y Propiedad' },
    terms_s6_p: {
      en: 'The text, photographs, logo, and layout of this site belong to Redline Electric. The project photographs are of our own completed work. You are welcome to link to any page here. You may not republish, redistribute, or present this content as your own, and you may not use our name, logo, or license number in a way that suggests we performed work we did not perform or endorse something we do not.',
      es: 'El texto, las fotografías, el logotipo y el diseño de este sitio pertenecen a Redline Electric. Las fotografías de proyectos son de trabajo terminado por nosotros. Puede enlazar libremente a cualquier página de aquí. No puede republicar, redistribuir ni presentar este contenido como propio, y no puede usar nuestro nombre, logotipo o número de licencia de manera que sugiera que realizamos un trabajo que no hicimos o que respaldamos algo que no respaldamos.'
    },

    terms_s7_h: { en: 'Third-Party Content', es: 'Contenido de Terceros' },
    terms_s7_p: {
      en: 'The rating, review count, and review text shown on this site originate with Google and were written by our customers. We display them as published: we do not control them, we cannot edit them, and they change over time independently of us. Any link from this site to another site is a convenience, and we are not responsible for what is on the other end of it.',
      es: 'La calificación, el número de reseñas y el texto de las reseñas que se muestran en este sitio se originan en Google y fueron escritos por nuestros clientes. Los mostramos tal como fueron publicados: no los controlamos, no podemos editarlos y cambian con el tiempo de forma independiente a nosotros. Cualquier enlace desde este sitio a otro sitio es una conveniencia, y no somos responsables de lo que haya del otro lado.'
    },

    terms_s8_h: { en: 'No Warranty About the Site', es: 'Sin Garantía Sobre el Sitio' },
    terms_s8_p1: {
      en: 'We work to keep this site accurate and available, but we provide it as it is. We do not warrant that it will be uninterrupted or error-free, that every description reflects current code or current pricing, or that it will meet a particular need of yours.',
      es: 'Trabajamos para mantener este sitio exacto y disponible, pero lo proporcionamos tal como está. No garantizamos que funcione sin interrupciones ni errores, que cada descripción refleje el código o los precios vigentes, ni que satisfaga alguna necesidad particular suya.'
    },
    terms_s8_p2: {
      en: 'This section is about the website only. It has nothing to do with the workmanship warranty on electrical work we perform, which is set out in your work agreement and is not limited by anything on this page.',
      es: 'Esta sección se refiere únicamente al sitio web. No tiene relación con la garantía de mano de obra del trabajo eléctrico que realizamos, la cual se establece en su acuerdo de trabajo y no está limitada por nada en esta página.'
    },

    terms_s9_h: { en: 'Limitation of Liability', es: 'Limitación de Responsabilidad' },
    terms_s9_p1: {
      en: 'To the fullest extent California law allows, Redline Electric is not liable for indirect, incidental, special, consequential, or punitive damages arising from your use of this website or from reliance on information published on it. Our total liability arising from the website is limited to one hundred dollars.',
      es: 'En la máxima medida que permita la ley de California, Redline Electric no es responsable de daños indirectos, incidentales, especiales, consecuentes o punitivos derivados de su uso de este sitio web o de su confianza en la información publicada en él. Nuestra responsabilidad total derivada del sitio web se limita a cien dólares.'
    },
    terms_s9_p2: {
      en: 'Nothing in this section limits liability that cannot be limited under California law, and nothing in it limits or affects our obligations under a signed work agreement, our workmanship warranty, our license, or our insurance.',
      es: 'Nada en esta sección limita la responsabilidad que no pueda limitarse conforme a la ley de California, y nada en ella limita ni afecta nuestras obligaciones bajo un acuerdo de trabajo firmado, nuestra garantía de mano de obra, nuestra licencia o nuestro seguro.'
    },

    terms_s10_h: { en: 'Governing Law', es: 'Ley Aplicable' },
    terms_s10_p: {
      en: 'These terms are governed by the laws of the State of California, without regard to its conflict-of-law rules. Any dispute about this website is to be brought in the state or federal courts located in San Diego County, California, and both of us consent to the jurisdiction of those courts.',
      es: 'Estos términos se rigen por las leyes del Estado de California, sin considerar sus reglas de conflicto de leyes. Cualquier disputa sobre este sitio web deberá presentarse en los tribunales estatales o federales ubicados en el condado de San Diego, California, y ambas partes aceptamos la jurisdicción de esos tribunales.'
    },

    terms_s11_h: { en: 'Changes to These Terms', es: 'Cambios a Estos Términos' },
    terms_s11_p: {
      en: 'We may update these terms as the site changes. The date at the top of the page is the date of the most recent version, and that version applies to your use of the site from the moment it is posted.',
      es: 'Podemos actualizar estos términos conforme el sitio cambie. La fecha en la parte superior de la página es la de la versión más reciente, y esa versión aplica a su uso del sitio desde el momento en que se publica.'
    },

    terms_s12_h: { en: 'Language and Severability', es: 'Idioma y Divisibilidad' },
    terms_s12_p: {
      en: 'This site is published in English and Spanish. The Spanish version is provided so these terms can be read and understood; if the two versions ever conflict, the English version controls. If any provision here is held unenforceable, the rest stays in force and the unenforceable provision is narrowed only as far as necessary.',
      es: 'Este sitio se publica en inglés y español. La versión en español se ofrece para que estos términos puedan leerse y entenderse; si alguna vez las dos versiones se contradicen, prevalece la versión en inglés. Si alguna disposición aquí resulta inaplicable, el resto permanece vigente y la disposición inaplicable se reduce solo en lo necesario.'
    },

    terms_s13_p: {
      en: 'Questions about these terms, or about a quote you received:',
      es: 'Preguntas sobre estos términos o sobre una cotización que recibió:'
    },

    // ---- Chat assistant widget (assets/js/chat-widget.js) ----
    // UI chrome ONLY. The assistant's own replies are NOT translated here:
    // they come back from the chat-assistant Edge Function already written in
    // the language the visitor typed in, which is why the backend reads the
    // message rather than trusting a language flag. Passing a reply through
    // this table would be the same mistake as translating Supabase content.
    chat_launcher: { en: 'Chat with us', es: 'Chatee con nosotros' },
    chat_title: { en: 'Ask Redline', es: 'Pregunte a Redline' },
    chat_close: { en: 'Close chat', es: 'Cerrar chat' },
    chat_call: { en: 'Call us now', es: 'Llámenos ahora' },
    chat_intro: {
      en: 'Hi! Ask about our services or scheduling and I will help. For anything urgent, call us.',
      es: '¡Hola! Pregunte sobre nuestros servicios u horarios y le ayudo. Para algo urgente, llámenos.'
    },
    chat_chip_panel: { en: 'Panel upgrade', es: 'Actualizar panel' },
    chat_chip_ev: { en: 'EV charger', es: 'Cargador para auto eléctrico' },
    chat_chip_lights: { en: 'Lights not working', es: 'Las luces no funcionan' },
    chat_chip_quote: { en: 'Get a quote', es: 'Pedir cotización' },
    chat_placeholder: { en: 'Type your question…', es: 'Escriba su pregunta…' },
    chat_send: { en: 'Send', es: 'Enviar' },
    chat_thinking: { en: 'Typing…', es: 'Escribiendo…' },
    chat_log_label: { en: 'Conversation', es: 'Conversación' },
    // Marks the assistant's fixed emergency reply for screen readers. The
    // visual treatment alone (red rail, warning icon) would not carry.
    chat_emergency_label: { en: 'Urgent', es: 'Urgente' },
    chat_disclaimer: {
      en: 'AI assistant — it can be wrong and does not give electrical advice or prices. Do not send sensitive information. <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a>',
      es: 'Asistente de IA — puede equivocarse y no da consejos eléctricos ni precios. No envíe información sensible. <a href="/privacy">Privacidad</a> · <a href="/terms">Términos</a>'
    },
    // Shown when the network fails or the request times out. Deliberately not
    // an error message: the visitor needs the phone number, not a status code.
    chat_error_network: {
      en: 'Sorry, I could not reach our system. Call or text us at (619) 748-0662 and we will help you directly.',
      es: 'Perdón, no pude conectar con nuestro sistema. Llámenos o mande un mensaje al (619) 748-0662 y le atendemos directamente.'
    }
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

  // The reveal decision itself now runs in a tiny inline script right after
  // #lang-banner's own markup in the HTML, so it resolves before there is
  // anything painted yet for it to shift -- this file is 103KB and loads
  // only after the whole page has already been parsed, which is what made
  // the old reveal-here approach a real, measured CLS source. This function
  // now only wires the switch/dismiss button clicks; both already exist in
  // the banner's static markup regardless of which state it's in, so
  // wiring their listeners late costs nothing visible.
  function initSuggestionBanner() {
    var banner = document.getElementById('lang-banner');
    if (!banner) return;

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
