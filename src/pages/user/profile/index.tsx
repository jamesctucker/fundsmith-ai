import {
  UserProfile,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";
import Wrapper from "@/components/Wrapper";

const ProfilePage = () => {
  return (
    <Wrapper title="Profile">
      <div className="flex justify-center">
        <SignedIn>
          <UserProfile />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </div>
    </Wrapper>
  );
};

export default ProfilePage;
