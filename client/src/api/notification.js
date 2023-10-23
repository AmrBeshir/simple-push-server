import axios from "axios";

export async function sendNotification(title, body, actionUrl) {
    const userId = localStorage.getItem("id")
    if (userId) {
        let actionUrlCheck = actionUrl ? 'https://www.' + actionUrl : "https://google.com"
        return await axios.post(`${process.env.REACT_APP_SERVER_URL}/sendNotification`, {
            userId,
            title,
            body,
            actionUrl: actionUrlCheck
        })
    }
}