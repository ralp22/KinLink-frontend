import AuthContext from "../contexts/AuthContext";
import { React, useContext } from "react";
import LogInPage from "./LogInPage";


export default function HomePage() {
  let { user, profile, kin, isAuthenticated } = useContext(AuthContext);

  console.log(profile);
  console.log(kin);

  return (
    <div className="justify-center dark:bg-primary dark:text-white">
      {!user || !isAuthenticated ? (
        <LogInPage />
      ) : (
        <div className="flex flex-wrap flex-col origin-center">
          <img className="rounded-full self-center" style={{maxHeight: '200px', maxWidth: '200px'}} src={profile.avatar} alt="avatar" />
          <h1 className=" text-center text-xl m-8 font-extrabold ">Welcome back, {user.username}!</h1>
         
    
                 <section>
                <h2>Kin</h2>
                
                </section>
            
        </div>

      )}
    </div>
  );
}
