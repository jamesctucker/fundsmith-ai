import Link from "next/link";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function Header() {
  const { supabaseClient } = useSessionContext();
  const user = useUser();
  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut();

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
                <img src="https://placeimg.com/80/80/people" />
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
                <a onClick={signOut}>Logout</a>
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
