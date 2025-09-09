import React from "react";

import { User } from "lucide-react";

import Breadcrumbs from "@/components/shared/Breadcrumbs";

const AboutPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-6 px-4">
      <nav>
        <Breadcrumbs items={[{ href: "/about", label: "About", icon: User }]} />
      </nav>

      <div className="space-y-8">
        <h1 className="text-3xl font-medium sm:text-4xl">About</h1>
      </div>
    </div>
  );
};

export default AboutPage;
