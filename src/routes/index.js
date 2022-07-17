import HomeAdmin from "../pages/Home_Admin";
import AccountManagement from "../pages/Account_Management";
import Update from "../pages/Update";
import Login from "../pages/Login";

// Public routes
const publicRoutes = [
  { path: "/", component: HomeAdmin },
  { path: "/accountmanagement", component: AccountManagement },
  { path: "/update", component: Update, layout: null },
  { path: "/login", component: Login, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
