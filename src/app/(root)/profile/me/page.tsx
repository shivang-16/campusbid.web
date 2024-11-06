import React from "react";
import FreelancerProfilePage from "./_components/FreelancerProfilePage";
import { getUser } from "@/actions/user_actions";
import ClientProfilePage from "./_components/ClientProfilePage";

const Profile = async () => {
  const { user } = await getUser();

  return (
    <>
      {user.role === "freelancer" ? (
        <FreelancerProfilePage />
      ) : (
        <ClientProfilePage />
      )}
    </>
  );
};

export default Profile;
