import React from "react";
import { ChatSocketProvider } from "./ChatSocketContext";
import { CallSocketProvider } from "./CallSocketContext";

// Combine all chat and call providers
const SocketProvider = ({ children }) => {
    return (
        <ChatSocketProvider>
            <CallSocketProvider>
                {children}
            </CallSocketProvider>
        </ChatSocketProvider>
    );
}

export default SocketProvider;