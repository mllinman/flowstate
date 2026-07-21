'use client';

import { motion } from 'framer-motion';
import { Play, Shuffle, Heart, Share2, CheckCircle2, Users, Headphones } from 'lucide-react';
import { artists, albums } from '@/lib/data';
import { formatNumber } from '@/lib/data';
import { AlbumCard, TrackRow } from '@/components/Cards';
import { usePlayerStore } from '@/stores/playerStore';
import { use } from 'react';

export default function ArtistPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  const artist = artists.find((a) => a.id === id) || artists[0];
  const artistAlbums = albums.filter((a) => a.artist.id === artist.id);
  const topTracks = artistAlbums.flatMap((a) => a.tracks).sort((a, b) => b.plays - a.plays).slice(0, 5);
  const relatedArtists = artists.filter((a) => a.id !== artist.id).slice(0, 4);
  const play = usePlayerStore((s) => s.play);

  return (
    <div>
      {/* Hero Banner */}
      <div
        style={{
          height: '360px',
          background: 'var(--gradient-warm)',
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '40px',
        }}
      >
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(transparent 40%, var(--bg-primary) 100%)',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {artist.verified && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--accent-tertiary)',
                marginBottom: '8px',
              }}
            >
              <CheckCircle2 size={16} />
              Verified Artist
            </div>
          )}
          <h1 className="text-display" style={{ marginBottom: '8px' }}>
            {artist.name}
          </h1>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Headphones size={14} />
              {formatNumber(artist.monthlyListeners)} monthly listeners
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={14} />
              {formatNumber(artist.followers)} followers
            </span>
          </div>
        </motion.div>
      </div>

      <div className="page-content" style={{ paddingTop: '24px' }}>
        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <button
            className="btn-play"
            style={{ width: '56px', height: '56px' }}
            onClick={() => topTracks.length > 0 && play(topTracks[0], topTracks)}
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
        </div>

        {/* Top Tracks */}
        <section style={{ marginBottom: '48px' }}>
          <div className="section-header">
            <h2>Popular</h2>
          </div>
          <div className="glass-card" style={{ padding: '8px 0' }}>
            {topTracks.map((track, i) => (
              <TrackRow key={track.id} track={track} index={i} trackList={topTracks} showAlbum />
            ))}
          </div>
        </section>

        {/* Discography */}
        <section style={{ marginBottom: '48px' }}>
          <div className="section-header">
            <h2>Discography</h2>
          </div>
          <div className="scroll-row">
            {artistAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>

        {/* About */}
        <section style={{ marginBottom: '48px' }}>
          <div className="section-header">
            <h2>About</h2>
          </div>
          <div
            className="glass-card"
            style={{ padding: '24px', maxWidth: '600px' }}
          >
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
              {artist.bio}
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {artist.genres.map((g) => (
                <span key={g} className="badge">{g}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Related Artists */}
        <section style={{ marginBottom: '32px' }}>
          <div className="section-header">
            <h2>Fans Also Like</h2>
          </div>
          <div className="scroll-row">
            {relatedArtists.map((a) => (
              <div
                key={a.id}
                style={{
                  padding: '14px',
                  cursor: 'pointer',
                  width: '160px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'var(--gradient-secondary)',
                    margin: '0 auto 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  {a.name.slice(0, 1)}
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                  {a.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                  Artist
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
