import React from "react";
import { useTranslation } from "react-i18next";
import { useSettings } from "../../app/providers/SettingsContext";
import { localeOptions } from "../../shared/constants";
import Switcher from "../../shared/components/Switcher";
import Button from "../../shared/components/Button";

interface AppSettingsPageProps {
  isDarkTheme: boolean;
  onBack: () => void;
  onChangePathClick: () => void;
}

const AppSettingsPage: React.FC<AppSettingsPageProps> = ({
  isDarkTheme,
  onBack,
  onChangePathClick,
}) => {
  const { t } = useTranslation();
  const {
    getSelectedLocales,
    updateSelectedLocales,
    getAppLanguage,
    updateAppLanguage,
    getIsDarkTheme,
    toggleTheme,
  } = useSettings();

  const selectedLocales = getSelectedLocales();
  const currentAppLanguage = getAppLanguage();
  const isCurrentlyDarkTheme = getIsDarkTheme();

  // Доступные языки для интерфейса приложения
  const appLanguageOptions = [
    { value: "enUS", label: "English" },
    { value: "ruRU", label: "Русский" },
  ];

  const handleAppLanguageChange = (language: string) => {
    updateAppLanguage(language);
  };

  const handleLocaleToggle = (localeCode: string) => {
    if (localeCode === "enUS") {
      // Английская локаль всегда должна быть выбрана
      return;
    }

    let newLocales: string[];
    if (selectedLocales.includes(localeCode)) {
      newLocales = selectedLocales.filter((code) => code !== localeCode);
    } else {
      newLocales = [...selectedLocales, localeCode];
    }

    // Всегда включаем английскую локаль
    if (!newLocales.includes("enUS")) {
      newLocales = [...newLocales, "enUS"];
    }

    updateSelectedLocales(newLocales);
  };

  return (
    <div
      className={`h-full flex flex-col ${
        isDarkTheme ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* Заголовок с кнопкой назад */}
      <div
        className={`shadow-lg border-b px-3 py-1 elevation-4 ${
          isDarkTheme
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Settings Button */}
            <button
              onClick={onBack}
              className={`p-1 rounded-full transition-all duration-200 text-sm hover:scale-110 ${
                isDarkTheme
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"
              }`}
              title={t("buttons.back")}
            >
              ⚙️
            </button>
          </div>
        </div>
      </div>

      {/* Содержимое настроек */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-6">
            {/* Настройки пути */}
            <div
              className={`p-6 rounded-lg border ${
                isDarkTheme
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3
                className={`text-xl font-semibold mb-4 ${
                  isDarkTheme ? "text-white" : "text-gray-900"
                }`}
              >
                {t("settings.pathSettings")}
              </h3>
              <div className="space-y-4">
                <div>
                  <p
                    className={`text-sm mb-4 ${
                      isDarkTheme ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {t("settings.pathSettingsDescription")}
                  </p>

                  <Button
                    onClick={onChangePathClick}
                    variant="primary"
                    size="md"
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    {t("buttons.changePath")}
                  </Button>
                </div>
              </div>
            </div>

            {/* Настройка языков */}
            <div
              className={`p-6 rounded-lg border ${
                isDarkTheme
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3
                className={`text-xl font-semibold mb-4 ${
                  isDarkTheme ? "text-white" : "text-gray-900"
                }`}
              >
                {t("common.languageSettings")}
              </h3>
              <div className="space-y-4">
                <div>
                  <p
                    className={`text-sm mb-4 ${
                      isDarkTheme ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {t("common.languageSettingsDescription")}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {localeOptions.map((locale) => {
                      const isSelected = selectedLocales.includes(locale.value);
                      const isRequired = locale.value === "enUS";

                      return (
                        <button
                          key={locale.value}
                          onClick={() => handleLocaleToggle(locale.value)}
                          disabled={isRequired}
                          className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            isSelected
                              ? isRequired
                                ? isDarkTheme
                                  ? "bg-blue-600 text-white cursor-not-allowed"
                                  : "bg-blue-500 text-white cursor-not-allowed"
                                : isDarkTheme
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-green-500 text-white hover:bg-green-600"
                              : isDarkTheme
                              ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
                              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                          } ${isRequired ? "opacity-90" : "cursor-pointer"}`}
                        >
                          {locale.label}
                          {isRequired && (
                            <span className="ml-1 text-xs opacity-75">
                              ({t("common.required")})
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {selectedLocales.length === 0 && (
                    <p
                      className={`text-sm mt-3 ${
                        isDarkTheme ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {t("common.noLanguagesSelected")}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Настройки темы */}
            <div
              className={`p-6 rounded-lg border ${
                isDarkTheme
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3
                className={`text-xl font-semibold mb-4 ${
                  isDarkTheme ? "text-white" : "text-gray-900"
                }`}
              >
                {t("common.themeSettings")}
              </h3>
              <div className="space-y-4">
                <div>
                  <p
                    className={`text-sm mb-4 ${
                      isDarkTheme ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {t("common.themeSettingsDescription")}
                  </p>

                  <Switcher
                    checked={isCurrentlyDarkTheme}
                    onChange={toggleTheme}
                    label={
                      isCurrentlyDarkTheme
                        ? t("common.darkTheme")
                        : t("common.lightTheme")
                    }
                    isDarkTheme={isDarkTheme}
                    size="md"
                  />
                </div>
              </div>
            </div>

            {/* Настройки языка приложения */}
            <div
              className={`p-6 rounded-lg border ${
                isDarkTheme
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3
                className={`text-xl font-semibold mb-4 ${
                  isDarkTheme ? "text-white" : "text-gray-900"
                }`}
              >
                {t("common.appLanguageSettings")}
              </h3>
              <div className="space-y-4">
                <div>
                  <p
                    className={`text-sm mb-4 ${
                      isDarkTheme ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {t("common.appLanguageSettingsDescription")}
                  </p>

                  <div className="flex gap-2">
                    {appLanguageOptions.map((language) => {
                      const isSelected = currentAppLanguage === language.value;

                      return (
                        <button
                          key={language.value}
                          onClick={() =>
                            handleAppLanguageChange(language.value)
                          }
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            isSelected
                              ? isDarkTheme
                                ? "bg-blue-600 text-white"
                                : "bg-blue-500 text-white"
                              : isDarkTheme
                              ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
                              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                          } cursor-pointer`}
                        >
                          {t(`common.appLanguageLabels.${language.value}`)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSettingsPage;
