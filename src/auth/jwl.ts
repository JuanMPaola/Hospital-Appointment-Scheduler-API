import * as crypto from 'crypto';

const secretKey = 'AVerySecretKey';

export function sign(payload: object, expiresIn: number = 3600): string {
  // Create the JWT header
  const header = JSON.stringify({ alg: 'HS256', typ: 'JWT' });
  const encodedHeader = Buffer.from(header).toString('base64url');

  // Create the JWT payload
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  
  // Create the signature
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');
  
  // Return all togheter as the JWT
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function verify(token: string): boolean | object {
  // Separete header, payload, and signature
  const [encodedHeader, encodedPayload, signature] = token.split('.');

  // Recreate the signature using the provided header and payload
  const expectedSignature = crypto
    .createHmac('sha256', secretKey)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');
  
  // Compare the recreated signature with the one provided in the token
  if (signature !== expectedSignature) {
    throw new Error('Invalid signature');
  }

  // Decode the payload from base64url and parse it as JSON
  const payload = Buffer.from(encodedPayload, 'base64url').toString();
  return JSON.parse(payload);
}
