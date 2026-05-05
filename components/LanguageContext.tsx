
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fi' | 'en';

interface Translation {
  [key: string]: string;
}

interface Translations {
  fi: Translation;
  en: Translation;
}

const translations: Translations = {
  fi: {
    for_sole_traders: "Toiminimiyrittäjille",
    automate_tax_returns: "Automatisoi veroilmoitukset helposti",
    from_traders: "1000+ toiminimiyrittäjältä",
    feature_invoicing: "Laskutus, kuittiskannaus",
    feature_assets: "Käyttöomaisuus, GPS-seuranta",
    feature_chat: "Asiantuntijan chat-tuki",
    feature_peace: "Mielenrauha, varmuus",
    trial_text: "14 päivän kokeilujakso - peruuta milloin tahansa - Ei luottokorttia",
    create_account: "Luo tili",
    log_in: "Kirjaudu sisään",
    welcome_back: "Tervetuloa takaisin.",
    new_to_kletta: "Uusi Klettalla?",
    sign_up: "Rekisteröidy",
    your_email: "Sähköpostiosoitteesi",
    remember_me: "Muista minut",
    forgot_password: "Unohditko salasanan?",
    email_placeholder: "nimi@yritys.fi",
    email_error: "Anna voimassa oleva sähköpostiosoite",
    welcome_to_kletta: "Tervetuloa Klettaan!",
    start_by_email: "Aloitetaan antamalla sähköpostiosoitteesi.",
    email_label: "Sähköpostiosoite",
    send_code_msg: "Lähetämme 6-numeroisen koodin tähän sähköpostiin",
    continue_btn: "Jatka"
  },
  en: {
    for_sole_traders: "For sole traders",
    automate_tax_returns: "Automate tax returns easily",
    from_traders: "from 1000+ sole traders",
    feature_invoicing: "Invoicing, receipt scanning",
    feature_assets: "Fixed assets, GPS tracking",
    feature_chat: "Expert chat support",
    feature_peace: "Reduce anxiety, Reassurance",
    trial_text: "14-day trial period - cancel anytime - No credit card",
    create_account: "Create account",
    log_in: "Log in",
    welcome_back: "Welcome back.",
    new_to_kletta: "New to Kletta?",
    sign_up: "Sign up",
    your_email: "Your email address",
    remember_me: "Remember me",
    forgot_password: "Forgot password?",
    email_placeholder: "name@company.com",
    email_error: "Please enter a valid email",
    welcome_to_kletta: "Welcome to Kletta!",
    start_by_email: "Let's start by entering your e-mail address.",
    email_label: "Email Address",
    send_code_msg: "We will send a 6-digit code to this email",
    continue_btn: "Continue"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fi');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
