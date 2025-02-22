export const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes
export const TARGET_WIDTH = 1024;
export const TARGET_HEIGHT = 1024;

export const validateAndResizeImage = (file) => {
  return new Promise((resolve, reject) => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      reject(new Error(`File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = TARGET_WIDTH;
        canvas.height = TARGET_HEIGHT;
        const ctx = canvas.getContext('2d');

        // Draw image maintaining aspect ratio and centering
        const scale = Math.max(TARGET_WIDTH / img.width, TARGET_HEIGHT / img.height);
        const x = (TARGET_WIDTH - img.width * scale) / 2;
        const y = (TARGET_HEIGHT - img.height * scale) / 2;
        
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        // Convert to blob
        canvas.toBlob((blob) => {
          if (blob.size > MAX_FILE_SIZE) {
            reject(new Error(`Processed image is still too large. Please use a smaller image.`));
            return;
          }
          resolve(blob);
        }, 'image/jpeg', 0.8); // Use JPEG format with 80% quality
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}; 