import { useContext, useState } from "react"
import AuthContext from "../contexts/AuthContext"

export default function NewLink(props){

    let { user } = useContext(AuthContext)

    const [link, setLink] = useState({
        from_user: "",
        to_user:user.user_id,
        relationship_type: ""
    })

    const handleSubmit = () => {

    }

    return (
        <div className="flex flex-col self-center">
            <h1 className="h-20 text-3xl font-bold self-center">Define your link</h1>

            <section className="darkpost-bg border-2 border-primary">
                <form onSubmit={handleSubmit}>
                    <input
                    className="bg-primary text-black dark:text-white text-xl rounded-md h-40 w-7/12 pl-0 darkpost-bg dark:register-bg  overflow-scroll font-bold"
                    type="text"
                    name="relationship_type"
                    value={link.relationship_type}/>
                    <button className="rounded-lg darkregister-bg h-12 w-32 text-2xl font-bold" type="submit">Add</button>
                </form>
            </section>
        </div>
    )
}