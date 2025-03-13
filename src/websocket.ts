import WebSocket from "ws";

export class WebSocketClient {
  private ws: WebSocket;

  constructor(url: string = "ws://localhost:8080") {
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log("✅ Connected to WebSocket server");
      figma.notify("✅ Connected to WebSocket!");
      this.sendMessage("Hello from Figma Plugin!");
    };

    this.ws.onmessage = (event) => {
      console.log("📩 Message from server:", event.data);
      figma.notify(`📩 Received: ${event.data}`);
    };

    this.ws.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
      figma.notify("❌ WebSocket error!");
    };

    this.ws.onclose = () => {
      console.log("🔌 WebSocket closed");
      figma.notify("🔌 Disconnected from WebSocket");
    };
  }

  sendMessage(message: string) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      console.warn("⚠️ WebSocket not open, cannot send message");
    }
  }

  closeConnection() {
    this.ws.close();
  }
}
