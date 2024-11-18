import React from "react";
import { UserProvider } from "../scripts/userContext.js";
import { Slot} from "expo-router";

export default Layout = () => {
    return (
        <UserProvider>
            <Slot />
        </UserProvider>
    )
}