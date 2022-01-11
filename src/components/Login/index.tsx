import useLogin from '../../hooks/useLogin';
import { LoginWrapper } from './Login.style';

const Login = () => {
  const { id, password, onChangeInput, onClickLoginButton } = useLogin();

  return (
    <LoginWrapper>
      <div className="input-box">
        <input
          type="text"
          name="id"
          className="input"
          defaultValue={id}
          onChange={(e) => onChangeInput(e)}
        />
      </div>
      <div className="input-box">
        <input
          type="password"
          name="password"
          className="input"
          defaultValue={password}
          onChange={onChangeInput}
        />
      </div>
      <button
        type="button"
        className="login-button"
        onClick={onClickLoginButton}
      >
        로그인
      </button>
    </LoginWrapper>
  );
};

export default Login;
