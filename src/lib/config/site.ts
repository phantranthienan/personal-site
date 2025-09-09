import { House, LibraryBig, Briefcase, User } from "lucide-react";
export const NAV_LINKS = [
  {
    icon: House,
    label: "Home",
    href: "/",
  },
  {
    icon: LibraryBig,
    label: "Blog",
    href: "/blog",
  },
  {
    icon: Briefcase,
    label: "Work",
    href: "/work",
  },
  {
    icon: User,
    label: "About",
    href: "/about",
  },
] as const;

export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/phantranthienan",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tran-thien-an-phan/",
  },
] as const;
