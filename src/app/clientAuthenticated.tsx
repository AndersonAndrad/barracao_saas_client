"use client";

import { AppSidebar } from "@/components/common/app-sidebar.component";
import { LoginPage } from "@/app/login/login.page";
import { SidebarProvider } from "@/components/ui/sidebar";
import { State } from "@/core/interfaces/state.interface";
import { useSelector } from "react-redux";

export default function ClientAuth({ children }: { children: React.ReactNode }) {
  const isLoged: boolean = useSelector((state: State) => state?.userState?.loged ?? false);

  if (!isLoged) {
    return <LoginPage />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex w-full h-screen">
        <div className="flex-grow h-screen p-3">{children}</div>
      </main>
    </SidebarProvider>
  );
}
