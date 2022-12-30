import dynamic from "next/dynamic";
const HeaderV2 = dynamic(() => import("./HeaderV2"), { ssr: false });
const Footer = dynamic(() => import("./Footer"), { ssr: false });

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen relative">
      <HeaderV2 />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </div>
  );
}
