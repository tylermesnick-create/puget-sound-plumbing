import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const {
    rating,
    name,
    phone,
    email,
    what_went_wrong,
    businessName = "Unknown Business",
    recipientEmail = "tyler@cascadedigital.co",
  } = body as {
    rating: number;
    name: string;
    phone: string;
    email?: string;
    what_went_wrong: string;
    businessName?: string;
    recipientEmail?: string;
  };

  const timestamp = new Date().toISOString();
  const stars = "⭐".repeat(Number(rating));

  const textBody = `
New private feedback received for ${businessName}

Rating: ${stars} (${rating}/5)
Submitted: ${timestamp}

━━━━━━━━━━━━━━━━━━━━━━━
Customer info
━━━━━━━━━━━━━━━━━━━━━━━
Name:  ${name}
Phone: ${phone}
Email: ${email || "(not provided)"}

━━━━━━━━━━━━━━━━━━━━━━━
What went wrong
━━━━━━━━━━━━━━━━━━━━━━━
${what_went_wrong}
  `.trim();

  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY environment variable is not set");
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      // Use a verified sending domain in Resend. Until you verify a custom domain,
      // you can send from onboarding@resend.dev (visible in Resend dashboard only).
      from: `${businessName} Feedback <onboarding@resend.dev>`,
      to: recipientEmail as string,
      subject: `⚠️ ${rating}-star private feedback — ${businessName}`,
      text: textBody,
    });
  } catch (err) {
    // Graceful degradation: log everything so it's recoverable from Vercel logs,
    // but do NOT surface the error to the customer.
    console.error("[REVIEW_CAPTURE_FAILED]", {
      error: err instanceof Error ? err.message : String(err),
      payload: {
        rating,
        name,
        phone,
        email: email || null,
        what_went_wrong,
        businessName,
        recipientEmail,
        timestamp,
      },
    });
  }

  // Always return success — the customer doesn't need to know if our backend broke.
  return NextResponse.json({ ok: true });
}
