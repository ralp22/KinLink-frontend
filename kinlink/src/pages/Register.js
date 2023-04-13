import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

export default function Register(){


    
    let navigate = useNavigate()
    const BASE_URL = 'http://localhost:8000'
    const  RegisterUser = async (data) => {
        try {
            const response = await axios.post(`${BASE_URL}/users/`, data)
            console.log(response)
            return response
        } catch(error) {
            throw error
        }
    }
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    })

    const handleChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
        console.log(formValues)
        }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await RegisterUser({
            username: formValues.username,
            email: formValues.email,
            password: formValues.password,
            is_staff: 'False',
            is_superuser: 'False'
        })
        setFormValues({
            username: '',
            email: '',
            password: '',
            confirmpassword: ''
        })
        console.log('Registering user...')
        navigate('/login')
    }
    
    return (
        <div className="register">
            <div className="register-container">
                <form className="register-form" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label htmlFor='username'>Username</label>
                    <input className="reg-input-field" onChange={handleChange}
                    name="username"
                    type="text"
                    placeholder="What do we call you?"
                    value={formValues.username}
                    required/>
                </div>
                <div className="input-wrapper">
                    <label htmlFor='email'>Email</label>
                    <input className="reg-input-field" onChange={handleChange}
                    name="email"
                    type="text"
                    placeholder="What's your email?"
                    value={formValues.email}
                    required/>
                </div>
                <div className="input-wrapper">
                    <label htmlFor='username'>Password</label>
                    <input className="reg-input-field" onChange={handleChange}
                    name="password"
                    type="password"
                    placeholder="Select a password"
                    value={formValues.password}
                    required/>
                </div>
                <div className="input-wrapper">
                    <label htmlFor='confirmpassword'>Confirm password</label>
                    <input className="reg-input-field" onChange={handleChange}
                    name="confirmpassword"
                    type="password"
                    placeholder="Re-enter password"
                    value={formValues.confirmpassword}
                    required/>
                </div>
                <button className="reg-btn" type='submit' disabled={!formValues.username||(!formValues.password && formValues.confirmpassword === formValues.password)}>
                    One of Us! One of Us!
                </button>
                </form>
            </div>
        </div>
    )
}