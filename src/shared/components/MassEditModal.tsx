import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Modal from "./Modal.tsx";
import Button from "./Button.tsx";
import Checkbox from "./Checkbox.tsx";
import Dropdown from "./Dropdown.tsx";
import {
  RuneSettings,
} from "../../app/providers/SettingsContext.tsx";
import { ERune } from "../../pages/runes/constants/runes.ts";

interface MassEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRunes: Set<ERune>;
  onApply: (settings: Partial<RuneSettings>) => void;
  isDarkTheme: boolean;
}

const MassEditModal: React.FC<MassEditModalProps> = ({
  isOpen,
  onClose,
  selectedRunes,
  onApply,
  isDarkTheme,
}) => {
  const { t } = useTranslation();

  // Состояние для настроек
  const [settings, setSettings] = useState<Partial<RuneSettings>>({});

  // Сбрасываем настройки при открытии модалки
  useEffect(() => {
    if (isOpen) {
      setSettings({});
    }
  }, [isOpen]);

  // Обработчики изменения настроек
  const handleSettingChange = (
    key:
      | keyof RuneSettings
      | "showNumber"
      | "dividerType"
      | "dividerColor"
      | "numberColor",
    value: any
  ) => {
    setSettings((prev) => {
      if (key === "showNumber") {
        return {
          ...prev,
          numbering: {
            show: value,
            dividerType: prev.numbering?.dividerType ?? "parentheses",
            dividerColor: prev.numbering?.dividerColor ?? "white",
            numberColor: prev.numbering?.numberColor ?? "yellow",
          },
        };
      }
      if (key === "dividerType") {
        return {
          ...prev,
          numbering: {
            show: prev.numbering?.show ?? false,
            dividerType: value,
            dividerColor: prev.numbering?.dividerColor ?? "white",
            numberColor: prev.numbering?.numberColor ?? "yellow",
          },
        };
      }
      if (key === "dividerColor") {
        return {
          ...prev,
          numbering: {
            show: prev.numbering?.show ?? false,
            dividerType: prev.numbering?.dividerType ?? "parentheses",
            dividerColor: value,
            numberColor: prev.numbering?.numberColor ?? "yellow",
          },
        };
      }
      if (key === "numberColor") {
        return {
          ...prev,
          numbering: {
            show: prev.numbering?.show ?? false,
            dividerType: prev.numbering?.dividerType ?? "parentheses",
            dividerColor: prev.numbering?.dividerColor ?? "white",
            numberColor: value,
          },
        };
      }
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  // Опции для дропдаунов
  const sizeOptions = [
    { value: "0", label: t("runePage.controls.sizes.Normal") },
    { value: "1", label: t("runePage.controls.sizes.Medium") },
    { value: "2", label: t("runePage.controls.sizes.Large") },
  ];

  const colorOptions = [
    { value: "white", label: t("runePage.controls.colors.white") },
    { value: "gray", label: t("runePage.controls.colors.gray") },
    { value: "black", label: t("runePage.controls.colors.black") },
    { value: "beige", label: t("runePage.controls.colors.beige") },
    { value: "lightred", label: t("runePage.controls.colors.lightred") },
    { value: "red", label: t("runePage.controls.colors.red") },
    { value: "dimred", label: t("runePage.controls.colors.dimred") },
    { value: "orange", label: t("runePage.controls.colors.orange") },
    { value: "lightgold", label: t("runePage.controls.colors.lightgold") },
    { value: "yellow", label: t("runePage.controls.colors.yellow") },
    { value: "lightyellow", label: t("runePage.controls.colors.lightyellow") },
    { value: "green", label: t("runePage.controls.colors.green") },
    { value: "dimgreen", label: t("runePage.controls.colors.dimgreen") },
    { value: "darkgreen", label: t("runePage.controls.colors.darkgreen") },
    { value: "indigo", label: t("runePage.controls.colors.indigo") },
    { value: "lightindigo", label: t("runePage.controls.colors.lightindigo") },
    { value: "turquoise", label: t("runePage.controls.colors.turquoise") },
    { value: "lightblue", label: t("runePage.controls.colors.lightblue") },
    { value: "pink", label: t("runePage.controls.colors.pink") },
    { value: "purple", label: t("runePage.controls.colors.purple") },
  ];

  const dividerOptions = [
    {
      value: "parentheses",
      label: t("runePage.controls.dividerTypes.parentheses"),
    },
    { value: "brackets", label: t("runePage.controls.dividerTypes.brackets") },
    { value: "pipe", label: t("runePage.controls.dividerTypes.pipe") },
  ];

  const handleApply = () => {
    // Фильтруем только поля, которые были изменены
    const filteredSettings = Object.fromEntries(
      Object.entries(settings).filter(
        ([_, value]) => value !== undefined && value !== ""
      )
    );
    onApply(filteredSettings);
    onClose();
  };

  const isShowNumberEnabled = settings.numbering?.show ?? false;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isDarkTheme={isDarkTheme}>
      <div className="p-2 space-y-6">
        {/* Заголовок */}
        <div>
          <h2
            className={`text-xl font-semibold ${
              isDarkTheme ? "text-white" : "text-gray-900"
            }`}
          >
            {t("runePage.massEdit.modalTitle")}
          </h2>
          <p
            className={`text-sm mt-1 ${
              isDarkTheme ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {selectedRunes.size} {t("runePage.massEdit.selected")}
          </p>
        </div>

        {/* Контроллы */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Левый столбец */}
          <div className="space-y-4">
            <h3
              className={`text-lg font-medium ${
                isDarkTheme ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {t("runePage.massEdit.basicSettings")}
            </h3>

            {/* Highlight Rune Checkbox */}
            <div
              className={`p-3 rounded-lg ${
                isDarkTheme ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <Checkbox
                checked={settings.isHighlighted ?? false}
                onChange={(checked) =>
                  handleSettingChange("isHighlighted", checked)
                }
                isDarkTheme={isDarkTheme}
                size="lg"
                label={t("runePage.controls.highlightRune")}
              />
            </div>

            {/* Box Size Dropdown */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkTheme ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t("runePage.controls.boxSize")}
              </label>
              <Dropdown
                options={sizeOptions}
                selectedValue={settings.boxSize?.toString() ?? ""}
                onSelect={(value) =>
                  handleSettingChange("boxSize", parseInt(value))
                }
                isDarkTheme={isDarkTheme}
                size="md"
                placeholder={t("runePage.massEdit.noChange")}
              />
            </div>

            {/* Color Dropdown */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkTheme ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t("runePage.controls.color")}
              </label>
              <Dropdown
                options={colorOptions}
                selectedValue={settings.color ?? ""}
                onSelect={(value) => handleSettingChange("color", value)}
                isDarkTheme={isDarkTheme}
                size="md"
                placeholder={t("runePage.massEdit.noChange")}
              />
            </div>
          </div>

          {/* Правый столбец */}
          <div className="space-y-4">
            <h3
              className={`text-lg font-medium ${
                isDarkTheme ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {t("runePage.massEdit.numberingSettings")}
            </h3>

            {/* Show Rune Number Checkbox */}
            <div
              className={`p-3 rounded-lg ${
                isDarkTheme ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <Checkbox
                checked={isShowNumberEnabled}
                onChange={(checked) =>
                  handleSettingChange("showNumber", checked)
                }
                isDarkTheme={isDarkTheme}
                size="lg"
                label={t("runePage.controls.showRuneNumber")}
              />
            </div>

            {/* Divider Type Dropdown */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkTheme ? "text-gray-300" : "text-gray-700"
                } ${!isShowNumberEnabled ? "opacity-50" : ""}`}
              >
                {t("runePage.controls.divider")}
              </label>
              <Dropdown
                options={dividerOptions}
                selectedValue={settings.numbering?.dividerType ?? ""}
                onSelect={(value) => handleSettingChange("dividerType", value)}
                isDarkTheme={isDarkTheme}
                size="md"
                disabled={!isShowNumberEnabled}
                placeholder={t("runePage.massEdit.noChange")}
              />
            </div>

            {/* Divider Color Dropdown */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkTheme ? "text-gray-300" : "text-gray-700"
                } ${!isShowNumberEnabled ? "opacity-50" : ""}`}
              >
                {t("runePage.controls.dividerColor")}
              </label>
              <Dropdown
                options={colorOptions}
                selectedValue={settings.numbering?.dividerColor ?? ""}
                onSelect={(value) => handleSettingChange("dividerColor", value)}
                isDarkTheme={isDarkTheme}
                size="md"
                disabled={!isShowNumberEnabled}
                placeholder={t("runePage.massEdit.noChange")}
              />
            </div>

            {/* Number Color Dropdown */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkTheme ? "text-gray-300" : "text-gray-700"
                } ${!isShowNumberEnabled ? "opacity-50" : ""}`}
              >
                {t("runePage.controls.numberColor")}
              </label>
              <Dropdown
                options={colorOptions}
                selectedValue={settings.numbering?.numberColor ?? ""}
                onSelect={(value) => handleSettingChange("numberColor", value)}
                isDarkTheme={isDarkTheme}
                size="md"
                disabled={!isShowNumberEnabled}
                placeholder={t("runePage.massEdit.noChange")}
              />
            </div>
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-300 dark:border-gray-600">
          <Button
            variant="secondary"
            onClick={onClose}
            isDarkTheme={isDarkTheme}
          >
            {t("runePage.massEdit.cancel")}
          </Button>
          <Button
            variant="primary"
            onClick={handleApply}
            isDarkTheme={isDarkTheme}
          >
            {t("runePage.massEdit.applyToRunes", { count: selectedRunes.size })}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default MassEditModal;
