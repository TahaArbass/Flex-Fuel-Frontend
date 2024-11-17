import React from "react";

import Profile from "../components/user/Profile";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
    const { username } = useParams();
    return <Profile profileUsername={username} />;
}

export default ProfilePage;

