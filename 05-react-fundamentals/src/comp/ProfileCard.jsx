import { useState } from 'react'
function ProfileCard({name, role, isOnline, onToggle}){
    const[showDetails, setShowDetails] = useState(true);
    return (
        <div className="profile-card">
            <h2>{name}</h2>
            <p>{showDetails ? role : null}</p>
            <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide' : 'Show'} Details</button>
            <p>Status: {isOnline ? '● online' : 'offline'}</p>  
            <button onClick={onToggle}>Toggle Status</button>
        </div>
    )
}

export default ProfileCard