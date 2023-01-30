import Wrapper from "@/components/Wrapper";
import AccountNavigation from "@/components/AccountNavigation";

type Props = {
  children: React.ReactNode;
  title: string;
};

export default function AccountLayout({ children, title }: Props) {
  return (
    <Wrapper title={title}>
      <div className="flex min-h-screen -mt-4 sm:-mt-6 lg:-mt-8">
        <aside className="w-1/4 border-r border-base-200 py-4 sm:py-6 lg:py-8">
          <AccountNavigation />
        </aside>
        <section className="w-3/4 p-4 sm:p-6 lg:p-8">{children}</section>
      </div>
    </Wrapper>
  );
}
