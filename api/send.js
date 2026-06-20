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
        subject: 'Join Discord & Get Your Free TradingView Indicator',
        html: `
          <div style="font-family:Inter,sans-serif;max-width:500px;margin:auto;padding:2rem;background:#1a1a2e;border-radius:12px;color:#e0e0e0;">
            <h2 style="color:#ffffff;margin-bottom:1rem;">Your Free Indicator Awaits</h2>
            <p style="color:#aaa;line-height:1.7;margin-bottom:1rem;">
              Thank you for signing up! To access your free TradingView indicator, join our Discord community.
            </p>
            <p style="text-align:center;margin:2rem 0;">
              <a href="https://discord.gg/GbdbWj27Dn" style="display:inline-block;padding:0.75rem 2rem;background:#5865F2;color:#fff;text-decoration:none;border-radius:6px;font-weight:bold;font-size:1.1em;">Join Discord</a>
            </p>
            <p style="color:#aaa;line-height:1.7;margin-bottom:1rem;padding:1rem;background:#242329;border-radius:6px;">
              Once you join, go to the <strong>#free-files</strong> channel. The indicator file will be waiting for you.
            </p>
            <p style="color:#555;font-size:0.85em;">Questions? We're here to help in Discord.</p>
            <p style="color:#555;font-size:0.85em;margin-top:1rem;">— Orzen Labs</p>
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
