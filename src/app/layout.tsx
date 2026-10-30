import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Sea View Skydiving | Greedy Adventures", description: "Explore a tandem jump over the Gulf of Thailand. Packages, experience details and a prototype adventure assistant." };
export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
