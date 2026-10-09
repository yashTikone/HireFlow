import api from './api'
export const applyForJob=(jobId,data)=>api.post(`/applications/${jobId}`,data)
export const getMyApplications=()=>api.get('/applications/my')
export const getJobApplications=(jobId)=>api.get(`/applications/job/${jobId}`)
export const updateApplicationStatus=(id,status)=>api.patch(`/applications/${id}/status`,{status})

export const analyzeApplication = (id) => api.post(`/applications/${id}/analyze`)
