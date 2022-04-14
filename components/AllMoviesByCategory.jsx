import React, { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";
import Image from "next/image";

import MovieList from "./utils/MovieList";
import axios from "axios";
// import { getPlaiceholder } from "plaiceholder";

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/outline";

export default function AllMoviesByCategory(props) {
	// console.log(props);
	const [results, setResults] = useState(props.data);
	const [loading, setLoading] = useState(null);
	// const [paginationCounts, setPaginationCounts] = useState();

	// const { data } = props;
	const router = useRouter();

	// console.log(results);

	// useMemo(() => {

	// }, [])

	const totalPagination = useMemo(
		() => generateTotalPagination(results.total_pages),
		[results.total_pages]
	);

	useEffect(() => {
		// let arr = [];

		document.querySelectorAll(".navbar__link").forEach((link) => {
			link.classList.remove("active");
			if (link.innerHTML === router.query.category) {
				link.classList.add("active");
			}
		});

		// const test = arr.includes(router.query.category);

		// console.log(test);
	}, []);

	// useEffect(() => {}, []);

	// console.log(totalPagination);

	function generateTotalPagination(total_pages) {
		console.log("calculating total");
		// console.log(total_pages, start);
		// console.log("rendered total pagination function");
		let arr = [];
		for (let i = 1; i <= total_pages; i++) {
			arr.push(i);
		}

		return arr;
	}

	async function getMoviesByPage(e) {
		const pageNumber = e.currentTarget.dataset.page;
		const response = await axios.get(results.url + `&page=${pageNumber}`).then(
			async (data) =>
				Promise.all(
					data.data.results.map(async (one) => {
						return await axios
							.post("/api/getBlurhash", {
								url: `https://image.tmdb.org/t/p/w500${one.poster_path}`,
							})
							.then(({ data }) => {
								return {
									...one,
									img: { ...data.img, blurDataURL: data.blurhash },
								};
							})
							.catch(() => ({ ...one, img: { blurDataURL: null } }));
					})
				).then((values) => ({
					success: true,
					data: values,
					page: data.data.page,
				})),

			() => ({ success: false })
		);

		// console.log(response);
		console.log("done ! ");

		if (response.success) {
			generatePagination(response, pageNumber);
		}
	}

	async function handleGoSpecificPage(e) {
		setLoading(true);
		getMoviesByPage(e);
		// console.log(response);

		// generatePagination(response.data.)
		// https://api.themoviedb.org/3/trending/movie/week?api_key=82a18ed118951da924967971e5b70de4&page=2
		// console.log(e.target.innerHTML);
	}

	function generatePagination(data, pageNumber) {
		// clone the original array
		// console.log(router.query);
		// const _total_pages = [...results.total_pages]
		// remove numbers infront of selected number except the closest one before

		setResults({
			...results,
			data: data.data,
			page: data.page,
		});

		// router.push({
		//   pathname: router.pathname,
		//   query: {
		//     category: router.query.category,
		//     page: data.page,
		//   },
		// });

		// router.push(`${router.asPath}/?page=${data.page}`, undefined, {
		//   shallow: true,
		// });

		// console.log(router.query.category[0]);

		// router.push(`?page=${data.page}`, undefined, {
		//   shallow: true,
		// });

		// console.log(data.page);

		const category = router.query.category;
		const page = data.page;

		// router.push(
		//   {
		//     pathname: `/[category]`,
		//     query: { ...router.query, page: page },
		//   },
		//   `/${category}?page=${page}`,
		//   { shallow: true }
		// );

		// router.push(`${router.asPath}/${data.page}`);

		setLoading(false);

		// console.log(results);
	}

	// useEffect(() => {
	//   // Always do navigations after the first render
	//   router.push("/?counter=10", undefined, { shallow: true });
	// }, []);

	// useEffect(() => {
	//   const category = router.query.category;
	//   const page = data.page;

	//   if (loading === false) {
	//     router.push(
	//       {
	//         pathname: `/[category]`,
	//         query: { category: category, page: page },
	//       },
	//       `/${category}?page=${page}`,
	//       { shallow: true }
	//     );
	//   }

	// }, [loading]);

	// console.log(results.page, totalPagination);

	// console.log(totalPagination);

	// console.log(results);

	function handleGoLastPage() {}

	return (
		<div className="movies mt-20">
			<div className="section-wrapper">
				<div className="category__title section-wrapper">
					<div className="category-title-wrapper relative">
						<div className="flex items-center">
							<h1 className="category__title-text font-bold font-secondary text-3xl text-gray-700 underline md:text-[1.75rem] sm:text-2xl">
								{router.query.category + " " + "Movies"}
							</h1>
						</div>

						<div
							// className="category__title-bg"
							className="category__title-bg absolute -left-12 transform -translate-y-2/4 -z-1">
							<Image
								src="/static/assets/section-title-bg-shape.png"
								width="143.38"
								height="130.21"
								// placeholder='blur'
								alt="category title background shape"
							/>
						</div>
					</div>
				</div>

				{results && results.data ? (
					<div className="movies__wrapper mt-16">
						<div className="movies__list grid grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 xsm:grid-cols-1 gap-x-7 gap-y-5">
							{results.data.map((movie) => {
								return (
									<MovieList isLoading={loading} movie={movie} key={movie.id} />
								);
							})}
						</div>
						<div className="movies__pagination flex justify-center mt-12">
							{/* {console.log(totalPagination)} */}
							<button className="left-pagination mr-4">
								<ChevronLeftIcon className="h-6 w-6 text-black transition duration-300" />
							</button>

							<div className="page-numbers ">
								<button
									className={`page-number ${
										totalPagination[0] === results.page ? "active" : ""
									} py-1 px-2 mr-2`}
									key={totalPagination[0]}
									data-page={totalPagination[0]}
									onClick={handleGoSpecificPage}>
									{totalPagination[0]}
								</button>
								{results.page >= 6 ? <span>...</span> : <></>}
								{[
									// if total page is over 6
									...(totalPagination.length > 6
										? // if current page is less than 6
										  results.page < 6
											? totalPagination.slice(1, 6)
											: // else if current page is within 4 pages away from last page
											results.page >= results.total_pages - 4
											? totalPagination.slice(
													totalPagination[totalPagination.length - 7], // show only numbers which are 7 index away from last
													totalPagination[totalPagination.length - 2] // remove last and show before last
											  )
											: // anything else (if current page is not less than 6 or within 4 pages away from last page)
											  totalPagination.slice(
													results.page - 3,
													results.page + 2
											  )
										: // if total page is below 6
										  totalPagination),
								].map((v) => {
									return (
										<button
											className={`page-number ${
												v === results.page ? "active" : ""
											} py-1 px-2 mr-2`}
											key={v}
											data-page={v}
											onClick={handleGoSpecificPage}>
											{v}
										</button>
									);
								})}
								{results.page < results.total_pages - 4 ? (
									<span>...</span>
								) : (
									<></>
								)}
								<button
									className={`page-number ${
										totalPagination[totalPagination.length - 1] === results.page
											? "active"
											: ""
									} py-1 px-2`}
									key={totalPagination[totalPagination.length - 1]}
									data-page={totalPagination[totalPagination.length - 1]}
									onClick={handleGoSpecificPage}>
									{totalPagination[totalPagination.length - 1]}
								</button>
							</div>
							<button className="right-pagination ml-4">
								<ChevronRightIcon className="h-6 w-6 text-black transition duration-300" />
							</button>
						</div>
					</div>
				) : (
					<>No data for this category</>
				)}
			</div>
		</div>
	);
}
