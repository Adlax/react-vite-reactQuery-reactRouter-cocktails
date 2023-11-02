import axios from "axios";
import React from "react";
import { useLoaderData } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import CocktailsList from "../components/CocktailsList";
import { useQuery } from "@tanstack/react-query";

const urlSearch = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`;

const searchCocktailsQuery = (searchTerm) => {
	return {
		queryKey: ["search", searchTerm || "all"],
		queryFn: async () => {
			const response = await axios.get(`${urlSearch}${searchTerm}`);
			console.log(response);
			return response.data.drinks;
		},
	};
};

export const loader =
	(queryClient) =>
	async ({ request }) => {
		const url = new URL(request.url);
		const searchTerm = url.searchParams.get("search") || "";
		await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));
		return {
			searchTerm,
		};
	};

const Landing = () => {
	// we use the loader for the form search term:
	const { searchTerm } = useLoaderData();
	// but for the drinks, we cache ;
	const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));
	console.log(drinks);

	return (
		<>
			{/* <SearchForm /> */}
			<SearchForm searchTerm={searchTerm} />
			<CocktailsList drinks={drinks} />
		</>
	);
};

export default Landing;
