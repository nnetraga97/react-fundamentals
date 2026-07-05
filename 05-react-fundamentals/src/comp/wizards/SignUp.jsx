import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userAdded } from '../../store/usersSlice'
import { profileCompleted } from '../../store/profileSlice'

const EMPTY_FORM = { name: '', email: '', role: '', bio: '' }

// The wizard's own machinery (step, form data mid-flight) is LOCAL state —
// no other component cares about a half-finished form. Redux only hears
// about the finished result, via dispatch at the end.
function SignUp() {
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [step, setStep] = useState(1)
  const [error, setError] = useState(null)
  const [saved, setSaved] = useState(false)
  const dispatch = useDispatch()

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const validateStep = (s) => {
    const { name, email, role } = formData
    if (s === 1) {
      if (name.trim() === '' || email.trim() === '') return 'Name and email are required'
      const at = email.indexOf('@')
      if (at < 1 || email.lastIndexOf('.') < at) return 'Email must be valid'
    }
    if (s === 2 && role.trim() === '') return 'Role is required'
    return null
  }

  const goNext = () => {
    const problem = validateStep(step)
    if (problem) return setError(problem)
    setError(null)
    setStep(step + 1)
  }

  const handleSave = () => {
    const trimmed = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role.trim(),
      bio: formData.bio.trim(),
    }
    // Two slices react to one user event — and this component doesn't know
    // or care what they do with it.
    dispatch(userAdded(trimmed))
    dispatch(profileCompleted(trimmed))
    setFormData(EMPTY_FORM)
    setStep(1)
    setSaved(true)
  }

  if (saved) {
    return (
      <div className="wizard card success">
        <h3>Welcome aboard 🎉</h3>
        <p className="muted">Your profile is live in the directory.</p>
        <button className="btn" onClick={() => setSaved(false)}>
          Add another
        </button>
      </div>
    )
  }

  return (
    <div className="wizard card">
      <div className="wizard-steps">
        {[1, 2, 3].map((s) => (
          <span key={s} className={`step-dot ${s === step ? 'active' : ''} ${s < step ? 'done' : ''}`}>
            {s}
          </span>
        ))}
      </div>

      {/* key={step} remounts the pane per step so the enter animation replays */}
      <div className="wizard-pane" key={step}>
        {step === 1 && <Account data={formData} onChange={updateField} />}
        {step === 2 && <Profile data={formData} onChange={updateField} />}
        {step === 3 && <Review data={formData} onEdit={setStep} />}
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="wizard-nav">
        <button className="btn ghost" onClick={() => setStep(step - 1)} disabled={step === 1}>
          Back
        </button>
        <span className="muted">Step {step} of 3</span>
        {step < 3 ? (
          <button className="btn" onClick={goNext}>
            Next
          </button>
        ) : (
          <button className="btn primary" onClick={handleSave}>
            Save
          </button>
        )}
      </div>
    </div>
  )
}

export default SignUp

function Account({ data, onChange }) {
  return (
    <div className="field-stack">
      <h3>Account</h3>
      <input
        placeholder="Name"
        value={data.name}
        onChange={(e) => onChange('name', e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={(e) => onChange('email', e.target.value)}
      />
    </div>
  )
}

function Profile({ data, onChange }) {
  return (
    <div className="field-stack">
      <h3>Profile</h3>
      <input
        placeholder="Role"
        value={data.role}
        onChange={(e) => onChange('role', e.target.value)}
      />
      <textarea
        placeholder="Bio (optional)"
        value={data.bio}
        onChange={(e) => e.target.value.length <= 200 && onChange('bio', e.target.value)}
      />
      <p className="muted char-count">{data.bio.length}/200</p>
    </div>
  )
}

function Review({ data, onEdit }) {
  const rows = [
    ['Name', data.name, 1],
    ['Email', data.email, 1],
    ['Role', data.role, 2],
    ['Bio', data.bio || '—', 2],
  ]
  return (
    <div className="field-stack">
      <h3>Review</h3>
      {rows.map(([label, value, step]) => (
        <p key={label} className="review-row">
          <span className="muted">{label}</span> {value}
          <button className="link-btn" onClick={() => onEdit(step)}>
            edit
          </button>
        </p>
      ))}
    </div>
  )
}
