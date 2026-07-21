'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Music2, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '30%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(139, 92, 246, 0.06)',
          filter: 'blur(100px)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: '100%',
          maxWidth: '420px',
          position: 'relative',
          zIndex: 1,
        }}
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
            Welcome Back
          </h1>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '0.9375rem' }}>
            Sign in to continue listening
          </p>

          {/* Social Auth */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            <button className="btn btn-secondary" style={{ width: '100%', padding: '12px', justifyContent: 'center' }}>
              Continue with Google
            </button>
            <button className="btn btn-secondary" style={{ width: '100%', padding: '12px', justifyContent: 'center' }}>
              Continue with Apple
            </button>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
          </div>

          {/* Email Input */}
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

          {/* Password Input */}
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
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '44px', paddingRight: '44px' }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-tertiary)',
                padding: '4px',
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Sign In Button */}
          <Link
            href="/dashboard"
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', justifyContent: 'center', fontSize: '1rem' }}
          >
            Sign In
            <ArrowRight size={18} />
          </Link>

          {/* Forgot Password */}
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button style={{ fontSize: '0.8125rem', color: 'var(--accent-primary)' }}>
              Forgot password?
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
          New to Flowstate?{' '}
          <Link href="/auth/signup" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
            Create account
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
