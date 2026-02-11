"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { az, en } from "@/lib/translations";

type Language = "az" | "en";
type Translations = typeof az;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language") as Language;
      return saved || "az";
    }
    return "az";
  });

  const t = language === "az" ? az : en;

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    // Səhifəni yeniləmək üçün event göndəririk
    window.dispatchEvent(new CustomEvent("languageChanged"));
  };

  useEffect(() => {
    // LocalStorage-dakini oxuyub
    const saved = localStorage.getItem("language") as Language;
    if (saved && saved !== language) {
      setLanguage(saved);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
