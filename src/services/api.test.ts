import { beforeEach, describe, expect, it, vi } from 'vitest';

const { get } = vi.hoisted(() => ({ get: vi.fn() }));
vi.mock('axios', () => ({ default: { create: () => ({ get }) } }));

import { fetchJobDetails, searchJobs } from './api';
import type { JobSearchParams } from '../types/job';

const params: JobSearchParams = {
  query: '',
  location: '',
  jobType: '',
  experience: '',
  page: 1
};

describe('job search modes', () => {
  beforeEach(() => get.mockReset());

  it('loads sample jobs without making an API request', async () => {
    const result = await searchJobs(params, '');
    expect(result.data).toHaveLength(3);
    expect(get).not.toHaveBeenCalled();
  });

  it('filters sample jobs by location and employment type', async () => {
    const result = await searchJobs({ ...params, location: 'Bengaluru', jobType: 'INTERN' }, '');
    expect(result.data.map((job) => job.job_id)).toEqual(['demo-security-intern']);
  });

  it('uses only a visitor-supplied key for live requests', async () => {
    get.mockResolvedValue({ data: { data: [] } });
    await searchJobs(params, 'visitor-key');
    expect(get).toHaveBeenCalledWith('/search', expect.objectContaining({
      headers: expect.objectContaining({ 'x-rapidapi-key': 'visitor-key' })
    }));
  });

  it('normalizes the current JSearch jobs response', async () => {
    get.mockResolvedValue({ data: { status: 'OK', data: { jobs: [{ job_id: 'live-1' }] } } });
    const result = await searchJobs(params, 'visitor-key');
    expect(result.data[0].job_id).toBe('live-1');
    expect(result.total_jobs).toBe(1);
  });

  it('loads sample details without an API request', async () => {
    const result = await fetchJobDetails('demo-software-developer', '');
    expect(result.data[0].job_title).toBe('Software Developer');
    expect(get).not.toHaveBeenCalled();
  });
});
