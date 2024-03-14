import { useEffect, useRef, useState } from "react";
import Post from "../components/Post";
import type { PostData } from "../types";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { pageChanged, selectPostMetadata, selectPosts } from "../redux/features/post/postSlice";
import { DEFAULT_POST_BATCH_SIZE } from "../constants";
import { useSearchParams } from "react-router-dom";

export default function Search() {
	const dispatch = useAppDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const keyword: string = searchParams.get("keyword") ?? "";

	const posts = useAppSelector(selectPosts);
	const { hasNext, isLoading } = useAppSelector(selectPostMetadata);
	const observerTarget = useRef<HTMLDivElement>(null);

	if (!hasNext) {
		if (observerTarget.current) {
			observerTarget.current.classList.add("d-none");
		}
	} else {
		if (observerTarget.current) {
			observerTarget.current.classList.remove("d-none");
		}
	}

	useEffect(() => {
		dispatch(pageChanged(undefined));
	}, []);

	useEffect(() => {
		let offset = 0;
		const options = {
			threshold: 0,
		};

		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				dispatch({
					type: "POSTS_FETCH_REQUESTED",
					payload: {
						keyword,
						batchSize: DEFAULT_POST_BATCH_SIZE,
						offset,
					},
				});
				offset += 1;
			}
		}, options);

		if (observerTarget.current) {
			observer.observe(observerTarget.current);
		}

		return () => {
			if (observerTarget.current) {
				observer.unobserve(observerTarget.current);
			}
		};
	}, [observerTarget]);

	return (
		<main className="container mt-3">
			<h1>Results for: {keyword}</h1>
			{posts.map((post: PostData) => (
				<Post
					key={post.id}
					{...post}
					createdAt={new Date()}
					type="summary"
				/>
			))}
			<div className="d-flex justify-content-center">
				<div
					className="spinner-border"
					role="status"
					ref={observerTarget}
				>
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		</main>
	);
}
