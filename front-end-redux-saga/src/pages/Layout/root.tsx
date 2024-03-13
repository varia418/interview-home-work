import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useAppDispatch } from "../../redux/hooks";

let didInit = false;
export default function Root() {
	const dispatch = useAppDispatch();
	if (!didInit) {
		didInit = true;
		dispatch({ type: "USERS_FETCH_REQUESTED" });
	}

	return (
		<>
			<NavBar />
			<Outlet />
		</>
	);
}
