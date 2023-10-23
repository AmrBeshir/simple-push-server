import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function LoggedInGuard({ childern }) {

    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem("id"))
            navigate("/", { replace: true })
    },[])

    return childern
}