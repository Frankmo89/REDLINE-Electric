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
    svc_servicecalls_step4_desc: { en: "We walk you through what was fixed and confirm it meets code.", es: 'Le explicamos qué se reparó y confirmamos que cumple con el código.' }
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
