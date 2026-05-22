import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Globe,
  LucideIcon
} from "lucide-react";
import { FooterDetails } from "../../services/HomeService";

export const initialFooterDetails: FooterDetails = {
  logoText: "",
  locations: [],
  socialLinks: [],
  websiteUrl: "",
  websiteHref: "",
  copyrightPattern: ""
};

export const getSocialIcon = (platform: string): LucideIcon => {
  switch (platform.toLowerCase()) {
    case "facebook":
      return Facebook;
    case "twitter":
      return Twitter;
    case "instagram":
      return Instagram;
    case "youtube":
      return Youtube;
    case "linkedin":
      return Linkedin;
    default:
      return Globe;
  }
};
