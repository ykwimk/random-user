import useSignUp from '../../hooks/useSignUp';
import { SignUpWrapper } from './SignUp.style';

const SignUp = () => {
  const { onChangeInput, onClickSignUp } = useSignUp();

  return (
    <SignUpWrapper>
      <div className="input-box">
        <label>
          <div className="input-title">아이디</div>
          <input
            type="text"
            name="userId"
            className="input"
            onChange={onChangeInput}
          />
        </label>
      </div>
      <div className="input-box">
        <label>
          <div className="input-title">비밀번호</div>
          <input
            type="password"
            name="password"
            className="input"
            onChange={onChangeInput}
          />
        </label>
      </div>
      <div className="input-box">
        <label>
          <div className="input-title">닉네임</div>
          <input
            type="text"
            name="nickName"
            className="input"
            onChange={onChangeInput}
          />
        </label>
      </div>
      <button type="button" className="login-button" onClick={onClickSignUp}>
        회원가입
      </button>
    </SignUpWrapper>
  );
};

export default SignUp;
