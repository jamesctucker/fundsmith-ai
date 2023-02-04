import Wrapper from "@/components/Wrapper";
import AccountNavigation from "@/components/AccountNavigation";
import MobileAccountNavigation from "@/components/MobileAccountNavigation";

type Props = {
  children: React.ReactNode;
  title: string;
};

export default function AccountLayout({ children, title }: Props) {
  return (
    <Wrapper title={title}>
      <div className="flex flex-col sm:flex-row min-h-screen -mt-4 sm:-mt-6 lg:-mt-8">
        <aside className="w-1/3 sm:1/4 border-r border-base-200 py-4 sm:py-6 lg:py-8 hidden sm:block">
          <AccountNavigation />
        </aside>
        <div className="block sm:hidden w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
          <MobileAccountNavigation />
        </div>
        <section className="w-full sm:w-3/4 p-4 sm:p-6 lg:p-8">
          {children}
        </section>
      </div>
    </Wrapper>
  );
}
