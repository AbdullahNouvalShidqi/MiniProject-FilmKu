import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  GetFavoriteMoviesByUserId, GetUserByEmailPassword } from '../../graphql/queries';
import { getUserState, setUserList, signUpOrLogin } from '../../redux/reducer/userSlice';
import './LoginBody.css'

const baseFormData = {
    email: '',
    password: ''
}

const baseErrorMessage ={
    email: '',
    password: ''
}

const LoginBody = () => {
    const [formData, setFormData] = useState(baseFormData);
    const [errMsg, setErrMsg] = useState(baseErrorMessage);
    const [getUserByEmailPassword,{loading}] = useLazyQuery(GetUserByEmailPassword);
    const [getUserList, {loading: getListLoading}] = useLazyQuery(GetFavoriteMoviesByUserId);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(getUserState);

    useEffect(() => {
        if(isLoggedIn){
            navigate('/');
        }
        const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
    }, [setErrMsg, formData, isLoggedIn, navigate]);

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData(prev => ({...prev, [name]: value}));
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        if(errMsg.email !== '' || errMsg.password !== ''){
            alert('Please input your email and password properly');
            return
        }

        getUserByEmailPassword({
            variables:{
                email: formData.email.toLowerCase(),
                password: formData.password
            }
        }).then((data) => {
            if(data.data.movieDatabase_user.length !== 0){
                const userData = data.data.movieDatabase_user[0];
                getUserList({
                    variables: {
                        userId: userData.id
                    }
                }).then((data) => {
                    dispatch(setUserList(data.data.movieDatabase_favorite_movies))
                    dispatch(signUpOrLogin(userData));
                    alert('Login Succesfuly')  
                });
                  
            } else{
                alert("No data found, check you email and password");
            }
        })
    }

    return(
        <div className="sign-up-body">
            <div className="main-sub-title">
                <div className="main-title">
                    Welcome Back to Filmku
                </div>
                <div className="subtitle">
                    A place where you can have your own movie space
                </div>
            </div>
            <div className='login-form-container'>
                <form onSubmit={handleSumbit}>
                    <div className="costum-input-container">
                        <div className="login-input-error-column">
                            <label htmlFor="email">
                                Email
                                <input type="email" name='email' value={formData.email} onChange={onChange} />
                            </label>
                            {errMsg.email === '' ? 
                                <></> : 
                                <div className="login-error-message">
                                    {errMsg.email}
                                </div>
                            }
                        </div>
                        <div className="login-input-error-column">
                            <label htmlFor="password">
                                Password
                                <input type="password" name='password' value={formData.password} onChange={onChange} />
                            </label>
                            {errMsg.password === '' ? 
                                <></> : 
                                <div className="login-error-message">
                                    {errMsg.password}
                                </div>
                            }
                        </div>
                    </div>
                    <input className={loading ? 'costum-login-button loading' : "costum-login-button"} type={'submit'} value={loading ? 'Loading, Please Wait' :  'Login'} />
                </form>
            </div>
        </div>
    )
}

export default LoginBody;