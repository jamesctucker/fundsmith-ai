import dynamic from "next/dynamic";
const HeaderV2 = dynamic(() => import("./HeaderV2"), { ssr: false });
const Footer = dynamic(() => import("./Footer"), { ssr: false });
import { Literata } from "@next/font/google";

type Props = {
  children: React.ReactNode;
};

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
});

export default function Layout({ children }: Props) {
  return (
    <div className={`min-h-screen relative ${literata.variable}`}>
      <HeaderV2 />
      <main className="font-serif text-neutral container mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* <Footer /> */}
    </div>
  );
}
