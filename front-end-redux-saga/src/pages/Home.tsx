import { useEffect, useRef } from "react";
import Post from "../components/Post";
import type { PostData } from "../types";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { pageChanged, selectPosts } from "../redux/features/post/postSlice";
import { DEFAULT_POST_BATCH_SIZE } from "../constants";

export default function Home() {
	const dispatch = useAppDispatch();

	const { posts, hasNext, isLoading } = useAppSelector(selectPosts);
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
