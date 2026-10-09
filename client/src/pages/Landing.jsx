import { Link } from 'react-router-dom';
import HireFlowLogo from '../components/HireFlowLogo';
import ThemeToggle from '../components/ThemeToggle';

export default function Landing() {
  return (
    <div className="landing">
      <header className="landing-nav">
        <Link to="/" className="brand" aria-label="HireFlow home">
          <HireFlowLogo />
        </Link>
        <div className="landing-nav-actions">
          <ThemeToggle />
          <Link to="/login" className="text-link">Sign in</Link>
          <Link to="/register" className="nav-cta">Get started</Link>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">INTELLIGENT TALENT ACQUISITION</span>
          <h1>Hire better.<br /><em>Move faster.</em></h1>
          <p>
            HireFlow brings candidates and recruiters into one focused workspace — from
            discovering the right opportunity to managing the entire hiring journey.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="primary-btn">Start with HireFlow <span>→</span></Link>
            <Link to="/login" className="secondary-btn">I already have an account</Link>
          </div>
          <div className="trust-row">
            <span>✓ Structured hiring</span>
            <span>✓ Candidate-first</span>
            <span>✓ Built to scale</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Preview of the HireFlow talent workspace">
          <div className="orb orb-a" />
          <div className="orb orb-b" />
          <div className="dashboard-preview">
            <div className="preview-top"><span>HireFlow</span><small>Talent workspace</small></div>
            <div className="preview-metrics">
              <div><small>Open roles</small><strong>24</strong></div>
              <div><small>Shortlisted</small><strong>86</strong></div>
              <div><small>Interviews</small><strong>18</strong></div>
            </div>
            <div className="preview-card">
              <div className="mini-avatar">AK</div>
              <div><strong>Frontend Engineer</strong><small>React · Node · MongoDB</small></div>
              <span className="match">94%</span>
            </div>
            <div className="preview-card second">
              <div className="mini-avatar">RS</div>
              <div><strong>Product Designer</strong><small>Figma · UX · Research</small></div>
              <span className="match">89%</span>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-strip">
        <div><span>01</span><h3>Discover</h3><p>Find roles and talent with less friction.</p></div>
        <div><span>02</span><h3>Evaluate</h3><p>Keep applications and hiring stages organized.</p></div>
        <div><span>03</span><h3>Connect</h3><p>Move qualified candidates forward faster.</p></div>
      </section>
    </div>
  );
}
