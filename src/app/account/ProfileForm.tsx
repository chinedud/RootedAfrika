"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateProfile } from "@/actions/auth";
import { Button } from "@/components/ui/Button";

interface Props {
  currentName: string;
  currentAvatar: string;
}

export function ProfileForm({ currentName, currentAvatar }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await updateProfile(formData);
      setMessage("Profile updated!");
      router.refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label
          htmlFor="full_name"
          className="mb-1 block text-sm font-medium text-brand-black/70"
        >
          Full Name
        </label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          required
          defaultValue={currentName}
          className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm text-brand-black placeholder:text-black/30 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
        />
      </div>

      <div>
        <label
          htmlFor="avatar_url"
          className="mb-1 block text-sm font-medium text-brand-black/70"
        >
          Avatar URL
        </label>
        <input
          id="avatar_url"
          name="avatar_url"
          type="url"
          defaultValue={currentAvatar}
          className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm text-brand-black placeholder:text-black/30 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
        />
      </div>

      {message && (
        <p
          className={`text-sm ${
            message === "Profile updated!"
              ? "text-green-600"
              : "text-red-500"
          }`}
          role="alert"
        >
          {message}
        </p>
      )}

      <Button type="submit" disabled={saving} variant="primary">
        {saving ? "Saving…" : "Save Changes"}
      </Button>
    </form>
  );
}
