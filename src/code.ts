import ThumbUp from "./images/thumb_up.png";
figma.showUI(__html__, { width: 300, height: 200 });
figma.ui.onmessage = (message) => {
  if (message.type === "WS_DATA") {
    const receivedData = message.payload;
    console.log("Data from WebSocket:", receivedData);
    receivedData.forEach((data: any) => {
      console.log("Data:", data);
      figma.notify("Received data: " + JSON.stringify(data));
    });
  } else if (message.type === "WS_ERROR") {
    figma.notify("WebSocket error: " + message.payload);
  } else if (message.type === "WS_OPEN") {
    showImage();
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

// figma.createImage(new Uint8Array(0)); // Dummy
// TODO add time out to delete image
function showImage() {
  figma.createImageAsync(ThumbUp).then(async (image: Image) => {
    // Create a rectangle that's the same dimensions as the image.
    const node = figma.createRectangle();

    const { width, height } = await image.getSizeAsync();
    node.resize(width, height);

    // Render the image by filling the rectangle.
    node.fills = [
      {
        type: "IMAGE",
        imageHash: image.hash,
        scaleMode: "FILL",
      },
    ];
  });
}

//
