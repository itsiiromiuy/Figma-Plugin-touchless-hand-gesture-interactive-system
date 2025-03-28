import ThumbUp from "./images/thumb_up.png";
figma.showUI(__html__, { width: 300, height: 200 });

type Gesture = {
  name: string;
  score: number;
};
type ReceivedData = {
  gestures: Gesture[];
  width: number;
  height: number;
};

figma.ui.onmessage = (message) => {
  if (message.type === "WS_DATA") {
    const receivedData: ReceivedData[] = JSON.parse(message.payload);
    if (!Array.isArray(receivedData)) {
      console.error("❌ Payload is not an array:", receivedData);
      return;
    }
    // [{"name":"U_SIGN","score":9.555555555555557}]}]

    const firstMatchThumbsUp = receivedData.find(
      (data) =>
        Array.isArray(data.gestures) &&
        data.gestures.some((gesture) => gesture.name === "thumbs_up")
    );

    if (firstMatchThumbsUp) {
      showThumbUpImage();
    }
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

// figma.createImage(new Uint8Array(0)); // Dummy
// TODO add time out to delete image
function showThumbUpImage() {
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
