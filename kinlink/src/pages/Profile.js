import AuthContext from "../contexts/AuthContext";
import { React, useContext } from "react";
import LogInPage from "./LogInPage";


export default function HomePage(props) {
  let { user, profile, kin, isAuthenticated } = useContext(AuthContext);

  console.log(profile);
  console.log(kin);
  console.log(props.profiles);

  const kinImage = (p) =>{
    const avy = props.profiles.find(img => img.id === p.from_user)
    if(avy){
      return avy.avatar
    } else {
      return null
    }
  }

  return (
    <div className="flex flex-wrap justify-center object-center dark:text-white">
      {!user || !isAuthenticated ? (

        <LogInPage/>

      ) : (
        <div className="flex flex-wrap flex-col origin-center">
          <img className="rounded-full self-center" style={{maxHeight: '200px', maxWidth: '200px'}} src={profile.avatar} alt="avatar" />
          <h1 className=" text-center text-xl m-8 font-extrabold ">Welcome back, {user.username}!</h1>
         
    
                 
                <span className="text-6xl text-center">Kin</span>
                <section className="grid grid-cols-2">
                { (kin)?
                <div>
                  {
                   kin.map((p)=>{
                    return(
                    <div className="flex flex-wrap flex-col">
                      <img className="h-20 rounded-full" src={kinImage(p)}/>
                      <span className="self-center">{p.relationship_type}</span>
                    </div>
                    )
                   })
                  }
                </div>:null
                }
                </section>
            
        </div>

      )}
    </div>
  );
}
