import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { email, name, trade } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    const { data: existing } = await supabase
      .from("subscribers")
      .select("id, status")
      .eq("email", email)
      .single();

    if (existing) {
      if (existing.status === "unsubscribed") {
        await supabase
          .from("subscribers")
          .update({ status: "active", unsubscribed_at: null })
          .eq("id", existing.id);
        return NextResponse.json({ success: true, resubscribed: true });
      }
      return NextResponse.json({ success: true, already_subscribed: true });
    }

    const { error } = await supabase.from("subscribers").insert({
      email,
      name: name || null,
      trade: trade || null,
    });

    if (error) {
      console.error("Subscribe error:", error);
      return NextResponse.json(
        { error: "Failed to subscribe" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
