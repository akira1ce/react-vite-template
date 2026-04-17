import { useTranslation } from "react-i18next";

const LANGUAGES = [
	{ code: "zh", label: "中文" },
	{ code: "en", label: "English" },
] as const;

const TestPage = () => {
	const { t, i18n } = useTranslation();

	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-6">
			<div className="flex gap-2">
				{LANGUAGES.map(({ code, label }) => (
					<button
						key={code}
						onClick={() => i18n.changeLanguage(code)}
						className={`rounded-lg px-4 py-2 text-sm transition-colors ${
							i18n.language === code
								? "bg-gray-900 text-white"
								: "bg-gray-100 text-gray-700 hover:bg-gray-200"
						}`}
					>
						{label}
					</button>
				))}
			</div>

			<div className="flex flex-col items-center gap-2 text-lg">
				<p>{t("common:hello")}</p>
				<p>{t("common:welcome", { name: "Akira" })}</p>
				<p>
					{t("common:submit")} / {t("common:cancel")}
				</p>
				<p>---</p>
				<p>{t("login:title")}</p>
				<p>
					{t("login:username")} / {t("login:password")}
				</p>
				<p>{t("login:submit")}</p>
			</div>
		</div>
	);
};

export default TestPage;
