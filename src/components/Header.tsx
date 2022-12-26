import Link from "next/link";
import Image from "next/image";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function Header() {
  const { signOut } = useAuth();
  const { user } = useUser();

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();

    // if (error) return toast.error(t('signOutError'));

    router.push("/auth/signin");
  };

  return (
    <div className="navbar mx-auto flex max-w-7xl justify-between bg-base-100">
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
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
        </ul>
      </div>
      {user && (
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input-bordered input"
            />
          </div>
          <div className="dropdown-end dropdown">
            <label tabIndex={1} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
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
            </label>
            <ul
              tabIndex={0}
              className="w-75 dropdown-content menu rounded-box menu-compact mt-3 bg-base-100 p-2 shadow"
            >
              <li>
                <Link className="justify-between" href="/user/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/user/settings">Settings</Link>
              </li>
              <li>
                <Link href="/user/billing">Billing</Link>
              </li>
              <li>
                <a onClick={handleSignOut}>Logout</a>
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
    </div>
  );
}
