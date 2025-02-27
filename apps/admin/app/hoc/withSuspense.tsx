import {Suspense} from 'react';

const withSuspense = (WrappedComponent: any, fallback: any) => {
  return (props: any) => (
    <Suspense fallback={fallback}>
      <WrappedComponent {...props} />
    </Suspense>
  );
};

export default withSuspense;
