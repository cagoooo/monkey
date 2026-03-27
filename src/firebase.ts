import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase 設定從環境變數讀取（Vite 透過 define 注入，或 GitHub Actions 透過 inject.py 替換）
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || '__FIREBASE_API_KEY__',
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || '__FIREBASE_AUTH_DOMAIN__',
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || '__FIREBASE_PROJECT_ID__',
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || '__FIREBASE_STORAGE_BUCKET__',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '__FIREBASE_MESSAGING_SENDER_ID__',
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             || '__FIREBASE_APP_ID__',
};

const firestoreDatabaseId = import.meta.env.VITE_FIREBASE_DATABASE_ID || '__FIREBASE_DATABASE_ID__';

// Initialize Firebase SDK
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firestoreDatabaseId);
export const auth = getAuth(app);

// Firebase Auth is initialized but we don't force sign-in here to avoid errors
// if specific providers (like anonymous) are not enabled in the console.
// The current leaderboard rules allow public access for this arcade-style game.

export interface LeaderboardEntry {
  id?: string;
  name: string;
  score: number;
  timestamp: any;
}

export const saveHighScore = async (name: string, score: number) => {
  try {
    await addDoc(collection(db, 'leaderboard'), {
      name,
      score,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error("Error saving high score:", error);
    throw error;
  }
};

export const getTopScores = (callback: (scores: LeaderboardEntry[]) => void) => {
  const q = query(
    collection(db, 'leaderboard'),
    orderBy('score', 'desc'),
    limit(5)
  );

  return onSnapshot(q, (snapshot) => {
    const scores = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as LeaderboardEntry));
    callback(scores);
  }, (error) => {
    console.error("Error fetching leaderboard:", error);
  });
};
