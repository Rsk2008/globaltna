const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface JobRequest {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  contactName: string;
  contactEmail: string;
  status: 'Open' | 'In Progress' | 'Closed';
  createdAt: string;
}

export interface CreateJobPayload {
  title: string;
  description: string;
  category?: string;
  location?: string;
  contactName?: string;
  contactEmail?: string;
}

export async function getJobs(params?: { category?: string; status?: string }): Promise<JobRequest[]> {
  const query = new URLSearchParams();
  if (params?.category) query.set('category', params.category);
  if (params?.status) query.set('status', params.status);
  const url = `${BASE_URL}/api/jobs${query.toString() ? `?${query}` : ''}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json();
}

export async function getJob(id: string): Promise<JobRequest> {
  const res = await fetch(`${BASE_URL}/api/jobs/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Job not found');
  return res.json();
}

export async function createJob(payload: CreateJobPayload): Promise<JobRequest> {
  const res = await fetch(`${BASE_URL}/api/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to create job');
  }
  return res.json();
}

export async function updateJobStatus(id: string, status: string): Promise<JobRequest> {
  const res = await fetch(`${BASE_URL}/api/jobs/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to update status');
  }
  return res.json();
}

export async function deleteJob(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/jobs/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete job');
}
