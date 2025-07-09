export type Language = "nl" | "en" | "fr" | "de" | "es";

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

const translations: Translations = {
  // Navigation
  "nav.dashboard": {
    nl: "Dashboard",
    en: "Dashboard",
    fr: "Tableau de bord",
    de: "Dashboard",
    es: "Panel",
  },
  "nav.focus": {
    nl: "Focus",
    en: "Focus",
    fr: "Focus",
    de: "Fokus",
    es: "Enfoque",
  },
  "nav.statistics": {
    nl: "Statistieken",
    en: "Statistics",
    fr: "Statistiques",
    de: "Statistiken",
    es: "Estadísticas",
  },
  "nav.settings": {
    nl: "Instellingen",
    en: "Settings",
    fr: "Paramètres",
    de: "Einstellungen",
    es: "Configuración",
  },
  "nav.team": {
    nl: "Team",
    en: "Team",
    fr: "Équipe",
    de: "Team",
    es: "Equipo",
  },

  // Focus Mode
  "focus.title": {
    nl: "Focus Mode",
    en: "Focus Mode",
    fr: "Mode Focus",
    de: "Fokus Modus",
    es: "Modo Enfoque",
  },
  "focus.task_placeholder": {
    nl: "Bijv. E-mails beantwoorden, Rapport schrijven, Coding...",
    en: "e.g. Answer emails, Write report, Coding...",
    fr: "ex. Répondre aux emails, Écrire un rapport, Programmation...",
    de: "z.B. E-Mails beantworten, Bericht schreiben, Programmieren...",
    es: "ej. Responder correos, Escribir informe, Programar...",
  },
  "focus.start_session": {
    nl: "Start Focus Sessie",
    en: "Start Focus Session",
    fr: "Démarrer la session",
    de: "Fokus-Sitzung starten",
    es: "Iniciar sesión",
  },
  "focus.custom_time": {
    nl: "🎯 Custom (eigen tijd)",
    en: "🎯 Custom (your time)",
    fr: "🎯 Personnalisé (votre temps)",
    de: "🎯 Benutzerdefiniert (Ihre Zeit)",
    es: "🎯 Personalizado (tu tiempo)",
  },
  "focus.minutes_label": {
    nl: "Aantal minuten (5-180):",
    en: "Number of minutes (5-180):",
    fr: "Nombre de minutes (5-180):",
    de: "Anzahl Minuten (5-180):",
    es: "Número de minutos (5-180):",
  },

  // Settings
  "settings.title": {
    nl: "Instellingen",
    en: "Settings",
    fr: "Paramètres",
    de: "Einstellungen",
    es: "Configuración",
  },
  "settings.language": {
    nl: "Taal",
    en: "Language",
    fr: "Langue",
    de: "Sprache",
    es: "Idioma",
  },
  "settings.theme": {
    nl: "Thema",
    en: "Theme",
    fr: "Thème",
    de: "Design",
    es: "Tema",
  },
  "settings.compact_mode": {
    nl: "Compacte Modus",
    en: "Compact Mode",
    fr: "Mode Compact",
    de: "Kompakt-Modus",
    es: "Modo Compacto",
  },
  "settings.compact_mode_desc": {
    nl: "Gebruik minder ruimte voor een dichtere interface",
    en: "Use less space for a denser interface",
    fr: "Utiliser moins d'espace pour une interface plus dense",
    de: "Weniger Platz für eine dichtere Oberfläche verwenden",
    es: "Usar menos espacio para una interfaz más densa",
  },

  // Theme options
  "theme.light": {
    nl: "🌞 Licht",
    en: "🌞 Light",
    fr: "🌞 Clair",
    de: "🌞 Hell",
    es: "🌞 Claro",
  },
  "theme.dark": {
    nl: "🌙 Donker",
    en: "🌙 Dark",
    fr: "🌙 Sombre",
    de: "🌙 Dunkel",
    es: "🌙 Oscuro",
  },
  "theme.auto": {
    nl: "🔄 Automatisch",
    en: "🔄 Automatic",
    fr: "🔄 Automatique",
    de: "🔄 Automatisch",
    es: "🔄 Automático",
  },

  // Language options
  "lang.nl": {
    nl: "🇳🇱 Nederlands",
    en: "🇳🇱 Dutch",
    fr: "🇳🇱 Néerlandais",
    de: "🇳🇱 Niederländisch",
    es: "🇳🇱 Holandés",
  },
  "lang.en": {
    nl: "🇺🇸 Engels",
    en: "🇺🇸 English",
    fr: "🇺🇸 Anglais",
    de: "🇺🇸 Englisch",
    es: "🇺🇸 Inglés",
  },
  "lang.fr": {
    nl: "🇫🇷 Frans",
    en: "🇫🇷 French",
    fr: "🇫🇷 Français",
    de: "🇫🇷 Französisch",
    es: "🇫🇷 Francés",
  },
  "lang.de": {
    nl: "🇩🇪 Duits",
    en: "🇩🇪 German",
    fr: "🇩🇪 Allemand",
    de: "🇩🇪 Deutsch",
    es: "🇩🇪 Alemán",
  },
  "lang.es": {
    nl: "🇪🇸 Spaans",
    en: "🇪🇸 Spanish",
    fr: "🇪🇸 Espagnol",
    de: "🇪🇸 Spanisch",
    es: "🇪🇸 Español",
  },

  // Common
  "common.save": {
    nl: "Opslaan",
    en: "Save",
    fr: "Enregistrer",
    de: "Speichern",
    es: "Guardar",
  },
  "common.cancel": {
    nl: "Annuleren",
    en: "Cancel",
    fr: "Annuler",
    de: "Abbrechen",
    es: "Cancelar",
  },
  "common.back": {
    nl: "Terug",
    en: "Back",
    fr: "Retour",
    de: "Zurück",
    es: "Volver",
  },

  // Welcome messages
  "welcome.title": {
    nl: "Welkom bij FocusFlow",
    en: "Welcome to FocusFlow",
    fr: "Bienvenue dans FocusFlow",
    de: "Willkommen bei FocusFlow",
    es: "Bienvenido a FocusFlow",
  },
  "welcome.subtitle": {
    nl: "Je productiviteitspartner voor diepere focus",
    en: "Your productivity partner for deeper focus",
    fr: "Votre partenaire de productivité pour une concentration plus profonde",
    de: "Ihr Produktivitätspartner für tiefere Konzentration",
    es: "Tu compañero de productividad para un enfoque más profundo",
  },

  // Terms of Service
  "terms.title": {
    nl: "Algemene Voorwaarden",
    en: "Terms of Service",
    fr: "Conditions d'utilisation",
    de: "Nutzungsbedingungen",
    es: "Términos de Servicio",
  },
  "terms.lastUpdated": {
    nl: "Laatst bijgewerkt",
    en: "Last updated",
    fr: "Dernière mise à jour",
    de: "Zuletzt aktualisiert",
    es: "Última actualización",
  },
  "terms.acceptance.title": {
    nl: "Acceptatie van Voorwaarden",
    en: "Acceptance of Terms",
    fr: "Acceptation des Conditions",
    de: "Annahme der Bedingungen",
    es: "Aceptación de Términos",
  },
  "terms.acceptance.content": {
    nl: "Door toegang te krijgen tot en gebruik te maken van FocusFlow, gaat u akkoord met deze algemene voorwaarden. Als u niet akkoord gaat met een van deze voorwaarden, mag u onze service niet gebruiken.",
    en: "By accessing and using FocusFlow, you agree to be bound by these Terms of Service. If you do not agree to any of these terms, you may not use our service.",
    fr: "En accédant et en utilisant FocusFlow, vous acceptez d'être lié par ces Conditions d'utilisation. Si vous n'acceptez pas l'une de ces conditions, vous ne pouvez pas utiliser notre service.",
    de: "Durch den Zugriff auf und die Nutzung von FocusFlow stimmen Sie zu, an diese Nutzungsbedingungen gebunden zu sein. Wenn Sie mit einer dieser Bedingungen nicht einverstanden sind, dürfen Sie unseren Service nicht nutzen.",
    es: "Al acceder y usar FocusFlow, acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con alguno de estos términos, no puede usar nuestro servicio.",
  },

  // AI Coach translations
  "aiCoach.title": {
    nl: "AI Productiviteitscoach",
    en: "AI Productivity Coach",
    fr: "Coach de Productivité IA",
    de: "KI-Produktivitätscoach",
    es: "Entrenador de Productividad IA",
  },
  "aiCoach.welcome": {
    nl: "Hallo! Ik ben je persoonlijke AI productiviteitscoach. Ik help je om gefocust te blijven en je doelen te bereiken. Hoe kan ik je vandaag helpen?",
    en: "Hello! I'm your personal AI productivity coach. I help you stay focused and achieve your goals. How can I help you today?",
    fr: "Bonjour ! Je suis votre coach personnel de productivité IA. Je vous aide à rester concentré et à atteindre vos objectifs. Comment puis-je vous aider aujourd'hui ?",
    de: "Hallo! Ich bin Ihr persönlicher KI-Produktivitätscoach. Ich helfe Ihnen, fokussiert zu bleiben und Ihre Ziele zu erreichen. Wie kann ich Ihnen heute helfen?",
    es: "¡Hola! Soy tu entrenador personal de productividad IA. Te ayudo a mantenerte enfocado y lograr tus objetivos. ¿Cómo puedo ayudarte hoy?",
  },
  "aiCoach.inputPlaceholder": {
    nl: "Vraag me iets over productiviteit...",
    en: "Ask me something about productivity...",
    fr: "Demandez-moi quelque chose sur la productivité...",
    de: "Fragen Sie mich etwas über Produktivität...",
    es: "Pregúntame algo sobre productividad...",
  },
  "aiCoach.error": {
    nl: "Er ging iets mis bij het genereren van een antwoord.",
    en: "Something went wrong generating a response.",
    fr: "Quelque chose s'est mal passé lors de la génération d'une réponse.",
    de: "Beim Generieren einer Antwort ist etwas schief gelaufen.",
    es: "Algo salió mal al generar una respuesta.",
  },

  // Calendar Integration
  "calendar.integration": {
    nl: "Agenda Integratie",
    en: "Calendar Integration",
    fr: "Intégration du Calendrier",
    de: "Kalender-Integration",
    es: "Integración de Calendario",
  },
  "calendar.connectGoogle": {
    nl: "Verbinden met Google Agenda",
    en: "Connect to Google Calendar",
    fr: "Connecter à Google Agenda",
    de: "Mit Google Kalender verbinden",
    es: "Conectar con Google Calendar",
  },
  "calendar.importEvents": {
    nl: "Afspraken Importeren",
    en: "Import Events",
    fr: "Importer des Événements",
    de: "Termine Importieren",
    es: "Importar Eventos",
  },
  "calendar.connected": {
    nl: "Verbonden met Google Agenda",
    en: "Connected to Google Calendar",
    fr: "Connecté à Google Agenda",
    de: "Mit Google Kalender verbunden",
    es: "Conectado con Google Calendar",
  },

  // Team Collaboration - Disabled messages
  "team.disabled": {
    nl: "Team functionaliteit is momenteel uitgeschakeld.",
    en: "Team functionality is currently disabled.",
    fr: "La fonctionnalité d'équipe est actuellement désactivée.",
    de: "Team-Funktionalität ist derzeit deaktiviert.",
    es: "La funcionalidad de equipo está actualmente deshabilitada.",
  },
  "team.focusIndividual": {
    nl: "Focus op individuele productiviteit voor nu.",
    en: "Focus on individual productivity for now.",
    fr: "Concentrez-vous sur la productivité individuelle pour l'instant.",
    de: "Konzentrieren Sie sich vorerst auf individuelle Produktivität.",
    es: "Concéntrate en la productividad individual por ahora.",
  },

  // Dashboard translations
  "dashboard.title": {
    nl: "Dashboard",
    en: "Dashboard",
    fr: "Tableau de bord",
    de: "Dashboard",
    es: "Panel de control",
  },
  "dashboard.welcome": {
    nl: "Welkom terug",
    en: "Welcome back",
    fr: "Bon retour",
    de: "Willkommen zurück",
    es: "Bienvenido de vuelta",
  },
  "dashboard.focusScore": {
    nl: "Dagscore Focus",
    en: "Daily Focus Score",
    fr: "Score de concentration quotidien",
    de: "Täglicher Fokus-Score",
    es: "Puntuación diaria de enfoque",
  },
  "dashboard.focusBlocksCompleted": {
    nl: "Focusblokken voltooid",
    en: "Focus blocks completed",
    fr: "Blocs de concentration terminés",
    de: "Fokusblöcke abgeschlossen",
    es: "Bloques de enfoque completados",
  },
  "dashboard.workTimeToday": {
    nl: "Werktijd vandaag",
    en: "Work time today",
    fr: "Temps de travail aujourd'hui",
    de: "Arbeitszeit heute",
    es: "Tiempo de trabajo hoy",
  },
  "dashboard.distractionNotifications": {
    nl: "Afleidingsmeldingen",
    en: "Distraction notifications",
    fr: "Notifications de distraction",
    de: "Ablenkungsbenachrichtigungen",
    es: "Notificaciones de distracción",
  },
  "dashboard.integrations": {
    nl: "Integraties",
    en: "Integrations",
    fr: "Intégrations",
    de: "Integrationen",
    es: "Integraciones",
  },
  "dashboard.currentSession": {
    nl: "Huidige Sessie",
    en: "Current Session",
    fr: "Session actuelle",
    de: "Aktuelle Sitzung",
    es: "Sesión actual",
  },
  "dashboard.dailyPlanning": {
    nl: "Dagplanning",
    en: "Daily Planning",
    fr: "Planification quotidienne",
    de: "Tagesplanung",
    es: "Planificación diaria",
  },
  "dashboard.startSession": {
    nl: "Start Sessie",
    en: "Start Session",
    fr: "Démarrer la session",
    de: "Sitzung starten",
    es: "Iniciar sesión",
  },
  "dashboard.allTasksCompleted": {
    nl: "Alle taken voltooid! 🎉",
    en: "All tasks completed! 🎉",
    fr: "Toutes les tâches terminées ! 🎉",
    de: "Alle Aufgaben erledigt! 🎉",
    es: "¡Todas las tareas completadas! 🎉",
  },
  "dashboard.planNewTasks": {
    nl: "Nieuwe taken plannen",
    en: "Plan new tasks",
    fr: "Planifier de nouvelles tâches",
    de: "Neue Aufgaben planen",
    es: "Planificar nuevas tareas",
  },

  // Statistics translations
  "stats.title": {
    nl: "Statistieken",
    en: "Statistics",
    fr: "Statistiques",
    de: "Statistiken",
    es: "Estadísticas",
  },
  "stats.todayFocus": {
    nl: "Vandaag Focus",
    en: "Today's Focus",
    fr: "Concentration d'aujourd'hui",
    de: "Heutiger Fokus",
    es: "Enfoque de hoy",
  },
  "stats.weeklyOverview": {
    nl: "Weekoverzicht",
    en: "Weekly Overview",
    fr: "Aperçu hebdomadaire",
    de: "Wochenübersicht",
    es: "Resumen semanal",
  },
  "stats.productivity": {
    nl: "Productiviteit",
    en: "Productivity",
    fr: "Productivité",
    de: "Produktivität",
    es: "Productividad",
  },

  // Landing Page translations
  "landing.features": {
    nl: "Functies",
    en: "Features",
    fr: "Fonctionnalités",
    de: "Funktionen",
    es: "Características",
  },
  "landing.pricing": {
    nl: "Prijzen",
    en: "Pricing",
    fr: "Tarifs",
    de: "Preise",
    es: "Precios",
  },
  "landing.about": {
    nl: "Over ons",
    en: "About",
    fr: "À propos",
    de: "Über uns",
    es: "Acerca de",
  },
  "landing.contact": {
    nl: "Contact",
    en: "Contact",
    fr: "Contact",
    de: "Kontakt",
    es: "Contacto",
  },
  "landing.signIn": {
    nl: "Inloggen",
    en: "Sign In",
    fr: "Se connecter",
    de: "Anmelden",
    es: "Iniciar sesión",
  },
  "landing.getStartedFree": {
    nl: "Gratis beginnen",
    en: "Get Started Free",
    fr: "Commencer gratuitement",
    de: "Kostenlos starten",
    es: "Comenzar gratis",
  },
  "landing.topApp2024": {
    nl: "#1 Productiviteitsapp van 2024 🏆",
    en: "#1 Productivity App of 2024 🏆",
    fr: "App de productivité #1 de 2024 🏆",
    de: "#1 Produktivitäts-App von 2024 🏆",
    es: "App de productividad #1 de 2024 🏆",
  },
  "landing.heroTitle": {
    nl: "Transformeer Je",
    en: "Transform Your",
    fr: "Transformez Votre",
    de: "Verwandeln Sie Ihre",
    es: "Transforma Tu",
  },
  "landing.heroTitleSpan": {
    nl: "Productiviteit Voor Altijd",
    en: "Productivity Forever",
    fr: "Productivité Pour Toujours",
    de: "Produktivität Für Immer",
    es: "Productividad Para Siempre",
  },
  "landing.heroDescription": {
    nl: "Beheers diepe focus met AI-gestuurde coaching, slimme afleidingsblokkering en naadloze teamcollaboratie. Sluit je aan bij",
    en: "Master deep focus with AI-powered coaching, smart distraction blocking, and seamless team collaboration. Join",
    fr: "Maîtrisez la concentration profonde avec un coaching alimenté par l'IA, un blocage intelligent des distractions et une collaboration d'équipe fluide. Rejoignez",
    de: "Meistern Sie tiefen Fokus mit KI-gestütztem Coaching, intelligenter Ablenkungsblockierung und nahtloser Teamzusammenarbeit. Schließen Sie sich",
    es: "Domina la concentración profunda con coaching impulsado por IA, bloqueo inteligente de distracciones y colaboración en equipo perfecta. Únete a",
  },
  "landing.heroDescriptionEnd": {
    nl: "+ professionals die dagelijks hun productiviteit verhogen.",
    en: "+ professionals boosting their productivity daily.",
    fr: "+ professionnels qui augmentent leur productivité quotidiennement.",
    de: "+ Profis an, die täglich ihre Produktivität steigern.",
    es: "+ profesionales que aumentan su productividad diariamente.",
  },
  "landing.startFreeTrial": {
    nl: "Start Je Gratis Proefperiode",
    en: "Start Your Free Trial",
    fr: "Commencez Votre Essai Gratuit",
    de: "Starten Sie Ihre Kostenlose Testversion",
    es: "Comienza Tu Prueba Gratuita",
  },
  "landing.watchDemo": {
    nl: "Bekijk 2-Min Demo",
    en: "Watch 2-Min Demo",
    fr: "Regarder Démo 2-Min",
    de: "2-Min Demo ansehen",
    es: "Ver Demo de 2-Min",
  },
  "landing.joinUsers": {
    nl: "Sluit je aan bij",
    en: "Join",
    fr: "Rejoignez",
    de: "Schließen Sie sich",
    es: "Únete a",
  },
  "landing.joinUsersEnd": {
    nl: "+ gebruikers",
    en: "+ users",
    fr: "+ utilisateurs",
    de: "+ Benutzern an",
    es: "+ usuarios",
  },
  "landing.rating": {
    nl: "4.9/5 van 2.847+ reviews",
    en: "4.9/5 from 2,847+ reviews",
    fr: "4.9/5 sur 2 847+ avis",
    de: "4.9/5 von 2.847+ Bewertungen",
    es: "4.9/5 de 2,847+ reseñas",
  },
  "landing.featuresTitle": {
    nl: "Alles Wat Je Nodig Hebt Om Gefocust Te Blijven",
    en: "Everything You Need to Stay Focused",
    fr: "Tout Ce Dont Vous Avez Besoin Pour Rester Concentré",
    de: "Alles Was Sie Brauchen, Um Fokussiert Zu Bleiben",
    es: "Todo Lo Que Necesitas Para Mantenerte Enfocado",
  },
  "landing.featuresSubtitle": {
    nl: "Krachtige tools ontworpen om afleidingen te elimineren en je productiviteit te maximaliseren",
    en: "Powerful tools designed to eliminate distractions and maximize your productivity",
    fr: "Des outils puissants conçus pour éliminer les distractions et maximiser votre productivité",
    de: "Leistungsstarke Tools, die entwickelt wurden, um Ablenkungen zu eliminieren und Ihre Produktivität zu maximieren",
    es: "Herramientas poderosas diseñadas para eliminar distracciones y maximizar tu productividad",
  },
  "landing.aiCoach": {
    nl: "AI Productiviteitscoach",
    en: "AI Productivity Coach",
    fr: "Coach de Productivité IA",
    de: "KI-Produktivitätscoach",
    es: "Entrenador de Productividad IA",
  },
  "landing.aiCoachDesc": {
    nl: "Krijg gepersonaliseerde inzichten en aanbevelingen om je focussessies te optimaliseren",
    en: "Get personalized insights and recommendations to optimize your focus sessions",
    fr: "Obtenez des informations personnalisées et des recommandations pour optimiser vos sessions de concentration",
    de: "Erhalten Sie personalisierte Einblicke und Empfehlungen, um Ihre Fokussitzungen zu optimieren",
    es: "Obtén insights personalizados y recomendaciones para optimizar tus sesiones de enfoque",
  },
  "landing.smartBlocking": {
    nl: "Slimme Afleidingsblokkering",
    en: "Smart Distraction Blocking",
    fr: "Blocage Intelligent des Distractions",
    de: "Intelligente Ablenkungsblockierung",
    es: "Bloqueo Inteligente de Distracciones",
  },
  "landing.smartBlockingDesc": {
    nl: "Detecteer en blokkeer automatisch afleidende websites en meldingen",
    en: "Automatically detect and block distracting websites and notifications",
    fr: "Détectez et bloquez automatiquement les sites web et notifications distrayants",
    de: "Erkennen und blockieren Sie automatisch ablenkende Websites und Benachrichtigungen",
    es: "Detecta y bloquea automáticamente sitios web y notificaciones que distraen",
  },
  "landing.teamCollaboration": {
    nl: "Teamcollaboratie",
    en: "Team Collaboration",
    fr: "Collaboration d'Équipe",
    de: "Teamzusammenarbeit",
    es: "Colaboración en Equipo",
  },
  "landing.teamCollaborationDesc": {
    nl: "Synchroniseer focussessies met je team en volg collectieve productiviteit",
    en: "Sync focus sessions with your team and track collective productivity",
    fr: "Synchronisez les sessions de concentration avec votre équipe et suivez la productivité collective",
    de: "Synchronisieren Sie Fokussitzungen mit Ihrem Team und verfolgen Sie die kollektive Produktivität",
    es: "Sincroniza sesiones de enfoque con tu equipo y rastrea la productividad colectiva",
  },
  "landing.advancedAnalytics": {
    nl: "Geavanceerde Analytics",
    en: "Advanced Analytics",
    fr: "Analyses Avancées",
    de: "Erweiterte Analytics",
    es: "Análisis Avanzados",
  },
  "landing.advancedAnalyticsDesc": {
    nl: "Gedetailleerde inzichten in je productiviteitspatronen en verbetergebieden",
    en: "Detailed insights into your productivity patterns and improvement areas",
    fr: "Informations détaillées sur vos modèles de productivité et les domaines d'amélioration",
    de: "Detaillierte Einblicke in Ihre Produktivitätsmuster und Verbesserungsbereiche",
    es: "Insights detallados sobre tus patrones de productividad y áreas de mejora",
  },
  "landing.pomodoroTimer": {
    nl: "Pomodoro Timer",
    en: "Pomodoro Timer",
    fr: "Minuteur Pomodoro",
    de: "Pomodoro-Timer",
    es: "Temporizador Pomodoro",
  },
  "landing.pomodoroTimerDesc": {
    nl: "Aanpasbare focussessies met automatische pauzeherinneringen",
    en: "Customizable focus sessions with automatic break reminders",
    fr: "Sessions de concentration personnalisables avec des rappels de pause automatiques",
    de: "Anpassbare Fokussitzungen mit automatischen Pausenerinnerungen",
    es: "Sesiones de enfoque personalizables con recordatorios automáticos de descanso",
  },
  "landing.goalTracking": {
    nl: "Doelvolging",
    en: "Goal Tracking",
    fr: "Suivi des Objectifs",
    de: "Zielverfolgung",
    es: "Seguimiento de Objetivos",
  },
  "landing.goalTrackingDesc": {
    nl: "Stel dagelijkse, wekelijkse en maandelijkse productiviteitsdoelen in en volg ze",
    en: "Set and track daily, weekly, and monthly productivity goals",
    fr: "Définissez et suivez des objectifs de productivité quotidiens, hebdomadaires et mensuels",
    de: "Setzen und verfolgen Sie tägliche, wöchentliche und monatliche Produktivitätsziele",
    es: "Establece y rastrea objetivos de productividad diarios, semanales y mensuales",
  },
  "landing.testimonialsTitle": {
    nl: "Geliefd Door Professionals Wereldwijd",
    en: "Loved by Professionals Worldwide",
    fr: "Aimé par les Professionnels du Monde Entier",
    de: "Geliebt von Profis Weltweit",
    es: "Amado por Profesionales en Todo el Mundo",
  },
  "landing.testimonialsSubtitle": {
    nl: "Zie hoe FocusFlow de productiviteit transformeert voor teams overal",
    en: "See how FocusFlow is transforming productivity for teams everywhere",
    fr: "Voyez comment FocusFlow transforme la productivité des équipes partout",
    de: "Sehen Sie, wie FocusFlow die Produktivität für Teams überall transformiert",
    es: "Ve cómo FocusFlow está transformando la productividad para equipos en todas partes",
  },
  "landing.pricingTitle": {
    nl: "Eenvoudige, Transparante Prijzen",
    en: "Simple, Transparent Pricing",
    fr: "Tarification Simple et Transparente",
    de: "Einfache, Transparente Preise",
    es: "Precios Simples y Transparentes",
  },
  "landing.pricingSubtitle": {
    nl: "Kies het plan dat past bij je productiviteitsbehoeften",
    en: "Choose the plan that fits your productivity needs",
    fr: "Choisissez le plan qui correspond à vos besoins de productivité",
    de: "Wählen Sie den Plan, der zu Ihren Produktivitätsbedürfnissen passt",
    es: "Elige el plan que se adapte a tus necesidades de productividad",
  },
  "landing.free": {
    nl: "Gratis",
    en: "Free",
    fr: "Gratuit",
    de: "Kostenlos",
    es: "Gratis",
  },
  "landing.freeForever": {
    nl: "voor altijd",
    en: "forever",
    fr: "pour toujours",
    de: "für immer",
    es: "para siempre",
  },
  "landing.freeDesc": {
    nl: "Perfect om mee te beginnen",
    en: "Perfect for getting started",
    fr: "Parfait pour commencer",
    de: "Perfekt für den Einstieg",
    es: "Perfecto para empezar",
  },
  "landing.pro": {
    nl: "Pro",
    en: "Pro",
    fr: "Pro",
    de: "Pro",
    es: "Pro",
  },
  "landing.proPrice": {
    nl: "per maand",
    en: "per month",
    fr: "par mois",
    de: "pro Monat",
    es: "por mes",
  },
  "landing.proDesc": {
    nl: "Voor serieuze professionals",
    en: "For serious professionals",
    fr: "Pour les professionnels sérieux",
    de: "Für ernsthafte Profis",
    es: "Para profesionales serios",
  },
  "landing.team": {
    nl: "Team",
    en: "Team",
    fr: "Équipe",
    de: "Team",
    es: "Equipo",
  },
  "landing.teamDesc": {
    nl: "Voor hoogpresterende teams",
    en: "For high-performing teams",
    fr: "Pour les équipes performantes",
    de: "Für leistungsstarke Teams",
    es: "Para equipos de alto rendimiento",
  },
  "landing.mostPopular": {
    nl: "Meest Populair",
    en: "Most Popular",
    fr: "Le Plus Populaire",
    de: "Am Beliebtesten",
    es: "Más Popular",
  },
  "landing.premium": {
    nl: "Premium",
    en: "Premium",
    fr: "Premium",
    de: "Premium",
    es: "Premium",
  },
  "landing.popular": {
    nl: "Populair",
    en: "Popular",
    fr: "Populaire",
    de: "Beliebt",
    es: "Popular",
  },
  "landing.new": {
    nl: "Nieuw",
    en: "New",
    fr: "Nouveau",
    de: "Neu",
    es: "Nuevo",
  },
  "landing.contactSales": {
    nl: "Contact Verkoop",
    en: "Contact Sales",
    fr: "Contacter les Ventes",
    de: "Verkauf Kontaktieren",
    es: "Contactar Ventas",
  },
  "landing.ctaTitle": {
    nl: "Klaar Om Je Productiviteit Te Transformeren?",
    en: "Ready to Transform Your Productivity?",
    fr: "Prêt à Transformer Votre Productivité?",
    de: "Bereit, Ihre Produktivität Zu Transformieren?",
    es: "¿Listo Para Transformar Tu Productividad?",
  },
  "landing.ctaSubtitle": {
    nl: "Sluit je aan bij duizenden professionals die de kracht van gefocust werk al hebben ontdekt",
    en: "Join thousands of professionals who have already discovered the power of focused work",
    fr: "Rejoignez des milliers de professionnels qui ont déjà découvert le pouvoir du travail concentré",
    de: "Schließen Sie sich Tausenden von Profis an, die bereits die Kraft konzentrierter Arbeit entdeckt haben",
    es: "Únete a miles de profesionales que ya han descubierto el poder del trabajo enfocado",
  },
  "landing.footerDescription": {
    nl: "Transformeer je productiviteit met AI-gestuurde focussessies, slimme afleidingsblokkering en naadloze teamcollaboratie.",
    en: "Transform your productivity with AI-powered focus sessions, smart distraction blocking, and seamless team collaboration.",
    fr: "Transformez votre productivité avec des sessions de concentration alimentées par l'IA, un blocage intelligent des distractions et une collaboration d'équipe fluide.",
    de: "Verwandeln Sie Ihre Produktivität mit KI-gestützten Fokussitzungen, intelligenter Ablenkungsblockierung und nahtloser Teamzusammenarbeit.",
    es: "Transforma tu productividad con sesiones de enfoque impulsadas por IA, bloqueo inteligente de distracciones y colaboración en equipo perfecta.",
  },
  "landing.securePrivate": {
    nl: "100% Veilig & Privé •",
    en: "100% Secure & Private •",
    fr: "100% Sécurisé et Privé •",
    de: "100% Sicher & Privat •",
    es: "100% Seguro y Privado •",
  },
  "landing.sessionsCompleted": {
    nl: "+ Sessies Voltooid",
    en: "+ Sessions Completed",
    fr: "+ Sessions Terminées",
    de: "+ Sitzungen Abgeschlossen",
    es: "+ Sesiones Completadas",
  },
  "landing.product": {
    nl: "Product",
    en: "Product",
    fr: "Produit",
    de: "Produkt",
    es: "Producto",
  },
  "landing.demo": {
    nl: "Demo",
    en: "Demo",
    fr: "Démo",
    de: "Demo",
    es: "Demo",
  },
  "landing.roadmap": {
    nl: "Roadmap",
    en: "Roadmap",
    fr: "Feuille de Route",
    de: "Roadmap",
    es: "Hoja de Ruta",
  },
  "landing.company": {
    nl: "Bedrijf",
    en: "Company",
    fr: "Entreprise",
    de: "Unternehmen",
    es: "Empresa",
  },
  "landing.help": {
    nl: "Hulp",
    en: "Help",
    fr: "Aide",
    de: "Hilfe",
    es: "Ayuda",
  },
  "landing.community": {
    nl: "Community",
    en: "Community",
    fr: "Communauté",
    de: "Community",
    es: "Comunidad",
  },
  "landing.termsOfConditions": {
    nl: "Algemene Voorwaarden",
    en: "Terms of Conditions",
    fr: "Conditions Générales",
    de: "Allgemeine Geschäftsbedingungen",
    es: "Términos y Condiciones",
  },
  "landing.copyright": {
    nl: "© 2025 FocusFlow. Alle rechten voorbehouden.",
    en: "© 2025 FocusFlow. All rights reserved.",
    fr: "© 2025 FocusFlow. Tous droits réservés.",
    de: "© 2025 FocusFlow. Alle Rechte vorbehalten.",
    es: "© 2025 FocusFlow. Todos los derechos reservados.",
  },

  // Auth Page translations
  "auth.backToHome": {
    nl: "Terug naar home",
    en: "Back to home",
    fr: "Retour à l'accueil",
    de: "Zurück zur Startseite",
    es: "Volver al inicio",
  },
  "auth.welcomeBack": {
    nl: "Welkom terug",
    en: "Welcome back",
    fr: "Bon retour",
    de: "Willkommen zurück",
    es: "Bienvenido de vuelta",
  },
  "auth.createAccount": {
    nl: "Account aanmaken",
    en: "Create account",
    fr: "Créer un compte",
    de: "Konto erstellen",
    es: "Crear cuenta",
  },
  "auth.loginToAccount": {
    nl: "Log in op je FocusFlow account",
    en: "Log in to your FocusFlow account",
    fr: "Connectez-vous à votre compte FocusFlow",
    de: "Melden Sie sich bei Ihrem FocusFlow-Konto an",
    es: "Inicia sesión en tu cuenta de FocusFlow",
  },
  "auth.createFreeAccount": {
    nl: "Maak je gratis FocusFlow account aan",
    en: "Create your free FocusFlow account",
    fr: "Créez votre compte FocusFlow gratuit",
    de: "Erstellen Sie Ihr kostenloses FocusFlow-Konto",
    es: "Crea tu cuenta gratuita de FocusFlow",
  },
  "auth.fullName": {
    nl: "Volledige naam",
    en: "Full name",
    fr: "Nom complet",
    de: "Vollständiger Name",
    es: "Nombre completo",
  },
  "auth.fullNamePlaceholder": {
    nl: "Je volledige naam",
    en: "Your full name",
    fr: "Votre nom complet",
    de: "Ihr vollständiger Name",
    es: "Tu nombre completo",
  },
  "auth.emailAddress": {
    nl: "E-mailadres",
    en: "Email address",
    fr: "Adresse e-mail",
    de: "E-Mail-Adresse",
    es: "Dirección de correo electrónico",
  },
  "auth.emailPlaceholder": {
    nl: "je@email.com",
    en: "you@email.com",
    fr: "vous@email.com",
    de: "sie@email.com",
    es: "tu@email.com",
  },
  "auth.password": {
    nl: "Wachtwoord",
    en: "Password",
    fr: "Mot de passe",
    de: "Passwort",
    es: "Contraseña",
  },
  "auth.passwordPlaceholder": {
    nl: "Je wachtwoord",
    en: "Your password",
    fr: "Votre mot de passe",
    de: "Ihr Passwort",
    es: "Tu contraseña",
  },
  "auth.confirmPassword": {
    nl: "Bevestig wachtwoord",
    en: "Confirm password",
    fr: "Confirmer le mot de passe",
    de: "Passwort bestätigen",
    es: "Confirmar contraseña",
  },
  "auth.confirmPasswordPlaceholder": {
    nl: "Bevestig je wachtwoord",
    en: "Confirm your password",
    fr: "Confirmez votre mot de passe",
    de: "Bestätigen Sie Ihr Passwort",
    es: "Confirma tu contraseña",
  },
  "auth.login": {
    nl: "Inloggen",
    en: "Log in",
    fr: "Se connecter",
    de: "Anmelden",
    es: "Iniciar sesión",
  },
  "auth.loggingIn": {
    nl: "Inloggen...",
    en: "Logging in...",
    fr: "Connexion...",
    de: "Anmelden...",
    es: "Iniciando sesión...",
  },
  "auth.creatingAccount": {
    nl: "Account aanmaken...",
    en: "Creating account...",
    fr: "Création du compte...",
    de: "Konto erstellen...",
    es: "Creando cuenta...",
  },
  "auth.or": {
    nl: "Of",
    en: "Or",
    fr: "Ou",
    de: "Oder",
    es: "O",
  },
  "auth.loginWithMicrosoft": {
    nl: "Inloggen met Microsoft",
    en: "Log in with Microsoft",
    fr: "Se connecter avec Microsoft",
    de: "Mit Microsoft anmelden",
    es: "Iniciar sesión con Microsoft",
  },
  "auth.loginWithGitHub": {
    nl: "Inloggen met GitHub",
    en: "Log in with GitHub",
    fr: "Se connecter avec GitHub",
    de: "Mit GitHub anmelden",
    es: "Iniciar sesión con GitHub",
  },
  "auth.noAccount": {
    nl: "Nog geen account? Registreren",
    en: "Don't have an account? Sign up",
    fr: "Pas de compte ? S'inscrire",
    de: "Noch kein Konto? Registrieren",
    es: "¿No tienes cuenta? Regístrate",
  },
  "auth.hasAccount": {
    nl: "Al een account? Inloggen",
    en: "Already have an account? Log in",
    fr: "Déjà un compte ? Se connecter",
    de: "Bereits ein Konto? Anmelden",
    es: "¿Ya tienes cuenta? Iniciar sesión",
  },
  "auth.loading": {
    nl: "Laden...",
    en: "Loading...",
    fr: "Chargement...",
    de: "Laden...",
    es: "Cargando...",
  },
  "auth.passwordMismatch": {
    nl: "Wachtwoorden komen niet overeen",
    en: "Passwords do not match",
    fr: "Les mots de passe ne correspondent pas",
    de: "Passwörter stimmen nicht überein",
    es: "Las contraseñas no coinciden",
  },
  "auth.passwordTooShort": {
    nl: "Wachtwoord moet minimaal 6 karakters lang zijn",
    en: "Password must be at least 6 characters long",
    fr: "Le mot de passe doit contenir au moins 6 caractères",
    de: "Passwort muss mindestens 6 Zeichen lang sein",
    es: "La contraseña debe tener al menos 6 caracteres",
  },
  "auth.somethingWentWrong": {
    nl: "Er is iets misgegaan",
    en: "Something went wrong",
    fr: "Quelque chose s'est mal passé",
    de: "Etwas ist schief gelaufen",
    es: "Algo salió mal",
  },
};

class I18nService {
  private currentLanguage: Language = "nl";

  constructor() {
    // Load saved language or detect from browser
    const saved = localStorage.getItem("focusflow_language") as Language;
    if (saved && this.isValidLanguage(saved)) {
      this.currentLanguage = saved;
    } else {
      this.currentLanguage = this.detectBrowserLanguage();
    }
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  setLanguage(lang: Language): void {
    if (this.isValidLanguage(lang)) {
      this.currentLanguage = lang;
      localStorage.setItem("focusflow_language", lang);

      // Update document language
      document.documentElement.lang = lang;

      // Trigger event for components to re-render
      window.dispatchEvent(
        new CustomEvent("languageChanged", { detail: lang }),
      );
    }
  }

  translate(key: string, fallback?: string): string {
    const translation = translations[key];

    if (translation && translation[this.currentLanguage]) {
      return translation[this.currentLanguage];
    }

    // Fallback to English if available
    if (translation && translation.en) {
      return translation.en;
    }

    // Return fallback or key if no translation found
    return fallback || key;
  }

  // Alias for shorter usage
  t(key: string, fallback?: string): string {
    return this.translate(key, fallback);
  }

  getAvailableLanguages(): Array<{ code: Language; name: string }> {
    return [
      { code: "nl", name: this.t("lang.nl") },
      { code: "en", name: this.t("lang.en") },
      { code: "fr", name: this.t("lang.fr") },
      { code: "de", name: this.t("lang.de") },
      { code: "es", name: this.t("lang.es") },
    ];
  }

  private isValidLanguage(lang: string): lang is Language {
    return ["nl", "en", "fr", "de", "es"].includes(lang);
  }

  private detectBrowserLanguage(): Language {
    const browserLang = navigator.language.split("-")[0];
    return this.isValidLanguage(browserLang) ? browserLang : "nl";
  }
}

export const i18n = new I18nService();

// React hook for easy usage in components
export const useTranslation = () => {
  const [language, setLanguageState] = React.useState(
    i18n.getCurrentLanguage(),
  );

  React.useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguageState(event.detail);
    };

    window.addEventListener(
      "languageChanged",
      handleLanguageChange as EventListener,
    );

    return () => {
      window.removeEventListener(
        "languageChanged",
        handleLanguageChange as EventListener,
      );
    };
  }, []);

  const setLanguage = (lang: Language) => {
    i18n.setLanguage(lang);
  };

  return {
    language,
    setLanguage,
    t: i18n.t.bind(i18n),
    translate: i18n.translate.bind(i18n),
  };
};

// Add React import for the hook
import React from "react";
