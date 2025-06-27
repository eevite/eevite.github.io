import React, { Component } from 'react'
 
const CanvaDesigns = () => {
      return (
    <div>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 0,
          paddingTop: '52.5%',
          paddingBottom: 0,
          boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
          marginTop: '1.6em',
          marginBottom: '0.9em',
          overflow: 'hidden',
          borderRadius: '8px',
          willChange: 'transform',
        }}
      >
        <iframe
          loading="lazy"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            border: 'none',
            padding: 0,
            margin: 0,
          }}
          src="https://www.canva.com/design/DAGlvhbbMGI/kJOcdD4vT4Iuke1q4hT38Q/view?embed"
          allow="fullscreen"
          title="Dumpling Invite"
        ></iframe>
      </div>
      <a
        href="https://www.canva.com/design/DAGlvhbbMGI/kJOcdD4vT4Iuke1q4hT38Q/view?utm_content=DAGlvhbbMGI&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Dumpling Invite
      </a>{' '}
      by Elaine Alasagas
    </div>
  );
};
 
export default CanvaDesigns;