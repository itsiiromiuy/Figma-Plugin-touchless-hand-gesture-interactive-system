import ThumbUp from "./images/thumb_up.png";
import Victory from "./images/victory.png";
import Support from "./images/support.png"
import Ok from "./images/ok.png"
figma.showUI(__html__, { width: 300, height: 200 });

let emojiElement: RectangleNode | null = null;
let emojiName: string = "";

type Gesture = {
  name: string;
  score: number;
};
type ReceivedData = {
  gestures: Gesture[];
  width: number;
  height: number;
};

const THUMBS_UP_SIGN = "thumbs_up";
const VICTORY_SIGN = "U_SIGN";
const OK_SIGN = "OK_SIGN";
const FULL_HAND_UP_SIGN = "FULL_HAND_UP";

figma.ui.onmessage = (message) => {
  if (message.type === "WS_DATA") {
    const receivedData: ReceivedData[] = JSON.parse(message.payload);
    if (!Array.isArray(receivedData)) {
      console.error("❌ Payload is not an array:", receivedData);
      return;
    }
    // [{"name":"U_SIGN","score":9.555555555555557}]}]

    const matchedData = receivedData.find((data) => {
      return data.gestures.find((gesture) => gesture.score > 9.0);
    });

    const gestureType = matchedData?.gestures[0].name;
    switch (gestureType) {
      case THUMBS_UP_SIGN:
        if (matchedData && emojiName !== THUMBS_UP_SIGN) {
          showThumbUpImage();
        }
        break;
      case VICTORY_SIGN:
        if (matchedData && emojiName !== VICTORY_SIGN) {
          showVictoryImage();
        }
        break;
      case OK_SIGN:
        if (matchedData && emojiName !== OK_SIGN) {
          showOkImage();
        }
        break;
      case FULL_HAND_UP_SIGN:
        if (matchedData && emojiName !== FULL_HAND_UP_SIGN) {
          showHandUpImage();
        }
        break;
      default:
        console.log(`Sorry, we are out of ${gestureType}.`);
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

function showHandUpImage() {
  figma.createImageAsync(Support).then(async (image: Image) => {
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
    if (emojiElement !== null) {
      emojiElement.remove();
    }
    emojiElement = node;
    emojiName = FULL_HAND_UP_SIGN;
  });
}

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
    if (emojiElement !== null) {
      emojiElement.remove();
    }
    emojiElement = node;
    emojiName = THUMBS_UP_SIGN;
  });
}

function showVictoryImage() {
  figma.createImageAsync(Victory).then(async (image: Image) => {
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
    if (emojiElement !== null) {
      emojiElement.remove();
    }
    emojiElement = node;
    emojiName = VICTORY_SIGN;
  });
}

function showOkImage() {
  figma.createImageAsync(Ok).then(async (image: Image) => {
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
    if (emojiElement !== null) {
      emojiElement.remove();
    }
    emojiElement = node;
    emojiName = OK_SIGN;
  });
}
