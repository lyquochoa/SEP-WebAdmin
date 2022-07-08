import HomeAdmin from "../pages/Home_Admin";
import AccountManagement from "../pages/Account_Management";

// Public routes
const publicRoutes = [
  { path: "/", component: HomeAdmin },
  { path: "/accountmanagement", component: AccountManagement },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
