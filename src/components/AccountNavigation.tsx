import Link from "next/link";
import { useRouter } from "next/router";

export default function AccountNavigation() {
  const router = useRouter();

  const isCurrentPath = (name: string) => {
    return router.pathname === name;
  };

  const navigation = [
    {
      name: "Account settings",
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
    <nav className="space-y-1 " aria-label="Sidebar">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={classNames(
            item.current
              ? "bg-base-200"
              : "text-neutral hover:bg-base-200 hover:text-neutral",
            "flex items-center px-3 py-2 font-medium rounded-none"
          )}
          aria-current={item.current ? "page" : undefined}
        >
          <span className="truncate">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}
