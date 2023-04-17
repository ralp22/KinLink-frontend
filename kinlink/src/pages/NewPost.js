import axios from 'axios'
import {useState, useContext} from 'react'
import AuthContext from '../contexts/AuthContext'

export default function NewPost () {
    let {user, ToProfile} = useContext(AuthContext)
    const BASE_URL = "http://localhost:8000"

    console.log(user.user_id)

    const [postDetails, setPostDetails] = useState({
        user: user.user_id,
        content: "",
        image: "",
    })

    const handleChange = (e) => {
        e.preventDefault()
        setPostDetails({...postDetails, [e.target.name]: e.target.value})
        console.log(postDetails)
    }

    const MakePost = async (postDetails) => {
        try {
            const response = await axios.post(`${BASE_URL}/posts/`, postDetails)
            console.log(response)
            return response
        } catch(error) {
            console.error(error)
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        await MakePost(postDetails)
        setPostDetails({
            user: user.user_id,
            content: "",
            image: ""
        })
        ToProfile()
    }

    return (
        <div className="h-max flex flex-wrap flex-col rounded-3xl self-center dark:bg-gray-90">
            <div className="border-8 dark:border-gray-900 border-green-950 dark:bg-primary m-12 rounded-lg bg-gray-200">
            <form className="flex flex-col self-center m-2 rounded-lg darkregister-bg dark:register-bg" onSubmit={handleSubmit}>
                <div className="p-3 bg-gray">
                <label className="text-lg font-bold px-20">
                    Image
                </label>
                <input 
                className="placeholder:text-gray-300 mr-20 rounded-lg p-1 float-right w-80 text-black"
                onChange={handleChange}
                type="text"
                name="image"
                placeholder="Enter an image url here (optional)"
                />
                </div>
                <div className="p-3 bg-gray">
                <label className="text-lg font-bold px-20">
                    Content
                </label>
                <input 
                className="placeholder:text-gray-300 mr-20 rounded-lg p-1 float-right h-40 w-80 text-black"
                onChange={handleChange}
                type="text"
                name="content"
                placeholder="Enter your post here"
                />
                </div>
                <button className="my-6 shadow-md hover:bg-black hover:text-red-800 shadow-purple-950 hover:shadow-green-950 flex self-center rounded-lg bg-red-900 border-lg text-black font-bold" type="submit" disabled={postDetails.content===""}>
                <span className="p-10 py-2">Post{" "}</span>
                </button>
            </form>
            </div>
        </div>
    )
}