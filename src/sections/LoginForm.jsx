import Button from '../elements/Button';
import Input from '../elements/Input';
import Link from '../elements/Link';
import Image from '../elements/Image';
import LogoImage from '../assets/img/logo-main.png';
import H4 from '../elements/H4';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from '../utils/utils'; 


function LoginForm(){

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if(getCookie('token') !== undefined){
            window.location.href='/dashboard';
        }
    });

    const checkEmpty = (value) => {
        value = value.trim();
        return (value == null || value == "" );
    }

    const handleClick = (e) => {
        Date.prototype.addHours = function(h) {
            this.setTime(this.getTime() + (h*60*60*1000));
            return this;
        }
        e.preventDefault();
        if( checkEmpty(userName) === true || checkEmpty(password) === true){
            setErrorMessage("Please provide username and password");
            setShowError(true);
            return false;
        }
        setShowError(false);

        axios({
            url: "http://localhost:8080/api/auth-service/login",
            method: "POST",
            data: {
                "userName": userName,
                "password": password,
                "idTenant": "1"
            },
        }).then((res) => {
            document.cookie = "token="+res.data.token+"; expires="+new Date().addHours(1);
            window.location.href = "/dashboard";
        }).catch((err) => {
            setErrorMessage("Username or Password is Incorrect.");
            setShowError(true);
        });

    }

    return (
        <>
            <div className="col-md-5 col-lg-4">
                <div className="login-inputs">
                    <Image src={LogoImage} className="logo-img" width="295" height="100" className="logo-img"  />
                    <H4 className="login-title">User Login</H4>
                    <form action="#" method="POST">

                        <Input type="text"
                            name= "username"
                            id="username"
                            icon="la-user"
                            placeholder="Username"
                            margin="4"
                            value={userName}
                            onChange = {e => setUserName(e.target.value)}
                        />

                        <Input type="password"
                            name= "password"
                            id="password"
                            icon="la-lock"
                            placeholder="Password"
                            margin="2"
                            value={password}
                            onChange = {e => setPassword(e.target.value)}
                        />

                        <Button type="submit" value="LOGIN" onClick={handleClick} alignment="text-center"></Button>

                        {
                            showError ? 
                            <div className="error-msg-container mt-2 text-danger mx-auto">
                                <p className="error-msg text-center">{errorMessage}</p>
                            </div>
                            :
                            ""
                        }

                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginForm;