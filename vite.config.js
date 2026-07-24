import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { processContact } from './server/contact-core.js';

function contactApiPlugin() {
  return {
    name: 'local-contact-api',

    configureServer(server) {
      server.middlewares.use('/api/contact', async (request, response) => {
        response.setHeader('Content-Type', 'application/json');

        if (request.method !== 'POST') {
          response.statusCode = 405;
          response.end(JSON.stringify({
            message: 'Method not allowed.',
            emailDelivered: false,
            whatsappDelivered: false,
          }));
          return;
        }

        try {
          let rawBody = '';

          for await (const chunk of request) {
            rawBody += chunk;
          }

          const payload = rawBody ? JSON.parse(rawBody) : {};
          const result = await processContact(payload);

          response.statusCode = result.status;
          response.end(JSON.stringify(result.body));
        } catch (error) {
          console.error('Local contact API error:', error);

          response.statusCode = 500;
          response.end(JSON.stringify({
            message: 'The contact API could not process the request.',
            emailDelivered: false,
            whatsappDelivered: false,
          }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    plugins: [react(), contactApiPlugin()],

    server: {
      host: true,
      port: 5173,
    },
  };
});
