import { useEffect, useState } from 'react'
import { getAuth,onAuthStateChanged} from "firebase/auth";
import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
    Navigate
} from "react-router-dom"

import Login from "../views/Login"
import Dashboard from "../views/Dashboard"
import Profile from "../views/Profile"
// import Contact from "../views/Contact"
// import {checkuserLogin} from "./firebase"
// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Dashboard />,
//     },
//     {
//         path: "/profile",
//         element: <Profile />,
//     },
//     {
//         path: "/contact",
//         element: <Contact />,
//     },
//     {
//         path: "/detail/:postId",
//         element: <Detail />,
//     },
// ]);

export default function Router() {
    const [user, setUser] = useState(false)

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {  
            if (user) {
                setUser(true)
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              console.log("UID ", uid)
              // ...
            } else {
              // User is signed out
              setUser(false)
              // ...
            }
          });
    }, [])



    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={
                    <ProtectedRoute
                        user={user}
                        route={<Dashboard />}
                        navigateTo='/login' />}
                />
                <Route path="/login" element={
                    <ProtectedRoute
                        user={!user}
                        route={<Login />}
                        navigateTo='/' />}
                />
                <Route path="/profile" element={
                    <ProtectedRoute
                        user={user}
                        route={<Profile />}
                        navigateTo='/login' />}
                />
                {/* <Route path="/contact" element={<Contact />} /> */}
                {/* <Route path="/detail/:postId" element={<Detail />} /> */}
            </>
        )
    )
    
    return <RouterProvider router={router} />
}

function ProtectedRoute({ user, route, navigateTo }) {
    return user ? route : <Navigate to={navigateTo} replace={true} />
}

/*
1. Basic Routing
2. Programmatically Routing (useNavigate(), navigate('/dashboard'))
3. Back janay ka tariqa (navigate(-1))
4. Dynamic Routing ('/detail/:postId')
5. Protected Routing
*/