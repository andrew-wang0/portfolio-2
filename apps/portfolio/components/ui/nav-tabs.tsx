"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { HTMLAttributes, ReactNode } from "react";
import React, { useLayoutEffect, useMemo, useRef, useState } from "react";

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

  const listRef = useRef<HTMLUListElement | null>(null);
  const tabRefs = useRef(new Map<string, HTMLLIElement>());

  const [underline, setUnderline] = useState<{ x: number; width: number }>({
    x: 0,
    width: 0,
  });

  const activePath = useMemo(() => {
    const active = tabs.find((t) => t.path === pathname);
    return active?.path ?? tabs[0]?.path;
  }, [pathname, tabs]);

  useLayoutEffect(() => {
    const listEl = listRef.current;
    const activeEl = tabRefs.current.get(activePath);

    if (!listEl || !activeEl) return;

    const listRect = listEl.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    setUnderline({
      x: activeRect.left - listRect.left,
      width: activeRect.width,
    });
  }, [activePath, tabs]);

  return (
    <nav className="border-muted border-b" {...props}>
      <ul ref={listRef} className="relative flex space-x-4">
        {tabs.map(({ display, path }) => {
          const isActive = pathname === path;

          return (
            <li
              key={path}
              ref={(el) => {
                if (!el) tabRefs.current.delete(path);
                else tabRefs.current.set(path, el);
              }}
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
            </li>
          );
        })}

        <motion.div
          className="bg-foreground absolute -bottom-px left-0 h-[3px] rounded-t-full"
          animate={{ x: underline.x, width: underline.width }}
          transition={{ type: "spring", duration: 0.25, bounce: 0.1 }}
        />
      </ul>
    </nav>
  );
}
