import H1 from '../elements/H1';
import H5 from '../elements/H5';

function LoginHeader(){
    return (
        <>
            <div className="col-md-7 col-lg-8 left-login d-none d-md-flex">
                <H1 className="mb-4">Welcome to BCBP</H1>
                <H5 className="lh-base">“Enhance your project efficiency with our seasoned professional team and advanced AI technology-powered solutions”</H5>
            </div>
        </>
    );
}

export default LoginHeader;