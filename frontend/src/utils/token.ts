import { jwtDecode } from "jwt-decode"
import { ACCESS_TOKEN } from "../constants"

function isAuthorized() {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (!token) {
        return false
    }

    const decoded = jwtDecode(token)

    if (decoded.exp && decoded.exp < Date.now() / 1000) {
        return false
    } else {
        return true
    }
}

export default isAuthorized