// KinesteXIntegrationManager.jsx
import React, { useState } from 'react';
import { INTEGRATION_OPTIONS } from './kinestexConfig'
import IntegrationConfig from './IntegrationConfig';
import KinesteXPlayer from './KinesteXPlayer';

function KinesteXIntegrationManager({
  initialCredentials = {
    apiKey: "de749805ddb1a1c2011823eaa56d1853",
    userId: "userid",
    companyName: "Serdar Kinestex Test"
  },
  initialIntegration = "EXPERIENCE",
  showCredentialsConfig = true,
  showIntegrationConfig = true,
  showQuickLaunch = true,
  onPlayerMessage,
  style = {}
}) {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [selectedIntegration, setSelectedIntegration] = useState(initialIntegration);
  const [activePlayer, setActivePlayer] = useState(null);
  
  // State for different integration inputs
  const [integrationInputs, setIntegrationInputs] = useState(() => {
    const inputs = {};
    Object.entries(INTEGRATION_OPTIONS).forEach(([key, option]) => {
      inputs[key] = {
        mainInput: option.defaultInput,
        additionalInputs: {}
      };
      if (option.additionalInputs) {
        Object.entries(option.additionalInputs).forEach(([paramKey, prop]) => {
          inputs[key].additionalInputs[paramKey] = prop.defaultValue;
        });
      }
    });
    return inputs;
  });

  const handleIntegrationChange = (newIntegration) => {
    setSelectedIntegration(newIntegration);
  };

  const handleMainInputChange = (value) => {
    setIntegrationInputs(prev => ({
      ...prev,
      [selectedIntegration]: {
        ...prev[selectedIntegration],
        mainInput: value
      }
    }));
  };

  const handleAdditionalInputChange = (key, value) => {
    setIntegrationInputs(prev => ({
      ...prev,
      [selectedIntegration]: {
        ...prev[selectedIntegration],
        additionalInputs: {
          ...prev[selectedIntegration].additionalInputs,
          [key]: value
        }
      }
    }));
  };

  const openPlayer = (integrationType) => {
    setActivePlayer(integrationType);
  };

  const closePlayer = () => {
    setActivePlayer(null);
  };

  const getCurrentInputs = (integrationType) => {
    return integrationInputs[integrationType] || {
      mainInput: INTEGRATION_OPTIONS[integrationType]?.defaultInput || "",
      additionalInputs: {}
    };
  };

  return (
    <div style={{
      padding: "20px",
      maxWidth: "1000px",
      margin: "auto",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      ...style
    }}>
      <h1 style={{ color: "#333", textAlign: "center", marginBottom: "30px" }}>
        KinesteX Integration Manager
      </h1>

      {/* Integration Configuration */}
      {showIntegrationConfig && (
        <IntegrationConfig
          selectedIntegration={selectedIntegration}
          onIntegrationChange={handleIntegrationChange}
          mainInput={integrationInputs[selectedIntegration]?.mainInput || ""}
          onMainInputChange={handleMainInputChange}
          additionalInputs={integrationInputs[selectedIntegration]?.additionalInputs || {}}
          onAdditionalInputChange={handleAdditionalInputChange}
        />
      )}

      {/* Action Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
        <button
          onClick={() => openPlayer(selectedIntegration)}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            fontSize: "20px",
            padding: "15px 30px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
          }}
        >
          Launch {INTEGRATION_OPTIONS[selectedIntegration]?.name}
        </button>
      </div>

      {/* Active Player */}
      {activePlayer && (
        <KinesteXPlayer
          integrationType={activePlayer}
          mainInput={getCurrentInputs(activePlayer).mainInput}
          additionalInputs={getCurrentInputs(activePlayer).additionalInputs}
          credentials={credentials}
          onClose={closePlayer}
          onMessage={onPlayerMessage}
        />
      )}
    </div>
  );
}

export default KinesteXIntegrationManager;