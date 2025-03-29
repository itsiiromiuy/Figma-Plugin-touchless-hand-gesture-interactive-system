import { ReceivedData } from "./types";
const findHand = (receivedData: ReceivedData[], handedness: string) => {
  return receivedData.find(
    (receivedHand) => receivedHand.hand.handedness === handedness
  );
};
export default function pinchAndZoom(receivedData: ReceivedData[]) {
  const leftHand = findHand(receivedData, "Left");
  if (!leftHand) return;
  console.log("LEFT FOUND");

  const rightHand = findHand(receivedData, "Right");
  if (!rightHand) return;
  console.log("RIGHT FOUND");

  const pinchLeftGesture = leftHand.gestures.find(
    (gesture) => gesture.name === "FULL_HAND_UP"
  );
  if (!pinchLeftGesture) return;
  console.log("left drag");

  const pinchRightGesture = rightHand.gestures.find(
    (gesture) => gesture.name === "FULL_HAND_UP"
  );
  if (!pinchRightGesture) return;

  console.log("right drag");

  const leftIndexFingerTip = leftHand.hand.keypoints.find(
    (keypoint) => keypoint.name === "index_finger_tip"
  );
  if (!leftIndexFingerTip) return;

  const rightIndexFingerTip = rightHand.hand.keypoints.find(
    (keypoint) => keypoint.name === "index_finger_tip"
  );
  if (!rightIndexFingerTip) return;

  const variance = Math.abs(rightIndexFingerTip.x - leftIndexFingerTip.x);
  //     0 - 640
  //     VAR = 100
  //     WIDTH = 640
  // 100/640 = 0-1

  // 0-1 IS ZOOM
  const zoom = variance / leftHand.width;
  figma.viewport.zoom = zoom;
}
