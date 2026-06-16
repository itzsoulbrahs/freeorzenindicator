export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  let email;
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    email = body.email;
  } catch (e) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer re_Wb6Sgcka_3Bq7iNf98A7ZLXAVMZwYXHAv'
      },
      body: JSON.stringify({
        from: 'Orzen Labs <hello@orzenlabs.com>',
        to: [email],
        subject: 'Your Free TradingView Indicator from Orzen Labs',
        html: `
          <div style="font-family:Inter,sans-serif;max-width:500px;margin:auto;padding:2rem;background:#1a1a2e;border-radius:12px;color:#e0e0e0;">
            <h2 style="color:#ffffff;margin-bottom:1rem;">Your Free Indicator is Here</h2>
            <p style="color:#aaa;line-height:1.7;margin-bottom:1rem;">
              Thank you for signing up! Here is your free TradingView indicator from <strong style="color:#fff;">Orzen Labs</strong>.
            </p>
            <p style="color:#aaa;line-height:1.7;margin-bottom:1.5rem;">
              [ https://drive.google.com/drive/folders/16xNzKtyTAbTxCwYCZhWEHb0t9QWzB4Ud?usp=sharing ]
            </p>
            <p style="color:#555;font-size:0.85em;">— Orzen Labs</p>
          </div>
        `
      })
    });

    const data = await response.json();
    return res.status(response.ok ? 200 : 400).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
