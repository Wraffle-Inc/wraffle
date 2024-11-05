'use client';

import {useRouter} from 'next/navigation';
import type {SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import {
  editUserSchema,
  type EditUserPayload,
} from '@/entities/auth/user/schema';
import {Header, RHFInput, Form} from '@/shared/ui';
import {getDefaults} from '@/shared/util';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Input, InputField, Select} from '@wraffle/ui';

const PHONE_AREA_CODES = [
  {value: '010', name: '010'},
  {value: '02', name: '02'},
  {value: '031', name: '031'},
  {value: '032', name: '032'},
];

const EditProfilePage = () => {
  const router = useRouter();
  const form = useForm<EditUserPayload>({
    resolver: zodResolver(editUserSchema),
    defaultValues: getDefaults(editUserSchema),
  });
  const onSubmit: SubmitHandler<EditUserPayload> = formValues => {
    console.log('formValues', formValues);
  };

  return (
    <div>
      <Header>
        <Header.Left>
          <Header.BackButton onClick={() => router.back()} />
        </Header.Left>
        <Header.Middle>내정보 수정</Header.Middle>
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
            <Select placeholder='선택' items={PHONE_AREA_CODES} />
            <InputField.Input
              id='middle'
              placeholder=''
              type='number'
              maxLength={4}
            />
            <InputField.Input
              id='last'
              placeholder=''
              type='number'
              maxLength={4}
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
