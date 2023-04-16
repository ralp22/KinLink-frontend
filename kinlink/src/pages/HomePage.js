import AuthContext from "../contexts/AuthContext";
import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LogInPage from "./LogInPage";


export default function HomePage(props) {

  console.log(props)

  let { user, profile, kin, isAuthenticated } = useContext(AuthContext);

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
  const getname = (p) =>{
    const name = props.users.find(person=> person.id === p)
    if(name){
      return name.username
    } else {
      return null
    }
  }



  return (
    <div className="flex flex-wrap flex-col">
      {
          props.posts.map((post)=>{
            return (
              <div className=" border-black self-center">
                <img className=" h-32 " src={post.image}/>
                {post.content}
                {
                  <div className="self-center">
                    {post.comments.map(comment=>{
                      return (
                        <p>
                          {comment.content}
                        </p>
                      )} 
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