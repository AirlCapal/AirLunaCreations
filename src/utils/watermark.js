/**
 * Utility to create a watermarked canvas or data URL from an image source
 * Watermarks the center with the official ALC logo + AirLuna Creations emblem
 */

export async function createWatermarkedImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');

        // Draw original artwork
        ctx.drawImage(img, 0, 0);

        // Load watermark logo
        const logo = new Image();
        logo.crossOrigin = 'anonymous';
        logo.onload = () => {
          const minDim = Math.min(canvas.width, canvas.height);
          const logoSize = Math.max(minDim * 0.32, 140);
          const logoX = (canvas.width - logoSize) / 2;
          const logoY = (canvas.height - logoSize) / 2 - 15;

          // Watermark styling: soft semi-transparent glowing badge
          ctx.save();
          ctx.globalAlpha = 0.45;

          // Soft subtle radial dark vignette behind logo to make it legible on light or dark artwork
          const radial = ctx.createRadialGradient(
            canvas.width / 2,
            logoY + logoSize / 2,
            logoSize * 0.1,
            canvas.width / 2,
            logoY + logoSize / 2,
            logoSize * 0.85
          );
          radial.addColorStop(0, 'rgba(13, 32, 98, 0.7)');
          radial.addColorStop(1, 'rgba(13, 32, 98, 0)');
          ctx.fillStyle = radial;
          ctx.beginPath();
          ctx.arc(canvas.width / 2, logoY + logoSize / 2, logoSize * 0.85, 0, Math.PI * 2);
          ctx.fill();

          // Draw the ALC emblem
          ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

          // Watermark text below logo
          ctx.globalAlpha = 0.65;
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const fontSize = Math.max(Math.round(minDim * 0.038), 16);
          ctx.font = `800 ${fontSize}px 'Montserrat', 'Poppins', sans-serif`;
          ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
          ctx.shadowBlur = 8;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 2;
          ctx.fillText('AIRLUNA CREATIONS', canvas.width / 2, logoY + logoSize + fontSize * 0.9);

          // Subtitle
          const subFontSize = Math.max(Math.round(fontSize * 0.6), 11);
          ctx.font = `600 ${subFontSize}px 'Poppins', sans-serif`;
          ctx.fillStyle = '#93c5fd';
          ctx.fillText('DESIGN PORTFOLIO • ALC', canvas.width / 2, logoY + logoSize + fontSize * 0.9 + subFontSize * 1.5);

          ctx.restore();

          resolve(canvas.toDataURL('image/png'));
        };
        logo.onerror = () => {
          // If logo fails to load, fallback to text watermark
          ctx.save();
          ctx.globalAlpha = 0.55;
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
          ctx.shadowBlur = 10;
          const fontSize = Math.max(Math.round(canvas.width * 0.04), 20);
          ctx.font = `bold ${fontSize}px sans-serif`;
          ctx.fillText('AIRLUNA CREATIONS (ALC)', canvas.width / 2, canvas.height / 2);
          ctx.restore();
          resolve(canvas.toDataURL('image/png'));
        };
        logo.src = '/assets/media/LOGO%20DESIGN/alc_official_logo.png';
      } catch (err) {
        resolve(src);
      }
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });
}
