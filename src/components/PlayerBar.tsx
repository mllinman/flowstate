'use client';

import { useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Volume1,
  ListMusic,
  Maximize2,
  Heart,
} from 'lucide-react';
import { usePlayerStore } from '@/stores/playerStore';
import { formatDuration } from '@/lib/data';

export default function PlayerBar() {
  const {
    currentTrack,
    isPlaying,
    progress,
    currentTime,
    duration,
    volume,
    isMuted,
    shuffle,
    repeat,
    togglePlayPause,
    next,
    previous,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    toggleExpanded,
    toggleQueue,
    setProgress,
  } = usePlayerStore();

  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Simulate playback progress
  useEffect(() => {
    if (isPlaying && currentTrack) {
      progressInterval.current = setInterval(() => {
        const state = usePlayerStore.getState();
        const newTime = state.currentTime + 0.5;
        if (newTime >= state.duration) {
          state.next();
        } else {
          const newProgress = (newTime / state.duration) * 100;
          state.setProgress(newProgress, newTime);
        }
      }, 500);
    }

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isPlaying, currentTrack]);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const bar = e.currentTarget;
      const rect = bar.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      seek(Math.max(0, Math.min(100, pct)));
    },
    [seek]
  );

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVolume(parseFloat(e.target.value));
    },
    [setVolume]
  );

  const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;
  const RepeatIcon = repeat === 'one' ? Repeat1 : Repeat;

  if (!currentTrack) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 'var(--player-height)',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-subtle)',
          zIndex: 'var(--z-player)' as unknown as number,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-tertiary)',
          fontSize: '0.875rem',
        }}
      >
        Select a track to start listening
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'var(--player-height)',
        background: 'linear-gradient(180deg, rgba(10,10,15,0.95) 0%, rgba(5,5,7,0.98) 100%)',
        backdropFilter: 'blur(30px)',
        borderTop: '1px solid var(--border-subtle)',
        zIndex: 'var(--z-player)' as unknown as number,
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr',
        alignItems: 'center',
        padding: '0 16px',
        gap: '16px',
      }}
    >
      {/* Left — Track Info */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          minWidth: 0,
        }}
      >
        <div
          onClick={toggleExpanded}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--gradient-primary)',
            flexShrink: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'white',
            overflow: 'hidden',
            boxShadow: isPlaying ? 'var(--glow-purple)' : 'none',
            transition: 'box-shadow var(--transition-default)',
          }}
        >
          {currentTrack.album.title.slice(0, 2).toUpperCase()}
        </div>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {currentTrack.title}
          </div>
          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {currentTrack.artist.name}
          </div>
        </div>
        <button
          className="btn-icon"
          style={{ flexShrink: 0, color: 'var(--text-secondary)' }}
        >
          <Heart size={16} />
        </button>
      </div>

      {/* Center — Controls + Progress */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        {/* Control Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <button
            onClick={toggleShuffle}
            style={{
              color: shuffle ? 'var(--accent-secondary)' : 'var(--text-secondary)',
              padding: '4px',
              transition: 'color var(--transition-fast)',
            }}
          >
            <Shuffle size={16} />
          </button>
          <button
            onClick={previous}
            style={{ color: 'var(--text-primary)', padding: '4px' }}
          >
            <SkipBack size={20} fill="currentColor" />
          </button>
          <button
            onClick={togglePlayPause}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'white',
              color: 'var(--bg-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform var(--transition-fast)',
            }}
          >
            {isPlaying ? (
              <Pause size={18} fill="currentColor" />
            ) : (
              <Play size={18} fill="currentColor" style={{ marginLeft: '2px' }} />
            )}
          </button>
          <button
            onClick={next}
            style={{ color: 'var(--text-primary)', padding: '4px' }}
          >
            <SkipForward size={20} fill="currentColor" />
          </button>
          <button
            onClick={toggleRepeat}
            style={{
              color:
                repeat !== 'off'
                  ? 'var(--accent-secondary)'
                  : 'var(--text-secondary)',
              padding: '4px',
              transition: 'color var(--transition-fast)',
            }}
          >
            <RepeatIcon size={16} />
          </button>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            maxWidth: '600px',
          }}
        >
          <span
            style={{
              fontSize: '0.6875rem',
              color: 'var(--text-tertiary)',
              minWidth: '36px',
              textAlign: 'right',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {formatDuration(Math.floor(currentTime))}
          </span>
          <div className="progress-bar" onClick={handleProgressClick}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span
            style={{
              fontSize: '0.6875rem',
              color: 'var(--text-tertiary)',
              minWidth: '36px',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {formatDuration(duration)}
          </span>
        </div>
      </div>

      {/* Right — Volume & Queue */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '12px',
        }}
      >
        <button
          onClick={toggleQueue}
          style={{
            color: 'var(--text-secondary)',
            padding: '4px',
            transition: 'color var(--transition-fast)',
          }}
        >
          <ListMusic size={18} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={toggleMute}
            style={{ color: 'var(--text-secondary)', padding: '4px' }}
          >
            <VolumeIcon size={18} />
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
        <button
          onClick={toggleExpanded}
          style={{ color: 'var(--text-secondary)', padding: '4px' }}
        >
          <Maximize2 size={16} />
        </button>
      </div>
    </div>
  );
}
