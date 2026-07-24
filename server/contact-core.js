const OWNER_EMAIL =
  process.env.CONTACT_OWNER_EMAIL || 'maharhassan151@gmail.com';

const OWNER_WHATSAPP = String(
  process.env.WHATSAPP_OWNER_NUMBER || '971556539149'
).replace(/\D/g, '');

function clean(value, maxLength = 3000) {
  return String(value ?? '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
}

function getValue(payload, ...keys) {
  for (const key of keys) {
    if (payload[key] !== undefined && payload[key] !== null) {
      return payload[key];
    }
  }

  return '';
}

function normalizePayload(payload = {}) {
  return {
    name: clean(
      getValue(payload, 'name', 'fullName', 'full_name'),
      120
    ),

    email: clean(
      getValue(payload, 'email', 'emailAddress', 'email_address'),
      180
    ),

    phone: clean(
      getValue(payload, 'phone', 'phoneNumber', 'whatsapp'),
      80
    ),

    company: clean(
      getValue(payload, 'company', 'companyName'),
      160
    ),

    projectType: clean(
      getValue(payload, 'project_type', 'projectType', 'service'),
      180
    ),

    budget: clean(
      getValue(payload, 'budget', 'indicativeBudget'),
      120
    ),

    timeline: clean(
      getValue(payload, 'timeline', 'requiredTimeline'),
      180
    ),

    message: clean(
      getValue(payload, 'message', 'brief', 'projectBrief'),
      3000
    ),

    preferredReply:
      clean(
        getValue(
          payload,
          'preferred_reply',
          'preferredReply',
          'preferredContact',
          'contactMethod'
        ),
        40
      ) || 'Email',

    honey: clean(
      getValue(payload, '_honey', 'website'),
      100
    ),
  };
}

function buildMessage(data) {
  return [
    'New architectural project enquiry',
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone / WhatsApp: ${data.phone || 'Not provided'}`,
    `Company: ${data.company || 'Not provided'}`,
    `Project type: ${data.projectType}`,
    `Budget: ${data.budget || 'Not provided'}`,
    `Timeline: ${data.timeline || 'Not provided'}`,
    `Preferred contact method: ${data.preferredReply}`,
    '',
    'Project brief:',
    data.message,
  ].join('\n');
}

async function sendEmail(data) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    return {
      delivered: false,
      reason: 'Email credentials are not configured.',
    };
  }

  try {
    const result = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [OWNER_EMAIL],
        reply_to: data.email,
        subject: `New project enquiry — ${data.name}`,
        text: buildMessage(data),
      }),
    });

    if (!result.ok) {
      const details = await result.text().catch(() => '');

      return {
        delivered: false,
        reason: `Email provider rejected the request. ${details}`.trim(),
      };
    }

    return {
      delivered: true,
      reason: null,
    };
  } catch (error) {
    return {
      delivered: false,
      reason: `Email service error: ${error.message}`,
    };
  }
}

async function sendWhatsApp(data) {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const graphVersion =
    process.env.WHATSAPP_GRAPH_VERSION || 'v23.0';

  const templateName =
    process.env.WHATSAPP_TEMPLATE_NAME;

  const templateLanguage =
    process.env.WHATSAPP_TEMPLATE_LANGUAGE || 'en_US';

  if (!accessToken || !phoneNumberId || !OWNER_WHATSAPP) {
    return {
      delivered: false,
      reason: 'WhatsApp Cloud API credentials are not configured.',
    };
  }

  const message = buildMessage(data).slice(0, 950);

  const requestBody = templateName
    ? {
        messaging_product: 'whatsapp',
        to: OWNER_WHATSAPP,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: templateLanguage,
          },
          components: [
            {
              type: 'body',
              parameters: [
                {
                  type: 'text',
                  text: message,
                },
              ],
            },
          ],
        },
      }
    : {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: OWNER_WHATSAPP,
        type: 'text',
        text: {
          preview_url: false,
          body: message,
        },
      };

  try {
    const result = await fetch(
      `https://graph.facebook.com/${graphVersion}/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!result.ok) {
      const details = await result.text().catch(() => '');

      return {
        delivered: false,
        reason: `WhatsApp provider rejected the request. ${details}`.trim(),
      };
    }

    return {
      delivered: true,
      reason: null,
    };
  } catch (error) {
    return {
      delivered: false,
      reason: `WhatsApp service error: ${error.message}`,
    };
  }
}

export async function processContact(payload = {}) {
  const data = normalizePayload(payload);

  if (data.honey) {
    return {
      status: 200,
      body: {
        message: 'Your enquiry was received.',
        emailDelivered: true,
        whatsappDelivered: false,
      },
    };
  }

  if (
    !data.name ||
    !data.email ||
    !data.projectType ||
    !data.message
  ) {
    return {
      status: 400,
      body: {
        message: 'Please complete all required fields.',
        emailDelivered: false,
        whatsappDelivered: false,
      },
    };
  }

  const emailResult = await sendEmail(data);

  const whatsappSelected =
    data.preferredReply.toLowerCase() === 'whatsapp';

  let whatsappResult = {
    delivered: false,
    reason: 'WhatsApp was not selected.',
  };

  if (whatsappSelected) {
    whatsappResult = await sendWhatsApp(data);
  }

  let responseMessage =
    'The enquiry could not be delivered. Please try again.';

  if (emailResult.delivered && whatsappResult.delivered) {
    responseMessage =
      'The owner received your project enquiry by email and WhatsApp and will contact you shortly.';
  } else if (emailResult.delivered && whatsappSelected) {
    responseMessage =
      'The owner received your project enquiry by email. WhatsApp delivery could not be confirmed.';
  } else if (emailResult.delivered) {
    responseMessage =
      'The owner received your project enquiry by email and will contact you shortly.';
  }

  return {
    status: emailResult.delivered ? 200 : 503,
    body: {
      message: responseMessage,
      preferredReply: data.preferredReply,
      emailDelivered: emailResult.delivered,
      whatsappDelivered: whatsappResult.delivered,
      emailReason: emailResult.reason,
      whatsappReason: whatsappResult.reason,
    },
  };
}
