import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "crypto";
import jwt from "jsonwebtoken";

export class Cryptography {
  ecrypt = (value: string) => {
    const iv = Buffer.from(randomBytes(16));
    const cipher = createCipheriv(
      "aes-256-gcm",
      Buffer.from(process.env.CRYPTO_SECRET as string),
      iv
    );
    let encrypted = cipher.update(value);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const hash = `${iv.toString("hex")}:${encrypted.toString("hex")}`;
    return hash;
  };

  decrypt = (value: string) => {
    const [iv, encrypted] = value.split(":");
    const ivBuffer = Buffer.from(iv, "hex");
    const descipher = createDecipheriv(
      "aes-256-gcm",
      Buffer.from(process.env.CRYPTO_SECRET as string),
      ivBuffer
    );
    let decrypted = descipher.update(Buffer.from(encrypted, "hex"));
    return decrypted.toString();
  };

  generateHash = (value: string) => {
    const hash = createHash("sha256");
    return hash.update(value).digest("hex");
  };

  jwtSign = (value: string | object | Buffer) => {
    const token = jwt.sign({ value }, process.env.JWT_SECRET as jwt.Secret);
    return token;
  };

  jwtDecode = (token: string) => {
    return jwt.decode(token);
  };

  jwtVerify = (token: string) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
      return true;
    } catch (error) {
      return false;
    }
  };
}
