import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  const filePath = join(process.cwd(), 'public', 'tech_Resume_exp_Prasun.pdf');

  try {
    const fileBuffer = await readFile(filePath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="tech_Resume_exp_Prasun.pdf"',
        'Content-Length': String(fileBuffer.length),
      },
    });
  } catch {
    return new Response('File not found', { status: 404 });
  }
}
