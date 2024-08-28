import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../states/userStore';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Login = () => {
    const [email, setEmail] = useState("")
    const [errorStatus, setErrorStatus] = useState(false)
    const [password, setPassword] = useState("")
    const [errorMessage, setErroMessage] = useState("")
    const navigate = useNavigate()
    // const handleChange = (e: React.ChangeEventHandler<HTMLInputElement>) => {

    //     //setEmail(e.target.value)
    // }
    const { login, error, status } = useAuth()


    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (email.length == 0 || password.length == 0) {
            setErrorStatus(true),
            setErroMessage("veillez remplir tous le formulaire")
        }
        else{
            login({ email: email, password: password })
            .then(() => {
                status == true && navigate("/")
            })
        error && (
            setErrorStatus(true),
            setErroMessage(error as string),
            console.log(error));
        }
    }

    return (
        <div className='login'>
            <div className="loginPage">
                <div className="bg-couleur-principale h-full w-1/2 flex justify-center items-center flex-col rounded-lg ml-0 gap-4  p-0">
                    <h2 className='text-white text-xl'>welcome to my website</h2>
                    <div className="text-white text-center p-4">Bienvenu sur notre plateform et faite toute vos reservation d'hotels sans difficulte</div>
                    <button className=' border border-white rounded-3xl text-lg px-4 py-2 text-white'>
                        <Link to='/register'>
                            creer un compte
                        </Link>
                    </button>
                </div>
                <div className="connect">
                    <h1>
                        Veuiller vous connecter
                    </h1>
                    <div className="l">
                        <label htmlFor="text">email</label>
                        <input type="text" placeholder="entrer votre address email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="l">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='entrer votre mot de pass' onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="r">
                        <Button className='w-full' onClick={handleSubmit}>se connecter</Button>
                    </div>
                    {errorStatus && (<span className='text-red-500'> {errorMessage}</span>)}
                </div>
            </div>
        </div>
    );
}

export default Login;
