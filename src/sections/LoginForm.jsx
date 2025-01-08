import Button from '../elements/Button';
import Input from '../elements/Input';
import Link from '../elements/Link';
import Image from '../elements/Image';
import LogoImage from '../assets/img/logo-main.png';
import H4 from '../elements/H4';


function LoginForm(){

    const handleClick = (e) => {
        e.preventDefault();
        console.log("handle click");
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
                        />

                        <Input type="password"
                            name= "password"
                            id="password"
                            icon="la-lock"
                            placeholder="Password"
                            margin="2"
                        />

                        <Link href="/forgot-password" name="forgot Password?" />
                        <Button type="submit" value="LOGIN" onClick={handleClick} alignment="text-center"></Button>

                    </form>
            </div>
            </div>
        </>
    );
}

export default LoginForm;