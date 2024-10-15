'use client';

import type {z} from 'zod';
import {joinDefaultValues, joinSchema} from '@/entities/auth/join/schema';
import type {JoinStep} from '@/entities/auth/join/type';
import {Header, ProgressBar} from '@/shared/ui';
import GenericForm from '@/shared/ui/form/GenericForm';
import {Info, Name, Extra, PhoneFunnel} from '@/widgets/join';
import {zodResolver} from '@hookform/resolvers/zod';
import {useFunnel} from '@use-funnel/browser';

const Join = () => {
  const onSubmit = (data: z.infer<typeof joinSchema>) => {
    //!TODO: 회원가입 로직 구현
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {confirmPassword, ...userJoinData} = data;
    console.log(userJoinData);
  };

  const funnel = useFunnel<JoinStep>({
    id: 'join',
    initial: {
      step: 'Info',
      context: {},
    },
  });

  return (
    <div>
      <section className='py-5'>
        <Header>
          <Header.BackButton onClick={() => funnel.history.back()} />
        </Header>
        <ProgressBar totalSteps={4} index={funnel.index} />
      </section>

      <section className='px-5'>
        <GenericForm
          onSubmit={onSubmit}
          formOptions={{
            mode: 'onChange',
            resolver: zodResolver(joinSchema),
            defaultValues: joinDefaultValues,
          }}
        >
          <funnel.Render
            Info={({history}) => (
              <Info
                onNext={(email, password) =>
                  history.push('Name', {email, password})
                }
              />
            )}
            Name={({history}) => (
              <Name
                onNext={(name, nickname) =>
                  history.push('Phone', {name, nickname})
                }
              />
            )}
            Phone={({history}) => (
              <PhoneFunnel
                onNext={phoneNumber => history.push('Extra', {phoneNumber})}
              />
            )}
            Extra={() => <Extra />}
          />
        </GenericForm>
      </section>
    </div>
  );
};

export default Join;
