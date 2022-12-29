import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth, useUser } from "@clerk/nextjs";
import {
  UserCircleIcon,
  Cog8ToothIcon,
  CreditCardIcon,
  ArrowLeftOnRectangleIcon,
  DocumentTextIcon,
  HomeModernIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import path from "path";

export default function Header() {
  const { signOut } = useAuth();
  const { user } = useUser();

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();

    // if (error) return toast.error(t('signOutError'));

    router.push("/auth/signin");
  };

  const isCurrentPath = (name: string) => {
    return router.pathname === name;
  };

  return (
    <header className="navbar mx-auto flex justify-between py-2 px-8 md:py-4 md:px-16 border-2 border-b-accent">
      <div className="flex-none">
        <Link
          className="btn-ghost btn text-xl normal-case text-primary"
          href="/"
        >
          fundsmith
        </Link>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li className="mx-1">
            <Link
              href="/"
              className={
                isCurrentPath("/") ? "text-primary font-bold bg-success" : ""
              }
            >
              <HomeModernIcon className="w-5 h-5" />
              Dashboard
            </Link>
          </li>
          <li className="mx-1">
            <Link
              href="/documents"
              className={
                isCurrentPath("/documents")
                  ? "text-primary font-bold bg-success"
                  : ""
              }
            >
              <DocumentTextIcon className="w-5 h-5" />
              Documents
            </Link>
          </li>
          <li className="mx-1">
            <Link
              href="/projects"
              className={
                isCurrentPath("/projects")
                  ? "text-primary font-bold bg-success"
                  : ""
              }
            >
              <FolderIcon className="w-5 h-5" />
              Projects
            </Link>
          </li>
        </ul>
      </div>
      {user && (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={1} className="btn-ghost avatar btn flex flex-row">
              <div className="w-10 avatar rounded-full">
                {user.profileImageUrl ? (
                  <Image
                    src={user.profileImageUrl}
                    width={80}
                    height={80}
                    alt="profile picture"
                  />
                ) : (
                  // TODO: update this to use a placeholder with a solid background that shows the user's initials
                  <img src="https://placeimg.com/80/80/people" />
                )}
              </div>
              <span className="ml-2 text-left">
                <p className="text-sm">
                  {user?.firstName} {user?.lastName}
                </p>
                {/* TODO: stop hardcoding this - get list of workspaces */}
                <p className="text-xs text-secondary">Default Workspace</p>
              </span>
            </label>
            {/* TODO: increase width to match trigger button width */}
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-normal mt-3 bg-base-100 p-2 shadow"
            >
              <li>
                <Link href="/user/profile">
                  <UserCircleIcon className="w-5 h-5" />
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/user/settings">
                  <Cog8ToothIcon className="w-5 h-5" />
                  Settings
                </Link>
              </li>
              <li>
                <Link href="/user/billing">
                  <CreditCardIcon className="w-5 h-5" />
                  Billing
                </Link>
              </li>
              <li>
                <a onClick={handleSignOut}>
                  <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
      {!user && (
        <Link className="btn btn-primary" href="/auth/signin">
          Login
        </Link>
      )}
    </header>
  );
}
