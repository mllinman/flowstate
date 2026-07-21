'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Music2, Image, FileText, Plus, X, DollarSign, Calendar, Tag } from 'lucide-react';

export default function UploadPage() {
  const [step, setStep] = useState(1);
  const [tracks, setTracks] = useState<{ name: string; file: string }[]>([]);
  const [albumTitle, setAlbumTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseType, setReleaseType] = useState('album');
  const [price, setPrice] = useState('9.99');

  const addTrack = () => {
    setTracks([...tracks, { name: `Track ${tracks.length + 1}`, file: '' }]);
  };

  const removeTrack = (index: number) => {
    setTracks(tracks.filter((_, i) => i !== index));
  };

  return (
    <div className="page-content" style={{ maxWidth: '800px' }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '40px' }}
      >
        <h1 className="text-h1">Upload Music</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
          Share your music with millions of listeners worldwide.
        </p>
      </motion.div>

      {/* Progress Steps */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '40px',
        }}
      >
        {['Details', 'Tracks', 'Review'].map((label, i) => (
          <div
            key={label}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '4px',
                borderRadius: 'var(--radius-full)',
                background: i + 1 <= step ? 'var(--gradient-primary)' : 'var(--surface-elevated)',
                transition: 'background var(--transition-default)',
              }}
            />
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: i + 1 <= step ? 'var(--text-primary)' : 'var(--text-tertiary)',
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Step 1: Release Details */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card"
          style={{ padding: '32px' }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '24px' }}>
            Release Details
          </h2>

          {/* Album Art Upload */}
          <div style={{ marginBottom: '24px' }}>
            <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
              Cover Art
            </label>
            <div
              style={{
                width: '200px',
                height: '200px',
                borderRadius: 'var(--radius-lg)',
                border: '2px dashed var(--border-default)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'border-color var(--transition-fast)',
                color: 'var(--text-tertiary)',
              }}
            >
              <Image size={32} />
              <span style={{ fontSize: '0.8125rem' }}>Upload artwork</span>
              <span style={{ fontSize: '0.6875rem' }}>3000x3000 recommended</span>
            </div>
          </div>

          {/* Release Type */}
          <div style={{ marginBottom: '24px' }}>
            <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
              Release Type
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['album', 'ep', 'single'].map((type) => (
                <button
                  key={type}
                  onClick={() => setReleaseType(type)}
                  className={releaseType === type ? 'btn btn-primary' : 'btn btn-secondary'}
                  style={{ padding: '8px 20px', textTransform: 'capitalize' }}
                >
                  {type === 'ep' ? 'EP' : type}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div style={{ marginBottom: '24px' }}>
            <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
              <FileText size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Title
            </label>
            <input
              type="text"
              placeholder="Enter album title..."
              value={albumTitle}
              onChange={(e) => setAlbumTitle(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Genre */}
          <div style={{ marginBottom: '24px' }}>
            <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
              <Tag size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Genre
            </label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="input-field"
              style={{ padding: '12px 16px', background: 'var(--surface-elevated)' }}
            >
              <option value="">Select genre...</option>
              <option value="electronic">Electronic</option>
              <option value="hiphop">Hip-Hop</option>
              <option value="rnb">R&amp;B</option>
              <option value="pop">Pop</option>
              <option value="rock">Rock</option>
              <option value="indie">Indie</option>
              <option value="folk">Folk</option>
              <option value="edm">EDM</option>
              <option value="jazz">Jazz</option>
              <option value="classical">Classical</option>
            </select>
          </div>

          {/* Price */}
          <div style={{ marginBottom: '32px' }}>
            <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
              <DollarSign size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Price (USD)
            </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input-field"
              style={{ maxWidth: '200px' }}
            />
          </div>

          <button className="btn btn-primary" onClick={() => setStep(2)}>
            Continue to Tracks
          </button>
        </motion.div>
      )}

      {/* Step 2: Add Tracks */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card"
          style={{ padding: '32px' }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '24px' }}>
            Add Tracks
          </h2>

          {/* Upload area */}
          <div
            style={{
              border: '2px dashed var(--border-default)',
              borderRadius: 'var(--radius-lg)',
              padding: '40px',
              textAlign: 'center',
              marginBottom: '24px',
              cursor: 'pointer',
              transition: 'border-color var(--transition-fast)',
            }}
          >
            <Upload size={40} color="var(--accent-primary)" style={{ margin: '0 auto 12px' }} />
            <p style={{ fontWeight: 600, marginBottom: '4px' }}>
              Drag and drop audio files here
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
              WAV, FLAC, or MP3 — 16-bit/44.1kHz minimum
            </p>
            <button
              className="btn btn-secondary"
              style={{ marginTop: '16px' }}
              onClick={addTrack}
            >
              <Plus size={16} />
              Add Track
            </button>
          </div>

          {/* Track List */}
          {tracks.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              {tracks.map((track, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    background: 'var(--surface-elevated)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '8px',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'var(--bg-tertiary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    {i + 1}
                  </div>
                  <Music2 size={16} color="var(--accent-primary)" />
                  <input
                    type="text"
                    value={track.name}
                    onChange={(e) => {
                      const newTracks = [...tracks];
                      newTracks[i].name = e.target.value;
                      setTracks(newTracks);
                    }}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      fontSize: '0.9375rem',
                      fontWeight: 500,
                    }}
                  />
                  <button
                    onClick={() => removeTrack(i)}
                    style={{ color: 'var(--text-tertiary)', padding: '4px' }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-ghost" onClick={() => setStep(1)}>
              Back
            </button>
            <button className="btn btn-primary" onClick={() => setStep(3)}>
              Review Release
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card"
          style={{ padding: '32px' }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '24px' }}>
            Review &amp; Submit
          </h2>

          <div style={{ marginBottom: '24px' }}>
            <div className="text-label" style={{ marginBottom: '4px' }}>Title</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>{albumTitle || 'Untitled Release'}</div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div className="text-label" style={{ marginBottom: '4px' }}>Type</div>
            <div style={{ textTransform: 'capitalize' }}>{releaseType === 'ep' ? 'EP' : releaseType}</div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div className="text-label" style={{ marginBottom: '4px' }}>Genre</div>
            <div style={{ textTransform: 'capitalize' }}>{genre || 'Not set'}</div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div className="text-label" style={{ marginBottom: '4px' }}>Price</div>
            <div>${price}</div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <div className="text-label" style={{ marginBottom: '4px' }}>Tracks ({tracks.length})</div>
            {tracks.map((t, i) => (
              <div key={i} style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', padding: '4px 0' }}>
                {i + 1}. {t.name}
              </div>
            ))}
            {tracks.length === 0 && (
              <div style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>No tracks added</div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-ghost" onClick={() => setStep(2)}>
              Back
            </button>
            <button
              className="btn btn-primary"
              style={{ padding: '12px 32px' }}
              onClick={() => {
                alert('Release submitted for review! Your music will be live within 24 hours.');
              }}
            >
              <Upload size={16} />
              Submit for Review
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
