'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getJob, updateJobStatus, deleteJob, JobRequest } from '@/lib/api';

const STATUSES = ['Open', 'In Progress', 'Closed'];

const STATUS_STYLE: Record<string, { color: string; bg: string; dot: string }> = {
  Open:          { color: '#00b894', bg: '#e8fdf5', dot: '#00b894' },
  'In Progress': { color: '#d68910', bg: '#fffbee', dot: '#fdcb6e' },
  Closed:        { color: '#888',    bg: '#f4f4f9', dot: '#b2b2cc' },
};

const CATEGORY_ICONS: Record<string, string> = {
  Plumbing: '🔧', Electrical: '⚡', Painting: '🎨', Joinery: '🪵', Other: '🔨',
};

export default function JobDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [job, setJob] = useState<JobRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getJob(id).then(setJob).catch(() => setError('Job not found.')).finally(() => setLoading(false));
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    if (!job) return;
    setUpdating(true);
    try {
      const updated = await updateJobStatus(id, newStatus);
      setJob(updated);
    } catch { alert('Failed to update status'); }
    finally { setUpdating(false); }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this request?')) return;
    setDeleting(true);
    try {
      await deleteJob(id);
      router.push('/');
    } catch { alert('Failed to delete job'); setDeleting(false); }
  };

  if (loading) return <p style={{ color: '#6b6b8a', padding: '40px 0' }}>Loading...</p>;
  if (error || !job) return <p style={{ color: '#e94560' }}>{error || 'Job not found.'}</p>;

  const s = STATUS_STYLE[job.status] || STATUS_STYLE.Closed;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', color: '#6b6b8a', fontSize: '0.875rem', cursor: 'pointer', marginBottom: '24px', fontFamily: 'DM Sans, sans-serif', padding: 0 }}>
        ← Back to all jobs
      </button>

      <div style={{ background: '#fff', borderRadius: '16px', border: '1.5px solid #e8e8f0', overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)', padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '2rem' }}>{CATEGORY_ICONS[job.category] || '🔨'}</span>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.3rem', color: '#fff', lineHeight: 1.3 }}>{job.title}</h1>
          </div>
          <span style={{ background: s.bg, color: s.color, fontSize: '0.8rem', fontWeight: 600, padding: '6px 14px', borderRadius: '20px', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: s.dot, display: 'inline-block' }} />
            {job.status}
          </span>
        </div>

        <div style={{ padding: '32px' }}>
          <p style={{ color: '#1a1a2e', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '32px' }}>{job.description}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {[
              { label: 'Category', value: job.category, icon: '📁' },
              { label: 'Location', value: job.location, icon: '📍' },
              { label: 'Contact Name', value: job.contactName, icon: '👤' },
              { label: 'Email', value: job.contactEmail, icon: '✉️' },
              { label: 'Posted', value: new Date(job.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), icon: '🗓️' },
            ].filter(d => d.value).map(d => (
              <div key={d.label} style={{ background: '#f7f7fb', borderRadius: '10px', padding: '14px 16px', border: '1px solid #e8e8f0' }}>
                <p style={{ fontSize: '0.75rem', color: '#6b6b8a', marginBottom: '4px', fontWeight: 500 }}>{d.icon} {d.label}</p>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1a2e' }}>{d.value}</p>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1.5px solid #e8e8f0', paddingTop: '24px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a2e' }}>Update Status:</label>
              <select value={job.status} onChange={e => handleStatusChange(e.target.value)} disabled={updating} style={{ border: '1.5px solid #e8e8f0', borderRadius: '8px', padding: '8px 14px', fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif', background: '#fff', cursor: updating ? 'not-allowed' : 'pointer', outline: 'none', opacity: updating ? 0.6 : 1 }}>
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
              {updating && <span style={{ fontSize: '0.8rem', color: '#6b6b8a' }}>Saving...</span>}
            </div>
            <button onClick={handleDelete} disabled={deleting} style={{ marginLeft: 'auto', background: '#fff', color: '#e94560', border: '1.5px solid #e94560', borderRadius: '8px', padding: '8px 20px', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'Syne, sans-serif', cursor: deleting ? 'not-allowed' : 'pointer', opacity: deleting ? 0.6 : 1 }}>
              {deleting ? 'Deleting...' : '🗑 Delete Request'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
