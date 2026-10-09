import api from './api'
export const getAllJobs=()=>api.get('/jobs')
export const getMyJobs=()=>api.get('/jobs/mine')
export const getJobById=(id)=>api.get(`/jobs/${id}`)
export const createJob=(data)=>api.post('/jobs',data)
export const updateJob=(id,data)=>api.put(`/jobs/${id}`,data)
export const closeJob=(id)=>api.patch(`/jobs/${id}/close`)
export const deleteJob=(id)=>api.delete(`/jobs/${id}`)
