'use client';

import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import type {SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import {
  editUserSchema,
  type EditUserPayload,
} from '@/entities/auth/user/schema';
import {useGetUserInfo, usePutUserInfo} from '@/features/my-profile/api/user';
import {Header, RHFInput, Form} from '@/shared/ui';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  Button,
  Input,
  InputField,
  Select,
  Toaster,
  Typography,
  useToast,
} from '@wraffle/ui';

const PHONE_AREA_CODES = [
  {value: '010', name: '010'},
  {value: '02', name: '02'},
  {value: '031', name: '031'},
  {value: '032', name: '032'},
];

const EditProfilePage = () => {
  const router = useRouter();
  const {toast} = useToast();
  const {data: userInfoResponse} = useGetUserInfo();

  const nickname = userInfoResponse?.nickname || '';
  const email = userInfoResponse?.email || '';
  const phoneNumber = userInfoResponse?.phoneNumber || '';

  const [first, setFirst] = useState('');
  const [middle, setMiddle] = useState('');
  const [last, setLast] = useState('');

  useEffect(() => {
    if (phoneNumber) {
      setFirst(phoneNumber.slice(0, 3));
      setMiddle(phoneNumber.slice(3, 7));
      setLast(phoneNumber.slice(7, 11));
    }
  }, [phoneNumber]);

  const form = useForm<EditUserPayload>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: '',
      nickname: nickname,
      email: email,
    },
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
    maxLength: number,
  ) => {
    const value = event.target.value;
    if (value.length > maxLength) {
      event.target.value = value.slice(0, maxLength);
    }
    setState(event.target.value);
  };
  const requestEditUserInfo = usePutUserInfo();

  const onSubmit: SubmitHandler<EditUserPayload> = formValues => {
    requestEditUserInfo(
      {
        ...formValues,
        phoneNumber: `${first}${middle}${last}`,
      },
      {
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
      },
    );
  };

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
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-6 px-5'>
          <RHFInput
            name='name'
            label='이름*'
            placeholder='이름을 입력해주세요.'
          />
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

          <InputField>
            <InputField.Label htmlFor='phoneNumber'>
              휴대폰 번호*
            </InputField.Label>
            <Select
              placeholder='선택'
              items={PHONE_AREA_CODES}
              defaultValue={first}
              className='' // TODO: Select 컴포넌트에 className 꼭 필수로 넣어야 하는지 확인
              onValueChange={value => setFirst(value)}
            />
            <InputField.Input
              id='middle'
              placeholder=''
              type='number'
              value={middle}
              maxLength={4}
              onChange={e => handleInputChange(e, setMiddle, 4)}
            />
            <InputField.Input
              id='last'
              placeholder=''
              type='number'
              value={last}
              maxLength={4}
              onChange={e => handleInputChange(e, setLast, 4)}
            />
          </InputField>
          <Button variant='stroke'>인증번호 재전송</Button>

          <div className='flex py-3'>
            <Input
              placeholder='인증번호를 입력해주세요.'
              className='w-2/3 flex-shrink-0'
            />
            <Button className='ml-4'>확인</Button>
          </div>

          <div className='fixed bottom-16 left-0 right-0 mb-4 px-5'>
            <Button type='submit'>수정하기</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditProfilePage;
