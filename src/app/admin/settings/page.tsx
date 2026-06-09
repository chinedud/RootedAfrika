"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/Button";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">Settings</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Manage store preferences and configuration
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-neutral-900">General Settings</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site name</Label>
                <input
                  id="siteName"
                  defaultValue="Rooted Afrika"
                  className="flex h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <input
                  id="currency"
                  defaultValue="NGN (&#8358;)"
                  className="flex h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="siteDescription">Site description</Label>
                <textarea
                  id="siteDescription"
                  rows={3}
                  defaultValue="Premium African groceries delivered to your door."
                  className="flex w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact email</Label>
                <input
                  id="contactEmail"
                  type="email"
                  defaultValue="hello@rooted-afrika.com"
                  className="flex h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
                />
              </div>
            </div>
          </div>
          <Button variant="primary" className="bg-pink-500 hover:bg-pink-600 text-white border-none">
            Save Changes
          </Button>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-neutral-900">Appearance</h3>
            <div className="mt-4 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-900">Dark mode</p>
                  <p className="text-xs text-neutral-500">Toggle dark mode for the admin panel</p>
                </div>
                <Switch />
              </div>
              <div>
                <Label htmlFor="brandColor">Brand color</Label>
                <div className="mt-1 flex items-center gap-3">
                  <input
                    id="brandColor"
                    type="color"
                    defaultValue="#EC4899"
                    className="h-10 w-20 cursor-pointer rounded-lg border border-neutral-300 bg-white p-1"
                  />
                  <span className="text-xs text-neutral-500">Pick your brand accent color</span>
                </div>
              </div>
              <div>
                <Label htmlFor="logoUpload">Logo</Label>
                <div className="mt-1 flex items-center gap-3">
                  <div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 text-xs text-neutral-400">
                    Upload
                  </div>
                  <span className="text-xs text-neutral-500">PNG or SVG, max 2MB</span>
                </div>
              </div>
            </div>
          </div>
          <Button variant="primary" className="bg-pink-500 hover:bg-pink-600 text-white border-none">
            Save Changes
          </Button>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-neutral-900">Notification Preferences</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-900">Order notifications</p>
                  <p className="text-xs text-neutral-500">Get notified when new orders are placed</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-900">New user alerts</p>
                  <p className="text-xs text-neutral-500">When a new customer registers</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-900">Low stock alerts</p>
                  <p className="text-xs text-neutral-500">When product stock runs low</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
          <Button variant="primary" className="bg-pink-500 hover:bg-pink-600 text-white border-none">
            Save Changes
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
