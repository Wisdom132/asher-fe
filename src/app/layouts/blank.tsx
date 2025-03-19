import { ReactNode } from "react";

interface BlankLayoutProps {
  children: ReactNode;
}

export default function BlankLayout({ children }: BlankLayoutProps) {
  return (
    <div className="h-screen flex flex-col">
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
