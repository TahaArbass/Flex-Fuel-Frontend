import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import SimplePeer from "simple-peer";
import BaseUrl from "../utils/baseUrl";

const CallSocketContext = createContext();
const callSocket = io(`${BaseUrl}/call`);

const CallSocketProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [call, setCall] = useState({});
    const [me, setMe] = useState("");
    const [name, setName] = useState("");
    const localStreamRef = useRef(null);
    const peerRef = useRef(null);

    const [cameraEnabled, setCameraEnabled] = useState(true);
    const [microphoneEnabled, setMicrophoneEnabled] = useState(true);

    const [hasCamera, setHasCamera] = useState(true);

    useEffect(() => {
        // Check for available devices on mount
        checkCameraAvailability();

        // Establish socket connection and listeners for call events
        callSocket.on("connect", () => {
            console.log("Connected to call socket");
        });

        callSocket.on("disconnect", () => {
            console.log("Disconnected from call socket");
        });

        callSocket.on("me", (id) => setMe(id));

        callSocket.on("callUser", ({ from, signal, name }) => {
            setCall({ isReceivingCall: true, from, name, signal });
        });

        return () => {
            callSocket.off("me");
            callSocket.off("callUser");
        };
    }, []);

    const checkCameraAvailability = async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoInput = devices.some((device) => device.kind === "videoinput");
            setHasCamera(videoInput);
        } catch (error) {
            console.error("Error checking camera availability: ", error);
            setHasCamera(false);
        }
    };

    const startMediaStream = async () => {
        try {
            const constraints = {
                video: cameraEnabled && hasCamera,
                audio: microphoneEnabled,
            };

            const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            setStream(mediaStream);
            localStreamRef.current.srcObject = mediaStream;
        } catch (error) {
            console.error("Error accessing media devices: ", error);
        }
    };

    const toggleCamera = async () => {
        if (stream) {
            const videoTrack = stream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !cameraEnabled;
                setCameraEnabled(!cameraEnabled);
            }
        }
    };

    const toggleMicrophone = async () => {
        if (stream) {
            const audioTrack = stream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !microphoneEnabled;
                setMicrophoneEnabled(!microphoneEnabled);
            }
        }
    };

    const callUser = (id) => {
        const peer = new SimplePeer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", (data) => {
            callSocket.emit("callUser", { signal: data, to: id, from: me, name });
        });

        peer.on("stream", (remoteStream) => {
            setRemoteStream(remoteStream);
        });

        peerRef.current = peer;
    };

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new SimplePeer({
            initiator: false,
            trickle: false,
            stream,
        });

        peer.on("signal", (data) => {
            callSocket.emit("answerCall", { signal: data, to: call.from });
        });

        peer.on("stream", (remoteStream) => {
            setRemoteStream(remoteStream);
        });

        peer.signal(call.signal);
        peerRef.current = peer;
    };

    const handleCallEnd = () => {
        setCallEnded(true);
        peerRef.current?.destroy();
        setCall({});
        setCallAccepted(false);

        if (localStreamRef.current.srcObject) {
            localStreamRef.current.srcObject.getTracks().forEach((track) => track.stop());
        }
        setStream(null);
        setRemoteStream(null);
    };

    return (
        <CallSocketContext.Provider
            value={{
                call,
                callAccepted,
                callEnded,
                stream,
                remoteStream,
                me,
                name,
                setName,
                startMediaStream,
                callUser,
                answerCall,
                handleCallEnd,
                toggleCamera,
                toggleMicrophone,
                cameraEnabled,
                microphoneEnabled,
                localStreamRef,
                hasCamera,
            }}
        >
            {children}
        </CallSocketContext.Provider>
    );
};

const useCallSocket = () => useContext(CallSocketContext);

export { CallSocketProvider, useCallSocket };
