import { WebSocket } from "ws";

const socket = new WebSocket("ws://localhost:8081");


socket.onopen