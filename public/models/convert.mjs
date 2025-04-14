import { Document, NodeIO } from '@gltf-transform/core';
import { textureCompress } from '@gltf-transform/functions';

const io = new NodeIO();

// Load your original glb
const doc = io.read('character.glb');

// Convert all textures to PNG (you can also choose 'image/jpeg')
await doc.transform(
  textureCompress({ format: 'image/png' })
);

// Remove EXT_texture_webp manually if it's there
const root = doc.getRoot();
const used = root.listExtensionsUsed();
for (const ext of used) {
  if (ext.extensionName === 'EXT_texture_webp') {
    root.removeExtension(ext);
  }
}

// Save the fixed glb
io.write('character-fixed.glb', doc);
console.log('✅ Conversion complete!');
