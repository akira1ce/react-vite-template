/* 「view」 */
import { Suspense, useState } from "react";
import { NavLink } from "react-router";
import Loading from "@/components/loading";
import List from "./components/list";
import { getOverUsersInfo } from "./controller";

export default function Page() {
	const [promise] = useState(getOverUsersInfo);

	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<NavLink to="/test">21123</NavLink>
			<div className="w-1/2">
				<Suspense fallback={<Loading />}>
					<List promise={promise} />
				</Suspense>
			</div>
		</div>
	);
}
