'use client';

import type {z} from 'zod';
import {useRouter} from 'next/navigation';
import {startTransition} from 'react';
import {Header, ProgressBar, GenericForm} from '@/shared/ui';
import {signUpUser} from '@/widgets/join/api/server';
import type {JoinStep} from '@/widgets/join/config';
import {joinDefaultValues, joinSchema} from '@/widgets/join/config';
import {Info, Name, Extra, PhoneFunnel} from '@/widgets/join/ui';
import {zodResolver} from '@hookform/resolvers/zod';
import {useFunnel} from '@use-funnel/browser';
import {useToast} from '@wraffle/ui';

const Join = () => {
  const {toast} = useToast();
  const router = useRouter();

  const onSubmit = (data: z.infer<typeof joinSchema>) => {
    startTransition(async () => {
      try {
        const {confirmPassword, ...userJoinData} = data;
        void confirmPassword;
        await signUpUser(userJoinData);
        toast({
          title: '회원가입에 성공했습니다.',
          duration: 2000,
          variant: 'success',
          icon: 'check',
        });
        router.push('/login');
      } catch (error) {
        toast({
          title: (error as Error).message,
          duration: 2000,
          variant: 'warning',
          icon: 'close',
        });
      }
    });
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
          <Header.Left>
            <Header.BackButton onClick={() => funnel.history.back()} />
          </Header.Left>
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
