import { HomePage, LoginPage } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
]);

export default router;
