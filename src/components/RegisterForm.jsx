import { useState } from "react";
import {
  WEB3FORMS_ACCESS_KEY,
  TRACKS,
  TEAM_SIZES,
  MEMBER_ORDINALS,
  PAYMENT_INFO,
  EVENT_INFO,
} from "../data/eureca";

const emptyPerson = () => ({ name: "", contact: "", email: "" });

const initialForm = {
  teamName: "",
  teamSize: "",
  leader: emptyPerson(),
  members: [], // one entry per member beyond the leader, length = teamSize - 1
  track: "",
  idea: "",
  demoLink: "",
  pptFile: null,
  utr: "",
  paymentScreenshot: null,
};

const PHONE_RE = /^[6-9]\d{9}$/;
const EMAIL_RE = /^\S+@\S+\.\S+$/;

function validatePerson(p, label, errors, prefix) {
  if (!p.name.trim()) errors[`${prefix}Name`] = `${label}'s name is required`;
  if (!PHONE_RE.test(p.contact.replace(/\s/g, "")))
    errors[`${prefix}Contact`] = `Enter a valid 10-digit number`;
  if (!EMAIL_RE.test(p.email)) errors[`${prefix}Email`] = `Enter a valid email`;
}

function validate(form) {
  const errors = {};
  if (!form.teamName.trim()) errors.teamName = "Team name is required";
  if (!form.teamSize) errors.teamSize = "Select your team size";

  validatePerson(form.leader, "Team leader", errors, "leader");

  form.members.forEach((m, i) => {
    const label = `${MEMBER_ORDINALS[i]} member`;
    validatePerson(m, label, errors, `member${i}`);
  });

  if (!form.utr.trim() || form.utr.trim().length < 6)
    errors.utr = "Enter a valid transaction ID / UTR number";

  return errors;
}

async function submitToWeb3Forms(payload, files) {
  // Try with files first (works only on Web3Forms Pro). If it fails
  // specifically because the free plan doesn't support attachments,
  // silently retry without the file so the registration still goes through.
  if (files.length > 0) {
    const fd = new FormData();
    Object.entries(payload).forEach(([k, v]) => fd.append(k, v));
    files.forEach(([field, file]) => file && fd.append(field, file));

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: fd,
    });
    const data = await res.json();
    if (data.success) return { ok: true, attached: true };
    if (!/pro feature/i.test(data.message || "")) {
      return { ok: false };
    }
    // fall through to retry without attachments
  }

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return { ok: !!data.success, attached: false };
}

export default function RegisterForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | success-no-attachment | error

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function updateLeader(field, value) {
    setForm((f) => ({ ...f, leader: { ...f.leader, [field]: value } }));
    if (errors[`leader${field[0].toUpperCase()}${field.slice(1)}`]) {
      setErrors((e) => ({ ...e, [`leader${field[0].toUpperCase()}${field.slice(1)}`]: undefined }));
    }
  }

  function updateMember(index, field, value) {
    setForm((f) => {
      const members = [...f.members];
      members[index] = { ...members[index], [field]: value };
      return { ...f, members };
    });
    const key = `member${index}${field[0].toUpperCase()}${field.slice(1)}`;
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function handleTeamSizeChange(value) {
    const size = Number(value);
    setForm((f) => {
      const membersNeeded = size - 1;
      const members = Array.from(
        { length: membersNeeded },
        (_, i) => f.members[i] || emptyPerson()
      );
      return { ...f, teamSize: value, members };
    });
    if (errors.teamSize) setErrors((e) => ({ ...e, teamSize: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `EURECA '26 Registration — ${form.teamName}`,
      from_name: "EURECA '26 Registration Page",
      team_name: form.teamName,
      team_size: form.teamSize,
      leader_name: form.leader.name,
      leader_contact: form.leader.contact,
      leader_email: form.leader.email,
      college: EVENT_INFO.college,
      track: form.track || "Not specified",
      idea_summary: form.idea || "Not provided",
      demo_link: form.demoLink || "Not provided",
      utr_number: form.utr,
    };

    form.members.forEach((m, i) => {
      const ord = MEMBER_ORDINALS[i].toLowerCase();
      payload[`${ord}_member_name`] = m.name;
      payload[`${ord}_member_contact`] = m.contact;
      payload[`${ord}_member_email`] = m.email;
    });

    const files = [
      ["ppt_attachment", form.pptFile],
      ["payment_screenshot", form.paymentScreenshot],
    ];

    try {
      const result = await submitToWeb3Forms(payload, files);
      if (result.ok && result.attached) {
        setStatus("success");
        setForm(initialForm);
      } else if (result.ok && !result.attached) {
        setStatus("success-no-attachment");
        setForm(initialForm);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const hadFiles = !!(form.pptFile || form.paymentScreenshot);

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
              This mirrors the official ABES registration form exactly — fill it here, or use
              the same details on the official Microsoft Forms link if your coordinator shares
              one.
            </p>
            <div className="register-info-list">
              <div className="register-info-item">
                <span className="tick">✓</span>
                Teams of 2–4 members required for this round
              </div>
              <div className="register-info-item">
                <span className="tick">✓</span>
                Pay the registration fee via UPI and enter your UTR number
              </div>
              <div className="register-info-item">
                <span className="tick">✓</span>
                PPT / demo link is optional but strengthens your entry
              </div>
              <div className="register-info-item">
                <span className="tick">✓</span>
                Queries: {EVENT_INFO.contactEmail}
              </div>
            </div>
          </div>

          <form className="form-grid" onSubmit={handleSubmit} noValidate>
            {/* Team basics */}
            <div className="form-grid two-col">
              <div className="field">
                <label htmlFor="teamName">Team Name *</label>
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
                <label htmlFor="teamSize">Team Members *</label>
                <select
                  id="teamSize"
                  value={form.teamSize}
                  onChange={(e) => handleTeamSizeChange(e.target.value)}
                >
                  <option value="">Select</option>
                  {TEAM_SIZES.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                {errors.teamSize && <span className="field-error">{errors.teamSize}</span>}
              </div>
            </div>

            {/* Team leader */}
            <div className="member-block">
              <div className="member-block-title">Team Leader</div>
              <div className="form-grid two-col">
                <div className="field">
                  <label>Name *</label>
                  <input
                    type="text"
                    value={form.leader.name}
                    onChange={(e) => updateLeader("name", e.target.value)}
                    placeholder="Full name"
                  />
                  {errors.leaderName && <span className="field-error">{errors.leaderName}</span>}
                </div>
                <div className="field">
                  <label>Contact No *</label>
                  <input
                    type="tel"
                    value={form.leader.contact}
                    onChange={(e) => updateLeader("contact", e.target.value)}
                    placeholder="10-digit number"
                  />
                  {errors.leaderContact && (
                    <span className="field-error">{errors.leaderContact}</span>
                  )}
                </div>
              </div>
              <div className="field">
                <label>Email *</label>
                <input
                  type="email"
                  value={form.leader.email}
                  onChange={(e) => updateLeader("email", e.target.value)}
                  placeholder="you@example.com"
                />
                {errors.leaderEmail && <span className="field-error">{errors.leaderEmail}</span>}
              </div>
            </div>

            {/* Dynamic members */}
            {form.members.map((m, i) => (
              <div className="member-block" key={i}>
                <div className="member-block-title">{MEMBER_ORDINALS[i]} Member</div>
                <div className="form-grid two-col">
                  <div className="field">
                    <label>Name *</label>
                    <input
                      type="text"
                      value={m.name}
                      onChange={(e) => updateMember(i, "name", e.target.value)}
                      placeholder="Full name"
                    />
                    {errors[`member${i}Name`] && (
                      <span className="field-error">{errors[`member${i}Name`]}</span>
                    )}
                  </div>
                  <div className="field">
                    <label>Contact No *</label>
                    <input
                      type="tel"
                      value={m.contact}
                      onChange={(e) => updateMember(i, "contact", e.target.value)}
                      placeholder="10-digit number"
                    />
                    {errors[`member${i}Contact`] && (
                      <span className="field-error">{errors[`member${i}Contact`]}</span>
                    )}
                  </div>
                </div>
                <div className="field">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={m.email}
                    onChange={(e) => updateMember(i, "email", e.target.value)}
                    placeholder="you@example.com"
                  />
                  {errors[`member${i}Email`] && (
                    <span className="field-error">{errors[`member${i}Email`]}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Track + idea (extra, optional) */}
            <div className="form-grid two-col">
              <div className="field">
                <label htmlFor="track">Track (optional)</label>
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
              </div>
              <div className="field">
                <label htmlFor="demoLink">Demo Link (Website/Prototype)</label>
                <input
                  id="demoLink"
                  type="url"
                  value={form.demoLink}
                  onChange={(e) => update("demoLink", e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="idea">One-line Idea / Pitch (optional)</label>
              <textarea
                id="idea"
                value={form.idea}
                onChange={(e) => update("idea", e.target.value)}
                placeholder="What problem are you solving, and how?"
              />
            </div>

            <div className="field">
              <label htmlFor="ppt">Submit PPT (optional)</label>
              <input
                id="ppt"
                type="file"
                accept=".ppt,.pptx,.pdf,.doc,.docx,.xls,.xlsx,image/*,video/*,audio/*"
                onChange={(e) => update("pptFile", e.target.files?.[0] || null)}
              />
              <span className="field-hint">Word, Excel, PPT, PDF, Image, Video or Audio — up to 10MB</span>
            </div>

            {/* Payment */}
            <div className="payment-block">
              <div className="member-block-title">Payment</div>
              <div className="payment-grid">
                <div className="payment-qr-wrap">
                  <img src={PAYMENT_INFO.qrImage} alt="Scan to pay registration fee via UPI" />
                </div>
                <div>
                  <p className="payment-note">{PAYMENT_INFO.note}</p>
                  <div className="field" style={{ marginTop: 14 }}>
                    <label htmlFor="utr">UPI Transaction ID / UTR Number *</label>
                    <input
                      id="utr"
                      type="text"
                      value={form.utr}
                      onChange={(e) => update("utr", e.target.value)}
                      placeholder="e.g. 123456789012"
                    />
                    {errors.utr && <span className="field-error">{errors.utr}</span>}
                  </div>
                  <div className="field" style={{ marginTop: 14 }}>
                    <label htmlFor="paymentScreenshot">Payment Screenshot (optional)</label>
                    <input
                      id="paymentScreenshot"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        update("paymentScreenshot", e.target.files?.[0] || null)
                      }
                    />
                  </div>
                </div>
              </div>
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
              {status === "success-no-attachment" && (
                <span className="form-status success">
                  ✓ Registered! {hadFiles
                    ? `Your files couldn't be auto-attached — please email them to ${EVENT_INFO.contactEmail}.`
                    : ""}
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
