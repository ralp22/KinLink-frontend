import AuthContext from "../contexts/AuthContext";
import { React, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'


export default function HomePage(props) {
  
  console.log(props)

  let { user } = useContext(AuthContext);
  console.log(user)
  const BASE_URL = "http://localhost:8000"
  const [newComment, setNewComment] = useState({
    user: user.user_id,
    post: "",
    content:"",
  })

  let navigate = useNavigate()

  const viewProfile = (id) => {
    navigate(`/profile/${id}`)
  }

  const image = (p) =>{
    const avy = props.profiles.find(img => img.id === p)
    if(avy){
      return avy.avatar
    } else {
      return null
    }
  }

  const handleChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
    console.log(newComment);
  };

  const NewComment = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/comments/`, data)
      console.log(response)
      return response
    } catch(error){
      console.error(error)
    }
  }

  const handleSubmit = async (e, postId) => {
    e.preventDefault()
    await NewComment({
      user: newComment.user,
      post: postId,
      content: newComment.content
    })
    
    setNewComment({
      user: user.user_id,
      post: "",
      content: "",
    })
    console.log("Adding new comment to post...")
  }


  return (
    <div className="flex flex-wrap flex-col py-10 w-10/12 self-center">
      <div className="self-center">
        <button
        className="rounded-lg register-bg h-12 w-32 text-2xl font-bold mb-8" 
        onClick={()=>{navigate('/newpost')}}>
          Post
        </button>
        </div>
      <span className="self-center text-6xl font-bold mb-8">Recent Posts</span>
      {
          props.posts.sort((a,b)=> Date.parse(b.created_at) - Date.parse(a.created_at))
          .map((post)=>{
            console.log(Date.parse(post.created_at))
            return (
              <div className="dark:darkpost-bg post-bg border-2 rounded-lg">
                <img className="mx-auto h-72 w-fit border-1 rounded-3xl p-2" src={post.image}/>
                <p className="text-2xl darkpost-bg dark:register-bg scroll-my-1 border-1 border-black rounded-lg p-4">
                  {post.content}
                  </p>
                {
                  <div className="self-center border-1 border-black rounded-lg">
                    {post.comments.map(comment=>{
                      return (
                        <div
                          key={comment.id}
                          className="border-2 rounded-lg"
                        >
                          <p className="text-xl dark:register-bg darkpost-bg max-h-fit p-4">{comment.content}</p>

                          <form onSubmit={(e) => handleSubmit(e, post.id)} className="">
                            <input 
                            onChange={handleChange}
                            type="text"
                            name="content"
                            value={newComment.content}
                            required
                            placeholder="What do you think about this?"
                            className="bg-primary text-secondary dark:text-white text-xl rounded-md h-40 w-2/3 pl-0 darkpost-bg dark:register-bg  overflow-scroll font-bold"/>
                            <input type="hidden" name="post" value={post.id}/>
                            <button className="text-4xl bg-lime-500 text-white h-20 rounded-xl font-bold shadow-lg shadow-gray-400 mt-10 mx-12 w-1/4" type="submit" disabled={!user || newComment.content===""}>Comment</button>
                          </form>
                        </div>
                      );} 
                    )}
                  </div>
                }
              </div>
            )
          })
      }
    </div>
  )
}