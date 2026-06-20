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
        subject: '🎯 Your Free TradingView Indicator is Ready',
        headers: {
          'List-Unsubscribe': '<mailto:hello@orzenlabs.com?subject=unsubscribe>'
        },
        html: `
          <div style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#0f0f1a;color:#e0e0e0;margin:0;padding:0;">
            
            <!-- Header Image -->
            <div style="background:linear-gradient(135deg, #1c1c2e 0%, #16213e 50%, #0f3460 100%);padding:0;text-align:center;border-radius:16px 16px 0 0;">
              <img src="https://res.cloudinary.com/ddhmtzdhi/image/upload/v1781930464/2_yblmcy.png" alt="Orzen Labs" style="width:100%;max-width:500px;height:auto;display:block;border-radius:16px 16px 0 0;">
            </div>

            <!-- Main Content -->
            <div style="max-width:520px;margin:0 auto;padding:2.5rem 2rem;background:#1a1a2e;border-radius:0 0 16px 16px;">
              
              <h1 style="color:#ffffff;font-size:1.8em;font-weight:700;margin:0 0 1rem 0;text-align:center;letter-spacing:-0.5px;">
                Your Free Indicator is Ready! 🚀
              </h1>

              <p style="color:#b0b0c0;font-size:1em;line-height:1.8;margin:0 0 1.5rem 0;text-align:center;">
                Welcome to Orzen Labs! We've prepared your free TradingView indicator. To access it, join our exclusive Discord community.
              </p>

              <!-- CTA Button -->
              <div style="text-align:center;margin:2.5rem 0;">
                <a href="https://discord.gg/GbdbWj27Dn" style="display:inline-block;padding:1rem 2.5rem;background:linear-gradient(135deg, #5865F2 0%, #4752C4 100%);color:#ffffff;text-decoration:none;border-radius:8px;font-weight:700;font-size:1.05em;box-shadow:0 4px 15px rgba(88,101,242,0.3);transition:transform 0.2s;">
                  Join Discord & Get Access
                </a>
              </div>

              <!-- Steps -->
              <div style="background:#242329;border-radius:12px;padding:1.5rem;margin:2rem 0;border-left:4px solid #5865F2;">
                <h3 style="color:#ffffff;margin:0 0 1rem 0;font-size:1.1em;">What's Next?</h3>
                <ol style="color:#aaa;line-height:2;margin:0;padding-left:1.5rem;">
                  <li>Click the button above to join Discord</li>
                  <li>Go to the <strong style="color:#fff;">#free-files</strong> channel</li>
                  <li>Download your free TradingView indicator</li>
                  <li>Start trading with confidence! 📈</li>
                </ol>
              </div>

              <!-- Features -->
              <div style="background:rgba(88,101,242,0.1);border-radius:12px;padding:1.5rem;margin:2rem 0;">
                <p style="color:#aaa;margin:0;font-size:0.95em;line-height:1.8;">
                  <strong style="color:#7c83ff;">✓ Real backtest numbers</strong> • 
                  <strong style="color:#7c83ff;">✓ Zero BS signals</strong> • 
                  <strong style="color:#7c83ff;">✓ Free forever</strong>
                </p>
              </div>

              <!-- Footer -->
              <p style="color:#666;font-size:0.85em;text-align:center;margin:2rem 0 0 0;border-top:1px solid #333;padding-top:1.5rem;">
                Have questions? Reply to this email or ask in Discord.
              </p>
              <p style="color:#555;font-size:0.8em;text-align:center;margin:0.5rem 0 0 0;">
                — <strong>Orzen Labs</strong> Trading Community
              </p>

            </div>

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
