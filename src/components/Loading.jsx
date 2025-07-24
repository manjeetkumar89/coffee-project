import React from 'react';

export default function Loading() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'white',
      zIndex: 9999,
    }}>
      <div style={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        border: '6px solid #e7b86a',
        borderTop: '6px solid #6f4e37',
        animation: 'spin 1.1s linear infinite',
        marginBottom: 18,
      }} />
      <div style={{ fontWeight: 700, color: '#6f4e37', fontSize: 22, letterSpacing: 1 }}>Brewing your coffee...</div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 