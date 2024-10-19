import { Inter } from "next/font/google";
import "./global-only.css";
import Header from "./components/header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
