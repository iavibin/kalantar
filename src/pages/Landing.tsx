import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon, SearchIcon, GraphIcon, MapIcon, WaveformIcon, ShieldCheckIcon } from '../components/common/Icons';

export const Landing: React.FC = () => {
  return (
    <div className="landing-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Landing Navigation Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(9, 13, 22, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-hairline)'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--saffron-600), var(--gold-500))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(217, 107, 39, 0.35)',
              position: 'relative'
            }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-gold)', zIndex: 2 }}>
                க
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, letterSpacing: '0.08em', color: 'var(--text-primary)' }}>
                KALANTAR
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Digital Orality Preservation
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              to="/portal/search"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, var(--saffron-600), var(--gold-500))',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.88rem',
                letterSpacing: '0.02em',
                boxShadow: '0 4px 15px rgba(217, 107, 39, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <SearchIcon size={16} />
              <span>Enter Orality Portal</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        padding: '90px 0 70px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 0%, rgba(217, 107, 39, 0.18) 0%, rgba(9, 13, 22, 0) 70%)'
      }}>
        <div className="container" style={{ maxWidth: '940px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            fontSize: '0.88rem',
            color: 'var(--text-gold)',
            marginBottom: '24px'
          }}>
            <SparklesIcon size={14} color="var(--gold-400)" />
            <span>National Archive for India's Endangered Oral Traditions</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '3.4rem',
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: '20px'
          }}>
            Voices Across Eras: <br />
            <span style={{
              background: 'linear-gradient(135deg, #fce09b 0%, #e07a5f 50%, #d4af37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Preserving India's Living Heritage
            </span>
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            maxWidth: '760px',
            margin: '0 auto 40px',
            fontWeight: 300
          }}>
            An open-access digital sanctuary safeguarding ancient ballads, matriarchal chants, pastoral epics, and bardic memory across dozens of regional Indian dialects.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', flexWrap: 'wrap' }}>
            <Link
              to="/portal/search"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 34px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, var(--saffron-600), var(--gold-500))',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.05rem',
                boxShadow: '0 6px 24px rgba(217, 107, 39, 0.45)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              <SearchIcon size={20} />
              <span>Explore The Orality Portal</span>
            </Link>

            <a
              href="#pillars"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              <span>Learn More</span>
            </a>
          </div>
        </div>
      </section>

      {/* Preservation Pillars */}
      <section id="pillars" style={{ padding: '96px 0 100px', scrollMarginTop: '80px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.1rem', marginBottom: '10px' }}>
              Archival <span className="text-gold">Core Capabilities</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', maxWidth: '640px', margin: '0 auto' }}>
              Built from the ground up for ethnomusicologists, researchers, and community custodians.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            maxWidth: '920px',
            margin: '0 auto',
            gap: '24px',
            justifyContent: 'center'
          }}>
            <div style={{
              background: 'var(--bg-surface-1)',
              border: '1px solid var(--border-hairline)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'rgba(217, 107, 39, 0.15)', color: 'var(--text-saffron)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SearchIcon size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Faceted Orality Discovery</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Filter across vernacular scripts, dialects, UNESCO endangerment tiers, instrument organologies, and bards.
              </p>
            </div>

            <div style={{
              background: 'var(--bg-surface-1)',
              border: '1px solid var(--border-hairline)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'rgba(212, 175, 55, 0.15)', color: 'var(--text-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <WaveformIcon size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Acoustic Audio & Lyrics Sync</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Synthesized traditional instrument harmonics, interactive waveform scrubbers, and karaoke-style verse followers.
              </p>
            </div>

            <div style={{
              background: 'var(--bg-surface-1)',
              border: '1px solid var(--border-hairline)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'rgba(42, 157, 143, 0.15)', color: '#5eead4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraphIcon size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Thematic Knowledge Graph</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Discover relational bridges connecting epic narratives, thematic motifs, sacred bards, and ancient acoustic instruments.
              </p>
            </div>

            <div style={{
              background: 'var(--bg-surface-1)',
              border: '1px solid var(--border-hairline)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapIcon size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Geographic Cultural Atlas</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Survey ecological zones, desert corridors, river deltas, and tribal highlands where India's oral literatures thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        marginTop: 'auto',
        background: 'var(--bg-surface-1)',
        borderTop: '1px solid var(--border-hairline)',
        padding: '30px 0',
        textAlign: 'center',
        fontSize: '0.84rem',
        color: 'var(--text-muted)'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheckIcon size={16} color="var(--peacock-teal)" />
            <span>Kalantar Digital Orality Preservation Platform</span>
          </div>
          <Link to="/portal" style={{ color: 'var(--text-gold)', fontWeight: 600 }}>
            Launch Discovery Portal →
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
