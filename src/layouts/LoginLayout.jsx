import LoginPanel from '../panels/LoginPanel';

function LoginLayout(){
    return (
        <div className="container-xl h-100">
            <div className="row h-100 justify-content-center">
                <div className="col-lg-11 col-md-12 col-sm-7 login-main">
                    <LoginPanel />    
                </div>
            </div>
        </div>
    )
}

export default LoginLayout;