import { Outlet, useLocation } from "react-router-dom";
import { dynamicLayoutMetadata } from "../utils/url-helper";
import { useAuth } from "providers/auth-provider";

const RootLayout = () => {
  const location = useLocation(); // hooks
  const metadata = dynamicLayoutMetadata(location.pathname);
  const [user, setUser] = useAuth()

  const handleSignOut = () => {
    setUser(null)
    localStorage.removeItem("user")
    //AuthApi.signOut()
  }

  return (
    <>
      {metadata.header && <header>
        {user && `${user.email}님 안녕하세요`}
        header</header>}
      <Outlet />
      {metadata.footer && <footer>footer</footer>}
    </>
  );
};
export default RootLayout;