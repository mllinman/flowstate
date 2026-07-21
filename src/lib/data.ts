// Flowstate — Mock Data Layer
// Simulated music catalog for the platform prototype

export interface Artist {
  id: string;
  name: string;
  image: string;
  bio: string;
  followers: number;
  monthlyListeners: number;
  verified: boolean;
  genres: string[];
}

export interface Track {
  id: string;
  title: string;
  artist: Artist;
  album: Album;
  duration: number; // seconds
  plays: number;
  audioUrl: string;
  explicit: boolean;
  trackNumber: number;
}

export interface Album {
  id: string;
  title: string;
  artist: Artist;
  cover: string;
  releaseDate: string;
  tracks: Track[];
  genre: string;
  type: 'album' | 'single' | 'ep';
  price: number;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  cover: string;
  tracks: Track[];
  curator: string;
  followers: number;
  gradient: string;
}

export interface Genre {
  id: string;
  name: string;
  color: string;
  gradient: string;
  image: string;
}

export interface Ad {
  id: string;
  sponsor: string;
  title: string;
  description: string;
  image: string;
  url: string;
  gradient: string;
}

// --- Mock Artists ---
export const artists: Artist[] = [
  {
    id: 'artist-1',
    name: 'Luna Waves',
    image: '/artists/luna-waves.jpg',
    bio: 'Ethereal electronic producer blending ambient textures with driving beats. Based in Berlin.',
    followers: 1240000,
    monthlyListeners: 3450000,
    verified: true,
    genres: ['Electronic', 'Ambient'],
  },
  {
    id: 'artist-2',
    name: 'Midnight Circuit',
    image: '/artists/midnight-circuit.jpg',
    bio: 'Synthwave duo creating retro-futuristic soundscapes. Inspired by neon cities and digital dreams.',
    followers: 890000,
    monthlyListeners: 2100000,
    verified: true,
    genres: ['Synthwave', 'Electronic'],
  },
  {
    id: 'artist-3',
    name: 'Aisha Gold',
    image: '/artists/aisha-gold.jpg',
    bio: 'R&B vocalist and songwriter known for smooth harmonies and introspective lyrics.',
    followers: 2300000,
    monthlyListeners: 5200000,
    verified: true,
    genres: ['R&B', 'Soul'],
  },
  {
    id: 'artist-4',
    name: 'The Velvet Underground Revival',
    image: '/artists/velvet-underground.jpg',
    bio: 'Indie rock collective pushing boundaries with experimental arrangements and raw energy.',
    followers: 560000,
    monthlyListeners: 980000,
    verified: true,
    genres: ['Indie Rock', 'Alternative'],
  },
  {
    id: 'artist-5',
    name: 'DJ Quantum',
    image: '/artists/dj-quantum.jpg',
    bio: 'High-energy DJ and producer. Resident at top clubs worldwide. Bass music innovator.',
    followers: 3100000,
    monthlyListeners: 7800000,
    verified: true,
    genres: ['EDM', 'Bass'],
  },
  {
    id: 'artist-6',
    name: 'Sierra Nova',
    image: '/artists/sierra-nova.jpg',
    bio: 'Folk-pop singer-songwriter from Nashville. Stories told through acoustic melodies.',
    followers: 670000,
    monthlyListeners: 1500000,
    verified: true,
    genres: ['Folk', 'Pop'],
  },
  {
    id: 'artist-7',
    name: 'Kuro',
    image: '/artists/kuro.jpg',
    bio: 'Japanese-American hip-hop artist blending trap with traditional Japanese instrumentation.',
    followers: 1800000,
    monthlyListeners: 4200000,
    verified: true,
    genres: ['Hip-Hop', 'Trap'],
  },
  {
    id: 'artist-8',
    name: 'Glass Patterns',
    image: '/artists/glass-patterns.jpg',
    bio: 'Post-rock band crafting expansive cinematic soundscapes with layered guitars.',
    followers: 420000,
    monthlyListeners: 750000,
    verified: false,
    genres: ['Post-Rock', 'Ambient'],
  },
];

// Helper to build albums and tracks with circular references
function buildAlbum(
  id: string,
  title: string,
  artist: Artist,
  cover: string,
  releaseDate: string,
  genre: string,
  type: 'album' | 'single' | 'ep',
  price: number,
  trackNames: string[]
): Album {
  const album: Album = {
    id,
    title,
    artist,
    cover,
    releaseDate,
    genre,
    type,
    price,
    tracks: [],
  };

  album.tracks = trackNames.map((name, i) => ({
    id: `${id}-track-${i + 1}`,
    title: name,
    artist,
    album,
    duration: 180 + Math.floor(Math.random() * 120), // 3-5 min
    plays: Math.floor(Math.random() * 50000000),
    audioUrl: `/audio/sample.mp3`,
    explicit: Math.random() > 0.7,
    trackNumber: i + 1,
  }));

  return album;
}

// --- Mock Albums ---
export const albums: Album[] = [
  buildAlbum('album-1', 'Neon Horizons', artists[0], '/covers/neon-horizons.jpg', '2025-11-15', 'Electronic', 'album', 12.99, [
    'First Light', 'Neon Horizons', 'Digital Rain', 'Pulse of the City', 'Lucid Dreams',
    'Afterglow', 'Starlight Protocol', 'Waveform', 'Midnight Cascade', 'Into the Void',
  ]),
  buildAlbum('album-2', 'Chrome Sunset', artists[1], '/covers/chrome-sunset.jpg', '2025-09-22', 'Synthwave', 'album', 11.99, [
    'Chrome Sunset', 'Neon Driver', 'Retrograde', 'Digital Horizon', 'Night Cruiser',
    'Vapor Trail', 'Electric Dreams', 'Cyberpunk Lullaby',
  ]),
  buildAlbum('album-3', 'Golden Hour', artists[2], '/covers/golden-hour.jpg', '2026-01-10', 'R&B', 'album', 13.99, [
    'Golden Hour', 'Velvet Skin', 'Midnight Confessions', 'Honey Drip', 'Worth It',
    'Eclipse', 'Burning Slow', 'Tell Me Why', 'Afterparty', 'Morning After',
  ]),
  buildAlbum('album-4', 'Static Bloom', artists[3], '/covers/static-bloom.jpg', '2025-07-30', 'Indie Rock', 'album', 10.99, [
    'Static Bloom', 'Paper Walls', 'Telescope', 'Satellite Hearts', 'Dissolve',
    'Broken Frequency', 'Glass Ocean',
  ]),
  buildAlbum('album-5', 'Quantum Drop', artists[4], '/covers/quantum-drop.jpg', '2026-03-01', 'EDM', 'album', 14.99, [
    'Quantum Drop', 'Bass Reactor', 'Frequency Shift', 'Supernova', 'Dark Matter',
    'Particle Wave', 'Event Horizon', 'Singularity', 'Antimatter', 'Big Bang',
  ]),
  buildAlbum('album-6', 'Wildflower', artists[5], '/covers/wildflower.jpg', '2025-05-18', 'Folk', 'album', 9.99, [
    'Wildflower', 'Riverside', 'Old Photographs', 'Tennessee Sky', 'Winding Road',
    'Porchlight', 'Harvest Moon', 'Roots Run Deep',
  ]),
  buildAlbum('album-7', 'Shadow Samurai', artists[6], '/covers/shadow-samurai.jpg', '2026-02-14', 'Hip-Hop', 'album', 12.99, [
    'Shadow Samurai', 'Tokyo Drift', 'Ronin', 'Dragon Fire', 'Zen Garden',
    'Blade Runner', 'Sakura Storm', 'Paper Crane', 'Bushido',
  ]),
  buildAlbum('album-8', 'Atmospheric Pressure', artists[7], '/covers/atmospheric.jpg', '2025-12-01', 'Post-Rock', 'ep', 7.99, [
    'Atmospheric Pressure', 'Tectonic Shift', 'Cloud Atlas', 'Gravity Well',
  ]),
  buildAlbum('album-9', 'Midnight Express', artists[1], '/covers/midnight-express.jpg', '2026-06-01', 'Synthwave', 'single', 1.99, [
    'Midnight Express',
  ]),
  buildAlbum('album-10', 'Liquid Gold', artists[2], '/covers/liquid-gold.jpg', '2026-04-20', 'R&B', 'single', 1.99, [
    'Liquid Gold',
  ]),
];

// Flat list of all tracks
export const allTracks: Track[] = albums.flatMap((a) => a.tracks);

// --- Mock Playlists ---
export const playlists: Playlist[] = [
  {
    id: 'pl-1',
    title: 'Flow State',
    description: 'Get into the zone with these focus-enhancing tracks.',
    cover: '/playlists/flow-state.jpg',
    tracks: [allTracks[0], allTracks[5], allTracks[20], allTracks[30], allTracks[35]],
    curator: 'Flowstate',
    followers: 1250000,
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
  },
  {
    id: 'pl-2',
    title: 'Night Drive',
    description: 'Synthwave and electronic for late night cruising.',
    cover: '/playlists/night-drive.jpg',
    tracks: [allTracks[8], allTracks[9], allTracks[10], allTracks[60], allTracks[2]],
    curator: 'Flowstate',
    followers: 890000,
    gradient: 'linear-gradient(135deg, #f472b6 0%, #8b5cf6 100%)',
  },
  {
    id: 'pl-3',
    title: 'Golden Vibes',
    description: 'Smooth R&B and soul to set the mood.',
    cover: '/playlists/golden-vibes.jpg',
    tracks: [allTracks[18], allTracks[19], allTracks[20], allTracks[21], allTracks[22]],
    curator: 'Flowstate',
    followers: 2100000,
    gradient: 'linear-gradient(135deg, #fb923c 0%, #f472b6 100%)',
  },
  {
    id: 'pl-4',
    title: 'Indie Underground',
    description: 'Discover the best indie and alternative tracks.',
    cover: '/playlists/indie-underground.jpg',
    tracks: [allTracks[28], allTracks[29], allTracks[30], allTracks[31], allTracks[32]],
    curator: 'Flowstate',
    followers: 560000,
    gradient: 'linear-gradient(135deg, #06d6a0 0%, #3b82f6 100%)',
  },
  {
    id: 'pl-5',
    title: 'Bass Drop',
    description: 'High-energy bass and EDM bangers.',
    cover: '/playlists/bass-drop.jpg',
    tracks: [allTracks[35], allTracks[36], allTracks[37], allTracks[38], allTracks[39]],
    curator: 'Flowstate',
    followers: 3400000,
    gradient: 'linear-gradient(135deg, #ef4444 0%, #fb923c 100%)',
  },
  {
    id: 'pl-6',
    title: 'Acoustic Sunrise',
    description: 'Gentle acoustic and folk for peaceful mornings.',
    cover: '/playlists/acoustic-sunrise.jpg',
    tracks: [allTracks[45], allTracks[46], allTracks[47], allTracks[48], allTracks[0]],
    curator: 'Flowstate',
    followers: 780000,
    gradient: 'linear-gradient(135deg, #fbbf24 0%, #06d6a0 100%)',
  },
];

// --- Genres ---
export const genres: Genre[] = [
  { id: 'electronic', name: 'Electronic', color: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)', image: '/genres/electronic.jpg' },
  { id: 'hiphop', name: 'Hip-Hop', color: '#ef4444', gradient: 'linear-gradient(135deg, #ef4444 0%, #fb923c 100%)', image: '/genres/hiphop.jpg' },
  { id: 'rnb', name: 'R&B', color: '#f472b6', gradient: 'linear-gradient(135deg, #f472b6 0%, #8b5cf6 100%)', image: '/genres/rnb.jpg' },
  { id: 'pop', name: 'Pop', color: '#06d6a0', gradient: 'linear-gradient(135deg, #06d6a0 0%, #3b82f6 100%)', image: '/genres/pop.jpg' },
  { id: 'rock', name: 'Rock', color: '#fb923c', gradient: 'linear-gradient(135deg, #fb923c 0%, #ef4444 100%)', image: '/genres/rock.jpg' },
  { id: 'indie', name: 'Indie', color: '#a78bfa', gradient: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)', image: '/genres/indie.jpg' },
  { id: 'folk', name: 'Folk', color: '#fbbf24', gradient: 'linear-gradient(135deg, #fbbf24 0%, #06d6a0 100%)', image: '/genres/folk.jpg' },
  { id: 'edm', name: 'EDM', color: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', image: '/genres/edm.jpg' },
  { id: 'jazz', name: 'Jazz', color: '#14b8a6', gradient: 'linear-gradient(135deg, #14b8a6 0%, #8b5cf6 100%)', image: '/genres/jazz.jpg' },
  { id: 'classical', name: 'Classical', color: '#d4d4d8', gradient: 'linear-gradient(135deg, #d4d4d8 0%, #a1a1aa 100%)', image: '/genres/classical.jpg' },
  { id: 'metal', name: 'Metal', color: '#71717a', gradient: 'linear-gradient(135deg, #71717a 0%, #18181b 100%)', image: '/genres/metal.jpg' },
  { id: 'latin', name: 'Latin', color: '#f97316', gradient: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)', image: '/genres/latin.jpg' },
];

// --- Mock Ads ---
export const ads: Ad[] = [
  {
    id: 'ad-1',
    sponsor: 'Sony WH-1000XM6',
    title: 'Hear Every Detail',
    description: 'Industry-leading noise cancellation. Experience music like never before.',
    image: '/ads/sony-headphones.jpg',
    url: '#',
    gradient: 'linear-gradient(135deg, #1e1e2e 0%, #2d1b69 100%)',
  },
  {
    id: 'ad-2',
    sponsor: 'Fender Player Plus',
    title: 'Your Sound. Amplified.',
    description: 'The new Player Plus series — modern features, classic tone.',
    image: '/ads/fender-guitar.jpg',
    url: '#',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  },
  {
    id: 'ad-3',
    sponsor: 'Splice',
    title: 'Unlimited Sounds',
    description: 'Access millions of samples, loops, and presets. Start creating today.',
    image: '/ads/splice.jpg',
    url: '#',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  },
];

// --- Helper Functions ---
export function formatDuration(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toString();
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
