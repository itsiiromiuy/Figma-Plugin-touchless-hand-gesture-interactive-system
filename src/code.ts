figma.showUI(__html__, { width: 300, height: 200 });

figma.ui.onmessage = (message) => {
  if (message.type === "WS_DATA") {
    const receivedData = message.payload;
    console.log("Data from WebSocket:", receivedData);
  } else if (message.type === "WS_ERROR") {
    figma.notify("WebSocket error: " + message.payload); 
  } else if (message.type === "WS_OPEN") {
    console.log("WebSocket connection opened in UI");
    figma.notify("Connected to WebSocket!");
  } else if (message.type === "WS_CLOSE") {
    figma.notify("Disconnected from WebSocket");
  } else if (message.type === "connect-websocket") {
    figma.notify("Attempting to connect to WebSocket...");
  } else if (message.type === "disconnect-websocket") {
    figma.notify("Disconnecting from WebSocket...");
  }
};

function sendWebSocketMessage(message: string) {
  figma.ui.postMessage({
    type: "send-ws-message",
    payload: message,
  });
}
