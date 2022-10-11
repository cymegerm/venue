export default function handler(req: any, res: any) {
  console.log('cognito callback file')
  res.redirect('/apps/venue/protected');
}
