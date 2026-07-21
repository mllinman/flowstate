'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Music2, Mail, Lock, User, ArrowRight, Headphones, Mic2 } from 'lucide-react';
import Link from 'next/link';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState<'listener' | 'artist'>('listener');

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        background: 'var(--bg-primary)',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '30%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(6, 214, 160, 0.05)',
          filter: 'blur(100px)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Music2 size={24} color="white" />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
            Flowstate
          </span>
        </div>

        <div className="glass-card" style={{ padding: '32px' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, textAlign: 'center', marginBottom: '8px' }}>
            Create Account
          </h1>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9375rem' }}>
            Join the Flowstate community
          </p>

          {/* Account Type Toggle */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginBottom: '24px',
            }}
          >
            <button
              onClick={() => setAccountType('listener')}
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                background: accountType === 'listener' ? 'rgba(139,92,246,0.15)' : 'var(--surface-elevated)',
                border: `1px solid ${accountType === 'listener' ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                transition: 'all var(--transition-fast)',
              }}
            >
              <Headphones size={24} color={accountType === 'listener' ? 'var(--accent-primary)' : 'var(--text-secondary)'} />
              <span style={{ fontWeight: 600, fontSize: '0.875rem', color: accountType === 'listener' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                Listener
              </span>
            </button>
            <button
              onClick={() => setAccountType('artist')}
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                background: accountType === 'artist' ? 'rgba(6,214,160,0.15)' : 'var(--surface-elevated)',
                border: `1px solid ${accountType === 'artist' ? 'var(--accent-secondary)' : 'var(--border-subtle)'}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                transition: 'all var(--transition-fast)',
              }}
            >
              <Mic2 size={24} color={accountType === 'artist' ? 'var(--accent-secondary)' : 'var(--text-secondary)'} />
              <span style={{ fontWeight: 600, fontSize: '0.875rem', color: accountType === 'artist' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                Artist
              </span>
            </button>
          </div>

          {/* Name */}
          <div style={{ marginBottom: '16px', position: 'relative' }}>
            <User
              size={18}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-tertiary)',
              }}
            />
            <input
              type="text"
              placeholder={accountType === 'artist' ? 'Artist / Band name' : 'Display name'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '44px' }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '16px', position: 'relative' }}>
            <Mail
              size={18}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-tertiary)',
              }}
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '44px' }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '24px', position: 'relative' }}>
            <Lock
              size={18}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-tertiary)',
              }}
            />
            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '44px' }}
            />
          </div>

          {accountType === 'artist' && (
            <div
              style={{
                background: 'rgba(6,214,160,0.08)',
                border: '1px solid rgba(6,214,160,0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                marginBottom: '24px',
                fontSize: '0.8125rem',
                color: 'var(--accent-secondary)',
              }}
            >
              Artist accounts require approval. You will be able to upload music once your application is reviewed.
            </div>
          )}

          {/* Sign Up Button */}
          <Link
            href="/dashboard"
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', justifyContent: 'center', fontSize: '1rem' }}
          >
            {accountType === 'artist' ? 'Apply as Artist' : 'Create Account'}
            <ArrowRight size={18} />
          </Link>

          {/* Terms */}
          <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.75rem', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        {/* Login Link */}
        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link href="/auth/login" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
            Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
