import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventDetails from "../../features/events/details/EventDetails";
import LoginForm from "../../features/users/LoginForm";
import RegisterForm from "../../features/users/RegisterForm";
import EventForm from "../../features/events/form/EventForm";
import ProfileAdminManagement from "../../features/profiles/management/ProfileAdminManagement";
import TagTable from "../../features/tags/TagTable";
import TypeTable from "../../features/types/TypeTable";
import CompanyTable from "../../features/companies/CompanyTable";
import ProfilePage from "../../features/profiles/details/ProfilePage";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'events', element: <EventDashboard /> },
            { path: 'events/:id', element: <EventDetails /> },
            { path: 'createEvent', element: <EventForm key="create" /> },
            { path: 'manage/:id', element: <EventForm key="manage" /> },
            { path: 'profiles/:username', element: <ProfilePage /> },
            { path: 'login', element: <LoginForm /> },
            { path: 'register', element: <RegisterForm /> },
            { path: 'admin/manageProfiles', element: <ProfileAdminManagement /> },
            { path: 'admin/manageTags', element: <TagTable /> },
            { path: 'admin/manageTypes', element: <TypeTable /> },
            { path: 'admin/manageCompanies', element: <CompanyTable /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: '*', element: <Navigate replace to="/not-found" /> },
        ]
    }
]

export const router = createBrowserRouter(routes)