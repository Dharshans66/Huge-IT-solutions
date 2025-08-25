import React from 'react';
import Image from 'next/image';
import loaderGif from '../../public/assets/1490.gif'; // adjust the path

const Pageloader = ({ loading }) => {
  if (!loading) return null; // only render if proploading is true

  return (
    <div style={styles.overlay}>
      <div style={styles.loaderContainer}>
        <Image 
          src={loaderGif} 
          alt="Loading..." 
          width={100} 
          height={100} 
          style={styles.loader} 
        />
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    // Next.js Image handles width/height via props, so inline style is optional
  },
};

export default Pageloader;
