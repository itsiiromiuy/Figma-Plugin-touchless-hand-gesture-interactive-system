figma.showUI(__html__, { width: 300, height: 200 });

figma.ui.onmessage = (message) => {
  if (message.type === "WS_DATA") {
    const receivedData = message.payload;
    // 處理接收到的數據（例如，創建節點，更新 Figma 文檔等）
    console.log("Data from WebSocket:", receivedData);
  } else if (message.type === "WS_ERROR") {
    figma.notify("WebSocket error: " + message.payload); // 例如，通知用戶
  } else if (message.type === "WS_OPEN") {
    console.log("WebSocket connection opened in UI");
    figma.notify("Connected to WebSocket!");
  } else if (message.type === "WS_CLOSE") {
    figma.notify("Disconnected from WebSocket");
  } else if (message.type === "connect-websocket") {
    // 用戶點擊了連接按鈕
    figma.notify("Attempting to connect to WebSocket...");
  } else if (message.type === "disconnect-websocket") {
    // 用戶點擊了斷開連接按鈕
    figma.notify("Disconnecting from WebSocket...");
  }
};

// 如果需要從主線程發送消息到 WebSocket 服務器
function sendWebSocketMessage(message: string) {
  figma.ui.postMessage({
    type: "send-ws-message",
    payload: message,
  });
}
