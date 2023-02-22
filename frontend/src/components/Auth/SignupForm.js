import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ModalForm.scss';

import { signup, clearSessionErrors } from '../../store/session';

function SignupForm () {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [number, setNumber] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'firstname':
        setState = setFirstname;
        break;
      case 'lastname':
        setState = setLastname;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      case 'number':
        setState = setNumber;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      firstname,
      lastname,
      password,
      number
    };

    dispatch(signup(user));
  }

  const numberCheck = () => {
    if (number.length > 10) {
      setNumber(number.slice(0, 10));
    }
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
        <span>First Name</span>
        <input type="text"
          value={firstname}
          onChange={update('firstname')}
          placeholder="First Name"
        />
      </label>
      <div className="errors">{errors?.username}</div>
      <label>
        <span>Last Name</span>
        <input type="text"
          value={lastname}
          onChange={update('lastname')}
          placeholder="Last Name"
        />
      </label>
      <div className="errors">{errors?.username}</div>
      <label>
        <span>Password</span>
        <input type="password"
          value={password}
          onChange={update('password')}
          placeholder="Password"
        />
      </label>
      <div className="errors">{errors?.password}</div>
      <label>
        <span>Confirm Password</span>
        <input type="password"
          value={password2}
          onChange={update('password2')}
          placeholder="Confirm Password"
        />
      <div className="errors">
        {password !== password2 && 'Confirm Password field must match'}
      </div>
      </label>
      <label>
        <span>Phone Number</span>
        <input type="number"
          value={number}
          onChange={update('number')}
          placeholder="Phone Number"
        />
        <div>
          {numberCheck()}
        </div>
      </label>
	  <br/>
	  <div className="modalButton">
		<input
			className="modalButton_btn"
			type="submit"
			value="Sign Up"
			disabled={!email || !firstname || !lastname || !number || !password || password !== password2}
		/>

	  </div>
    </form>
  );
}

export default SignupForm;
