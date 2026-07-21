'use client';

import { motion } from 'framer-motion';
import { Clock, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';
import { TrackCard, AlbumCard, ArtistCard, PlaylistCard, AdBanner, TrackRow } from '@/components/Cards';
import { albums, artists, playlists, allTracks, ads } from '@/lib/data';
import Link from 'next/link';

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export default function DashboardPage() {
  // Take some tracks for "recently played" simulation
  const recentTracks = allTracks.slice(0, 6);
  const trendingTracks = [...allTracks].sort((a, b) => b.plays - a.plays).slice(0, 8);
  const newReleases = albums.slice(0, 6);
  const topArtists = artists.slice(0, 6);

  return (
    <div className="page-content">
      {/* Greeting */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        custom={0}
        style={{ marginBottom: '32px' }}
      >
        <h1 className="text-h1">
          Good {getGreeting()},{' '}
          <span className="text-gradient">Listener</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
          Pick up where you left off or discover something new.
        </p>
      </motion.div>

      {/* Quick-play Grid (Recently Played) */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn} custom={1}>
        <div className="section-header">
          <h2><Clock size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />Recently Played</h2>
          <Link href="/library" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            See all <ChevronRight size={14} />
          </Link>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '12px',
            marginBottom: '48px',
          }}
        >
          {recentTracks.map((track) => (
            <QuickPlayCard key={track.id} track={track} />
          ))}
        </div>
      </motion.section>

      {/* Made for You — Playlists */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn} custom={2}>
        <div className="section-header">
          <h2><Sparkles size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />Made for You</h2>
          <Link href="/browse" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            See all <ChevronRight size={14} />
          </Link>
        </div>
        <div className="scroll-row" style={{ marginBottom: '48px' }}>
          {playlists.map((pl) => (
            <PlaylistCard key={pl.id} playlist={pl} />
          ))}
        </div>
      </motion.section>

      {/* Sponsor Ad */}
      <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={3} style={{ marginBottom: '48px' }}>
        <AdBanner ad={ads[0]} />
      </motion.div>

      {/* New Releases */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn} custom={4}>
        <div className="section-header">
          <h2>New Releases</h2>
          <Link href="/browse" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            See all <ChevronRight size={14} />
          </Link>
        </div>
        <div className="scroll-row" style={{ marginBottom: '48px' }}>
          {newReleases.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </motion.section>

      {/* Trending Now */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn} custom={5}>
        <div className="section-header">
          <h2><TrendingUp size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />Trending Now</h2>
        </div>
        <div
          className="glass-card"
          style={{ padding: '8px 0', marginBottom: '48px' }}
        >
          {trendingTracks.map((track, i) => (
            <TrackRow key={track.id} track={track} index={i} trackList={trendingTracks} />
          ))}
        </div>
      </motion.section>

      {/* Popular Artists */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn} custom={6}>
        <div className="section-header">
          <h2>Popular Artists</h2>
          <Link href="/browse" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            See all <ChevronRight size={14} />
          </Link>
        </div>
        <div className="scroll-row" style={{ marginBottom: '48px' }}>
          {topArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </motion.section>

      {/* Another Ad */}
      <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={7} style={{ marginBottom: '32px' }}>
        <AdBanner ad={ads[1]} />
      </motion.div>
    </div>
  );
}

// Quick Play card — compact horizontal card
function QuickPlayCard({ track }: { track: import('@/lib/data').Track }) {
  const play = require('@/stores/playerStore').usePlayerStore.getState().play;

  return (
    <div
      onClick={() => play(track)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'var(--surface-elevated)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'background var(--transition-fast)',
        height: '64px',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          background: 'var(--gradient-secondary)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.875rem',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.3)',
        }}
      >
        {track.album.title.slice(0, 2).toUpperCase()}
      </div>
      <div
        style={{
          fontWeight: 600,
          fontSize: '0.875rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          paddingRight: '12px',
        }}
      >
        {track.title}
      </div>
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning';
  if (hour < 18) return 'Afternoon';
  return 'Evening';
}
