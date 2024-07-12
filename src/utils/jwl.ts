import * as crypto from 'crypto';

const secretKey = 'your_secret_key'; // Use a secure key

export function sign(payload: object, expiresIn: number = 3600): string {
  const header = JSON.stringify({ alg: 'HS256', typ: 'JWT' });
  const encodedHeader = Buffer.from(header).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function verify(token: string): boolean | object {
  const [encodedHeader, encodedPayload, signature] = token.split('.');

  const expectedSignature = crypto
    .createHmac('sha256', secretKey)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');
  
  if (signature !== expectedSignature) {
    throw new Error('Invalid signature');
  }

  const payload = Buffer.from(encodedPayload, 'base64url').toString();
  return JSON.parse(payload);
}
