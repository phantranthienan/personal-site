import React from "react";

import { House } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import type { LucideIcon } from "lucide-react";

export interface BreadcrumbItem {
  href: string;
  label: string;
  icon: LucideIcon;
}
const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <House className="size-4 shrink-0" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        {items.map((item, index) => (
          <React.Fragment key={item.href}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {index === items.length - 1 ? (
                <BreadcrumbPage>
                  <span className="flex items-center gap-x-2">
                    {item.icon && <item.icon className="size-4 shrink-0" />}
                    <span>{item.label}</span>
                  </span>
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>
                  <span className="flex items-center gap-x-2">
                    {item.icon && <item.icon className="size-4 shrink-0" />}
                    <span>{item.label}</span>
                  </span>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
