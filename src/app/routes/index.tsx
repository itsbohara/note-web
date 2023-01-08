import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useRoutes,
} from "react-router-dom";

// layouts
import NotesApp from "layouts/app";
import LogoOnlyLayout from "layouts/LogoOnlyLayout";

import { lazy, Suspense } from "react";
// import LoadingScreen from "../components/LoadingScreen";
import GuestGuard from "app/guards/GuestGuard";
import AuthGuard from "app/guards/AuthGuard";

// import SettingsPage from "../modules/app/settings/settings";
// import MyProfilePage from "../modules/app/profile/myprofile";

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  return (
    <Suspense fallback={<>Loading .... </>}>
      <Component {...props} />
    </Suspense>
  );
};

function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Navigate to="app" />,
    },
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "register",
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: "",
      element: (
        <AuthGuard>
          <NotesApp />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="notes" replace />, index: true },
        {
          path: "notes",
          element: <NotesAppContainer />,
          children: [
            { index: true, element: <EmptyContainer /> },
            { path: "new", element: <NoteContainer /> },
            { path: ":noteID", element: <NoteContainer /> },
          ],
        },
        // { path: "note/:noteID", element: <NoteView /> },
        // { path: "trash", element: <TrashPage /> },
        // { path: "trash/:noteID", element: <TrashNoteView /> },
        // { path: "favorites", element: <FavNotes /> },
        // { path: "activity", element: <ActivityPage /> },

        { path: "my-profile", element: <MyProfile /> },
        { path: "settings", element: <SettingsPage /> },
      ],
    }, // Main Routes
    {
      path: "*",
      element: <LogoOnlyLayout />,
      children: [
        // {
        //   path: "unlock",
        //   element: (
        //     <AuthGuard>
        //       <UnlockApp />
        //     </AuthGuard>
        //   ),
        // },
        // { path: "maintenance", element: <Maintenance /> },
        // { path: "500", element: <Page500 /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
}

export default Router;

// IMPORT COMPONENTS
// Authentication
const Login = Loadable(lazy(() => import("pages/auth/login")));
const Register = Loadable(lazy(() => import("pages/auth/register")));

// main app pages
// const UnlockApp = Loadable(lazy(() => import("pages/auth/vaultzLogin")));
const NotesHome = Loadable(lazy(() => import("pages/app/home")));
const NotesAppContainer = Loadable(lazy(() => import("pages/app/container")));
const NoteContainer = Loadable(lazy(() => import("pages/app/note/note")));
const EmptyContainer = Loadable(lazy(() => import("pages/app/emptyContainer")));

// const NoteView = Loadable(lazy(() => import("pages/app/NoteView")));
// const TrashDirectory = Loadable(lazy(() => import("pages/app/TrashDirectory")));
// const TrashPage = Loadable(lazy(() => import("pages/app/trash")));

const MyProfile = Loadable(lazy(() => import("pages/user/profile")));
const SettingsPage = Loadable(lazy(() => import("pages/user/settings")));

// const Maintenance = Loadable(lazy(() => import("pages/system/Maintenance")));
// const Page500 = Loadable(lazy(() => import("pages/system/Page500")));
const NotFound = Loadable(lazy(() => import("pages/system/Page404")));
