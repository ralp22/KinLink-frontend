import AuthContext from "../contexts/AuthContext";
import { React, useContext, useState, useEffect } from "react";
import LogInPage from "./LogInPage";
import { useNavigate } from "react-router-dom";

export default function Profile(props) {
  let { user, profile, kin, isAuthenticated } = useContext(AuthContext);
  let navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);

  const kinImage = (p) => {
    const avy = props.profiles.find((img) => img.id === p.from_user);
    if (avy) {
      return avy.avatar;
    } else {
      return null;
    }
  };

  useEffect(() => {
    const grabPosts = (p) => {
      const posts = props.posts.filter((inst) => inst.user === user.user_id);
      setUserPosts(Array.from(posts));
    };
    grabPosts(user.user_id);
  }, [user]);

  return user && profile && kin ? (
    <div className="justify-center object-center dark:text-white">
      {!user || !isAuthenticated ? (
        <LogInPage />
      ) : (
        <div className="flex flex-wrap flex-col justify-center">
          <img
            className="border-2 border-black dark:border-secondary rounded-full self-center"
            style={{ maxHeight: "200px", maxWidth: "200px" }}
            src={profile.avatar}
            alt="avatar"
          />
          <h1 className=" text-center text-xl m-8 font-extrabold ">
            {user.username}
          </h1>

          <div className="self-center">
            <button
              className="rounded-lg register-bg h-12 w-32 text-2xl font-bold"
              onClick={() => {
                navigate("/newpost");
              }}
            >
              Post
            </button>
          </div>

          <section className="flex flex-wrap flex-col px-3 py-10">
            <div className="self-center w-3/4">
              <span className="text-6xl font-bold ">Kin</span>
              {kin ? (
                <div className="grid grid-cols-5">
                  {kin.map((p) => {
                    return (
                      <div key={p.id}>
                        <img
                          onClick={() => {
                            navigate(`/profile/${p.from_user}`);
                          }}
                          className="h-20 rounded-full hover:cursor-pointer "
                          src={kinImage(p)}
                        />
                        <span className="self-center">
                          {p.relationship_type}
                        </span>
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
                                  <form onSubmit={null}>
                                    <input className="bg-primary text-secondary dark:text-white text-xl rounded-md h-40 w-2/3 pl-0 darkpost-bg dark:register-bg  overflow-scroll font-bold" />
                                    <button
                                      className=" text-4xl bg-lime-500 text-white h-16 w-1/4 rounded-xl font-bold shadow-lg shadow-gray-400 mx-12"
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
      )}
    </div>
  ) : (
    <h1 className="font-bold h-80 text-center self-center text-6xl">
      Huhhhhhhh?!?!?!?!?
    </h1>
  );
}
