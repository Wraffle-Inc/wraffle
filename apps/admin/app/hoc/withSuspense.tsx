import {ComponentType, ReactElement, Suspense} from 'react';

interface WithSuspenseOptions {
  fallback: ReactElement;
}

const withSuspense = <P extends object>(
  WrappedComponent: () => Promise<ReactElement>,
  options: WithSuspenseOptions,
): React.FC<P> => {
  return (props: P) => (
    <Suspense fallback={options.fallback}>
      <WrappedComponent {...props} />
    </Suspense>
  );
};

export default withSuspense;
