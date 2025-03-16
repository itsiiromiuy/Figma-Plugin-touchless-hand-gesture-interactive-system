export class WebSocketClient {
  private ws: WebSocket;

  constructor(url: string) {
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      figma.notify("✅ Connected to WebSocket!");
      this.sendMessage("Hello from Figma Plugin!");
    };
// 
    this.ws.onmessage = (event) => {
      console.log("📩 Message from server:", event.data);
      figma.notify(`📩 Received: ${event.data}`);
    };

    this.ws.onerror = () => {
      figma.notify("❌ WebSocket error!");
    };

    this.ws.onclose = () => {
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
