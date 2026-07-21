'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Music2,
  Headphones,
  Radio,
  ShoppingBag,
  BarChart3,
  Upload,
  Play,
  ChevronRight,
  Zap,
  Shield,
  Globe,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

// Pre-computed waveform bar data (avoids Math.random during render)
const WAVE_BARS = Array.from({ length: 40 }, (_, i) => ({
  opacity: 0.3 + (((i * 7 + 3) % 10) / 10) * 0.7,
  speed: 0.5 + (((i * 13 + 5) % 10) / 10) * 0.8,
  height: 15 + (((i * 11 + 7) % 10) / 10) * 45,
}));

const features = [
  {
    icon: Headphones,
    title: 'Stream Unlimited',
    description: 'Access millions of tracks in high fidelity. Ad-supported free tier or go Premium.',
    gradient: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
  },
  {
    icon: Radio,
    title: 'Smart Stations',
    description: 'AI-powered radio stations that learn your taste. Discover music you will love.',
    gradient: 'linear-gradient(135deg, #06d6a0, #3b82f6)',
  },
  {
    icon: ShoppingBag,
    title: 'Buy & Own',
    description: 'Purchase tracks and albums to own forever. Support artists directly.',
    gradient: 'linear-gradient(135deg, #f472b6, #fb923c)',
  },
  {
    icon: Upload,
    title: 'Artist Distribution',
    description: 'Upload your music, set your price, reach listeners worldwide.',
    gradient: 'linear-gradient(135deg, #fb923c, #ef4444)',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Track plays, revenue, and listener demographics in real time.',
    gradient: 'linear-gradient(135deg, #14b8a6, #8b5cf6)',
  },
  {
    icon: Shield,
    title: 'Curated Quality',
    description: 'Every artist is vetted. Every track meets our quality standards.',
    gradient: 'linear-gradient(135deg, #a78bfa, #f472b6)',
  },
];

const stats = [
  { value: '10M+', label: 'Tracks' },
  { value: '500K+', label: 'Artists' },
  { value: '50M+', label: 'Listeners' },
  { value: '190+', label: 'Countries' },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', overflow: 'hidden' }}>
      {/* ---- Navigation Bar ---- */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(5,5,7,0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Music2 size={20} color="white" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
            Flowstate
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link
            href="/browse"
            style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', fontWeight: 500 }}
          >
            Browse
          </Link>
          <Link
            href="/artist-dashboard"
            style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', fontWeight: 500 }}
          >
            For Artists
          </Link>
          <Link
            href="/auth/login"
            style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', fontWeight: 500 }}
          >
            Sign In
          </Link>
          <Link href="/dashboard" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.875rem' }}>
            Start Listening
          </Link>
        </div>
      </nav>

      {/* ---- Hero Section ---- */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '120px 32px 80px',
        }}
      >
        {/* Background effects */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--gradient-hero)',
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(139, 92, 246, 0.08)',
            filter: 'blur(100px)',
            animation: 'pulse-glow 6s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '15%',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'rgba(6, 214, 160, 0.06)',
            filter: 'blur(80px)',
            animation: 'pulse-glow 8s ease-in-out infinite 2s',
          }}
        />

        <div
          style={{
            maxWidth: '900px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
          >
            <span
              className="badge badge-accent"
              style={{ marginBottom: '24px', display: 'inline-flex', gap: '6px' }}
            >
              <Zap size={12} /> Now in Beta
            </span>
          </motion.div>

          <motion.h1
            className="text-display"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            style={{ marginBottom: '24px' }}
          >
            Your Music.{' '}
            <span className="text-gradient">Your Flow.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            style={{
              fontSize: '1.25rem',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '0 auto 40px',
              lineHeight: 1.6,
            }}
          >
            The modern platform for music distribution and listening.
            Stream, discover, and purchase music from approved artists worldwide.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link href="/dashboard" className="btn btn-primary" style={{ padding: '14px 36px', fontSize: '1rem' }}>
              <Play size={18} fill="white" />
              Start Listening Free
            </Link>
            <Link href="/artist-dashboard" className="btn btn-secondary" style={{ padding: '14px 36px', fontSize: '1rem' }}>
              Join as Artist
              <ChevronRight size={18} />
            </Link>
          </motion.div>

          {/* Animated Waveform */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            style={{
              marginTop: '60px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: '4px',
              height: '60px',
            }}
          >
            {WAVE_BARS.map((bar, i) => (
              <div
                key={i}
                style={{
                  width: '4px',
                  borderRadius: '2px',
                  background: `linear-gradient(180deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)`,
                  opacity: bar.opacity,
                  animation: `wave-animation ${bar.speed}s ease-in-out infinite`,
                  animationDelay: `${i * 0.05}s`,
                  height: `${bar.height}px`,
                }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---- Stats Bar ---- */}
      <section
        style={{
          padding: '40px 32px',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-secondary)',
        }}
      >
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
            textAlign: 'center',
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className="text-gradient"
                style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1 }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---- Features Grid ---- */}
      <section style={{ padding: '100px 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '64px' }}
          >
            <h2 className="text-h1" style={{ marginBottom: '16px' }}>
              Everything You Need
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
              Whether you're a listener or an artist, Flowstate has the tools to elevate your experience.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px',
            }}
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card"
                style={{ padding: '28px' }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: feature.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <feature.icon size={22} color="white" />
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '8px' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- For Artists CTA ---- */}
      <section
        style={{
          padding: '100px 32px',
          background: 'var(--bg-secondary)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'rgba(139, 92, 246, 0.05)',
            filter: 'blur(100px)',
          }}
        />

        <div
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Globe size={48} color="var(--accent-secondary)" style={{ margin: '0 auto 24px' }} />
            <h2 className="text-h1" style={{ marginBottom: '16px' }}>
              Distribute Your Music{' '}
              <span className="text-gradient">Worldwide</span>
            </h2>
            <p
              style={{
                fontSize: '1.125rem',
                color: 'var(--text-secondary)',
                marginBottom: '40px',
                lineHeight: 1.6,
              }}
            >
              Apply to become an approved Flowstate artist. Upload your tracks, set your pricing,
              and reach millions of listeners across 190+ countries. Keep more of your revenue.
            </p>
            <Link href="/artist-dashboard" className="btn btn-primary" style={{ padding: '14px 40px', fontSize: '1rem' }}>
              Apply as Artist
              <ChevronRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer
        style={{
          padding: '48px 32px',
          borderTop: '1px solid var(--border-subtle)',
          background: 'var(--bg-primary)',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '40px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'var(--gradient-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Music2 size={16} color="white" />
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>Flowstate</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
              The modern platform for music distribution and listening.
            </p>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '12px', fontSize: '0.875rem' }}>Platform</h4>
            {['Browse', 'Search', 'Playlists', 'Charts', 'New Releases'].map((item) => (
              <div key={item} style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                {item}
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '12px', fontSize: '0.875rem' }}>For Artists</h4>
            {['Artist Hub', 'Upload Music', 'Analytics', 'Pricing', 'Apply'].map((item) => (
              <div key={item} style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                {item}
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '12px', fontSize: '0.875rem' }}>Company</h4>
            {['About', 'Careers', 'Press', 'Contact', 'Legal'].map((item) => (
              <div key={item} style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            maxWidth: '1100px',
            margin: '40px auto 0',
            paddingTop: '24px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem',
            color: 'var(--text-tertiary)',
          }}
        >
          <span>© 2026 Flowstate. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Cookies</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
