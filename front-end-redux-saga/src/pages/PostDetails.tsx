import Post from "../components/Post";
import type { PostData } from "../types";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { selectPostDetails } from "../redux/features/post/postSlice";
import { useParams } from "react-router-dom";

export default function PostDetails() {
	const dispatch = useAppDispatch();
	const { postId } = useParams();

	const post = useAppSelector((state) =>
		selectPostDetails(state, Number(postId))
	);

	if (!post) {
		throw new Error("Post not found");
	}

	return (
		<main className="container mt-3">
			<Post {...post} createdAt={new Date()} type="detail" />
		</main>
	);
}
