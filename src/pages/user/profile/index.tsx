import {
  UserProfile,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";

const ProfilePage = () => {
  return (
    <div className="flex justify-center">
      <SignedIn>
        <UserProfile />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
};

export default ProfilePage;
