// Flowstate — Player Store (Zustand)
// Global state for the audio player
'use client';

import { create } from 'zustand';
import type { Track } from '@/lib/data';

export type RepeatMode = 'off' | 'all' | 'one';

interface PlayerState {
  // Current playback
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number; // 0-100
  currentTime: number; // seconds
  duration: number;
  volume: number; // 0-1
  isMuted: boolean;

  // Queue
  queue: Track[];
  queueIndex: number;
  history: Track[];

  // Modes
  shuffle: boolean;
  repeat: RepeatMode;

  // UI state
  isExpanded: boolean;
  isQueueOpen: boolean;

  // Actions
  play: (track?: Track, trackList?: Track[]) => void;
  pause: () => void;
  togglePlayPause: () => void;
  next: () => void;
  previous: () => void;
  seek: (progress: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  toggleExpanded: () => void;
  toggleQueue: () => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  setProgress: (progress: number, currentTime: number) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  // Initial state
  currentTrack: null,
  isPlaying: false,
  progress: 0,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  isMuted: false,
  queue: [],
  queueIndex: -1,
  history: [],
  shuffle: false,
  repeat: 'off',
  isExpanded: false,
  isQueueOpen: false,

  // Actions
  play: (track, trackList) => {
    const state = get();

    if (track) {
      const newQueue = trackList || [track];
      const index = newQueue.findIndex((t) => t.id === track.id);

      set({
        currentTrack: track,
        isPlaying: true,
        queue: newQueue,
        queueIndex: index >= 0 ? index : 0,
        progress: 0,
        currentTime: 0,
        duration: track.duration,
        history: state.currentTrack
          ? [...state.history, state.currentTrack]
          : state.history,
      });
    } else if (state.currentTrack) {
      set({ isPlaying: true });
    }
  },

  pause: () => set({ isPlaying: false }),

  togglePlayPause: () => {
    const state = get();
    if (state.currentTrack) {
      set({ isPlaying: !state.isPlaying });
    }
  },

  next: () => {
    const state = get();
    if (state.queue.length === 0) return;

    let nextIndex: number;
    if (state.repeat === 'one') {
      nextIndex = state.queueIndex;
    } else if (state.shuffle) {
      nextIndex = Math.floor(Math.random() * state.queue.length);
    } else {
      nextIndex = state.queueIndex + 1;
      if (nextIndex >= state.queue.length) {
        if (state.repeat === 'all') {
          nextIndex = 0;
        } else {
          set({ isPlaying: false });
          return;
        }
      }
    }

    const nextTrack = state.queue[nextIndex];
    set({
      currentTrack: nextTrack,
      queueIndex: nextIndex,
      progress: 0,
      currentTime: 0,
      duration: nextTrack.duration,
      isPlaying: true,
      history: state.currentTrack
        ? [...state.history, state.currentTrack]
        : state.history,
    });
  },

  previous: () => {
    const state = get();
    if (state.currentTime > 3) {
      // If more than 3 seconds in, restart current track
      set({ progress: 0, currentTime: 0 });
      return;
    }

    if (state.history.length > 0) {
      const prevTrack = state.history[state.history.length - 1];
      set({
        currentTrack: prevTrack,
        progress: 0,
        currentTime: 0,
        duration: prevTrack.duration,
        isPlaying: true,
        history: state.history.slice(0, -1),
      });
    } else if (state.queueIndex > 0) {
      const prevIndex = state.queueIndex - 1;
      const prevTrack = state.queue[prevIndex];
      set({
        currentTrack: prevTrack,
        queueIndex: prevIndex,
        progress: 0,
        currentTime: 0,
        duration: prevTrack.duration,
        isPlaying: true,
      });
    }
  },

  seek: (progress) => {
    const state = get();
    const newTime = (progress / 100) * state.duration;
    set({ progress, currentTime: newTime });
  },

  setVolume: (volume) => set({ volume, isMuted: volume === 0 }),

  toggleMute: () => {
    const state = get();
    set({ isMuted: !state.isMuted });
  },

  toggleShuffle: () => set((s) => ({ shuffle: !s.shuffle })),

  toggleRepeat: () =>
    set((s) => ({
      repeat: s.repeat === 'off' ? 'all' : s.repeat === 'all' ? 'one' : 'off',
    })),

  toggleExpanded: () => set((s) => ({ isExpanded: !s.isExpanded })),

  toggleQueue: () => set((s) => ({ isQueueOpen: !s.isQueueOpen })),

  addToQueue: (track) =>
    set((s) => ({ queue: [...s.queue, track] })),

  removeFromQueue: (index) =>
    set((s) => ({
      queue: s.queue.filter((_, i) => i !== index),
      queueIndex:
        index < s.queueIndex
          ? s.queueIndex - 1
          : s.queueIndex,
    })),

  clearQueue: () => set({ queue: [], queueIndex: -1 }),

  setProgress: (progress, currentTime) => set({ progress, currentTime }),
}));
