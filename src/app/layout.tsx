import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {SidebarProvider} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/common/app-sidebar.component";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Barracão saas",
    description: "Generated by create next app",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    const isLoged: boolean = true;

    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <SidebarProvider>
            {isLoged && <AppSidebar/>}
            <main className="flex w-full h-screen">
                {/*<SidebarProvider/>*/}
                <div className="flex-grow h-screen p-3">{children}</div>
            </main>

        </SidebarProvider>
        </body>
        </html>
    );
}
