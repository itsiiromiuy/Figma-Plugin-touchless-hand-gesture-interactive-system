import ThumbUp from "./images/thumb_up.png";
import Victory from "./images/victory.png";
import Support from "./images/support.png";
import Ok from "./images/ok.png";
import ThumbDown from "./images/thumb_down.png";
import {
  THUMBS_UP_SIGN,
  VICTORY_SIGN,
  OK_SIGN,
  FULL_HAND_UP_SIGN,
  THUMBS_DOWN_SIGN,
} from "./emojiConstants";
import { ReceivedData } from "./types";

let emojiElement: RectangleNode | null = null;
let emojiName: string = "";

export default function drawEmoji(receivedData: ReceivedData[]) {
  const matchedData = receivedData.find((data) => {
    return data.gestures.find((gesture) => gesture.score > 9.0);
  });

  const gestureType = matchedData?.gestures[0].name;
  if (!matchedData) return;

  switch (gestureType) {
    case THUMBS_UP_SIGN:
      if (emojiName !== THUMBS_UP_SIGN) {
        showThumbUpImage();
      }
      break;
    case VICTORY_SIGN:
      if (emojiName !== VICTORY_SIGN) {
        showVictoryImage();
      }
      break;
    case OK_SIGN:
      if (emojiName !== OK_SIGN) {
        showOkImage();
      }
      break;
    // case FULL_HAND_UP_SIGN:
    //   if (emojiName !== FULL_HAND_UP_SIGN) {
    //     showHandUpImage();
    //   }
    //   break;
    case THUMBS_DOWN_SIGN:
      if (emojiName !== THUMBS_DOWN_SIGN) {
        showThumbDownImage();
      }
      break;
    default:
      console.log(`Sorry, we are out of ${gestureType}.`);
  }
}
const showImage = (imageSource: string, newEmojiName: string) => {
  figma.createImageAsync(imageSource).then(async (image: Image) => {
    // Remove the previous emojiElement, if it exists.
    if (emojiElement !== null) {
      console.log(emojiElement)
      emojiElement.remove();
    }
     // Create a rectangle that's the same dimensions as the image.
    const node = figma.createRectangle();
    //The width and height of the image in pixels. This returns a promise because the image may still need to be downloaded (images in Figma are loaded separately from the rest of the document).
    const { width, height } = await image.getSizeAsync();
    node.resize(width, height);

    //Render hte image by filling the rectangle.
    node.fills = [
      {
        type: "IMAGE",
        imageHash: image.hash,
        scaleMode: "FILL",
      },
    ];

    // Update the emojiElement with the new image.
    emojiElement = node;

    // Update the emojiName.
    emojiName = newEmojiName; // Update the emoji name dynamically
  });
};

// function showHandUpImage() {
//   showImage(Support, FULL_HAND_UP_SIGN);
// }

function showThumbUpImage() {
  showImage(ThumbUp, THUMBS_UP_SIGN);
}

function showVictoryImage() {
  showImage(Victory, VICTORY_SIGN);
}

function showOkImage() {
  showImage(Ok, OK_SIGN);
}
function showThumbDownImage() {
  showImage(ThumbDown, THUMBS_DOWN_SIGN);
}
