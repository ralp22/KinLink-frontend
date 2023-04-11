import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Register(){

    let navigate = useNavigate()

    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    })

    const handleChange = (e) => {
            setFormValues({...formValues, [e.target.name]: e.target.value})
        }
    const handleSubmit = async (e) => {
        e.preventDefault()
        // await RegisterUser({
        //     username: formValues.username,
        //     email: formValues.email,
        //     password: formValues.password
        // })
        setFormValues({
            username: '',
            email: '',
            password: '',
            confirmpassword: ''
        })
        console.log(e)
        navigate('/login')
    }
    
    return (
        <div className="register">
            <div className="register-container">
                <form className="area" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label htmlFor='username'>Username</label>
                    <input onChange={handleChange}
                    name="username"
                    type="text"
                    placeholder="What do we call you?"
                    value={formValues.username}
                    required/>
                </div>
                <div className="input-wrapper">
                    <label htmlFor='email'>Email</label>
                    <input onChange={handleChange}
                    name="email"
                    type="text"
                    placeholder="What's your email?"
                    value={formValues.email}
                    required/>
                </div>
                <div className="input-wrapper">
                    <label htmlFor='username'>Password</label>
                    <input onChange={handleChange}
                    name="password"
                    type="password"
                    placeholder="Select a password"
                    value={formValues.password}
                    required/>
                </div>
                <div className="input-wrapper">
                    <label htmlFor='confirmpassword'>Confirm password</label>
                    <input onChange={handleChange}
                    name="confirmpassword"
                    type="password"
                    placeholder="Re-enter password"
                    value={formValues.confirmpassword}
                    required/>
                </div>
                <button type='submit' disabled={!formValues.username||(!formValues.password && formValues.confirmpassword === formValues.password)}>
                    One of Us! One of Us!
                </button>
                </form>
            </div>
        </div>
    )
}