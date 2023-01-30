import Link from "next/link";

const navigation = [
  { name: "Account settings", href: "/account", current: true },
  { name: "Billing", href: "/account/billing", current: false },
  { name: "Members", href: "/account/members", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AccountNavigation() {
  return (
    <nav className="space-y-1 " aria-label="Sidebar">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={classNames(
            item.current
              ? "bg-base-200 text- "
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
