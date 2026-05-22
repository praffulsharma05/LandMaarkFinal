import { HomepageData } from "../../services/HomeService";

export const LOTTIE_SRC = "https://assets-v2.lottiefiles.com/a/358e0c5e-1176-11ee-8663-8f76e1809294/JmwXG8XzU7.lottie";

export const EMPTY_DATA: HomepageData = {
  showEnquiryForm: true,
  hero: { title: "", slides: [] },
  section3: { title: "", items: [] },
  section: { title: "", subtitle: "", items: [] },
  section5: { title: "", subtitle: "", footerText: "", items: [] },
  section6: { title: "", subtitle: "", items: [] },
  section7: { title: "", subtitle: "", items: [] },
  section8: { title: "", subtitle: "", videoUrl: "", items: [] },
  section9: { title: "", items: [] },
  footer: {
    logoText: "",
    locations: [],
    socialLinks: [],
    websiteUrl: "",
    websiteHref: "",
    copyrightPattern: "",
  },
};

export function extractImageUrls(data: HomepageData): string[] {
  return [
    ...data.hero.slides.map((s) => s.image),
    ...data.section3.items.map((i) => i.image),
    ...data.section5.items.map((i) => i.image),
    ...data.section6.items.map((i) => i.image),
    ...data.section7.items.map((i) => i.image),
    ...data.section9.items.map((i) => i.image),
  ].filter(Boolean);
}
