import React from "react";

export type TriState = true | false | null;

interface TriStateSwitchProps {
  value: TriState;
  onChange: (value: TriState) => void;
  isDarkTheme: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const TriStateSwitch: React.FC<TriStateSwitchProps> = ({
  value,
  onChange,
  isDarkTheme,
  disabled = false,
  size = "md",
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-6";
      case "lg":
        return "h-10";
      default:
        return "h-8";
    }
  };

  const getBlockSize = () => {
    switch (size) {
      case "sm":
        return "w-6 h-6";
      case "lg":
        return "w-10 h-10";
      default:
        return "w-8 h-8";
    }
  };

  const getIconSize = () => {
    switch (size) {
      case "sm":
        return "w-3 h-3";
      case "lg":
        return "w-5 h-5";
      default:
        return "w-4 h-4";
    }
  };

  const handleClick = (newValue: TriState) => {
    if (disabled) return;
    onChange(newValue);
  };

  const getBlockClasses = (blockValue: TriState, isActive: boolean) => {
    const baseClasses = `${getBlockSize()} flex items-center justify-center transition-all duration-200 cursor-pointer`;

    if (disabled) {
      return `${baseClasses} opacity-50 cursor-not-allowed bg-gray-300`;
    }

    if (blockValue === false) {
      // Левый блок - выключено
      return `${baseClasses} ${
        isActive
          ? "bg-red-400 shadow-inner"
          : isDarkTheme
          ? "bg-gray-700 hover:bg-gray-600"
          : "bg-gray-200 hover:bg-gray-300"
      }`;
    } else if (blockValue === null) {
      // Центральный блок - без изменений (серый)
      return `${baseClasses} ${
        isActive
          ? isDarkTheme
            ? "bg-gray-600 shadow-inner"
            : "bg-gray-400 shadow-inner"
          : isDarkTheme
          ? "bg-gray-700 hover:bg-gray-600"
          : "bg-gray-200 hover:bg-gray-300"
      }`;
    } else {
      // Правый блок - включено
      return `${baseClasses} ${
        isActive
          ? "bg-green-400 shadow-inner"
          : isDarkTheme
          ? "bg-gray-700 hover:bg-gray-600"
          : "bg-gray-200 hover:bg-gray-300"
      }`;
    }
  };

  const renderIcon = (blockValue: TriState) => {
    const iconClasses = `${getIconSize()} ${disabled ? "opacity-50" : ""}`;
    const isActive = value === blockValue;

    if (blockValue === false) {
      // Красный крестик
      return (
        <svg
          className={`${iconClasses} ${
            isActive ? "text-white" : "text-red-500"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      );
    } else if (blockValue === null) {
      // Серый прочерк
      return (
        <svg
          className={`${iconClasses} ${
            isDarkTheme ? "text-gray-300" : "text-gray-600"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      );
    } else {
      // Зелёная галочка
      return (
        <svg
          className={`${iconClasses} ${
            isActive ? "text-white" : "text-green-500"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
  };

  return (
    <div
      className={`
        ${getSizeClasses()} 
        flex 
        border 
        rounded-md 
        overflow-hidden 
        ${isDarkTheme ? "border-gray-600" : "border-gray-300"}
        ${disabled ? "opacity-50" : ""}
      `}
    >
      {/* Левый блок - Выключено */}
      <div
        className={`${getBlockClasses(false, value === false)} border-r ${
          isDarkTheme ? "border-gray-600" : "border-gray-300"
        }`}
        onClick={() => handleClick(false)}
        title="Выключено"
      >
        {renderIcon(false)}
      </div>

      {/* Центральный блок - Без изменений */}
      <div
        className={`${getBlockClasses(null, value === null)} border-r ${
          isDarkTheme ? "border-gray-600" : "border-gray-300"
        }`}
        onClick={() => handleClick(null)}
        title="Без изменений"
      >
        {renderIcon(null)}
      </div>

      {/* Правый блок - Включено */}
      <div
        className={getBlockClasses(true, value === true)}
        onClick={() => handleClick(true)}
        title="Включено"
      >
        {renderIcon(true)}
      </div>
    </div>
  );
};

export default TriStateSwitch;
