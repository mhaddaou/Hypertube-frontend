"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { resolveAvatarUrl } from "@/lib/avatar";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface EditableUser {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
}

interface EditProfileModalProps {
  open: boolean;
  user: EditableUser;
  onClose: () => void;
  onSaved: (next: EditableUser) => void;
}

export default function EditProfileModal({
  open,
  user,
  onClose,
  onSaved,
}: EditProfileModalProps) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset fields when the modal opens with a new user
  useEffect(() => {
    if (open) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setUsername(user.username);
    }
  }, [open, user]);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const accessToken =
      typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (!accessToken) {
      toast.error("You are not logged in");
      return;
    }

    setUploadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch(`${API_URL}/api/users/${user.id}/avatar`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(
          (data as { message?: string }).message ?? "Could not upload avatar",
        );
        return;
      }

      const next: EditableUser = {
        ...user,
        profilePicture: (data as { profilePicture: string | null }).profilePicture,
      };
      onSaved(next);
      toast.success("Avatar updated");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setUploadingAvatar(false);
      e.target.value = "";
    }
  }

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (saving) return;

    const accessToken =
      typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (!accessToken) {
      toast.error("You are not logged in");
      return;
    }

    const payload: Record<string, string> = {};
    if (firstName.trim() !== user.firstName) payload.firstName = firstName.trim();
    if (lastName.trim() !== user.lastName) payload.lastName = lastName.trim();
    if (email.trim() !== user.email) payload.email = email.trim();
    if (username.trim() !== user.username) payload.username = username.trim();

    if (Object.keys(payload).length === 0) {
      onClose();
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(
          (data as { message?: string }).message ?? "Could not update profile",
        );
        return;
      }

      const next: EditableUser = { ...user, ...payload };
      onSaved(next);
      toast.success("Profile updated");
      onClose();
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full md:w-160
          bg-white text-zinc-900
          rounded-t-2xl md:rounded-2xl
          shadow-2xl
          p-6 md:p-10
          relative
          animate-in fade-in slide-in-from-bottom-6 md:slide-in-from-bottom-0 duration-200
        "
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="cursor-pointer absolute top-4 right-4 w-7 h-7 rounded-full bg-zinc-200 hover:bg-zinc-300 flex items-center justify-center text-zinc-700 transition-colors"
        >
          <X size={14} />
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="relative w-20 h-20 shrink-0">
            <div className="w-full h-full rounded-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolveAvatarUrl(user.profilePicture)}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              title="Change avatar"
              aria-label="Change avatar"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <button
              type="button"
              aria-label="Change avatar"
              disabled={uploadingAvatar}
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer absolute bottom-0 right-0 z-10 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center disabled:opacity-60"
            >
              {uploadingAvatar ? (
                <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-zinc-400 border-t-transparent" />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src="/icons/edit.svg" alt="" className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
          <div className="min-w-0">
            <p className="font-semibold truncate">
              {`${user.firstName} ${user.lastName}`.trim() || user.username}
            </p>
            <p className="text-sm text-zinc-500 truncate">{user.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Field
            label="FirstName"
            value={firstName}
            onChange={setFirstName}
            placeholder="First name"
          />
          <Field
            label="LastName"
            value={lastName}
            onChange={setLastName}
            placeholder="Last name"
          />
          <Field
            label="Email account"
            value={email}
            onChange={setEmail}
            placeholder="Email"
            type="email"
          />
          <Field
            label="username"
            value={username}
            onChange={setUsername}
            placeholder="Username"
            prefix="@"
          />

          <div className="pt-2 flex justify-start">
            <Button
              type="submit"
              loading={saving}
              className="cursor-pointer h-11 rounded-xl bg-linear-to-r from-primary to-[#955A14] hover:opacity-90 font-semibold text-white px-8"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  prefix?: string;
}

function Field({ label, value, onChange, placeholder, type = "text", prefix }: FieldProps) {
  return (
    <div className="border-b border-zinc-200 pb-3 flex items-center gap-3">
      <label className="font-semibold text-zinc-900 shrink-0 w-32">
        {label}
      </label>
      <div className="flex-1 flex items-center gap-1 justify-end">
        {prefix && <span className="text-zinc-400 italic">{prefix}</span>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`bg-transparent text-right italic text-zinc-500 placeholder:text-zinc-300 focus:outline-none focus:text-zinc-800 ${prefix ? "" : "flex-1"}`}
        />
      </div>
    </div>
  );
}
