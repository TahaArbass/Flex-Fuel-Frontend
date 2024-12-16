import React from "react";
import UserNavbar from "./UserNavbar";
import { useAuth } from "../contexts/AuthContext";

const TabsWithPanels = () => {
    const { auth } = useAuth();
    const menuItems = [
        { text: "Exercises", path: "/exercises" },
        { text: "GymBros", path: "/gymbros" },
        { text: "Meals", path: "/meals" },
        { text: "My Profile", path: "/profile/" + auth.user.username },
    ];

    return (
        <>
            <UserNavbar
                menuItems={menuItems}
            />
        </>
    );
};

export default TabsWithPanels;
