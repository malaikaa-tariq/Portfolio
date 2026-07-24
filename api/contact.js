import { processContact } from '../server/contact-core.js';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');

    return response.status(405).json({
      message: 'Method not allowed.',
      emailDelivered: false,
      whatsappDelivered: false,
    });
  }

  try {
    const result = await processContact(request.body || {});

    return response
      .status(result.status)
      .json(result.body);
  } catch (error) {
    console.error('Contact API error:', error);

    return response.status(500).json({
      message: 'The enquiry could not be processed.',
      emailDelivered: false,
      whatsappDelivered: false,
    });
  }
}
