import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";

export default function ViewProfile(props) {
  let navigate = useNavigate();

  let { user } = useContext(AuthContext)

  let BASE_URL = "http://localhost:8000";

  const [profileuser, setUser] = useState("");
  const [profile, setProfile] = useState([]);
  const [kin, setKin] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [newComment, setNewComment] = useState({
    user: user.user_id,
    post: "",
    content: "",
  });
  console.log(user)

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
    console.log(profileuser);
  }, [id]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/userprofiles/${profileuser.id}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
    console.log(profile);
  }, [profileuser.id]);

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
    grabPosts(profileuser.id);
  }, [profileuser.id]);

  const handleChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
    console.log(newComment);
  };

  const NewComment = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/comments/`, data);
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e, postId) => {
    e.preventDefault();
    await NewComment({
      user: newComment.user,
      post: postId,
      content: newComment.content,
    });

    setNewComment({
      ...newComment,
      content: "",
    });
    console.log("Adding new comment to post...");
  };


  return kin && profileuser && profile ? (
    <div className=" flex flex-wrap justify-center flex-col">
      <img
        className="border-2 border-black dark:border-secondary rounded-full self-center"
        style={{ maxHeight: "200px", maxWidth: "200px" }}
        src={profile.avatar}
        alt="avatar"
      />
      <h1 className=" text-center text-4xl m-8 font-extrabold ">
        {profileuser.username}
      </h1>

      <div className="self-center">
            <button
              className="rounded-lg darkregister-bg h-12 w-32 text-2xl font-bold"
              onClick={() => {
                navigate("/newlink");
              }}
            >
              Link
            </button>
          </div>

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
              {userPosts.map((post) => {
                return (
                  <div className="dark:darkpost-bg post-bg border-2 rounded-lg">
                    <img
                      className="mx-auto h-72 w-fit border-1 rounded-3xl p-2"
                      src={post.image}
                    />
                    <div className="border-4 rounded-lg">
                      <p className="text-2xl darkpost-bg dark:register-bg scroll-my-1 border-1 border-black rounded-lg p-4">
                        {post.content}
                      </p>
                      <div className="self-center border-1 border-black rounded-lg">
                      <form onSubmit={(e) => handleSubmit(e, post.id)} className="">
                <input
                  onChange={handleChange}
                  type="text"
                  name="content"
                  value={newComment.content}
                  required
                  placeholder="What do you think about this?"
                  className="bg-primary text-black dark:text-white text-xl rounded-md h-40 w-7/12 pl-0 darkpost-bg dark:register-bg  overflow-scroll font-bold"
                />
                <input type="hidden" name="post" value={post.id} />
                <button
                  className="text-4xl bg-lime-500 text-white h-20 rounded-xl font-bold shadow-lg shadow-gray-400 mt-10 mx-12 w-1/4"
                  type="submit"
                  disabled={!user || newComment.content === ""}
                >
                  Comment
                </button>
              </form>
                        {post.comments.map((comment) => {
                          return (
                            <div
                              key={comment.id}
                              className="border-2 rounded-lg"
                            >
                              <p className="text-xl dark:register-bg darkpost-bg max-h-fit p-4">
                                {comment.content}
                              </p>
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
