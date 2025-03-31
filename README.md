# ✨ Figma Hand Gesture Plugin

A real-time gesture-controlled Figma plugin powered by TensorFlow.js and WebSocket

## 📦 About This Repository

This plugin connects with a WebSocket-based gesture recognition system to control actions inside Figma based on your hand gestures.

It receives real-time gesture data from the gesture detection server (🖐️ Gesture-Based WebSocket Server (Electron & WebSocket)) via WebSocket and performs corresponding actions like:

- 🎯 Dragging the Figma canvas
- ✋ Displaying gesture-based emojis
- 🔍 Zooming (planned)

## 🔗 External Dependency

This repository works alongside: [Gesture-Based-WebSocket-Server](https://github.com/itsiiromiuy/Gesture-Based-WebSocket-Server-)

```
npm run build
npm run watch

 // "containsWidget": true,
 // "widgetApi": "1.0.0",

```
