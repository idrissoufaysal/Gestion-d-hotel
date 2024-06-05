import React from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div className='login'>
      <div className="loginPage">
        <h1>

          Veuiller entrer vos information
        </h1>
        <div className="l">

          <label htmlFor="">Username</label>
          <input type="text" placeholder="entrer le nom d'utilisateur" />
        </div>
        <div className="l">
          <label htmlFor="text">emal</label>
          <input type="password" placeholder="entrer votre address email" />

        </div>
        <div className="l">

          <label htmlFor="password">Password</label>
          <input type="password" placeholder='entrer votre mot de pass' />
        </div>
        <div className="r">

          vous avez dejas un compte ?<Link to='/login' className='links'> connecter-vous</Link>
        </div>
      </div>
    </div>
  )
}
