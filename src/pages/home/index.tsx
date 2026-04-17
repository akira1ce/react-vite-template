/* 「view」 */
import { useTranslation } from "react-i18next";
import { Suspense, useState } from "react";
import List from "./components/list";
import { getOverUsersInfo } from "./controller";

export default function Page() {
	const [promise] = useState(getOverUsersInfo);
	const { t } = useTranslation("common");
	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<div className="mb-10 text-2xl">{t("welcome", { name: "John" })}</div>
			<div className="min-h-[400px] w-1/2">
				<Suspense fallback={"loading..."}>
					<List promise={promise} />
				</Suspense>
			</div>
		</div>
	);
}
