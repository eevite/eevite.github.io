import React, { useState, useRef } from 'react';

const Main: React.FC = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

 const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const img = new Image();
  const reader = new FileReader();

  reader.onload = (event) => {
    if (event.target?.result) {
      img.src = event.target.result as string;
    }
  };

  img.onload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const targetWidth = 1200;
    const targetHeight = 630;
    const targetAspect = targetWidth / targetHeight;

    const imgAspect = img.width / img.height;

    let sx = 0, sy = 0, sw = img.width, sh = img.height;

    if (imgAspect > targetAspect) {
      // Image is wider than target — crop sides
      sw = img.height * targetAspect;
      sx = (img.width - sw) / 2;
    } else {
      // Image is taller than target — crop top/bottom
      sh = img.width / targetAspect;
      sy = (img.height - sh) / 2;
    }

    canvas.width = targetWidth;
    canvas.height = targetHeight;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetWidth, targetHeight);

    const dataUrl = canvas.toDataURL('image/png');
    setPreview(dataUrl);
  };

  reader.readAsDataURL(file);
};

const uploadImageToCloudinary = async () => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  canvas.toBlob(async (blob) => {
    if (!blob) return;

    const formData = new FormData();
    formData.append('file', blob);
    formData.append('upload_preset', 'unsigned_invite'); // your preset name

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dfuo6vbc8/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await res.json();
    console.log('Uploaded to Cloudinary:', data.secure_url);
    alert(`Image uploaded: ${data.secure_url}`);
    // You can now use `data.secure_url` as your og:image
  }, 'image/png');
};

  return (
    <div className="main p-4 space-y-4">
      <h2 className="text-xl font-bold">Choose an Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="block"
      />

      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />

      {preview && (
        <div>
          <h3 className="text-lg font-medium mt-4">Preview:</h3>
          <img
            src={preview}
            alt="Resized Invitation"
            className="border rounded shadow"
            width={300}
          />
        </div>
      )}

<div>
 <button
        onClick={uploadImageToCloudinary}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
        Upload Image to Cloudinary
    </button>
</div>
       

      <div>
        <label className="block mt-6 font-medium">Event Name</label>
        <input type="text" className="border p-2 rounded w-full" />
      </div>
      <div>
        <label className="block font-medium">Date and Time</label>
        <input type="datetime-local" className="border p-2 rounded w-full" />
      </div>
      <div>
        <label className="block font-medium">Location</label>
        <input type="text" className="border p-2 rounded w-full" />
      </div>
    </div>
  );
};

export default Main;
