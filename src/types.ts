export type Gesture = {
  name: string;
  score: number;
};
export type KeyPoint = {
  x: number;
  y: number;
  name: string;
};
export type KeyPoints3D = {
  x: number;
  y: number;
  z: number;
  name: string;
};

export type Hand = {
  keypoints: KeyPoint[];
  keypoints3D: KeyPoints3D[];
  handedness: "Left" | "Right";
  score: number;
};

export type ReceivedData = {
  gestures: Gesture[];
  width: number;
  hand: Hand;
  height: number;
};
