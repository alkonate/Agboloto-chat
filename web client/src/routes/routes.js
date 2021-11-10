import { LoginLayout } from "../layouts"
import { DashboardPage, LoginPage,NotFoundPage } from "../pages"
import { isAuth,isGuest } from "./guards"

const routes = [

    {
        name  : 'Dashboard',
        path : "/dashboard",
        exact : true,
        component : DashboardPage,
        layout : LoginLayout,
        guards : [isAuth],
        redirect : '/login',
    },

    // {
    //     name  : 'Collaboraters',
    //     path : "/collaboraters",
    //     exact : true,
    //     component : CollaboratersPage,
    //     layout : LoginLayout,
    //     guards : [isAuth],
    //     redirect : '/login',
    // },
    {
        name  : 'Login',
        path : "/login",
        exact : true,
        component : LoginPage,
        layout : LoginLayout,
        guards : [isGuest],
        redirect : '/dashboard',
    },
    {
        name  : 'NOTFOUND',
        path : "*",
        component : NotFoundPage,
        layout : LoginLayout,
        guards : [isAuth],
        redirect : '/login',
    },
]

export default routes