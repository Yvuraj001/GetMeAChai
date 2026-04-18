import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navabar from "./components/Navabar";
import Footer from "./components/footer";
import SessionWrapper from "./components/SessionWrappter";

 

export const metadata = {
  title: "Get me A Chai - Fund your projects with chai",
  description: "This website is a crowdfunding platform for creators."


};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=" bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),#0e07269e)] text-white font-[poppins]">
        <SessionWrapper>

        <Navabar />
        <div className="min-h-screen  bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),#0e07269e)] text-white ">

          {children}
        </div>
        <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}


