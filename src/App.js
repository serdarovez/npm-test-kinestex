// App.jsx - Usage Examples
import React, { useState } from "react";
import KinesteXIntegrationManager from "./kinestexIntegrationManager";
import KinesteXPlayer from "./KinesteXPlayer";

function App() {
  const [messageLog, setMessageLog] = useState([]);
  const [showDirectPlayer, setShowDirectPlayer] = useState(false);

  const handlePlayerMessage = (message) => {
    setMessageLog((prev) => [...prev.slice(-9), message]); // Keep last 10 messages
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      {/* Example 1: Full Featured Manager */}
      <KinesteXIntegrationManager
        initialCredentials={{
          apiKey: "de749805ddb1a1c2011823eaa56d1853",
          userId: "userid",
          companyName: "Serdar Kinestex Test",
        }}
        initialIntegration="CAMERA"
        onPlayerMessage={handlePlayerMessage}
      />

    </div>
  );
}

export default App;
