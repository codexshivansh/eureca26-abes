import { useState } from "react";
import { WEB3FORMS_ACCESS_KEY, TRACKS, EVENT_INFO } from "../data/eureca";

const initialForm = {
  teamName: "",
  leaderName: "",
  email: "",
  phone: "",
  college: EVENT_INFO.college,
  branchYear: "",
  teamSize: "",
  track: "",
  idea: "",
};

function validate(form) {
  const errors = {};
  if (!form.teamName.trim()) errors.teamName = "Team / startup name is required";
  if (!form.leaderName.trim()) errors.leaderName = "Team leader's name is required";
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Enter a valid email address";
  if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, "")))
    errors.phone = "Enter a valid 10-digit phone number";
  if (!form.teamSize) errors.teamSize = "Select your team size";
  if (!form.track) errors.track = "Select a track";
  if (!form.idea.trim() || form.idea.trim().length < 15)
    errors.idea = "Give at least a one-line pitch (15+ characters)";
  return errors;
}

export default function RegisterForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `EURECA '26 Registration — ${form.teamName}`,
          from_name: "EURECA '26 Registration Page",
          team_name: form.teamName,
          leader_name: form.leaderName,
          email: form.email,
          phone: form.phone,
          college: form.college,
          branch_year: form.branchYear,
          team_size: form.teamSize,
          track: form.track,
          idea_summary: form.idea,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm(initialForm);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section register-section" id="register">
      <div className="container">
        <div className="register-wrap">
          <div className="register-info">
            <span className="eyebrow">Last step</span>
            <h3 style={{ marginTop: 14 }}>
              Register your team for the <span className="gradient-text">Zonal Round</span>
            </h3>
            <p>
              Fill this out and your details go straight to the campus organizing team's
              inbox. You'll hear back with your Zonal Round slot before the 18th August
              deadline.
            </p>
            <div className="register-info-list">
              <div className="register-info-item">
                <span className="tick">✓</span>
                Takes under 3 minutes
              </div>
              <div className="register-info-item">
                <span className="tick">✓</span>
                Solo founders welcome — team not compulsory
              </div>
              <div className="register-info-item">
                <span className="tick">✓</span>
                You can edit your idea questionnaire on the official portal till Aug 18
              </div>
              <div className="register-info-item">
                <span className="tick">✓</span>
                Queries: {EVENT_INFO.contactEmail}
              </div>
            </div>
          </div>

          <form className="form-grid" onSubmit={handleSubmit} noValidate>
            <div className="form-grid two-col">
              <div className="field">
                <label htmlFor="teamName">Team / Startup Name *</label>
                <input
                  id="teamName"
                  type="text"
                  value={form.teamName}
                  onChange={(e) => update("teamName", e.target.value)}
                  placeholder="e.g. Nimbus Labs"
                />
                {errors.teamName && <span className="field-error">{errors.teamName}</span>}
              </div>
              <div className="field">
                <label htmlFor="leaderName">Team Leader's Name *</label>
                <input
                  id="leaderName"
                  type="text"
                  value={form.leaderName}
                  onChange={(e) => update("leaderName", e.target.value)}
                  placeholder="Full name"
                />
                {errors.leaderName && (
                  <span className="field-error">{errors.leaderName}</span>
                )}
              </div>
            </div>

            <div className="form-grid two-col">
              <div className="field">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>
              <div className="field">
                <label htmlFor="phone">Phone (WhatsApp) *</label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="10-digit number"
                />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-grid two-col">
              <div className="field">
                <label htmlFor="college">College</label>
                <input
                  id="college"
                  type="text"
                  value={form.college}
                  onChange={(e) => update("college", e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="branchYear">Branch &amp; Year</label>
                <input
                  id="branchYear"
                  type="text"
                  value={form.branchYear}
                  onChange={(e) => update("branchYear", e.target.value)}
                  placeholder="e.g. CSE, 3rd Year"
                />
              </div>
            </div>

            <div className="form-grid two-col">
              <div className="field">
                <label htmlFor="teamSize">Team Size *</label>
                <select
                  id="teamSize"
                  value={form.teamSize}
                  onChange={(e) => update("teamSize", e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Solo (1)">Solo (1)</option>
                  <option value="2">2 members</option>
                  <option value="3">3 members</option>
                  <option value="4">4 members</option>
                  <option value="5+">5+ members</option>
                </select>
                {errors.teamSize && <span className="field-error">{errors.teamSize}</span>}
              </div>
              <div className="field">
                <label htmlFor="track">Track *</label>
                <select
                  id="track"
                  value={form.track}
                  onChange={(e) => update("track", e.target.value)}
                >
                  <option value="">Select</option>
                  {TRACKS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.track && <span className="field-error">{errors.track}</span>}
              </div>
            </div>

            <div className="field">
              <label htmlFor="idea">One-line Idea / Pitch *</label>
              <textarea
                id="idea"
                value={form.idea}
                onChange={(e) => update("idea", e.target.value)}
                placeholder="What problem are you solving, and how?"
              />
              {errors.idea && <span className="field-error">{errors.idea}</span>}
            </div>

            <input type="checkbox" name="botcheck" style={{ display: "none" }} />

            <div className="form-footer">
              <button className="btn btn-primary" type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? "Submitting…" : "Submit Registration"}
              </button>
              {status === "success" && (
                <span className="form-status success">
                  ✓ Registered! Check your email for confirmation.
                </span>
              )}
              {status === "error" && (
                <span className="form-status error">
                  ✗ Something went wrong. Please try again or email us directly.
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
