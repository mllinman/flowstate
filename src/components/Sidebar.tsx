'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Search,
  Library,
  Compass,
  PlusCircle,
  Heart,
  Radio,
  Music2,
  BarChart3,
  Upload,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

const mainNav = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/browse', label: 'Browse', icon: Compass },
  { href: '/library', label: 'Library', icon: Library },
];

const libraryNav = [
  { href: '/library?tab=playlists', label: 'Playlists', icon: Music2 },
  { href: '/library?tab=liked', label: 'Liked Songs', icon: Heart },
  { href: '/library?tab=stations', label: 'Stations', icon: Radio },
];

const artistNav = [
  { href: '/artist-dashboard', label: 'Artist Hub', icon: BarChart3 },
  { href: '/artist-dashboard/upload', label: 'Upload', icon: Upload },
  { href: '/artist-dashboard/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="sidebar"
      style={{
        width: collapsed ? '72px' : 'var(--sidebar-width)',
        minWidth: collapsed ? '72px' : 'var(--sidebar-width)',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 'var(--z-sticky)' as unknown as number,
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width var(--transition-default), min-width var(--transition-default)',
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: collapsed ? '20px 16px' : '20px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Music2 size={20} color="white" />
        </div>
        {!collapsed && (
          <span
            style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              whiteSpace: 'nowrap',
            }}
          >
            Flowstate
          </span>
        )}
      </div>

      {/* Main Nav */}
      <nav style={{ padding: '16px 12px', flex: 1, overflowY: 'auto' }}>
        <div style={{ marginBottom: '24px' }}>
          {mainNav.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: collapsed ? '12px' : '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '2px',
                  background: isActive ? 'var(--surface-elevated)' : 'transparent',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '0.9375rem',
                  transition: 'all var(--transition-fast)',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  position: 'relative',
                }}
              >
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      left: collapsed ? '50%' : '0',
                      transform: collapsed ? 'translateX(-50%)' : 'none',
                      top: collapsed ? 'auto' : '50%',
                      bottom: collapsed ? '-2px' : 'auto',
                      ...(collapsed
                        ? { width: '20px', height: '2px' }
                        : {
                            width: '3px',
                            height: '20px',
                            transform: 'translateY(-50%)',
                          }),
                      background: 'var(--accent-primary)',
                      borderRadius: 'var(--radius-full)',
                    }}
                  />
                )}
                <item.icon size={20} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>

        {/* Library Section */}
        {!collapsed && (
          <>
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-tertiary)',
                padding: '0 14px',
                marginBottom: '8px',
              }}
            >
              Your Library
            </div>
            {libraryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '2px',
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Create Playlist Button */}
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                marginTop: '4px',
                color: 'var(--text-tertiary)',
                fontSize: '0.875rem',
                width: '100%',
                transition: 'all var(--transition-fast)',
              }}
            >
              <PlusCircle size={18} />
              <span>Create Playlist</span>
            </button>

            {/* Divider */}
            <div
              style={{
                height: '1px',
                background: 'var(--border-subtle)',
                margin: '16px 14px',
              }}
            />

            {/* Artist Section */}
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-tertiary)',
                padding: '0 14px',
                marginBottom: '8px',
              }}
            >
              For Artists
            </div>
            {artistNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '2px',
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </>
        )}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          padding: '12px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-tertiary)',
          transition: 'color var(--transition-fast)',
        }}
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </aside>
  );
}
