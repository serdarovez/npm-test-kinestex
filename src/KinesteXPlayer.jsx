// KinesteXPlayer.jsx
import React, { useEffect, useRef, useCallback } from 'react';
import { INTEGRATION_OPTIONS } from './kinestexConfig';

function KinesteXPlayer({ 
  integrationType, 
  mainInput, 
  additionalInputs = {}, 
  credentials,
  onClose,
  onMessage,
  baseUrl = "https://kinestex.vercel.app",
  style = {}
}) {
  const iframeRef = useRef(null);

  // Function to determine the correct srcURL based on integration type
  const getSrcURL = useCallback(() => {
    const option = INTEGRATION_OPTIONS[integrationType];
    if (!option) return baseUrl;

    let url = `${baseUrl}${option.path}`;

    if (option.urlParam) {
      url += mainInput;
    }
    if (option.urlQueryParam) {
      const query = option.urlQueryParam(credentials.userId);
      url += (url.includes("?") ? "&" : "?") + query;
    }
    return url;
  }, [integrationType, mainInput, credentials.userId, baseUrl]);

  // Function to prepare postData based on integration type
  const getPostData = useCallback(() => {
    let data = {
      userId: credentials.userId,
      company: credentials.companyName,
      key: credentials.apiKey,
      style: "dark",
    };

    const option = INTEGRATION_OPTIONS[integrationType];
    if (option?.postDataMap) {
      Object.assign(data, option.postDataMap(mainInput, additionalInputs));
    }

    return data;
  }, [integrationType, mainInput, additionalInputs, credentials]);

  // Function to send the data to the iframe
  const sendMessage = useCallback(() => {
    const currentPostData = getPostData();
    const currentSrcURL = getSrcURL();

    if (iframeRef.current?.contentWindow) {
      console.log("Sending message to KinesteX:", currentPostData, "to URL:", currentSrcURL);
      iframeRef.current.contentWindow.postMessage(currentPostData, currentSrcURL);
    } else {
      setTimeout(() => {
        try {
          iframeRef.current?.contentWindow?.postMessage(currentPostData, currentSrcURL);
        } catch (e) {
          console.error("Failed to send message on retry:", e);
        }
      }, 100);
    }
  }, [getPostData, getSrcURL]);

  // Function to update current exercise for CAMERA component
  const updateCameraExercise = useCallback((newExercise) => {
    const currentSrcURL = getSrcURL();
    if (iframeRef.current?.contentWindow && newExercise) {
      console.log("Updating camera exercise to:", newExercise);
      iframeRef.current.contentWindow.postMessage(
        { currentExercise: newExercise },
        currentSrcURL
      );
    }
  }, [getSrcURL]);

  useEffect(() => {
    const handleMessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("Received message from KinesteX:", message.type, message.data);

        // Call custom message handler if provided
        if (onMessage) {
          onMessage(message);
        }

        switch (message.type) {
          case "kinestex_loaded":
            sendMessage();
            break;
          case "exit_kinestex":
            onClose?.();
            if (iframeRef.current) {
              iframeRef.current.src = "about:blank";
            }
            break;
          case "exercise_completed":
          case "plan_unlocked":
          case "workout_opened":
          case "workout_started":
          case "error_occurred":
          case "left_camera_frame":
          case "returned_camera_frame":
          case "workout_overview":
          case "exercise_overview":
          case "workout_completed":
          case "reps":
          case "mistake":
          case "successful_repeat":
            break;
          case "custom_type":
            console.log("Custom type message:", message.data.type, message.data);
            break;
          default:
            console.log("Unhandled KinesteX message:", message);
        }
      } catch (err) {
        console.error("Failed to parse message from KinesteX:", err);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [sendMessage, onClose, onMessage]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, ...style }}>
      <iframe
        ref={iframeRef}
        src={getSrcURL()}
        frameBorder="0"
        allow="camera; microphone; autoplay; accelerometer; gyroscope; magnetometer"
        sandbox="allow-same-origin allow-scripts"
        allowFullScreen
        style={{ width: "100%", height: "100%" }}
        onLoad={sendMessage}
      />
    </div>
  );
}

export default KinesteXPlayer;