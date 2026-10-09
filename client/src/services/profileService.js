import api from './api'
export const getProfile=()=>api.get('/profile')
export const updateProfile=(data)=>api.put('/profile',data)
export const uploadResume=(file)=>{const f=new FormData();f.append('resume',file);return api.post('/profile/resume',f)}
export const uploadPhoto=(file)=>{const f=new FormData();f.append('photo',file);return api.post('/profile/photo',f)}
