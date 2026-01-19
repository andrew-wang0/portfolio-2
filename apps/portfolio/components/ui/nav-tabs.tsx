"use client";

import { LayoutGroup, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { HTMLAttributes, ReactNode } from "react";
import React from "react";

import { cn } from "@/lib/util/cn";

export type NavTab = {
  display: ReactNode;
  path: string;
};

type Props = HTMLAttributes<HTMLElement> & {
  tabs: NavTab[];
};

export function NavTabs({ tabs, ...props }: Props) {
  const pathname = usePathname();

  return (
    <nav className="border-muted border-b" {...props}>
      <LayoutGroup>
        <ul className="flex space-x-4">
          {tabs.map(({ display, path }) => {
            const isActive = pathname === path;

            return (
              <li
                key={path}
                className="group relative flex items-center"
                aria-current={isActive ? "page" : undefined}
              >
                <Link
                  href={path}
                  className={cn(
                    "p-2 text-lg -outline-offset-2 transition-colors",
                    "text-muted group-hover:text-foreground",
                    "group-aria-[current=page]:text-foreground",
                  )}
                >
                  {display}
                </Link>

                {isActive && (
                  <motion.div
                    layoutId="tab-underline"
                    className="bg-foreground absolute right-0 -bottom-px left-0 h-[3px] rounded-t-full"
                    transition={{ type: "spring", duration: 0.25, bounce: 0.1 }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </LayoutGroup>
    </nav>
  );
}
