import LoginForm from "../components/LoginForm";
import LogoutForm from "../components/LogoutForm";
import isAuthorized from "../utils/token";

export default function Login() {
    return (
        isAuthorized() ? <LogoutForm /> : <LoginForm />
    )
}
