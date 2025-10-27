"use client";

import React, { Component, ReactNode } from 'react';
import styles from './ErrorBoundary.module.scss';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className={styles.errorBoundary}>
          <div className={styles.errorContent}>
            <h3 className={styles.errorTitle}>Щось пішло не так</h3>
            <p className={styles.errorMessage}>
              Виникла помилка при завантаженні відгуків. 
              Будь ласка, спробуйте оновити сторінку.
            </p>
            <button 
              className={styles.retryButton}
              onClick={() => window.location.reload()}
            >
              Оновити сторінку
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
