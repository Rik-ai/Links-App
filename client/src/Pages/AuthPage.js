import React, { useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

function AuthPage() {
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
      message(error)
      clearError()
    }, [error, message, clearError])

    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const registerHandler = async () => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    return (
        <div className='row'>
            <div className='col s6 offset-s3'>
                <h1>Cut your so long link !</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Autorization</span>
                        <div>

                        <div className="input-field">
                            <input
                                placeholder="Enter your email"
                                id="email"
                                type="text"
                                name='password'
                                onChange={changeHandler}
                            />
                             <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-field">
                            <input
                                placeholder="Enter your password"
                                id="password"
                                type="password"
                                name='password'
                                onChange={changeHandler}
                            />
                             <label htmlFor="password">Password</label>
                        </div>


                        </div>
                    </div>
                    <div className="card-action">
                       <button disabled={loading} className='btn green accent-4' style={{margin: 10}} >Sign In</button>
                       <button onClick={registerHandler} disabled={loading} className='btn grey lighten-1 black-text'>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage
