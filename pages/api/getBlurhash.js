/* eslint-disable import/no-anonymous-default-export */
import { getPlaiceholder } from "plaiceholder";

// import { getPlaiceholder } from "plaiceholder";

export default async (req, res) => {
	const { body } = req;
	const { url } = body;

	let response = null;

	// console.log(url);
	if (!url.includes("null")) {
		response = await getPlaiceholder(url);
	}

	// console.log(response);
	res.status(200).send(response);
};
