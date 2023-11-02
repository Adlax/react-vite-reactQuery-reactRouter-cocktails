import React from "react";
import axios from "axios";
import { useLoaderData, Link, Navigate } from "react-router-dom";
import Wrapper from "../style-wrappers/Cocktail";
import { useQuery } from "@tanstack/react-query";

const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=`;

const searchCocktailQuery = (id) => {
	return {
		queryKey: ["cocktail", id],
		queryFn: async () => {
			const { data } = await axios.get(`${url}${id}`);
			// console.log(data);
			return data;
		},
	};
};

export const loader =
	(queryClient) =>
	async ({ params }) => {
		const { id } = params;
		await queryClient.ensureQueryData(searchCocktailQuery(id));
		return { id };
	};

const Cocktail = () => {
	const { id } = useLoaderData();
	const { data } = useQuery(searchCocktailQuery(id));

	console.log(data.drinks);

	if (!data) return <Navigate to="/" />;

	const singleDrink = data.drinks[0];
	const { strDrink: name, strDrinkThumb: image, strAlcoholic: info, strCategory: category, strGlass: glass, strInstructions: instructions } = singleDrink;
	// take the keys named ingredients, that have a value assigned, and finally map for the value :
	const validIngredients = Object.keys(singleDrink)
		.filter((key) => key.startsWith("strIngredient") && singleDrink[key] !== null)
		.map((ingredient) => singleDrink[ingredient]);
	// console.log(validIngredients);

	return (
		<Wrapper>
			<header>
				<Link to="/" className="btn">
					Back home
				</Link>
				<h3>{name}</h3>
			</header>
			<div className="drink">
				<img src={image} alt={name} className="img" />
				<div className="drink-info">
					<p>
						<span className="drink-data">name: </span>
						{name}
					</p>
					<p>
						<span className="drink-data">category: </span>
						{category}
					</p>
					<p>
						<span className="drink-data">info: </span>
						{info}
					</p>
					<p>
						<span className="drink-data">glass: </span>
						{glass}
					</p>
					<p>
						<span className="drink-data">ingredients: </span>
						{validIngredients.map((ingredient, index) => {
							return (
								<span className="ing" key={ingredient}>
									{ingredient}
									{index < validIngredients.length - 1 ? ", " : ""}
								</span>
							);
						})}
					</p>
					<p>
						<span className="drink-data">instructions: </span>
						{instructions}
					</p>
				</div>
			</div>
		</Wrapper>
	);
};

export default Cocktail;
