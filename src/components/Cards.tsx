'use client';

import { Play } from 'lucide-react';
import { usePlayerStore } from '@/stores/playerStore';
import type { Track, Album, Playlist, Artist } from '@/lib/data';
import { formatNumber, formatDuration } from '@/lib/data';
import Link from 'next/link';

// ---- Track Card (Album Art + Title) ----
export function TrackCard({ track, trackList }: { track: Track; trackList?: Track[] }) {
  const play = usePlayerStore((s) => s.play);

  return (
    <div
      className="glass-card"
      style={{
        padding: '14px',
        cursor: 'pointer',
        width: '180px',
        position: 'relative',
        overflow: 'hidden',
      }}
      onClick={() => play(track, trackList)}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '1',
          borderRadius: 'var(--radius-md)',
          background: track.album.cover
            ? `url(${track.album.cover})`
            : 'var(--gradient-secondary)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginBottom: '12px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          fontWeight: 800,
          color: 'rgba(255,255,255,0.3)',
        }}
      >
        {!track.album.cover && track.album.title.slice(0, 2).toUpperCase()}
        <div
          className="play-overlay"
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'var(--accent-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transform: 'translateY(8px)',
            transition: 'all var(--transition-default)',
            boxShadow: '0 4px 12px rgba(6,214,160,0.4)',
          }}
        >
          <Play size={18} fill="var(--bg-primary)" color="var(--bg-primary)" />
        </div>
      </div>
      <div
        style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {track.title}
      </div>
      <div
        style={{
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          marginTop: '2px',
        }}
      >
        {track.artist.name}
      </div>
      <style jsx>{`
        .glass-card:hover .play-overlay {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}

// ---- Album Card ----
export function AlbumCard({ album }: { album: Album }) {
  const play = usePlayerStore((s) => s.play);

  return (
    <Link href={`/album/${album.id}`} style={{ textDecoration: 'none' }}>
      <div
        className="glass-card"
        style={{
          padding: '14px',
          cursor: 'pointer',
          width: '180px',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '100%',
            aspectRatio: '1',
            borderRadius: 'var(--radius-md)',
            background: 'var(--gradient-secondary)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 800,
            color: 'rgba(255,255,255,0.3)',
            position: 'relative',
          }}
        >
          {album.title.slice(0, 2).toUpperCase()}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              play(album.tracks[0], album.tracks);
            }}
            style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--accent-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(6,214,160,0.4)',
              opacity: 0,
              transform: 'translateY(8px)',
              transition: 'all var(--transition-default)',
            }}
            className="album-play-btn"
          >
            <Play size={18} fill="var(--bg-primary)" color="var(--bg-primary)" />
          </button>
        </div>
        <div
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {album.title}
        </div>
        <div
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginTop: '2px',
          }}
        >
          {album.artist.name} · {album.type === 'album' ? 'Album' : album.type === 'ep' ? 'EP' : 'Single'}
        </div>
      </div>
    </Link>
  );
}

// ---- Artist Card (Circular) ----
export function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link href={`/artist/${artist.id}`} style={{ textDecoration: 'none' }}>
      <div
        style={{
          padding: '14px',
          cursor: 'pointer',
          width: '160px',
          textAlign: 'center',
          transition: 'transform var(--transition-default)',
        }}
      >
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'var(--gradient-warm)',
            margin: '0 auto 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: 800,
            color: 'rgba(255,255,255,0.4)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            transition: 'transform var(--transition-default), box-shadow var(--transition-default)',
          }}
        >
          {artist.name.slice(0, 1)}
        </div>
        <div
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {artist.name}
        </div>
        <div
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-tertiary)',
            marginTop: '2px',
          }}
        >
          {formatNumber(artist.followers)} followers
        </div>
      </div>
    </Link>
  );
}

// ---- Playlist Card (Gradient Background) ----
export function PlaylistCard({ playlist }: { playlist: Playlist }) {
  const play = usePlayerStore((s) => s.play);

  return (
    <div
      style={{
        width: '200px',
        height: '240px',
        borderRadius: 'var(--radius-lg)',
        background: playlist.gradient,
        padding: '20px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform var(--transition-default), box-shadow var(--transition-default)',
        flexShrink: 0,
      }}
      onClick={() => {
        if (playlist.tracks.length > 0) {
          play(playlist.tracks[0], playlist.tracks);
        }
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '30px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }}
      />

      <div>
        <div
          style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            marginBottom: '4px',
          }}
        >
          {playlist.title}
        </div>
        <div
          style={{
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.4,
          }}
        >
          {playlist.description}
        </div>
      </div>
    </div>
  );
}

// ---- Genre Card ----
export function GenreCard({ genre }: { genre: { id: string; name: string; gradient: string } }) {
  return (
    <Link href={`/browse?genre=${genre.id}`} style={{ textDecoration: 'none' }}>
      <div
        style={{
          borderRadius: 'var(--radius-lg)',
          background: genre.gradient,
          padding: '24px 20px',
          cursor: 'pointer',
          height: '120px',
          display: 'flex',
          alignItems: 'flex-end',
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform var(--transition-default)',
          fontWeight: 700,
          fontSize: '1.125rem',
        }}
      >
        {/* Decorative shape */}
        <div
          style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            width: '80px',
            height: '80px',
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.1)',
            transform: 'rotate(25deg)',
          }}
        />
        {genre.name}
      </div>
    </Link>
  );
}

// ---- Ad Banner Component ----
export function AdBanner({ ad }: { ad: { sponsor: string; title: string; description: string; gradient: string } }) {
  return (
    <div className="ad-banner" style={{ background: ad.gradient }}>
      <div className="ad-label">Sponsored</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
        {ad.sponsor}
      </div>
      <div style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '6px' }}>
        {ad.title}
      </div>
      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
        {ad.description}
      </div>
      <button className="btn btn-secondary" style={{ fontSize: '0.8125rem', padding: '8px 20px' }}>
        Learn More
      </button>
    </div>
  );
}

// ---- Track Row (for lists) ----
export function TrackRow({
  track,
  index,
  trackList,
  showAlbum = true,
}: {
  track: Track;
  index: number;
  trackList?: Track[];
  showAlbum?: boolean;
}) {
  const { play, currentTrack, isPlaying } = usePlayerStore();
  const isCurrent = currentTrack?.id === track.id;

  return (
    <div
      className="track-row"
      onClick={() => play(track, trackList)}
      style={{
        background: isCurrent ? 'rgba(139,92,246,0.08)' : undefined,
      }}
    >
      <div
        style={{
          fontSize: '0.875rem',
          color: isCurrent ? 'var(--accent-primary)' : 'var(--text-tertiary)',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isCurrent && isPlaying ? (
          <div className="wave-bars">
            <div className="wave-bar" />
            <div className="wave-bar" />
            <div className="wave-bar" />
          </div>
        ) : (
          index + 1
        )}
      </div>

      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: '0.9375rem',
            fontWeight: 500,
            color: isCurrent ? 'var(--accent-primary)' : 'var(--text-primary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {track.title}
          {track.explicit && (
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.5625rem',
                fontWeight: 700,
                background: 'var(--surface-elevated)',
                padding: '1px 4px',
                borderRadius: '2px',
                marginLeft: '6px',
                verticalAlign: 'middle',
                color: 'var(--text-tertiary)',
              }}
            >
              E
            </span>
          )}
        </div>
        <div
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
          }}
        >
          {track.artist.name}
        </div>
      </div>

      {showAlbum && (
        <div
          className="track-album"
          style={{
            fontSize: '0.8125rem',
            color: 'var(--text-secondary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {track.album.title}
        </div>
      )}

      <div
        style={{
          fontSize: '0.8125rem',
          color: 'var(--text-secondary)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {formatNumber(track.plays)}
      </div>

      <div
        style={{
          fontSize: '0.8125rem',
          color: 'var(--text-tertiary)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {formatDuration(track.duration)}
      </div>
    </div>
  );
}
