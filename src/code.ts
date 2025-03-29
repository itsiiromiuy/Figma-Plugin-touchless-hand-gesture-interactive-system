import dragToPosition from "./dragToPostion";
import drawEmoji from "./drawEmoji";
import pinchAndZoom from "./pinchAndZoom";
import { ReceivedData } from "./types";

figma.showUI(__html__, { width: 300, height: 200 });

figma.ui.onmessage = (message) => {
  if (message.type === "zoom") {
  }
  if (message.type === "WS_DATA") {
    const receivedData: ReceivedData[] = JSON.parse(message.payload);
    if (!Array.isArray(receivedData)) {
      console.error("❌ Payload is not an array:", receivedData);
      return;
    }
    drawEmoji(receivedData);
    dragToPosition(receivedData);
    pinchAndZoom(receivedData);
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
