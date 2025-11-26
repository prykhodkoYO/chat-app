import 'dotenv/config';

export default {
  expo: {
    name: 'chat-app',
    slug: 'chat-app',
    version: '1.0.0',
    extra: {
      apiUrl: process.env.API_URL,
    },
  },
};
