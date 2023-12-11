import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventDetails from "../../features/events/details/EventDetails";
import LoginForm from "../../features/users/LoginForm";
import RegisterForm from "../../features/users/RegisterForm";
import EventForm from "../../features/events/form/EventForm";
import ProfileAdminManagement from "../../features/profiles/ProfileAdminManagement";
import TagTable from "../../features/tags/TagTable";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'events', element: <EventDashboard /> },
            { path: 'events/:id', element: <EventDetails /> },
            { path: 'createEvent', element: <EventForm key="create" /> },
            { path: 'manage/:id', element: <EventForm key="manage" /> },
            { path: 'login', element: <LoginForm /> },
            { path: 'register', element: <RegisterForm /> },
            { path: 'admin/manageProfiles', element: <ProfileAdminManagement /> },
            { path: 'admin/manageTags', element: <TagTable /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: '*', element: <Navigate replace to="/not-found" /> },
        ]
    }
]

export const router = createBrowserRouter(routes)