import React from "react";

export function PanelList({ children }: { children: React.ReactNode }) {
  return <ul className="m-0 w-full list-none space-y-8 p-0">{children}</ul>;
}
