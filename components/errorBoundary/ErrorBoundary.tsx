import type React from "react";
import { Component, type ErrorInfo } from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // 다음 렌더링에서 fallback UI를 표시하기 위해 상태를 업데이트합니다.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 에러 리포팅 서비스에 에러를 기록할 수 있습니다.
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 대체 UI를 렌더링합니다.
      return (
        <div className="h-full w-full flex justify-center items-center">
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            네트워크 에러입니다. 나중에 다시 시도해주세요.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
