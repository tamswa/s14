import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('App error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-emerald-50 px-4">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-bold text-emerald-800 mb-2">حدث خطأ غير متوقع</h1>
            <p className="text-gray-600 mb-4">يرجى تحديث الصفحة والمحاولة مرة أخرى.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
            >
              تحديث الصفحة
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
