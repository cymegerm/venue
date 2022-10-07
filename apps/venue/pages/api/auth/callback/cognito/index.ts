export default function handler(req: any, res: any) {
  console.log('hello')

  res.redirect('/apps/venue/protected');
}
