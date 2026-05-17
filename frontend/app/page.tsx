'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getJobs, JobRequest } from '@/lib/api';

const CATEGORIES = ['All', 'Plumbing', 'Electrical', 'Painting', 'Joinery', 'Other'];

const CATEGORY_ICONS: Record<string, string> = {
  Plumbing: '🔧', Electrical: '⚡', Painting: '🎨', Joinery: '🪵', Other: '🔨',
};

const STATUS_STYLE: Record<string, { color: string; bg: string; dot: string }> = {
  Open:          { color: '#00b894', bg: '#e8fdf5', dot: '#00b894' },
  'In Progress': { color: '#d68910', bg: '#fffbee', dot: '#fdcb6e' },
  Closed:        { color: '#888',    bg: '#f4f4f9', dot: '#b2b2cc' },
};

export default function HomePage() {
  const [jobs, setJobs] = useState<JobRequest[]>([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    getJobs(category !== 'All' ? { category } : {})
      .then(setJobs)
      .catch(() => setError('Could not load jobs. Is the backend running?'))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
        borderRadius: '16px', padding: '48px 40px', marginBottom: '40px',
        position: 'relative', overflow: 'hidden',
      }}>
        <p style={{ color: '#e94560', fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>
          Find a Tradesperson
        </p>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2.2rem', color: '#fff', marginBottom: '12px', lineHeight: 1.2 }}>
          Service Requests
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', maxWidth: '480px' }}>
          Browse open requests from homeowners and offer your services.
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <p style={{ color: '#6b6b8a', fontSize: '0.9rem' }}>
          {loading ? 'Loading...' : `${jobs.length} request${jobs.length !== 1 ? 's' : ''} found`}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '0.85rem', color: '#6b6b8a', fontWeight: 500 }}>Filter:</label>
          <select value={category} onChange={e => setCategory(e.target.value)} style={{
            border: '1.5px solid #e8e8f0', borderRadius: '8px', padding: '8px 14px',
            fontSize: '0.875rem', background: '#fff', color: '#1a1a2e', cursor: 'pointer', outline: 'none',
          }}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {error && (
        <div style={{ background: '#fff0f3', border: '1px solid #ffc0cb', borderRadius: '10px', padding: '16px', color: '#e94560', marginBottom: '24px' }}>
          {error}
        </div>
      )}

      {!loading && !error && jobs.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#6b6b8a' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📋</div>
          <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>No requests found</p>
          <Link href="/jobs/new" style={{ color: '#e94560', fontWeight: 600 }}>Post the first one →</Link>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {jobs.map(job => {
          const s = STATUS_STYLE[job.status] || STATUS_STYLE.Closed;
          return (
            <Link key={job._id} href={`/jobs/${job._id}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#fff', borderRadius: '14px', border: '1.5px solid #e8e8f0',
                padding: '24px', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column',
              }}
              onMouseOver={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(26,26,46,0.10)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; }}
              onMouseOut={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <span style={{ fontSize: '1.6rem' }}>{CATEGORY_ICONS[job.category] || '🔨'}</span>
                  <span style={{ background: s.bg, color: s.color, fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: s.dot, display: 'inline-block' }} />
                    {job.status}
                  </span>
                </div>
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#1a1a2e', marginBottom: '8px', lineHeight: 1.3 }}>
                  {job.title}
                </h2>
                <p style={{ fontSize: '0.875rem', color: '#6b6b8a', lineHeight: 1.6, marginBottom: '16px', flex: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {job.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', borderTop: '1px solid #e8e8f0', paddingTop: '14px' }}>
                  {job.category && <span style={{ background: '#f7f7fb', color: '#1a1a2e', fontSize: '0.75rem', fontWeight: 600, padding: '3px 10px', borderRadius: '6px', border: '1px solid #e8e8f0' }}>{job.category}</span>}
                  {job.location && <span style={{ fontSize: '0.78rem', color: '#6b6b8a' }}>📍 {job.location}</span>}
                  <span style={{ fontSize: '0.78rem', color: '#6b6b8a', marginLeft: 'auto' }}>{new Date(job.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
