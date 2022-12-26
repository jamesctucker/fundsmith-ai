import dynamic from "next/dynamic";
const Header = dynamic(() => import("./Header"), { ssr: false });

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen">
      <Header />
      <main>{children}</main>
    </div>
  );
}
