'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Music2, Heart, Clock, ShoppingBag } from 'lucide-react';
import { TrackRow, AlbumCard } from '@/components/Cards';
import { allTracks, albums } from '@/lib/data';

const tabs = [
  { id: 'playlists', label: 'Playlists', icon: Music2 },
  { id: 'liked', label: 'Liked Songs', icon: Heart },
  { id: 'recent', label: 'Recent', icon: Clock },
  { id: 'purchased', label: 'Purchased', icon: ShoppingBag },
];

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState('liked');

  // Simulated library data
  const likedSongs = allTracks.slice(0, 12);
  const recentSongs = allTracks.slice(5, 15);
  const purchasedAlbums = albums.slice(0, 4);

  return (
    <div className="page-content">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '32px' }}
      >
        <h1 className="text-h1">Your Library</h1>
      </motion.div>

      {/* Tab Navigation */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '32px',
          flexWrap: 'wrap',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={activeTab === tab.id ? 'btn btn-primary' : 'btn btn-secondary'}
            style={{
              padding: '8px 20px',
              fontSize: '0.8125rem',
              ...(activeTab === tab.id
                ? {}
                : { background: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)' }),
            }}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'liked' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Liked Songs Header */}
          <div
            style={{
              background: 'var(--gradient-primary)',
              borderRadius: 'var(--radius-lg)',
              padding: '32px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Heart size={36} fill="white" color="white" />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7 }}>
                Playlist
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800 }}>Liked Songs</div>
              <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>{likedSongs.length} songs</div>
            </div>
          </div>
          <div className="glass-card" style={{ padding: '8px 0' }}>
            {likedSongs.map((track, i) => (
              <TrackRow key={track.id} track={track} index={i} trackList={likedSongs} />
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'recent' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="glass-card" style={{ padding: '8px 0' }}>
            {recentSongs.map((track, i) => (
              <TrackRow key={track.id} track={track} index={i} trackList={recentSongs} />
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'playlists' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div
            style={{
              textAlign: 'center',
              padding: '60px 0',
              color: 'var(--text-tertiary)',
            }}
          >
            <Music2 size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
            <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Create your first playlist
            </p>
            <p style={{ fontSize: '0.875rem', marginTop: '4px', marginBottom: '20px' }}>
              Save your favorite tracks and share with friends.
            </p>
            <button className="btn btn-primary" style={{ padding: '10px 28px' }}>
              Create Playlist
            </button>
          </div>
        </motion.div>
      )}

      {activeTab === 'purchased' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="section-header">
            <h2>Your Purchased Albums</h2>
          </div>
          <div className="scroll-row" style={{ marginBottom: '32px' }}>
            {purchasedAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
          <div
            style={{
              textAlign: 'center',
              padding: '40px 0',
              color: 'var(--text-tertiary)',
              fontSize: '0.875rem',
            }}
          >
            Visit the store to purchase more albums and support your favorite artists.
          </div>
        </motion.div>
      )}
    </div>
  );
}
