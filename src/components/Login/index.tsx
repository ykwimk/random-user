import useLogin from '../../hooks/useLogin';
import { LoginWrapper } from './Login.style';

const Login = () => {
  useLogin();

  return (
    <LoginWrapper>
      <div className="input-box">
        <input type="text" className="input" />
      </div>
      <div className="input-box">
        <input type="password" className="input" />
      </div>
      <button type="button" className="login-button">
        로그인
      </button>
    </LoginWrapper>
  );
};

export default Login;
