export type MediaType = 'image' | 'audio' | 'video';
export type Coordinates = [number, number]; // [latitude, longitude]

export interface Memory {
  id: string;
  title: string;
  description: string;
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  createdAt: string; // ISO 8601 date string
  mediaType: MediaType;
  mediaUrl: string;
  likes: number;
  commentsCount: number;
  coordinates: Coordinates;
}

export interface Department {
  id: string;
  name: string;
  imageUrl: string;
}

export interface CulturalEvent {
  id: string;
  name: string;
  description: string;
  date: string; // ISO 8601 date string
  location: string;
  time: string;
  departmentId: string;
  municipality: string;
  coordinates: Coordinates;
}

// --- Quiz Types ---

export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

// --- Ranking Types ---

export interface RankedUser {
    id: string;
    position: number;
    name: string;
    score: number;
    avatarUrl?: string;
}