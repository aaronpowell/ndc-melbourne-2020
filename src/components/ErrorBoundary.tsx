import React, { ErrorInfo } from "react";
import styled from "styled-components";

type ErrorState = {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
};

const ErrorHeader = styled.h1`
  color: #f00;
  font-size: 40px;
  font-weight: bold;
  font-family: "Comic Sans MS";
`;

class ErrorBoundary extends React.Component<{}, ErrorState> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false, error: undefined, errorInfo: undefined };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  reload = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div>
        <ErrorHeader>On no, something went wrong!</ErrorHeader>
        <p>
          It looks like you lucked out on the random number generator and hit an
          error.
        </p>
        <p>
          Your best bet would be to{" "}
          <button onClick={this.reload}>reload</button> and try again.
        </p>
      </div>
    );
  }
}

export default ErrorBoundary;
