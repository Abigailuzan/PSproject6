import FromSignIn from '../Conponents/FromSignIn';
import { Link } from 'react-router-dom';
function SignIn() {
  return (  
    <div>
        <h1>Sign in</h1>
        <Link to="/create-account"> Create account</Link>
        <FromSignIn />
    </div>
  );
}

export default SignIn;