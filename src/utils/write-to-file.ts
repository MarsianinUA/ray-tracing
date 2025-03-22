import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const outputDir = join(__dirname, '..', '..', 'images');
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

const filePath = join(outputDir, 'image.ppm');

export function writeToFile(data: string) {
  writeFileSync(filePath, data, 'utf-8');

  console.log(`✅ The file has been successfully recorded: ${filePath}`);
}
