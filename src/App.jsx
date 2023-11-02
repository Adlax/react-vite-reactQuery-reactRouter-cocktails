import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About, Cocktail, Error, HomeLayout, Landing, NewsLetter, SinglePageError } from "./pages";
import { loader as landingLoader } from "./pages/Landing";
import { loader as singleCocktailLoader } from "./pages/Cocktail";
import { action as newsletterAction } from "./pages/NewsLetter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
		},
	},
});

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomeLayout />,
		errorElement: <Error />,
		children: [
			{
				// path: "landing",
				index: true,
				loader: landingLoader(queryClient),
				errorElement: <SinglePageError />,
				element: <Landing />,
			},
			{
				path: "cocktail/:id",
				errorElement: <SinglePageError />,
				loader: singleCocktailLoader(queryClient),
				element: <Cocktail />,
			},
			{
				path: "newsletter",
				action: newsletterAction,
				errorElement: <SinglePageError />,
				element: <NewsLetter />,
			},
			{
				path: "/about",
				element: <About />,
			},
		],
	},
]);

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />;
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
};

export default App;
