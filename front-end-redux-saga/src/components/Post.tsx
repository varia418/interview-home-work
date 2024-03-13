import { useEffect } from "react";
import Comment from "./Comment";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { PostComment, PostData } from "../types";
import { Accordion } from "react-bootstrap";

interface Props extends PostData {
	createdAt: Date;
	type: "summary" | "detail";
}

function Post({
	id,
	userId,
	title,
	body,
	createdAt,
	type,
	comments = [],
}: Props) {
	const dispatch = useAppDispatch();
	// const { data: author } = useGetUserDetailsQuery(userId);
	useEffect(() => {
		dispatch({
			type: "COMMENT_FETCH_REQUESTED",
			payload: { postId: id },
		});
	}, []);

	return (
		<article className="my-5">
			<h1 className="text-center">
				<Link
					className="text-decoration-none text-dark"
					to={`/posts/${id}`}
				>
					{title}
				</Link>
			</h1>
			<div className="d-flex flex-column">
				{/* <span>Author: {author?.username ?? ""}</span> */}
				<span>{`Created at: ${createdAt.toLocaleDateString()}`}</span>
			</div>
			<p className="my-3">
				{type === "summary" && body.length > 100
					? body.slice(0, 99) + "..."
					: body}
			</p>
			<Accordion>
				<Accordion.Item eventKey="0">
					<Accordion.Header>{`${comments.length} replies`}</Accordion.Header>
					<Accordion.Body>
						<div className="d-flex flex-column gap-4">
							{comments.map((comment: PostComment) => (
								<Comment key={comment.id} {...comment} />
							))}
						</div>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</article>
	);
}

export default Post;
