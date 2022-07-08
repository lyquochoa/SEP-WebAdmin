import HomeAdmin from "../pages/Home_Admin";
import AccountManagement from "../pages/Account_Management";
import Update from "../pages/Update";

// Public routes
const publicRoutes = [
  { path: "/", component: HomeAdmin },
  { path: "/accountmanagement", component: AccountManagement },
  { path: "/update", component: Update, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
