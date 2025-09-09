import React from "react";

import { Briefcase } from "lucide-react";

import Breadcrumbs from "@/components/shared/Breadcrumbs";

const WorkPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-6 px-4">
      <nav>
        <Breadcrumbs
          items={[{ href: "/work", label: "Work", icon: Briefcase }]}
        />
      </nav>

      <div className="space-y-8">
        <h1 className="text-3xl font-medium sm:text-4xl">Work</h1>
      </div>
    </div>
  );
};

export default WorkPage;
