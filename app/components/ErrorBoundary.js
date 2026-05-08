"use client";

import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReload() {
    this.setState({ hasError: false, error: null });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "2rem",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#e0e0e0",
          background: "#0a0a0f",
        }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#ff6b6b" }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: "0.95rem", marginBottom: "1.5rem", color: "#aaa", maxWidth: "480px", textAlign: "center" }}>
            An unexpected error occurred while rendering the application. 
            You can try reloading to recover.
          </p>
          <pre style={{
            fontSize: "0.8rem",
            color: "#888",
            background: "#1a1a2e",
            padding: "1rem",
            borderRadius: "8px",
            maxWidth: "600px",
            overflow: "auto",
            marginBottom: "1.5rem",
          }}>
            {this.state.error?.message || String(this.state.error)}
          </pre>
          <button
            onClick={() => this.handleReload()}
            style={{
              padding: "0.6rem 2rem",
              fontSize: "1rem",
              background: "#6c5ce7",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}