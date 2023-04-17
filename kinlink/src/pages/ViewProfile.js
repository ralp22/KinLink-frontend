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
    <div className=" flex flex-wrap justify-center flex-col">
      <img
        className="border-2 border-black dark:border-secondary rounded-full self-center"
        style={{ maxHeight: "200px", maxWidth: "200px" }}
        src={profile.avatar}
        alt="avatar"
      />
      <h1 className=" text-center text-4xl m-8 font-extrabold ">
        {user.username}
      </h1>

      <section className="flex flex-wrap flex-col px-3 py-10">
        <div className="self-center w-3/4">
          <span className="text-6xl font-bold">Kin</span>
          {kin ? (
            <div className="grid grid-cols-5">
              {kin.map((p) => {
                return (
                  <div key={p.id}>
                    <img
                      onClick={() => {
                        navigate(`/profile/${p.from_user}`);
                      }}
                      className="border-2 border-primary dark:border-secondary h-20 rounded-full"
                      src={kinImage(p)}
                    />
                    <span className="self-center">{p.relationship_type}</span>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="self-center w-3/4">
          <span className="text-6xl font-bold">Posts</span>
          {
            <div className="">
              {userPosts.map((p) => {
                return (
                  <div className="dark:darkpost-bg post-bg border-2 rounded-lg">
                    <img
                      className="mx-auto h-72 w-fit border-1 rounded-3xl p-2"
                      src={p.image}
                    />
                    <div className="border-4 rounded-lg">
                      <p className="text-2xl darkpost-bg dark:register-bg scroll-my-1 border-1 border-black rounded-lg p-4">
                        {p.content}
                      </p>
                      <div className="self-center border-1 border-black rounded-lg">
                        {p.comments.map((comment) => {
                          return (
                            <div
                              key={comment.id}
                              className="border-2 rounded-lg"
                            >
                              <p className="text-xl dark:register-bg darkpost-bg max-h-fit p-4">
                                {comment.content}
                              </p>

                              <form className="" onSubmit={null}>
                                <input className="bg-primary text-secondary dark:text-white text-xl rounded-md h-40 w-2/3 pl-0 darkpost-bg dark:register-bg  overflow-scroll font-bold" />

                                <button
                                  className="text-4xl bg-lime-500 text-white h-20 rounded-xl font-bold shadow-lg shadow-gray-400 mt-10 mx-12 w-1/4"
                                  type="submit"
                                >
                                  Comment
                                </button>
                              </form>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          }
        </div>
      </section>
    </div>
  ) : (
    <h1 className="font-bold h-80 text-center self-center">Whaaaaaatttt</h1>
  );
}

// conditionally render button to establish relationship if
//1) user profile has id that does not match the logged in user's id
//2) relationship has already been established between logged in user and user whose profile is being viewed on this page
