import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleChange = (e: React.ChangeEventHandler<HTMLInputElement>) => {

        //setEmail(e.target.value)
    }

    return (
        <div className='login'>
            <div className="loginPage">
                <h1>

                    Veuiller vous connecter
                </h1>
                <div className="l">
                    <label htmlFor="text">emal</label>
                    <input type="password" placeholder="entrer votre address email" />

                </div>
                <div className="l">

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='entrer votre mot de pass' />
                </div>

                <div className="r">

                    vous n'avez de compte<Link to='/register' className='links'> inscrivez-vous</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
