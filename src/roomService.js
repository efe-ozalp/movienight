import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase.js";

// Create a room
export async function createRoom(roomId) {
  const roomRef = doc(db, "rooms", roomId);

  await setDoc(roomRef, {
    createdAt: Date.now(),
    themesSummary: {},
    topThemes: [],
  });

  console.log(`Created room ${roomId}`);
  return true;
}

function generateRoomCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}


export async function roomExists(roomCode) {
  const roomRef = doc(db, "rooms", roomCode);
  const snap = await getDoc(roomRef);
  return snap.exists();
}

export async function submitSuggestions(roomId, userId, themes) {
  const userRef = doc(db, "rooms", roomId, "suggestions", userId);

  await setDoc(userRef, { themes }, { merge: true });

  console.log(`User ${userId} submitted themes:`, themes);
  return true;
}


export async function computeTopThemes(roomId) {
  const suggestionsRef = collection(db, "rooms", roomId, "suggestions");
  const snap = await getDocs(suggestionsRef);

  const themeCounts = {};

  snap.forEach((doc) => {
    const themes = doc.data().themes || [];
    themes.forEach((theme) => {
      themeCounts[theme] = (themeCounts[theme] || 0) + 1;
    });
  });

  const topThemes = Object.entries(themeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([theme]) => theme);

  await updateDoc(doc(db, "rooms", roomId), {
    themesSummary: themeCounts,
    topThemes,
  });

  console.log("Top themes:", topThemes);
  return topThemes;
}


