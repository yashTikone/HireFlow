import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { getProfile, updateProfile, uploadPhoto, uploadResume } from '../services/profileService';
import Toast from '../components/Toast';

const emptyProfile = {
  about: '',
  education: '',
  experience: '',
  projects: [],
  location: '',
  linkedIn: '',
  github: '',
};

export default function Profile() {
  const [profile, setProfile] = useState(emptyProfile);
  const [completion, setCompletion] = useState('0%');
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [resumeName, setResumeName] = useState('');
  const [toast, setToast] = useState(null);

  const loadProfile = async () => {
    const response = await getProfile();
    const savedProfile = response.data.profile;
    setProfile({ ...emptyProfile, ...savedProfile, projects: savedProfile.projects || [] });
    setCompletion(response.data.profileCompletion);
    setResumeName(savedProfile.resume ? savedProfile.resume.split(/[\\/]/).pop() : '');
  };

  useEffect(() => {
    loadProfile().catch(() => {
      setToast({ message: 'Unable to load your profile', type: 'error' });
    });
  }, []);

  const saveProfile = async (event) => {
    event.preventDefault();
    setBusy(true);

    try {
      await updateProfile(profile);
      await loadProfile();
      setToast({ message: 'Profile updated successfully' });
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Unable to save profile',
        type: 'error',
      });
    } finally {
      setBusy(false);
    }
  };

  const handleFileUpload = async (event, type) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (type === 'resume') {
      if (file.type !== 'application/pdf' || !file.name.toLowerCase().endsWith('.pdf')) {
        setToast({ message: 'Please choose a PDF resume', type: 'error' });
        event.target.value = '';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setToast({ message: 'Resume must be 5 MB or smaller', type: 'error' });
        event.target.value = '';
        return;
      }
      setUploading(true);
    }

    try {
      if (type === 'resume') {
        await uploadResume(file);
      } else {
        await uploadPhoto(file);
      }
      await loadProfile();
      setToast({ message: type === 'resume' ? 'Resume uploaded successfully' : 'Profile photo uploaded' });
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Upload failed. Please try again.',
        type: 'error',
      });
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const updateField = (field, value) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  return (
    <DashboardLayout>
      <Toast {...toast} onClose={() => setToast(null)} />
      <div className="page-head">
        <div>
          <span className="eyebrow">CANDIDATE WORKSPACE</span>
          <h1>Your profile.</h1>
          <p>Keep your professional story ready for every opportunity.</p>
        </div>
        <div className="completion">
          <strong>{completion}</strong>
          <span>profile complete</span>
        </div>
      </div>

      <form className="profile-layout" onSubmit={saveProfile}>
        <section className="panel">
          <div className="profile-cover">
            <div className="profile-avatar">H</div>
            <label className="upload-btn">
              Change photo
              <input hidden type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => handleFileUpload(event, 'photo')} />
            </label>
          </div>

          <div className="form-grid">
            <label>
              About
              <textarea rows="5" value={profile.about || ''} onChange={(event) => updateField('about', event.target.value)} placeholder="A short professional summary…" />
            </label>
            <label>
              Education
              <textarea rows="5" value={profile.education || ''} onChange={(event) => updateField('education', event.target.value)} placeholder="Degree, college, graduation…" />
            </label>
            <label>
              Experience
              <textarea rows="5" value={profile.experience || ''} onChange={(event) => updateField('experience', event.target.value)} placeholder="Roles, companies, impact…" />
            </label>
            <label>
              Location
              <input value={profile.location || ''} onChange={(event) => updateField('location', event.target.value)} placeholder="Pune, India" />
            </label>
            <label>
              LinkedIn
              <input value={profile.linkedIn || ''} onChange={(event) => updateField('linkedIn', event.target.value)} placeholder="https://linkedin.com/in/…" />
            </label>
            <label>
              GitHub
              <input value={profile.github || ''} onChange={(event) => updateField('github', event.target.value)} placeholder="https://github.com/…" />
            </label>
          </div>

          <label>
            Projects
            <input
              value={(profile.projects || []).join(', ')}
              onChange={(event) => updateField('projects', event.target.value.split(',').map((item) => item.trim()).filter(Boolean))}
              placeholder="HireFlow, ComplyAI, DevTrack"
            />
          </label>

          <div className="profile-actions">
            <div className="resume-upload-control">
              <label className="secondary-btn upload-btn">
                {uploading ? 'Uploading resume…' : resumeName ? 'Replace resume' : 'Upload resume'}
                <input hidden type="file" accept="application/pdf,.pdf" disabled={uploading} onChange={(event) => handleFileUpload(event, 'resume')} />
              </label>
              {resumeName && <span className="resume-file-name">✓ {resumeName}</span>}
              <small>PDF only · up to 5 MB</small>
            </div>
            <button className="primary-btn" disabled={busy}>
              {busy ? 'Saving…' : 'Save profile →'}
            </button>
          </div>
        </section>
      </form>
    </DashboardLayout>
  );
}
