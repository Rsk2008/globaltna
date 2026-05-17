'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createJob } from '@/lib/api';

const CATEGORIES = ['Plumbing', 'Electrical', 'Painting', 'Joinery', 'Other'];

export default function NewJobPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', description: '', category: '', location: '', contactName: '', contactEmail: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (form.contactEmail && !/^\S+@\S+\.\S+$/.test(form.contactEmail)) e.contactEmail = 'Enter a valid email address';
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSubmitting(true);
    setServerError('');
    try {
      await createJob(form);
      router.push('/');
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = (hasError: boolean) => ({
    width: '100%', border: `1.5px solid ${hasError ? '#e94560' : '#e8e8f0'}`,
    borderRadius: '8px', padding: '10px 14px', fontSize: '0.9rem',
    fontFamily: 'DM Sans, sans-serif', background: hasError ? '#fff0f3' : '#fff',
    color: '#1a1a2e', outline: 'none',
  });

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', color: '#6b6b8a', fontSize: '0.875rem', cursor: 'pointer', padding: '0', marginBottom: '16px', fontFamily: 'DM Sans, sans-serif' }}>
          ← Back to all jobs
        </button>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: '#1a1a2e' }}>Post a Service Request</h1>
        <p style={{ color: '#6b6b8a', marginTop: '6px' }}>Fill in the details and a tradesperson will get in touch.</p>
      </div>

      {serverError && <div style={{ background: '#fff0f3', border: '1px solid #ffc0cb', borderRadius: '10px', padding: '14px 16px', color: '#e94560', marginBottom: '20px', fontSize: '0.875rem' }}>{serverError}</div>}

      <div style={{ background: '#fff', borderRadius: '16px', border: '1.5px solid #e8e8f0', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1a1a2e', marginBottom: '6px' }}>Title <span style={{ color: '#e94560' }}>*</span></label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Need a plumber for a leaking kitchen tap" style={inputStyle(!!errors.title)} />
          {errors.title && <p style={{ color: '#e94560', fontSize: '0.78rem', marginTop: '4px' }}>{errors.title}</p>}
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1a1a2e', marginBottom: '6px' }}>Description <span style={{ color: '#e94560' }}>*</span></label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Describe the job in detail..." style={{ ...inputStyle(!!errors.description), resize: 'vertical' }} />
          {errors.description && <p style={{ color: '#e94560', fontSize: '0.78rem', marginTop: '4px' }}>{errors.description}</p>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1a1a2e', marginBottom: '6px' }}>Category</label>
            <select name="category" value={form.category} onChange={handleChange} style={inputStyle(false)}>
              <option value="">Select...</option>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1a1a2e', marginBottom: '6px' }}>Location</label>
            <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Glasgow" style={inputStyle(false)} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1a1a2e', marginBottom: '6px' }}>Contact Name</label>
            <input name="contactName" value={form.contactName} onChange={handleChange} placeholder="Your name" style={inputStyle(false)} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1a1a2e', marginBottom: '6px' }}>Contact Email</label>
            <input name="contactEmail" type="email" value={form.contactEmail} onChange={handleChange} placeholder="your@email.com" style={inputStyle(!!errors.contactEmail)} />
            {errors.contactEmail && <p style={{ color: '#e94560', fontSize: '0.78rem', marginTop: '4px' }}>{errors.contactEmail}</p>}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
          <button onClick={handleSubmit} disabled={submitting} style={{ background: '#e94560', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 28px', fontSize: '0.9rem', fontWeight: 600, fontFamily: 'Syne, sans-serif', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}>
            {submitting ? 'Posting...' : 'Post Request'}
          </button>
          <button onClick={() => router.push('/')} style={{ background: '#fff', color: '#1a1a2e', border: '1.5px solid #e8e8f0', borderRadius: '8px', padding: '12px 24px', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
