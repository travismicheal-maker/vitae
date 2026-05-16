// api/transcribe.js
// Converts audio blobs to text using OpenAI Whisper API.
// Called when Web Speech API is unavailable (Firefox, older browsers).
// Requires OPENAI_API_KEY in Vercel environment variables.

export const config = {
  api: { bodyParser: { sizeLimit: '10mb' } },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    return res.status(500).json({
      error: 'OpenAI API key not configured. Add OPENAI_API_KEY to Vercel environment variables.',
    });
  }

  try {
    const { audio, mimeType = 'audio/webm' } = req.body;
    if (!audio) return res.status(400).json({ error: 'No audio data provided' });

    // Convert base64 back to binary
    const buffer = Buffer.from(audio, 'base64');

    // Build multipart form for Whisper API
    const boundary = '----VitaeAudioBoundary' + Date.now();
    const ext = mimeType.includes('mp4') ? 'mp4' : mimeType.includes('ogg') ? 'ogg' : 'webm';

    const bodyParts = [
      `--${boundary}\r\nContent-Disposition: form-data; name="model"\r\n\r\nwhisper-1`,
      `--${boundary}\r\nContent-Disposition: form-data; name="language"\r\n\r\nen`,
      `--${boundary}\r\nContent-Disposition: form-data; name="prompt"\r\n\r\nMedical health question about lab results, symptoms, or treatment`,
      `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="audio.${ext}"\r\nContent-Type: ${mimeType}\r\n\r\n`,
    ];

    const textParts = bodyParts.join('\r\n');
    const closing  = `\r\n--${boundary}--`;

    const fullBody = Buffer.concat([
      Buffer.from(textParts, 'utf8'),
      buffer,
      Buffer.from(closing, 'utf8'),
    ]);

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization':  `Bearer ${openaiKey}`,
        'Content-Type':   `multipart/form-data; boundary=${boundary}`,
        'Content-Length': fullBody.length,
      },
      body: fullBody,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return res.status(response.status).json({ error: err.error?.message || 'Transcription failed' });
    }

    const data = await response.json();
    return res.status(200).json({ transcript: data.text || '' });

  } catch (error) {
    return res.status(500).json({ error: 'Transcription error — please try again' });
  }
}
