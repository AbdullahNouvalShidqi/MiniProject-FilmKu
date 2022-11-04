import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SignUp } from '../../graphql/mutations';
import { GetUserByEmail } from '../../graphql/queries';
import {  getUserState, signUpOrLogin } from '../../redux/reducer/userSlice';
import './SignUpBody.css';

const formBaseData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const baseErrorMessage = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpBody = () => {
    const [formData, setFormData] = useState(formBaseData);
    const [errMsg, setErrMsg] = useState(baseErrorMessage);
    const [signUp, { loading, error}] = useMutation(SignUp);
    const [checkEmail, { loading: getUserLoading, error: getUserError}] = useLazyQuery(GetUserByEmail);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getUserState);

    useEffect(() => {
        if(isLoggedIn){
            navigate('/');
            return;
        }
        const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(formData.confirmPassword === formData.password){
            setErrMsg(prev => ({...prev, confirmPassword: ''}))
        } else {
            setErrMsg(prev => ({...prev, confirmPassword: '*Please input the same password as before'}));
        }

        if(formData.username === ''){
            setErrMsg(prev => ({...prev, username: '*Please input your username'}));
        }
        else if(formData.username.includes(' ')){
            setErrMsg(prev => ({...prev, username: '*No space allowed for username'}));
        } else {
            setErrMsg(prev => ({...prev, username: ''}));
        }

        if(formData.email === ''){
            setErrMsg(prev => ({...prev, email: '*Please input your email'}));
        } else if(!formData.email.match(emailRegEx)){
            setErrMsg(prev => ({...prev, email: '*Please input a proper email'}));
        } else {
            setErrMsg(prev => ({...prev, email: ''}));
        }

        if(formData.password === ''){
            setErrMsg(prev => ({...prev, password: '*Please input your password'}));
        } else if(formData.password.length < 6){
            setErrMsg(prev => ({...prev, password: '*The password should be at least 6 characters'}));
        } else if(formData.password.includes(' ')){
            setErrMsg(prev => ({...prev, password: '*No spaces are allowed on password'}));
        } else{
            setErrMsg(prev => ({...prev, password: ''}));
        }
    }, [formData, isLoggedIn, navigate])

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        if(errMsg.email !== '' || errMsg.username !== '' || errMsg.password !== '' || errMsg.confirmPassword !== ''){
            alert('Please input your data properly');
            return;
        }
        checkEmail({variables: {
            email: formData.email
        }})
        .then((data) => {
            if(getUserError){
                alert('Failed to sign up, check your internet connection or try again later.');
                return;
            }
            if(data.data.movieDatabase_user.length === 0){
                signUp({
                    variables: {
                        email: formData.email.toLowerCase(),
                        username: formData.username,
                        password: formData.password
                    }
                }).then((data)=>{
                    if(error){
                        alert('Failed to sign up, check your internet connection or try again later.');
                    }
                    dispatch(signUpOrLogin(data.data.insert_movieDatabase_user.returning[0]));
                    alert('Signup succesfuly');
                    navigate('/')
                })
            } else {
                alert('Email are already used.');
            }
        })
    }

    const toLoginOnClick = () => {
        navigate('/login');
    }

    return(
        <div className="sign-up-body">
            <div className="main-sub-title">
                <div className="main-title">
                    Sign Up to Filmku
                </div>
                <div className="subtitle">
                    A place where you can have your own movie space
                </div>
            </div>
            <form onSubmit={handleSumbit}>
                <div className='form-container'>
                    <div className="costum-input-container">
                        <div className="signup-input-error-column">
                            <label htmlFor="email">
                                Email
                                <input type="email" name='email' value={formData.email} onChange={onChange} />
                            </label>
                            {errMsg.email === '' ? 
                                <></> : 
                                <div className="signup-error-message">
                                    {errMsg.email}
                                </div>
                            }
                        </div>
                        <div className="signup-input-error-column">
                            <label htmlFor="username">
                                Username
                                <input type="text" name='username' value={formData.username} onChange={onChange} />
                            </label>
                            {errMsg.username === '' ? 
                                <></> : 
                                <div className="signup-error-message">
                                    {errMsg.username}
                                </div>
                            }
                        </div>
                        <div className="signup-input-error-column">
                            <label htmlFor="password">
                                Password
                                <input type="password" name='password' value={formData.password} onChange={onChange} />
                            </label>
                            {errMsg.password === '' ? 
                                <></> : 
                                <div className="signup-error-message">
                                    {errMsg.password}
                                </div>
                            }
                        </div>
                        <div className="signup-input-error-column">
                            <label htmlFor="confirmPassword">
                                Confirm password
                                <input type="password" name='confirmPassword' value={formData.confirmPassword} onChange={onChange} />
                            </label>
                            {errMsg.confirmPassword === '' ? 
                                <></> : 
                                <div className="signup-error-message">
                                    {errMsg.confirmPassword}
                                </div>
                            }
                        </div>
                    </div>
                    <input className={loading || getUserLoading ? 'costum-signup-button loading' : "costum-signup-button"} type={'submit'} value={loading || getUserLoading ? 'Loading, please wait...' : 'SignUp'} />
                    <div className="signup-already-have-account">
                        Already have an account ? <span className='to-login' onClick={toLoginOnClick}>Login</span>
                    </div>
                </div>
            </form>
            
        </div>
    )
}

export default SignUpBody;