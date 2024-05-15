import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";
import Editor from "./pages/editor.pages";
import HomePage from "./pages/home.page";
import SearchPage from "./pages/search.page";
import PageNotFound from "./pages/404.page";
import ProfilePage from "./pages/profile.page";
import BlogPage from "./pages/blog.page";
import SideNav from "./components/sidenavbar.component";
import ChangePassword from "./pages/change-password.page";
import EditProfile from "./pages/edit-profile.page";
import Notifications from "./pages/notifications.page";
import ManageBlogs from "./pages/manage-blogs.page";

export const UserContext = createContext({}) 

export const ThemeContext = createContext({});

const darkthemePreference = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

const App = () => {

    const [ userAuth, setUserAuth] = useState({});

    const [ theme, setTheme ] = useState(() => darkthemePreference() ? "dark" : "light" );

    useEffect(() => {

        let userInSession = lookInSession("user");
        let themeInSession = lookInSession("theme");

        userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null })

        if(themeInSession) {
            setTheme(() => {
                document.body.setAttribute("data-theme", themeInSession);
                return themeInSession;
            })
        } else {
            document.body.setAttribute("data-theme", theme)
        }

    }, [])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <UserContext.Provider value={{userAuth, setUserAuth}}>
            <Routes>
                <Route path="/editor" element={<Editor />} />
                <Route path="/editor/:blog_id" element={<Editor />} />
                <Route path="/" element={<Navbar />}>
                    <Route index element={<HomePage />}/>
                    <Route path="dashboard" element={<SideNav />}>
                        <Route path="blogs" element={<ManageBlogs />} />
                        <Route path="notifications" element={<Notifications />} />
                    </Route>
                    <Route path="settings" element={<SideNav />}>
                        <Route path="edit-profile" element={<EditProfile />} />
                        <Route path="change-password" element={<ChangePassword />} />
                    </Route>
                    <Route path="signin" element={<UserAuthForm type="sign-in" />} />
                    <Route path="signup" element={<UserAuthForm type="sign-up" />} />
                    <Route path="search/:query" element={<SearchPage />} />
                    <Route path="user/:id" element={<ProfilePage />} />
                    <Route path="blog/:blog_id" element={<BlogPage />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
            </UserContext.Provider>
        </ThemeContext.Provider>
    )
}

export default App;