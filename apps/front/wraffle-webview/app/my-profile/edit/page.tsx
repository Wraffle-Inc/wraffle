'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';
import type {SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import {
  editUserSchema,
  type EditUserPayload,
} from '@/entities/auth/user/schema';
import {useGetUserInfo, usePatchUserInfo} from '@/features/my-profile/api/user';
import PhoneNumberVerification from '@/features/my-profile/ui/PhoneNumberVerification';
import {Header, RHFInput, Form} from '@/shared/ui';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Toaster, Typography, useToast} from '@wraffle/ui';

const EditProfilePage = () => {
  const router = useRouter();
  const {toast} = useToast();

  const requestEditUserInfo = usePatchUserInfo();
  const {data: userInfoResponse} = useGetUserInfo();

  const defaultNickname = userInfoResponse?.nickname || '';
  const defaultEmail = userInfoResponse?.email || '';
  const defaultPhoneNumber = userInfoResponse?.phoneNumber || '';

  const form = useForm<EditUserPayload>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      nickname: defaultNickname,
      email: defaultEmail,
      phoneNumber: defaultPhoneNumber,
    },
  });

  const {watch, handleSubmit} = form;

  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const [nickname, email, phoneNumber] = watch([
    'nickname',
    'email',
    'phoneNumber',
  ]);

  const onSubmit: SubmitHandler<EditUserPayload> = formValues => {
    requestEditUserInfo(formValues, {
      onSuccess: () => {
        toast({
          title: '내정보 수정이 완료되었습니다.',
          duration: 1000,
          variant: 'success',
          icon: 'check',
        });

        setTimeout(() => {
          router.push('/my-profile');
        }, 1000);
      },
      onError: (error: Error) => {
        toast({
          title: `${error.message}`,
          duration: 2000,
          variant: 'warning',
          icon: 'cross',
        });
      },
    });
  };

  const isPhoneNumberChanged = phoneNumber !== defaultPhoneNumber;

  const isFormChanged =
    nickname !== defaultNickname ||
    email !== defaultEmail ||
    isPhoneNumberChanged;

  return (
    <div>
      <Toaster />

      <Header>
        <Header.Left>
          <Header.BackButton />
        </Header.Left>
        <Header.Middle>
          <Typography size='h4' color='zinc700'>
            내정보 수정
          </Typography>
        </Header.Middle>
      </Header>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-6 px-5'>
          <RHFInput
            name='nickname'
            label='닉네임*'
            placeholder='닉네임을 입력해주세요.'
          />
          <RHFInput
            name='email'
            label='이메일*'
            placeholder='이메일을 입력해주세요.'
          />

          <PhoneNumberVerification
            defaultPhoneNumber={defaultPhoneNumber}
            setIsCodeVerified={setIsCodeVerified}
          />

          <div className='fixed bottom-16 left-0 right-0 mb-4 px-5'>
            <Button
              type='submit'
              disabled={
                !isFormChanged || (isPhoneNumberChanged && !isCodeVerified)
              }
            >
              수정하기
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditProfilePage;
