import type { Metadata } from "next";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { createClient } from "@/lib/supabase/server";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rooted Afrika | Premium African Produce",
    template: "%s | Rooted Afrika",
  },
  description:
    "Shop premium African fruits, vegetables, and authentic spices. Fresh, quality produce delivered to your door.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("id, full_name, avatar_url, role")
      .eq("id", user.id)
      .single();
    profile = data;
  }

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <LayoutWrapper user={profile}>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
