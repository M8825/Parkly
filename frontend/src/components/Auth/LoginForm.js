import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ModalForm.scss';

import { login, clearSessionErrors } from '../../store/session';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  }

  const demoUser = e => {
    setEmail('demo@user.io');
    setPassword('password');
}

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <label>
        <span>Email</span>
        <input type="text"
          value={email}
          onChange={update('email')}
          placeholder="Email"
        />
      </label>
      <div className="errors">{errors?.email}</div>
      <label>
        <span>Password</span>
        <input type="password"
          value={password}
          onChange={update('password')}
          placeholder="Password"
        />
      </label>
      <div className="errors">{errors?.password}</div>
      <br />
      <div className="modalButton">
        <input
          className="modalButton_btn"
          type="submit"
          value="Log In"
          disabled={!email || !password}
        />
      </div>
      <br/>
      <div className="modalButton">
        <button onClick={demoUser} className="modalButton_btn" type="submit">Demo User</button>
      </div>
    </form>
  );
}

export default LoginForm;
