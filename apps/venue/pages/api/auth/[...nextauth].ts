import NextAuth from 'next-auth';
import CognitoProvider from 'next-auth/providers/cognito';

export default NextAuth({
  providers: [
    CognitoProvider({
      // @ts-ignore
      clientId: process.env.COGNITO_CLIENT_ID,
      // @ts-ignore
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      issuer: process.env.COGNITO_ISSUER,
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
});
