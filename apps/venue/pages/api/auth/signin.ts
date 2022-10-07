export default function handler(req: any, res: any) {
  const nextAuthUrl = process.env.NEXTAUTH_URL;
  const cognitoClientId = process.env.COGNITO_CLIENT_ID;

  const cognitoCallbackUrl = `${nextAuthUrl}/callback/cognito`;
  const cognitoLoginUrl = `https://auth.newk.pro/login?client_id=${cognitoClientId}&response_type=code&scope=email+openid+phone+profile&redirect_uri=${cognitoCallbackUrl}`;

  res.redirect(cognitoLoginUrl);
}
