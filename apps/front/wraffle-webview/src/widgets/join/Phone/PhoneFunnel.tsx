import Code from './Code';
import PhoneNumber from './PhoneNumber';
import {useFunnel} from '@use-funnel/browser';

interface PhoneProps {
  onNext(phoneNumber: string): void;
}

const PhoneFunnel = ({onNext}: PhoneProps) => {
  const funnel = useFunnel<{
    PhoneNumber: {phoneNumber?: string; code?: string};
    Code: {phoneNumber: string; code?: string};
  }>({
    id: 'phone',
    initial: {
      step: 'PhoneNumber',
      context: {},
    },
  });

  return (
    <funnel.Render
      PhoneNumber={({history}) => (
        <PhoneNumber
          onNext={phoneNumber => history.push('Code', {phoneNumber})}
        />
      )}
      Code={({context}) => <Code onNext={() => onNext(context.phoneNumber)} />}
    />
  );
};

export {PhoneFunnel};
