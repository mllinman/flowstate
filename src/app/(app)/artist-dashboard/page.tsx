'use client';

import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Music2,
  Upload,
  Play,
  Eye,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { albums, artists, formatNumber } from '@/lib/data';
import Link from 'next/link';

const artist = artists[0]; // Simulated logged-in artist
const artistAlbums = albums.filter((a) => a.artist.id === artist.id);
const totalStreams = artistAlbums
  .flatMap((a) => a.tracks)
  .reduce((sum, t) => sum + t.plays, 0);

const stats = [
  {
    label: 'Total Streams',
    value: formatNumber(totalStreams),
    change: '+12.5%',
    positive: true,
    icon: Play,
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
  },
  {
    label: 'Monthly Listeners',
    value: formatNumber(artist.monthlyListeners),
    change: '+8.3%',
    positive: true,
    icon: Users,
    gradient: 'linear-gradient(135deg, #06d6a0 0%, #3b82f6 100%)',
  },
  {
    label: 'Revenue',
    value: '$12,847',
    change: '+23.1%',
    positive: true,
    icon: DollarSign,
    gradient: 'linear-gradient(135deg, #fb923c 0%, #f472b6 100%)',
  },
  {
    label: 'Followers',
    value: formatNumber(artist.followers),
    change: '+5.7%',
    positive: true,
    icon: Eye,
    gradient: 'linear-gradient(135deg, #f472b6 0%, #8b5cf6 100%)',
  },
];

const recentActivity = [
  { type: 'stream', text: '"First Light" was added to "Flow State" playlist', time: '2 hours ago' },
  { type: 'follower', text: '1,234 new followers this week', time: '5 hours ago' },
  { type: 'revenue', text: 'Monthly payout of $3,240.50 processed', time: '1 day ago' },
  { type: 'milestone', text: '"Neon Horizons" reached 10M total streams', time: '2 days ago' },
  { type: 'feature', text: 'Featured on "Electronic Essentials" editorial', time: '3 days ago' },
];

export default function ArtistDashboard() {
  return (
    <div className="page-content">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '40px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h1 className="text-h1">
            Artist Hub
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            Welcome back, <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{artist.name}</span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href="/artist-dashboard/upload" className="btn btn-primary" style={{ padding: '10px 24px' }}>
            <Upload size={16} />
            Upload Music
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '40px',
        }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card"
            style={{ padding: '24px' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: stat.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <stat.icon size={18} color="white" />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: stat.positive ? 'var(--accent-secondary)' : '#ef4444',
                }}
              >
                {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '2px' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Two-column layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '40px',
        }}
      >
        {/* Streaming Analytics Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card"
          style={{ padding: '24px' }}
        >
          <div className="section-header" style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.125rem' }}>
              <BarChart3 size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Streams Over Time
            </h2>
          </div>
          {/* Chart visualization */}
          <div
            style={{
              height: '200px',
              display: 'flex',
              alignItems: 'flex-end',
              gap: '8px',
              padding: '0 4px',
            }}
          >
            {[35, 42, 58, 45, 62, 78, 85, 72, 90, 68, 95, 88].map((val, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${val}%`,
                  background: 'var(--gradient-primary)',
                  borderRadius: '4px 4px 0 0',
                  opacity: 0.6 + (i / 12) * 0.4,
                  transition: 'height 0.5s ease',
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '8px',
              fontSize: '0.6875rem',
              color: 'var(--text-tertiary)',
            }}
          >
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </motion.div>

        {/* Top Countries */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card"
          style={{ padding: '24px' }}
        >
          <div className="section-header" style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.125rem' }}>
              <Globe size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Top Countries
            </h2>
          </div>
          {[
            { country: 'United States', pct: 32 },
            { country: 'United Kingdom', pct: 18 },
            { country: 'Germany', pct: 14 },
            { country: 'Canada', pct: 11 },
            { country: 'Japan', pct: 8 },
            { country: 'Australia', pct: 6 },
            { country: 'France', pct: 5 },
          ].map((item) => (
            <div
              key={item.country}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px',
              }}
            >
              <div
                style={{
                  width: '140px',
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  flexShrink: 0,
                }}
              >
                {item.country}
              </div>
              <div
                style={{
                  flex: 1,
                  height: '8px',
                  background: 'var(--surface-elevated)',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${item.pct}%`,
                    height: '100%',
                    background: 'var(--gradient-primary)',
                    borderRadius: 'var(--radius-full)',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  width: '36px',
                  textAlign: 'right',
                }}
              >
                {item.pct}%
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Your Releases */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginBottom: '40px' }}
      >
        <div className="section-header">
          <h2>Your Releases</h2>
          <Link
            href="/artist-dashboard/upload"
            style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}
          >
            Manage releases
          </Link>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '12px',
          }}
        >
          {artistAlbums.map((album) => (
            <div
              key={album.id}
              className="glass-card"
              style={{
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--radius-md)',
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
                {album.title.slice(0, 2).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{album.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  {album.type === 'album' ? 'Album' : album.type === 'ep' ? 'EP' : 'Single'} · {album.tracks.length} tracks
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                  {formatNumber(album.tracks.reduce((s, t) => s + t.plays, 0))}
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>streams</div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Recent Activity */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <div className="section-header">
          <h2>Recent Activity</h2>
        </div>
        <div className="glass-card" style={{ padding: '8px 0' }}>
          {recentActivity.map((activity, i) => (
            <div
              key={i}
              style={{
                padding: '14px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: i < recentActivity.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background:
                      activity.type === 'stream'
                        ? 'var(--accent-primary)'
                        : activity.type === 'revenue'
                        ? 'var(--accent-secondary)'
                        : activity.type === 'milestone'
                        ? 'var(--accent-orange)'
                        : 'var(--accent-tertiary)',
                  }}
                />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {activity.text}
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
