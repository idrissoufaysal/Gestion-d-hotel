import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../states/userStore'
import { useState } from 'react'

export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorStatus, setErrorStatus] = useState(false)
  const [errorMessage, setErroMessage] = useState("")
    const navigate = useNavigate()
  const { error, status, register } = useAuth()

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (email.length == 0 || password.length ==0 || username.length==0) {
      setErrorStatus(true),
      setErroMessage("veillez remplir tous le formulair")    }
else{

  register({ username, email, password })
  .then(()=>{
    
    status==true && navigate("/login")
  })
  error && (
    setErroMessage(error as string),
    console.log(error));
  }
  }

  return (
    <div className='login'>
      <div className="loginPage">

        <div className="hello">
          <h2 className='text-white text-xl'>welcome to my website</h2>
          <div className="text-white text-center">Bienvenu sur notre plateform et faite toute vos reservation d'hotels sans difficulte</div>
          <button className=' border border-white rounded-3xl text-lg px-4 py-2 text-white'>
            <Link to='/login'>
              Se connecter
            </Link>
          </button>
        </div>
        <div className="connect">

          <h1 className='text-couleur-principale '>
            Veuiller entrer vos information
          </h1>
          <div className="l">

            <label htmlFor="">Username</label>
            <input type="text" placeholder="entrer le nom d'utilisateur" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="l">
            <label htmlFor="text">Email</label>
            <input type="text" placeholder="entrer votre address email" onChange={(e) => setEmail(e.target.value)} />

          </div>
          <div className="l">

            <label htmlFor="password">Password</label>
            <input type="password" placeholder='entrer votre mot de pass' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="r">

            <button className='px-4 py-2 bg-couleur-principale rounded-xl text-gris-clair w-full' onClick={handleSubmit}>S'inscrire</button>
            {errorStatus && (<span className='text-red-500 mt-8'> {errorMessage}</span>)}

          </div>
        </div>
      </div>
    </div>
  )
}
