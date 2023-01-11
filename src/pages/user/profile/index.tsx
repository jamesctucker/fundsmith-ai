import { UserProfile } from "@clerk/nextjs";
import Wrapper from "@/components/Wrapper";

const ProfilePage = () => {
  return (
    <Wrapper title="Profile">
      <div className="flex justify-center">
        <UserProfile />
      </div>
    </Wrapper>
  );
};

export default ProfilePage;
