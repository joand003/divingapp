import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/lib/providers";
import HeaderComponent from "@/Components/HeaderComponent";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dive App",
  description: "Track Diving Scores",
};


export default function RootLayout({ children }) {

  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <HeaderComponent />
          {children}
        </body>
      </html>
    </Providers>
  );
}
