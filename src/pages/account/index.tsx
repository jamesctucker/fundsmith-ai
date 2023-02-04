import AccountLayout from "@/components/AccountLayout";
import Avatar from "@/components/account/Avatar";
import Name from "@/components/account/Name";
import Email from "@/components/account/Email";
import Password from "@/components/account/Password";

const AccountPage = () => {
  return (
    <AccountLayout title="Your account">
      <h1 className="text-xl py-2 mb-6">Your Account</h1>
      <div className="account-info space-y-6">
        <Avatar />
        <Name />
        <Email />
        <Password />
      </div>
    </AccountLayout>
  );
};

export default AccountPage;
