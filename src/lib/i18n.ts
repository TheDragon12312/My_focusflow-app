
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
