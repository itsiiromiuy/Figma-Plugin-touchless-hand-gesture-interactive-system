export type Gesture = {
  name: string;
  score: number;
};
export type ReceivedData = {
  gestures: Gesture[];
  width: number;
  height: number;
};
