'use client';

import { motion } from 'framer-motion';
import { Play, Shuffle, Heart, Share2, ShoppingCart, Clock, Music2 } from 'lucide-react';
import { albums, formatDuration, formatNumber } from '@/lib/data';
import { TrackRow } from '@/components/Cards';
import { usePlayerStore } from '@/stores/playerStore';
import { use } from 'react';
import Link from 'next/link';

export default function AlbumPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  const album = albums.find((a) => a.id === id) || albums[0];
  const play = usePlayerStore((s) => s.play);
  const totalDuration = album.tracks.reduce((sum, t) => sum + t.duration, 0);

  return (
    <div>
      {/* Album Header */}
      <div
        style={{
          background: 'var(--gradient-secondary)',
          padding: '80px 40px 40px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(transparent 30%, var(--bg-primary) 100%)',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            gap: '32px',
            alignItems: 'flex-end',
            maxWidth: 'var(--content-max-width)',
            margin: '0 auto',
          }}
        >
          {/* Album Art */}
          <div
            style={{
              width: '230px',
              height: '230px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--gradient-primary)',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              fontWeight: 800,
              color: 'rgba(255,255,255,0.3)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {album.title.slice(0, 2).toUpperCase()}
          </div>

          {/* Album Info */}
          <div>
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-secondary)',
                marginBottom: '4px',
              }}
            >
              {album.type === 'album' ? 'Album' : album.type === 'ep' ? 'EP' : 'Single'}
            </div>
            <h1
              className="text-h1"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', marginBottom: '12px' }}
            >
              {album.title}
            </h1>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
              }}
            >
              <Link
                href={`/artist/${album.artist.id}`}
                style={{ fontWeight: 600, color: 'var(--text-primary)' }}
              >
                {album.artist.name}
              </Link>
              <span>·</span>
              <span>{new Date(album.releaseDate).getFullYear()}</span>
              <span>·</span>
              <span>{album.tracks.length} songs</span>
              <span>·</span>
              <span>{formatDuration(totalDuration)}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="page-content" style={{ paddingTop: '24px' }}>
        {/* Action Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <button
            className="btn-play"
            style={{ width: '56px', height: '56px' }}
            onClick={() => play(album.tracks[0], album.tracks)}
          >
            <Play size={24} fill="var(--bg-primary)" color="var(--bg-primary)" />
          </button>
          <button className="btn btn-secondary">
            <Shuffle size={16} /> Shuffle
          </button>
          <button className="btn-icon" style={{ color: 'var(--text-secondary)' }}>
            <Heart size={22} />
          </button>
          <button className="btn-icon" style={{ color: 'var(--text-secondary)' }}>
            <Share2 size={20} />
          </button>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="badge badge-accent" style={{ fontSize: '0.875rem', padding: '6px 16px' }}>
              ${album.price.toFixed(2)}
            </span>
            <button className="btn btn-primary" style={{ padding: '10px 24px' }}>
              <ShoppingCart size={16} />
              Buy Album
            </button>
          </div>
        </div>

        {/* Track List */}
        <div className="glass-card" style={{ padding: '8px 0', marginBottom: '40px' }}>
          {/* Header row */}
          <div
            className="track-row"
            style={{
              borderBottom: '1px solid var(--border-subtle)',
              cursor: 'default',
              marginBottom: '4px',
              paddingBottom: '12px',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textAlign: 'center' }}>#</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Title</div>
            <div className="track-album" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Album</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Plays</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center' }}>
              <Clock size={14} />
            </div>
          </div>
          {album.tracks.map((track, i) => (
            <TrackRow key={track.id} track={track} index={i} trackList={album.tracks} showAlbum={false} />
          ))}
        </div>

        {/* Album Info */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
            Released {new Date(album.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge">{album.genre}</span>
            <span className="badge">{album.type === 'album' ? 'Album' : album.type === 'ep' ? 'EP' : 'Single'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
