'use client';

import {useState} from 'react';
import type {SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import {
  editUserSchema,
  type EditUserPayload,
} from '@/entities/auth/user/schema';
import {Header, RHFInput, Form} from '@/shared/ui';
import {getDefaults} from '@/shared/util';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Input, InputField, Select, Typography} from '@wraffle/ui';

const PHONE_AREA_CODES = [
  {value: '010', name: '010'},
  {value: '02', name: '02'},
  {value: '031', name: '031'},
  {value: '032', name: '032'},
];

const EditProfilePage = () => {
  const [first, setFirst] = useState(''); // TODO: 추후 수정 필요
  const form = useForm<EditUserPayload>({
    resolver: zodResolver(editUserSchema),
    defaultValues: getDefaults(editUserSchema),
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length > 4) {
      event.target.value = value.slice(0, 4);
    }
  };

  const onSubmit: SubmitHandler<EditUserPayload> = formValues => {
    console.log('formValues', formValues);
  };

  return (
    <div>
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
              className='' // TODO: Select 컴포넌트에 className 꼭 필수로 넣어야 하는지 확인
              onValueChange={value => setFirst(value)}
            />
            <InputField.Input
              id='middle'
              placeholder=''
              type='number'
              maxLength={4}
              onChange={handleInputChange}
            />
            <InputField.Input
              id='last'
              placeholder=''
              type='number'
              maxLength={4}
              onChange={handleInputChange}
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
