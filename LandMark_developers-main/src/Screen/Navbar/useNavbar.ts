import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "../../hooks/useTranslation";

export const useNavbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const pageTitle = useCallback(() => {
    const p = location.pathname.toLowerCase();
    if (p === "/township") return t("navbar.ourTownships");
    if (p === "/about") return t("navbar.aboutUsLabel");
    if (p === "/contactus") return t("navbar.contactUsLabel");
    if (p.startsWith("/property/")) return t("navbar.townshipDetail");
    return t("navbar.brandFallback");
  }, [location.pathname, t]);

  const handleMobileToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleCloseMobile = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleGoBack = useCallback(() => {
    window.history.back();
  }, []);

  return {
    isOpen,
    scrolled,
    location,
    pageTitle,
    handleMobileToggle,
    handleCloseMobile,
    handleGoBack,
  };
};
