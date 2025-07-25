import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  mdiContentSave,
  mdiPlus,
  mdiPencil,
  mdiDelete,
  mdiExport,
  mdiImport,
  mdiCheck,
} from "@mdi/js";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Modal from "./Modal";
import { useGlobalMessage } from "./Message/MessageProvider";
import { Profile } from "../../app/providers/SettingsContext";

interface ProfileManagerProps {
  isDarkTheme: boolean;
  currentSettings: any;
  profiles: Profile[];
  activeProfileId: string | null;
  onProfileSelect: (profileId: string) => void;
  onProfileCreate: (name: string, settings: any) => void;
  onProfileSave: (profileId: string, settings: any) => void;
  onProfileRename: (profileId: string, newName: string) => void;
  onProfileDelete: (profileId: string) => void;
  onProfileExport: (profileId: string) => void;
  onProfileImport: (profileData: any) => void;
}

const ProfileManager: React.FC<ProfileManagerProps> = ({
  isDarkTheme,
  currentSettings,
  profiles,
  activeProfileId,
  onProfileSelect,
  onProfileCreate,
  onProfileSave,
  onProfileRename,
  onProfileDelete,
  onProfileExport,
  onProfileImport,
}) => {
  const { t } = useTranslation();
  const { sendMessage } = useGlobalMessage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [renameProfileId, setRenameProfileId] = useState<string | null>(null);
  const [deleteProfileId, setDeleteProfileId] = useState<string | null>(null);

  const activeProfile = profiles.find((p) => p.id === activeProfileId);

  const handleCreateProfile = () => {
    if (newProfileName.trim()) {
      onProfileCreate(newProfileName.trim(), currentSettings);
      setNewProfileName("");
      setShowCreateModal(false);
      sendMessage(
        t("profiles.messages.profileCreated", { name: newProfileName }),
        {
          type: "success",
          title: t("profiles.messages.success"),
        }
      );
    }
  };

  const handleRenameProfile = () => {
    if (renameProfileId && newProfileName.trim()) {
      onProfileRename(renameProfileId, newProfileName.trim());
      setNewProfileName("");
      setRenameProfileId(null);
      setShowRenameModal(false);
      sendMessage(
        t("profiles.messages.profileRenamed", { name: newProfileName }),
        {
          type: "success",
          title: t("profiles.messages.success"),
        }
      );
    }
  };

  const handleDeleteProfile = () => {
    if (deleteProfileId) {
      const profile = profiles.find((p) => p.id === deleteProfileId);
      onProfileDelete(deleteProfileId);
      setDeleteProfileId(null);
      setShowDeleteModal(false);
      sendMessage(
        t("profiles.messages.profileDeleted", { name: profile?.name }),
        {
          type: "success",
          title: t("profiles.messages.success"),
        }
      );
    }
  };

  const handleExportProfile = () => {
    if (activeProfileId) {
      onProfileExport(activeProfileId);
      sendMessage(t("profiles.messages.profileExported"), {
        type: "success",
        title: t("profiles.messages.success"),
      });
    }
  };

  const handleImportProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const profileData = JSON.parse(e.target?.result as string);
          onProfileImport(profileData);
          sendMessage(t("profiles.messages.profileImported"), {
            type: "success",
            title: t("profiles.messages.success"),
          });
        } catch (error) {
          sendMessage(t("profiles.messages.importError"), {
            type: "error",
            title: t("profiles.messages.error"),
          });
        }
      };
      reader.readAsText(file);
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const profileOptions = profiles.map((profile) => ({
    value: profile.id,
    label: profile.name,
  }));

  return (
    <div className="flex items-center gap-2">
      {/* Profile Selector */}
      <Dropdown
        selectedValue={activeProfileId ?? ""}
        onSelect={(value) => onProfileSelect(value)}
        options={profileOptions}
        placeholder={t("profiles.selectProfile")}
        isDarkTheme={isDarkTheme}
        className="min-w-[150px]"
      />

      {/* Create Profile Button */}
      <Button
        variant="success"
        onClick={() => setShowCreateModal(true)}
        isDarkTheme={isDarkTheme}
        icon={mdiPlus}
        size="sm"
        title={t("profiles.createProfile")}
      />

      {/* Save Profile Button */}
      <Button
        variant="info"
        onClick={() =>
          activeProfileId && onProfileSave(activeProfileId, currentSettings)
        }
        disabled={!activeProfileId}
        isDarkTheme={isDarkTheme}
        icon={mdiContentSave}
        size="sm"
        title={t("profiles.saveProfile")}
      />

      {/* Rename Profile Button */}
      <Button
        variant="secondary"
        onClick={() => {
          if (activeProfile) {
            setRenameProfileId(activeProfile.id);
            setNewProfileName(activeProfile.name);
            setShowRenameModal(true);
          }
        }}
        disabled={!activeProfileId}
        isDarkTheme={isDarkTheme}
        icon={mdiPencil}
        size="sm"
        title={t("profiles.renameProfile")}
      />

      {/* Delete Profile Button */}
      <Button
        variant="danger"
        onClick={() => {
          if (activeProfile) {
            setDeleteProfileId(activeProfile.id);
            setShowDeleteModal(true);
          }
        }}
        disabled={!activeProfileId}
        isDarkTheme={isDarkTheme}
        icon={mdiDelete}
        size="sm"
        title={t("profiles.deleteProfile")}
      />

      {/* Export Profile Button */}
      <Button
        variant="secondary"
        onClick={handleExportProfile}
        disabled={!activeProfileId}
        isDarkTheme={isDarkTheme}
        icon={mdiExport}
        size="sm"
        title={t("profiles.exportProfile")}
      />

      {/* Import Profile Button */}
      <Button
        variant="secondary"
        onClick={() => fileInputRef.current?.click()}
        isDarkTheme={isDarkTheme}
        icon={mdiImport}
        size="sm"
        title={t("profiles.importProfile")}
      />

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImportProfile}
        style={{ display: "none" }}
      />

      {/* Create Profile Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title={t("profiles.createProfile")}
        isDarkTheme={isDarkTheme}
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkTheme ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {t("profiles.profileName")}
            </label>
            <input
              type="text"
              value={newProfileName}
              onChange={(e) => setNewProfileName(e.target.value)}
              placeholder={t("profiles.enterProfileName")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkTheme
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              onKeyPress={(e) => e.key === "Enter" && handleCreateProfile()}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setShowCreateModal(false)}
              isDarkTheme={isDarkTheme}
              size="sm"
            >
              {t("profiles.cancel")}
            </Button>
            <Button
              variant="success"
              onClick={handleCreateProfile}
              disabled={!newProfileName.trim()}
              isDarkTheme={isDarkTheme}
              size="sm"
              icon={mdiCheck}
            >
              {t("profiles.create")}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Rename Profile Modal */}
      <Modal
        isOpen={showRenameModal}
        onClose={() => setShowRenameModal(false)}
        title={t("profiles.renameProfile")}
        isDarkTheme={isDarkTheme}
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDarkTheme ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {t("profiles.profileName")}
            </label>
            <input
              type="text"
              value={newProfileName}
              onChange={(e) => setNewProfileName(e.target.value)}
              placeholder={t("profiles.enterProfileName")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkTheme
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              onKeyPress={(e) => e.key === "Enter" && handleRenameProfile()}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setShowRenameModal(false)}
              isDarkTheme={isDarkTheme}
              size="sm"
            >
              {t("profiles.cancel")}
            </Button>
            <Button
              variant="success"
              onClick={handleRenameProfile}
              disabled={!newProfileName.trim()}
              isDarkTheme={isDarkTheme}
              size="sm"
              icon={mdiCheck}
            >
              {t("profiles.rename")}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Profile Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title={t("profiles.deleteProfile")}
        isDarkTheme={isDarkTheme}
        size="sm"
      >
        <div className="space-y-4">
          <p
            className={`text-sm ${
              isDarkTheme ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {t("profiles.deleteConfirmation", {
              name: profiles.find((p) => p.id === deleteProfileId)?.name,
            })}
          </p>
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
              isDarkTheme={isDarkTheme}
              size="sm"
            >
              {t("profiles.cancel")}
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteProfile}
              isDarkTheme={isDarkTheme}
              size="sm"
              icon={mdiDelete}
            >
              {t("profiles.delete")}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileManager;
