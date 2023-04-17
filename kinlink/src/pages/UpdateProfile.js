import AuthContext from "../contexts/AuthContext";
import { useState, useContext } from 'react'
import axios from 'axios'
import LogInPage from "./LogInPage";

export default function UpdateProfile () {
    const {user, ToHome, logout} = useContext(AuthContext)
    console.log(user.user_id)
    const BASE_URL = 'http://localhost:8000'

    const DestroyUser = async () => {
      try {
        const response = await axios.delete(`${BASE_URL}/users/${user.user_id}`)
        console.log(response)
        logout()
        return response
      } catch (error) {
        console.error(error)
      }
    }

    const UpdateUserProfile = async (data) => {
        try {
            const response = await axios.put(`${BASE_URL}/userprofiles/${user.user_id}`, data)
            console.log(response)
            return response
        } catch(error) {
          console.error(error)
        }
    }
    const [profileChange, setProfileChange] = useState({
        user: user.user_id,
        avatar: '',
        highlight_reel_img_1: '',
        highlight_reel_img_2: '',
        highlight_reel_img_3: '',
        highlight_reel_img_4: '',
        highlight_reel_img_5: '',
        highlight_reel_img_6: '',
        highlight_reel_img_7: '',
        highlight_reel_img_8: '',
        highlight_reel_img_9: '',
        highlight_reel_img_10: '',
    })

    const handleChange = (e) => {
        setProfileChange({...profileChange, [e.target.name]: e.target.value})
        console.log(profileChange)
        }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await UpdateUserProfile({
            user: user.user_id,
            avatar: profileChange.avatar,
            highlight_reel_img_1: profileChange.highlight_reel_img_1,
            highlight_reel_img_2: profileChange.highlight_reel_img_2,
            highlight_reel_img_3: profileChange.highlight_reel_img_3,
            highlight_reel_img_4: profileChange.highlight_reel_img_4,
            highlight_reel_img_5: profileChange.highlight_reel_img_5,
            highlight_reel_img_6: profileChange.highlight_reel_img_6,
            highlight_reel_img_7: profileChange.highlight_reel_img_7,
            highlight_reel_img_8: profileChange.highlight_reel_img_8,
            highlight_reel_img_9: profileChange.highlight_reel_img_9,
            highlight_reel_img_10: profileChange.highlight_reel_img_10,
        })
        setProfileChange({
            user: user.user_id,
            avatar: '',
            highlight_reel_img_1: '',
            highlight_reel_img_2: '',
            highlight_reel_img_3: '',
            highlight_reel_img_4: '',
            highlight_reel_img_5: '',
            highlight_reel_img_6: '',
            highlight_reel_img_7: '',
            highlight_reel_img_8: '',
            highlight_reel_img_9: '',
            highlight_reel_img_10: '',
        })
        ToHome()
        console.log('Updating user profile...')
    }

    return user? (
      <div className="flex flex-wrap self-center">
        <div className="border-8 dark:border-gray-900 border-green-950 dark:bg-primary m-12 rounded-lg bg-gray-200">
          <form className="flex flex-col self-center m-2 rounded-lg darkregister-bg dark:register-bg" 

          onSubmit={handleSubmit}>
            <div className="p-3 bg-gray ">
              <label className="font-bold px-20 " htmlFor="avatar">Avatar</label>
              <input
                style={{background: 'linear-gradient(to bottom right, purple, 20%, gray)'}}
                className="placeholder:text-gray-300 mr-20 rounded-lg p-1 float-right"
                name="avatar"
                onChange={handleChange}
                type="text"
                placeholder="Enter image url here"
                value={profileChange.avatar}
              />
            </div>
            <div className="p-3 bg-gray ">
              <label className="font-bold mr-20  px-20" htmlFor="highlight_reel_img_1">Highlight Image 1</label>
              <input
              style={{background: 'linear-gradient(to bottom right, purple, 20%, gray)'}}
                className="placeholder:text-gray-300 mr-20 rounded-lg p-1 float-right"
                name="highlight_reel_img_1"
                onChange={handleChange}
                type="text"
                placeholder="Enter image url here"
                value={profileChange.highlight_reel_img_1}
              />
            </div>
            <div className="p-3 bg-gray ">
              <label className="font-bold px-20 " htmlFor="highlight_reel_img_2">Hightlight Image 2</label>
              <input
              style={{background: 'linear-gradient(to bottom right, purple, 20%, gray)'}}
                className="placeholder:text-gray-300 mr-20 rounded-lg p-1 float-right"
                name="highlight_reel_img_2"
                onChange={handleChange}
                type="text"
                placeholder="Enter image url here"
                value={profileChange.highlight_reel_img_2}
              />
            </div>
            <div className="p-3 bg-gray ">
              <label className="font-bold px-20 " htmlFor="highlight_reel_img_3">Hightlight Image 3</label>
              <input
              style={{background: 'linear-gradient(to bottom right, purple, 20%, gray)'}}
                className="placeholder:text-gray-300 mr-20 rounded-lg p-1 float-right"
                name="highlight_reel_img_3"
                onChange={handleChange}
                type="text"
                placeholder="Enter image url here"
                value={profileChange.highlight_reel_img_3}
              />
            </div>
            <div className="p-3 bg-gray ">
              <label className="font-bold px-20 " htmlFor="highlight_reel_img_4">Hightlight Image 4</label>
              <input
              style={{background: 'linear-gradient(to bottom right, purple, 20%, gray)'}}
                className="placeholder:text-gray-300 mr-20 rounded-lg p-1 float-right"
                name="highlight_reel_img_4"
                onChange={handleChange}
                type="text"
                placeholder="Enter image url here"
                value={profileChange.highlight_reel_img_4}
              />
            </div>
            <div className="p-3 bg-gray ">
              <label className="font-bold px-20 " htmlFor="highlight_reel_img_5">Highlight Image 5</label>
              <input
              style={{background: 'linear-gradient(to bottom right, purple, 20%, gray)'}}
                className="placeholder:text-gray-300 mr-20 rounded-lg p-1 float-right"
                name="highlight_reel_img_5"
                onChange={handleChange}
                type="text"
                placeholder="Enter image url here"
                value={profileChange.highlight_reel_img_5}
              />
            </div>
            <div className="p-3 bg-gray ">
              <label className="font-bold px-20 " htmlFor="highlight_reel_img_6">Hightlight Image 6</label>
              <input
              style={{background: 'linear-gradient(to bottom right, purple, 20%, gray)'}}
                className="placeholder:text-gray-300 mr-20 rounded-lg p-1 float-right"
                name="highlight_reel_img_6"
                onChange={handleChange}
                type="text"
                placeholder="Enter image url here"
                value={profileChange.highlight_reel_img_6}
              />
            </div>
            <div className="p-3 bg-gray ">
              <label className="font-bold px-20 " htmlFor="highlight_reel_img_7">Highlight Image 7</label>
              <input
              style={{background: 'linear-gradient(to bottom right, purple, 20%, gray)'}}
                className="placeholder:text-gray-300 mr-20 rounded-lg p-1 float-right"
                name="highlight_reel_img_7"
                onChange={handleChange}
                type="text"
                placeholder="Enter image url here"
                value={profileChange.highlight_reel_img_7}
              />
            </div>
            <div className="p-3 bg-gray ">
              <label className="font-bold px-20 " htmlFor="highlight_reel_img_8">Highlight Image 8</label>
              <input
              style={{background: 'linear-gradient(to bottom right, purple, 20%, gray)'}}
                className="placeholder:text-gray-300 mr-20 rounded-lg p-1 float-right"
                name="highlight_reel_img_8"
                onChange={handleChange}
                type="text"
                placeholder="Enter image url here"
                value={profileChange.highlight_reel_img_8}
              />
            </div>
            <div className="p-3 bg-gray ">
              <label className="font-bold px-20 " htmlFor="highlight_reel_img_9">Highlight Image 9</label>
              <input
              style={{background: 'linear-gradient(to bottom right, purple, 20%, gray)'}}
                className="placeholder:text-gray-300 mr-20 rounded-lg p-1 float-right"
                name="highlight_reel_img_9"
                onChange={handleChange}
                type="text"
                placeholder="Enter image url here"
                value={profileChange.highlight_reel_img_9}
              />
            </div>
            <div className="p-3 bg-gray ">
              <label className="font-bold px-20 " htmlFor="highlight_reel_img_10">Highlight Image 10</label>
              <input
              style={{background: 'linear-gradient(to bottom right, purple, 20%, gray)'}}
                className=" mr-20 rounded-lg p-1 float-right placeholder:text-gray-300"
                name="highlight_reel_img_10"
                onChange={handleChange}
                type="text"
                placeholder="Enter image url here"
                value={profileChange.highlight_reel_img_10}
              />
            </div>
            <button className="my-6 shadow-md hover:bg-lime-500 hover:text-primary shadow-purple-950 hover:shadow-green-950 flex self-center rounded-lg bg: bg-primary border-lg text-lime-500" type="submit" disabled={profileChange === ""}>
              {" "}
              <span className="p-10 py-2">Submit Changes{" "}</span>
            </button>

            <button onClick={DestroyUser} className="my-6 shadow-md hover:bg-black hover:text-red-800 shadow-purple-950 hover:shadow-green-950 flex self-center rounded-lg bg-red-900 border-lg text-black font-bold" type="submit">
              {" "}
              <span className="p-10 py-2">Delete Account{" "}</span>
            </button>
          </form>
        </div>
      </div>
    ) : <div className="min-h-full flex flex-wrap flex-col">
      <h1 className="self-center text-2xl font-bold m-4">Please log in first...</h1>
      <LogInPage/>
      </div>
}