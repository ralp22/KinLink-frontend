import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ViewProfile(props) {
  let navigate = useNavigate();

  let BASE_URL = "http://localhost:8000";

  const [user, setUser] = useState("");
  const [profile, setProfile] = useState([]);
  const [kin, setKin] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  let { id } = useParams();

  //axios calls

  useEffect(() => {
    axios
      .get(`${BASE_URL}/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
    console.log(user);
  }, [id]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/userprofiles/${user.id}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
    console.log(profile);
  }, [user.id]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/relationships/to_user=${id}`)
      .then((res) => setKin(res.data))
      .catch((err) => console.error(err));
    console.log(kin);
  }, [id]);

  //functions using props

  const kinImage = (p) => {
    const avy = props.profiles.find((img) => img.id === p.from_user);
    console.log(avy);
    if (avy) {
      return avy.avatar;
    } else {
      return null;
    }
  };

  useEffect(() => {
    const grabPosts = (p) => {
      const posts = props.posts.filter((inst) => inst.user === p);
      console.log(posts);
      setUserPosts(Array.from(posts));
      console.log(userPosts);
    };
    grabPosts(user.id);
  }, [user.id]);

  return kin && user && profile ? (
    <div className="flex flex-wrap flex-col origin-center">
      <img
        className="rounded-full self-center"
        style={{ maxHeight: "200px", maxWidth: "200px" }}
        src={profile.avatar}
        alt="avatar"
      />
      <h1 className=" text-center text-xl m-8 font-extrabold ">
        {user.username}
      </h1>


      <div className="grid grid-cols-2 grid-rows-2">

      <span className=" text-6xl ">Kin</span>
      <section className="flex flex-wrap ml-96">
        {kin ? (
          <div className="grid grid-cols-2">
            {kin.map((p) => {
              return (
                <div key={p.id}>
                  <img
                    onClick={() => {
                      navigate(`/profile/${p.from_user}`);
                    }}
                    className="h-20 rounded-full"
                    src={kinImage(p)}
                  />
                  <span className="self-center">{p.relationship_type}</span>
                </div>
              );
            })}
          </div>
        ) : null}
      </section>

      <div >
        <span className="text-6xl">Posts</span>
        {
          <div className="flex flex-wrap float-right">
            {userPosts.map((p) => {
              return(
              <div>
                <img className="h-28" src={p.image} />
                <div>
                  {p.content}
                    <div className="self-center">
                      {p.comments.map((comment) => {
                        return <p key={comment.id}>{comment.content}</p>;
                      })}
                    </div>
                </div>
              </div>
              );
            })}
          </div>
        }
      </div>


        </div>


    </div>
  ) : (
    <h1 className="font-bold h-80 text-center self-center">Whaaaaaatttt</h1>
  );
}

// START WORKING HERE to get each profile page rendering correctly
// MAKE DELETE BUTTONS TO ENSURE FULL CRUD
// THEN WORK ON GETTING POSTS TO RENDER WITH ALL IMAGES/NAMES
// FINALLY WORK ON CREATING NEW POSTS / NEW COMMENTS

// const kinId = (p) =>{
//     const avy = props.profiles.find(img => img.id === p.from_user)
//     if(avy){
//       return avy.avatar
//     } else {
//       return null
//     }
//   }

// conditionally render button to establish relationship if
//1) user profile has id that does not match the logged in user's id
//2) relationship has already been established between logged in user and user whose profile is being viewed on this page
