import {
  UserProfile,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";

const ProfilePage = () => {
  return (
    <div className="flex justify-center p-4">
      <SignedIn>
        <UserProfile
        // appearance={{
        //   variables: {
        //     borderRadius: "0",
        //   },
        //   elements: {
        //     card: "shadow-none border-none",
        //   },
        // }}
        />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
};

export default ProfilePage;
