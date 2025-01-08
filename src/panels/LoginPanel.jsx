import LoginHeader from '../sections/LoginHeader';
import LoginForm from '../sections/LoginForm';

function LoginPanel(){
    return (
        <>
            <div className="login-section">
                <div className="row g-0 h-100">
                    <LoginHeader />
                    <LoginForm />
                </div>
            </div>
        </>
        
    );
}

export default LoginPanel;