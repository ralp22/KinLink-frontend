import AuthContext from "../contexts/AuthContext";
import { React, useContext, useState } from "react";
import LogInPage from "./LogInPage";
import { useNavigate } from "react-router-dom";


export default function Profile(props) {
  let { user, profile, kin, isAuthenticated, posts } = useContext(AuthContext);
  let navigate = useNavigate()
  console.log(profile);
  console.log(kin);
  console.log(props.profiles);
  console.log(posts)
  


  const kinImage = (p) =>{
    const avy = props.profiles.find(img => img.id === p.from_user)
    if(avy){
      return avy.avatar
    } else {
      return null
    }
  }
  
  return user && profile && kin ?(
    <div className="flex flex-wrap justify-center object-center dark:text-white">
      {!user || !isAuthenticated ? (

        <LogInPage/>

      ) : (
        <div className="flex flex-wrap flex-col origin-center">
          <img className="rounded-full self-center" style={{maxHeight: '200px', maxWidth: '200px'}} src={profile.avatar} alt="avatar" />
          <h1 className=" text-center text-xl m-8 font-extrabold ">{user.username}</h1>
         
    
                <div className="float-left mr-96">
                <span className="text-6xl font-bold ">Kin</span>
                <section>
                { (kin)?
                <div className="grid grid-cols-2">
                  { 
                   kin.map((p)=>{
                    return(
                    <div key={p.id}>
                      <img onClick={()=>{navigate(`/profile/${p.from_user}`)}}className="h-20 rounded-full hover:cursor-pointer " src={kinImage(p)}/>
                      <span className="self-center">{p.relationship_type}</span>
                    </div>
                    )
                   })
                  }
                </div>:null
                }
                </section>
            </div>

            <section className="POSTS HERE">
            </section>
        </div>

      )}
    </div>
  ): <h1>Loading . . . </h1>
}
