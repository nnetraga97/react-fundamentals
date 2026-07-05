import { useState } from 'react'

function SignUp({ setUsers }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [bio, setBio] = useState('');
  const [step, setStep] = useState(1);

  const handleSave = (e) => {
    e.preventDefault();
    if (name.trim() === '' || role.trim() === '' || email.trim() === '') {
      setError('Name, role, and email are required');
      return;
    }

    setError(null);
    setUsers(prevUsers => [...prevUsers, { id: crypto.randomUUID(), name, role, email, bio }]);
    setStep(1);
    setName('');
    setRole('');
    setEmail('');
    setBio('');
  }

  const onNext = () => {
    if (step === 1 && (name.trim() === '' || email.trim() === '')) {
      setError('Name and email are required');
      return;
    }
    if(email.trim().length < 5 || !email.includes('@')|| !email.includes('.') || email.indexOf('@') > email.lastIndexOf('.')) {
      setError('Email must be valid');
      return;
    }
    if (step === 2 && role.trim() === '') {
      setError('Role is required');
      return;
    }
    setError(null);
    setStep(step + 1);
  }

  return (
    <div className="sign-up">
      {step === 1 && <Account name={name} email={email} setName={setName} setEmail={setEmail} setStep={setStep} onNext={onNext} />}
      {step === 2 && <Profile role={role} bio={bio} setRole={setRole} setBio={setBio} setStep={setStep} onNext={onNext} />}
      {step === 3 && <Review name={name} email={email} role={role} bio={bio} setStep={setStep} onNext={onNext} />}
      {step === 3 && <button onClick={handleSave}>Save</button>}
      <button onClick={() => setStep(step - 1)} disabled={step === 1}>Back</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Step: {step}/3</p>
    </div>
  )

}

export default SignUp

function Account({name, email, setName, setEmail, setStep,onNext}){
    return (
        <div>
            <h2>Account Creation</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={onNext}>Next</button>
        </div>
    )
}

function Profile({role, bio, setRole, setBio, setStep,onNext}){
    return (
        <div>
            <h2>Profile Creation</h2>
            <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
            <textarea placeholder="Bio" value={bio} onChange={(e) => { if (e.target.value.length <= 200) setBio(e.target.value) }} />
                <p>Character Count: {bio.length}/200</p>
            <button onClick={onNext}>Next</button>
        </div>
    )
}

function Review({name, email, role, bio, setStep}){
    return (
        <div>
            <h2>Review</h2>
            <p>Name: {name}</p><button onClick={() => setStep(1)}>Edit</button>
            <p>Email: {email}</p><button onClick={() => setStep(1)}>Edit</button>
            <p>Role: {role}</p><button onClick={() => setStep(2)}>Edit</button>
            <p>Bio: {bio}</p><button onClick={() => setStep(2)}>Edit</button>
        </div>
    )
}