/* eslint-disable @typescript-eslint/no-explicit-any */
import { House } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbItem {
  href: string;
  label: string;
  icon: string;
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
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {index === items.length - 1 ? (
                <BreadcrumbPage>
                  <span className="flex items-center gap-x-2">
                    {item.icon && (
                      <DynamicIcon
                        name={item.icon as any}
                        className="size-4 shrink-0"
                      />
                    )}
                    <span>{item.label}</span>
                  </span>
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>
                  <span className="flex items-center gap-x-2">
                    {item.icon && (
                      <DynamicIcon
                        name={item.icon as any}
                        className="size-4 shrink-0"
                      />
                    )}
                    <span>{item.label}</span>
                  </span>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
