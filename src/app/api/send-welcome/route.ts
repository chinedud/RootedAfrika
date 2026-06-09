import { NextResponse } from "next/server";
import { resend } from "@/emails/resend";
import { WelcomeEmail } from "@/emails/templates/WelcomeEmail";

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json() as {
      name: string;
      email: string;
    };

    if (!name || !email) {
      return NextResponse.json(
        { error: "name and email are required" },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Rooted Afrika <noreply@rootedafrika.com>",
      to: email,
      subject: "Welcome to Rooted Afrika!",
      react: WelcomeEmail({ name, email }),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 },
    );
  }
}
