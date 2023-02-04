import Link from "next/link";
import { useRouter } from "next/router";

const MobileAccountNavigation = () => {
  const router = useRouter();

  const isCurrentPath = (name: string) => {
    return router.pathname === name;
  };

  const navigation = [
    {
      name: "Settings",
      href: "/account",
      current: isCurrentPath("/account"),
    },
    {
      name: "Billing",
      href: "/account/billing",
      current: isCurrentPath("/account/billing"),
    },
    {
      name: "Members",
      href: "/account/members",
      current: isCurrentPath("/account/members"),
    },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <nav className="flex flex-row space-x-4">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={classNames(
            item.current
              ? "border-b-2 border-primary"
              : "text-neutral hover:text-secondary",
            "flex items-center py-1 font-medium rounded-none"
          )}
          aria-current={item.current ? "page" : undefined}
        >
          <span className="truncate">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default MobileAccountNavigation;
