import dynamic from "next/dynamic";
const Header = dynamic(() => import("./Header"), { ssr: false });
const Footer = dynamic(() => import("./Footer"), { ssr: false });

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen relative">
      <Header />
      <main className="p-4">{children}</main>
      <Footer />
    </div>
  );
}
