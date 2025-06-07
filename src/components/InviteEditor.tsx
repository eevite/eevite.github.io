import React, { useEffect, useRef } from 'react';
import { FabricText, StaticCanvas } from 'fabric';

const InviteEditor = () => {
  const canvasRef = useRef<StaticCanvas | null>(null);

  useEffect(() => {
    const canvas = new StaticCanvas('invite-canvas', {
      width: 375,
      height: 667,
      backgroundColor: '#fff',
    });

    // Save canvas instance
    canvasRef.current = canvas;

    // Add default title
    const titleText = new FabricText("You're Invited!", {
      left: 50,
      top: 50,
      fontSize: 24,
      fill: '#000',
      editable: true,
    });
    canvas.add(titleText);

    // Add default subtitle
    const subtitleText = new FabricText('Click the link to RSVP', {
      left: 50,
      top: 100,
      fontSize: 16,
      fill: '#444',
      editable: true,
    });
    canvas.add(subtitleText);

    // Clean up on unmount
    return () => {
      canvas.dispose();
    };
  }, []);

  const addText = () => {
    const canvas = canvasRef.current;
    if(canvas == null) return;
    const newText = new FabricText('New Text', {
      left: 100,
      top: 150,
      fontSize: 18,
      fill: '#333',
    });
    canvas.add(newText);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if(canvas == null) return;
    const dataURL = canvas.toDataURL();

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'invitation.png';
    link.click();
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-2">Digital Invite Editor</h2>
      <canvas id="invite-canvas" className="border mb-4"></canvas>
      <div className="flex gap-2">
        <button onClick={addText} className="bg-blue-500 text-white px-4 py-2 rounded">Add Text</button>
        <button onClick={downloadImage} className="bg-green-500 text-white px-4 py-2 rounded">Download</button>
      </div>
    </div>
  );
};

export default InviteEditor;