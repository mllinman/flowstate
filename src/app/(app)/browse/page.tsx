'use client';

import { motion } from 'framer-motion';
import { AlbumCard, ArtistCard, PlaylistCard, GenreCard, AdBanner, TrackRow } from '@/components/Cards';
import { albums, artists, playlists, genres, allTracks, ads } from '@/lib/data';

export default function BrowsePage() {
  const topCharts = [...allTracks].sort((a, b) => b.plays - a.plays).slice(0, 10);
  const newReleases = [...albums].sort(
    (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  );

  return (
    <div className="page-content">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '40px' }}
      >
        <h1 className="text-h1">Browse</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
          Explore genres, charts, and curated playlists.
        </p>
      </motion.div>

      {/* Genre Grid */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="section-header">
          <h2>Genres</h2>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '12px',
            marginBottom: '48px',
          }}
        >
          {genres.map((genre) => (
            <GenreCard key={genre.id} genre={genre} />
          ))}
        </div>
      </motion.section>

      {/* Featured Playlists */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className="section-header">
          <h2>Featured Playlists</h2>
        </div>
        <div className="scroll-row" style={{ marginBottom: '48px' }}>
          {playlists.map((pl) => (
            <PlaylistCard key={pl.id} playlist={pl} />
          ))}
        </div>
      </motion.section>

      {/* Sponsor */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ marginBottom: '48px' }}
      >
        <AdBanner ad={ads[2]} />
      </motion.div>

      {/* Top 10 Charts */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <div className="section-header">
          <h2>Top 10 — All Genres</h2>
        </div>
        <div className="glass-card" style={{ padding: '8px 0', marginBottom: '48px' }}>
          {topCharts.map((track, i) => (
            <TrackRow key={track.id} track={track} index={i} trackList={topCharts} />
          ))}
        </div>
      </motion.section>

      {/* New Releases */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="section-header">
          <h2>New Releases</h2>
        </div>
        <div className="scroll-row" style={{ marginBottom: '48px' }}>
          {newReleases.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </motion.section>

      {/* Trending Artists */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <div className="section-header">
          <h2>Trending Artists</h2>
        </div>
        <div className="scroll-row" style={{ marginBottom: '32px' }}>
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </motion.section>
    </div>
  );
}
