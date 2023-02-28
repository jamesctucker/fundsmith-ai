import AccountLayout from "@/components/AccountLayout";
import { useOrganizationList, useOrganization } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import EllipsisDropdownMenu from "@/components/ui/EllipsisDropdownMenu";

type OrganizationData = {
  name: string;
};

const MembersPage = () => {
  const { organizationList, createOrganization, setActive } =
    useOrganizationList();

  const limit = 10;
  const offset = 0;

  const useOrganizationParams = {
    invitationList: { limit, offset }, // Pagination params
    membershipList: { limit, offset }, // Pagination params
  };

  const { membershipList } = useOrganization(useOrganizationParams);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrganizationData>();

  // useEffect(() => {
  //   // if organizations exist, set the first one as the current organization
  //   if (organizationList && organizationList.length > 0) {
  //     setActive({ organization: organizationList[0]!.organization });
  //   }
  // }, [organizationList]);

  const handleCreateOrganization = async (data: OrganizationData) => {
    const response = await createOrganization!({ name: data.name });

    if (response) {
      toast.success("Organization created!");
      reset();
    }
  };

  const convertDateToMMDDYYYY = (date: Date) => {
    const dateObj = new Date(date);
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    return `${month}/${day}/${year}`;
  };

  const menuItems = [
    {
      name: "Delete",
    },
  ];

  function MembershipList() {
    return (
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row space-x-2">
          <div className="w-2/5 font-semibold">User</div>
          <div className="w-1/5 font-semibold">Joined</div>
          <div className="w-1/5 font-semibold">Role</div>
          <div className="w-1/5 font-semibold">Actions</div>
        </div>
        <div className="border-b border-gray-300 my-4"></div>

        {membershipList?.map((member) => (
          <div className="flex flex-row items-center space-x-2">
            <div className="w-2/5 truncate">
              <div className="flex flex-row items-center space-x-2">
                <img
                  src={member.publicUserData.profileImageUrl}
                  alt="Profile image"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-sm lg:text-base">
                    {member.publicUserData.firstName}{" "}
                    {member.publicUserData.lastName}
                  </span>
                  <span className="text-gray-500 text-xs lg:text-base">
                    {member.publicUserData.identifier}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-1/5 text-sm lg:text-base">
              {convertDateToMMDDYYYY(member.createdAt)}
            </div>
            <div className="w-1/5 text-sm lg:text-base">{member.role}</div>
            <div className="w-1/5 flex items-center">
              <EllipsisDropdownMenu
                menuItems={menuItems}
                onClick={() => console.log("clicked")}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <AccountLayout title="Members">
      <h1 className="text-xl py-2 mb-4">Your Organization</h1>
      {/* if no organization exists, show create organization form */}
      {organizationList?.length === 0 && (
        <form
          className="w-full sm:w-3/4 md:w-1/2 space-y-3"
          onSubmit={handleSubmit(handleCreateOrganization)}
        >
          <h2>
            You don't belong to any organizations yet. Create one or accept an
            existing invite to get started.
          </h2>
          <input
            className="textinput"
            type="text"
            placeholder="Organization name"
            {...register("name", { required: true })}
          />
          <button type="submit" className="btn-primary">
            Create
          </button>
        </form>
      )}
      {/* show a select with the 
      organizations the user belongs to
      */}
      {organizationList && organizationList.length > 0 && (
        <>
          <h2 className="text-xl mb-6">
            {organizationList[0]?.organization.name}
          </h2>
          <MembershipList />
        </>
      )}
    </AccountLayout>
  );
};

export default MembersPage;
