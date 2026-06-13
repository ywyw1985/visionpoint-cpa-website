const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

const TOPIC_LABELS = {
  tax_planning: "Tax planning",
  tax_return: "Tax return preparation",
  bookkeeping: "Bookkeeping or cleanup",
  business_advisory: "Business advisory",
  entity_payroll: "Entity or payroll question",
  launch_update: "Launch update",
  other: "Other",
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

function clean(value, max = 2000) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, max);
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function readPayload(request) {
  const type = request.headers.get("content-type") || "";
  if (type.includes("application/json")) return request.json();
  if (type.includes("application/x-www-form-urlencoded") || type.includes("multipart/form-data")) {
    const form = await request.formData();
    return Object.fromEntries(form.entries());
  }
  return {};
}

function buildEmailHtml(data) {
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "Not provided"],
    ["Preferred language", data.language || "Not provided"],
    ["Topic", TOPIC_LABELS[data.topic] || data.topic || "Not provided"],
    ["Page", data.page || "Not provided"],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#1f2933;line-height:1.55">
      <h2 style="margin:0 0 12px">New VisionPoint CPA website inquiry</h2>
      <p style="margin:0 0 18px">A visitor submitted the contact question form.</p>
      <table style="border-collapse:collapse;width:100%;max-width:680px">
        ${rows
          .map(([label, value]) => `<tr><th style="text-align:left;border:1px solid #d8dee4;padding:8px;background:#f6f8fa;width:180px">${label}</th><td style="border:1px solid #d8dee4;padding:8px">${value}</td></tr>`)
          .join("")}
      </table>
      <h3 style="margin:22px 0 8px">Question</h3>
      <p style="white-space:pre-wrap;border:1px solid #d8dee4;padding:12px;background:#fbfaf7">${data.message}</p>
      <p style="font-size:13px;color:#64748b">Do not treat this message as a CPA-client relationship until a formal engagement is accepted.</p>
    </div>
  `;
}

async function handleContact(request, env) {
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, message: "Method not allowed." }, 405);
  }

  let raw;
  try {
    raw = await readPayload(request);
  } catch {
    return jsonResponse({ ok: false, message: "The form could not be read." }, 400);
  }

  if (clean(raw.company, 200)) {
    return jsonResponse({ ok: true, message: "Thank you. Your message has been received." });
  }

  const data = {
    name: clean(raw.name, 120),
    email: clean(raw.email, 180).toLowerCase(),
    phone: clean(raw.phone, 80),
    topic: clean(raw.topic, 80),
    language: clean(raw.language, 80),
    page: clean(raw.page, 300),
    message: clean(raw.message, 5000),
  };

  if (!data.name || !validEmail(data.email) || !data.topic || data.message.length < 20) {
    return jsonResponse({ ok: false, message: "Please complete your name, email, topic, and a brief question." }, 400);
  }

  if (!raw.consent) {
    return jsonResponse({ ok: false, message: "Please confirm that you will not send sensitive documents through this form." }, 400);
  }

  if (!env.RESEND_API_KEY) {
    return jsonResponse({ ok: false, message: "Email delivery is not configured yet." }, 503);
  }

  const to = env.CONTACT_TO_EMAIL || "antoao208@gmail.com";
  const from = env.RESEND_FROM_EMAIL || "VisionPoint CPA <onboarding@resend.dev>";
  const subject = `VisionPoint CPA inquiry: ${TOPIC_LABELS[data.topic] || data.topic}`;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: data.email,
      subject,
      html: buildEmailHtml(data),
      text: [
        "New VisionPoint CPA website inquiry",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "Not provided"}`,
        `Preferred language: ${data.language || "Not provided"}`,
        `Topic: ${TOPIC_LABELS[data.topic] || data.topic}`,
        `Page: ${data.page || "Not provided"}`,
        "",
        data.message,
      ].join("\n"),
    }),
  });

  if (!resendResponse.ok) {
    return jsonResponse({ ok: false, message: "Email delivery failed. Please try again later." }, 502);
  }

  return jsonResponse({ ok: true, message: "Thank you. Your question has been sent for review." });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      return handleContact(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
