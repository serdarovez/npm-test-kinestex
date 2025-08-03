// CredentialsConfig.jsx
import React from "react";

function CredentialsConfig({ credentials, onCredentialsChange, style = {} }) {
  return (
    <div
      style={{
        border: "2px solid #007bff",
        padding: "15px",
        borderRadius: "8px",
        backgroundColor: "#f8f9fa",
        marginBottom: "20px",
        ...style,
      }}
    >
      <h3 style={{ marginTop: "0", color: "#007bff", marginBottom: "15px" }}>
        KinesteX Credentials Configuration
      </h3>
      <div style={{ display: "grid", gap: "15px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <label
            style={{
              fontWeight: "bold",
              minWidth: "120px",
              textAlign: "right",
            }}
          >
            API Key:
          </label>
          <input
            type="text"
            value={credentials.apiKey}
            onChange={(e) =>
              onCredentialsChange({ ...credentials, apiKey: e.target.value })
            }
            placeholder="Enter your KinesteX API Key"
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "300px",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <label
            style={{
              fontWeight: "bold",
              minWidth: "120px",
              textAlign: "right",
            }}
          >
            User ID:
          </label>
          <input
            type="text"
            value={credentials.userId}
            onChange={(e) =>
              onCredentialsChange({ ...credentials, userId: e.target.value })
            }
            placeholder="Enter User ID"
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "300px",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <label
            style={{
              fontWeight: "bold",
              minWidth: "120px",
              textAlign: "right",
            }}
          >
            Company Name:
          </label>
          <input
            type="text"
            value={credentials.companyName}
            onChange={(e) =>
              onCredentialsChange({
                ...credentials,
                companyName: e.target.value,
              })
            }
            placeholder="Enter Company Name"
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "300px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CredentialsConfig;
