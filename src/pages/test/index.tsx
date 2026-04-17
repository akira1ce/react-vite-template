import { useTranslation } from "react-i18next";

const TestPage = () => {
	const { t } = useTranslation();

	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-6">
			<div className="flex flex-col items-center gap-2 text-4xl">
				<p>{t("common:welcome", { name: "Akira" })}</p>
			</div>
		</div>
	);
};

export default TestPage;
