'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, X } from 'lucide-react';
import { AlbumCard, ArtistCard, TrackRow, GenreCard } from '@/components/Cards';
import { albums, artists, allTracks, genres } from '@/lib/data';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return {
      tracks: allTracks.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.artist.name.toLowerCase().includes(q)
      ).slice(0, 8),
      albumResults: albums.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.artist.name.toLowerCase().includes(q)
      ).slice(0, 6),
      artistResults: artists.filter((a) =>
        a.name.toLowerCase().includes(q)
      ).slice(0, 6),
    };
  }, [query]);

  const hasResults = results && (results.tracks.length > 0 || results.albumResults.length > 0 || results.artistResults.length > 0);

  return (
    <div className="page-content">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '40px' }}
      >
        <h1 className="text-h1" style={{ marginBottom: '24px' }}>Search</h1>

        {/* Search Input */}
        <div
          style={{
            position: 'relative',
            maxWidth: '600px',
          }}
        >
          <SearchIcon
            size={20}
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-tertiary)',
            }}
          />
          <input
            type="text"
            placeholder="Artists, songs, albums..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input-field"
            style={{
              paddingLeft: '48px',
              paddingRight: query ? '48px' : '16px',
              fontSize: '1rem',
              height: '52px',
              borderRadius: 'var(--radius-full)',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-tertiary)',
                padding: '4px',
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>
      </motion.div>

      {/* No query — show browse genres */}
      {!query && (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="section-header">
            <h2>Browse All</h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '12px',
            }}
          >
            {genres.map((genre) => (
              <GenreCard key={genre.id} genre={genre} />
            ))}
          </div>
        </motion.section>
      )}

      {/* Search Results */}
      {query && !hasResults && (
        <div
          style={{
            textAlign: 'center',
            padding: '80px 0',
            color: 'var(--text-tertiary)',
          }}
        >
          <SearchIcon size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
          <p style={{ fontSize: '1.125rem' }}>
            No results found for &ldquo;{query}&rdquo;
          </p>
          <p style={{ fontSize: '0.875rem', marginTop: '4px' }}>
            Try a different search term.
          </p>
        </div>
      )}

      {hasResults && results && (
        <>
          {/* Tracks */}
          {results.tracks.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <div className="section-header">
                <h2>Songs</h2>
              </div>
              <div className="glass-card" style={{ padding: '8px 0', marginBottom: '32px' }}>
                {results.tracks.map((track, i) => (
                  <TrackRow key={track.id} track={track} index={i} trackList={results.tracks} />
                ))}
              </div>
            </motion.section>
          )}

          {/* Artists */}
          {results.artistResults.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="section-header">
                <h2>Artists</h2>
              </div>
              <div className="scroll-row" style={{ marginBottom: '32px' }}>
                {results.artistResults.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            </motion.section>
          )}

          {/* Albums */}
          {results.albumResults.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="section-header">
                <h2>Albums</h2>
              </div>
              <div className="scroll-row" style={{ marginBottom: '32px' }}>
                {results.albumResults.map((album) => (
                  <AlbumCard key={album.id} album={album} />
                ))}
              </div>
            </motion.section>
          )}
        </>
      )}
    </div>
  );
}
