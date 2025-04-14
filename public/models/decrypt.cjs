const crypto = require("crypto");
const fs = require("fs");

const decryptFile = (inputFile, outputFile, password) => {
  const key = crypto.createHash("sha256").update(password).digest();

  // Read the encrypted file
  const encryptedData = fs.readFileSync(inputFile);

  // Extract the IV (first 16 bytes)
  const iv = encryptedData.subarray(0, 16);
  const encryptedContent = encryptedData.subarray(16);

  // Create decipher with the correct IV
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

  // Decrypt the content
  const decryptedData = Buffer.concat([decipher.update(encryptedContent), decipher.final()]);

  // Write to the output file
  fs.writeFileSync(outputFile, decryptedData);
};

// Call the function to decrypt
decryptFile("character.enc", "decrypted_character.glb", "Character3D#@");
