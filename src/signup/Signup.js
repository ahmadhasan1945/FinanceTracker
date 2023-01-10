import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import styles from './Signup.module.css'


export default function Signup
() {

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { error, isPending, signup } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName)
  }
  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
        <h2>Sign Up</h2>
        <label>
          <span>Display Name</span>
          <input type='text' onChange={(e)=> setDisplayName(e.target.value)} value={displayName}/>
        </label>
        <label>
          <span>Email</span>
          <input type='email' onChange={(e)=> setEmail(e.target.value)} value={email}/>
        </label>
        <label>
          <span>Password</span>
          <input type='password' onChange={(e)=> setPassword(e.target.value)} value={password}/>
        </label>
        {!isPending && <button className='btn'>Sign Up</button>}
        {isPending && <button className='btn' disabled>Loading...</button>}
        {error && <p>{error}</p>}
    </form>
  )
}
