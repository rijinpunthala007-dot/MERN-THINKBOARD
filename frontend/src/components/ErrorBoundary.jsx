import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // send to logging service if needed
    console.error('Unhandled render error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ 
          padding: '2rem', 
          color: '#fff', 
          background: '#b91c1c',
          textAlign: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h2 style={{ marginBottom: '1rem' }}>Something went wrong</h2>
          <pre style={{ 
            whiteSpace: 'pre-wrap',
            marginBottom: '1rem',
            maxHeight: '50vh',
            overflowY: 'auto',
            color: '#e0e0e0'
          }}>
            {this.state.error.message}
          </pre>
          <p style={{ marginBottom: '1rem' }}>Open DevTools console for full trace.</p>
          <button 
            onClick={() => {
              this.setState({ error: null });
              window.location.reload();
            }}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#4ade80',
              color: '#121212',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

