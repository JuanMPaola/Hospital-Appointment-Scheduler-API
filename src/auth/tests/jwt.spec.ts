import { sign, verify } from '../jwl';

describe('JWT', () => {
  const payload = { userId: 123, role: 'admin' };

  it('should sign and verify JWT successfully', () => {
    // Sign the payload
    const token = sign(payload);

    // Verify the token
    const decoded = verify(token);

    expect(decoded).toEqual(payload);
  });

  it('should throw an error for an invalid signature', () => {
    // Create a valid token
    const token = sign(payload);

    // Tamper with the token by altering the signature
    const [header, payloadPart] = token.split('.');
    const tamperedToken = `${header}.${payloadPart}.invalidSignature`;

    expect(() => verify(tamperedToken)).toThrow('Invalid signature');
  });

  it('should throw an error for a malformed token', () => {
    // Create a token with missing parts
    const malformedToken = 'header.payload'; // Missing signature

    expect(() => verify(malformedToken)).toThrow();
  });

  it('should handle empty payload', () => {
    // Sign an empty payload
    const token = sign({});

    // Verify the token
    const decoded = verify(token);

    expect(decoded).toEqual({});
  });

  it('should handle special characters in payload', () => {
    // Sign a payload with special characters
    const specialPayload = { text: 'Hello, world! ☕️' };
    const token = sign(specialPayload);

    // Verify the token
    const decoded = verify(token);

    expect(decoded).toEqual(specialPayload);
  });
});
