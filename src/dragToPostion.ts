import { ReceivedData } from "./types";

export default function dragToPosition(receivedData: ReceivedData[]) {
  const matchedData = receivedData.find((data) => {
    return data.gestures.find((gesture) => gesture.score > 9.0);
  });

  const gestureType = matchedData?.gestures[0].name;
  if (gestureType !== "DRAG_SIGN") return;

  const currentCenter = figma.viewport.center;
  figma.viewport.center = {
    x: currentCenter.x + 100,
    y: currentCenter.y + 100,
  };
}
