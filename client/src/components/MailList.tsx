import React from 'react'

export default function MailList() {
  return (
    <div className='mail'>
      <h1>Sauver le temps sauver votre argent</h1>
      <span> Inscrivez-vous pour continuer l'operation</span>
      <div className="mailInputContainer">
        <input type="text" placeholder='Votre email'/>
        <button>s'Abonner</button>
      </div>
    </div>
  )
}
