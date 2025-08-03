// IntegrationConfig.jsx
import React from 'react';
import { INTEGRATION_OPTIONS } from './kinestexConfig';

function IntegrationConfig({ 
  selectedIntegration, 
  onIntegrationChange, 
  mainInput, 
  onMainInputChange, 
  additionalInputs, 
  onAdditionalInputChange,
  style = {}
}) {
  const currentOption = INTEGRATION_OPTIONS[selectedIntegration];

  return (
    <div style={{
      border: "2px solid #28a745",
      padding: "15px",
      borderRadius: "8px",
      backgroundColor: "#f8fff8",
      marginBottom: "20px",
      ...style
    }}>
      <h3 style={{ marginTop: "0", color: "#28a745", marginBottom: "15px" }}>
        Integration Configuration
      </h3>
      
      {/* Integration Selection */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold", marginRight: "10px" }}>
          Integration Type:
        </label>
        <select
          value={selectedIntegration}
          onChange={(e) => onIntegrationChange(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            minWidth: "250px",
          }}
        >
          {Object.entries(INTEGRATION_OPTIONS).map(([key, option]) => (
            <option key={key} value={key}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      {/* Main Input */}
      {currentOption.input && (
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "bold", marginRight: "10px" }}>
            {currentOption.input.label}:
          </label>
          {currentOption.input.type === "text" && (
            <input
              type="text"
              value={mainInput}
              onChange={(e) => onMainInputChange(e.target.value)}
              placeholder={currentOption.input.placeholder}
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "300px",
              }}
            />
          )}
          {currentOption.input.type === "select" && (
            <select
              value={mainInput}
              onChange={(e) => onMainInputChange(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "300px",
              }}
            >
              {currentOption.input.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {/* Additional Inputs */}
      {currentOption.additionalInputs && (
        <div style={{
          border: "1px solid #ddd",
          padding: "15px",
          borderRadius: "5px",
          backgroundColor: "#ffffff",
        }}>
          <h4 style={{ marginTop: "0", color: "#666", marginBottom: "15px" }}>
            Additional Parameters:
          </h4>
          {Object.entries(currentOption.additionalInputs).map(([key, prop]) => (
            <div key={key} style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "10px"
            }}>
              <label style={{
                fontWeight: "bold",
                minWidth: "180px",
                textAlign: "right",
              }}>
                {prop.label}:
              </label>
              {prop.type === "text" && (
                <input
                  type="text"
                  value={additionalInputs[key] || ""}
                  onChange={(e) => onAdditionalInputChange(key, e.target.value)}
                  placeholder={prop.placeholder || prop.defaultValue}
                  style={{
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    width: "250px",
                  }}
                />
              )}
              {prop.type === "number" && (
                <input
                  type="number"
                  value={additionalInputs[key] || ""}
                  onChange={(e) => onAdditionalInputChange(key, Number(e.target.value))}
                  min="1"
                  style={{
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    width: "100px",
                  }}
                />
              )}
              {prop.type === "checkbox" && (
                <input
                  type="checkbox"
                  checked={!!additionalInputs[key]}
                  onChange={(e) => onAdditionalInputChange(key, e.target.checked)}
                  style={{ width: "20px", height: "20px" }}
                />
              )}
              {prop.type === "select" && (
                <select
                  value={additionalInputs[key] || ""}
                  onChange={(e) => onAdditionalInputChange(key, e.target.value)}
                  style={{
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    width: "150px",
                  }}
                >
                  {prop.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default IntegrationConfig;