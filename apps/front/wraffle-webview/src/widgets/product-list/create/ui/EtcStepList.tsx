import {useFormContext} from 'react-hook-form';
import type {CreateEventPayload} from '@/entities/create/model/createEventSchema';
import {FormControl, FormField, FormItem, FormLabel} from '@/shared/ui';
import {etcLimit} from '@/shared/util';
import {Button, Typography} from '@wraffle/ui';

export const EtcStep = ({onNext}: {onNext: (etc: string) => void}) => {
  const {getValues, control} = useFormContext<CreateEventPayload>();

  const etc = getValues('etc');

  return (
    <div className='flex h-full flex-col px-5 pb-20'>
      <div className='mb-5'>
        <Typography className='text-2xl font-bold'>
          마지막으로 유의사항 한마디.
        </Typography>
        <Typography className='text-sm font-medium text-[#c1c2c3]'>
          유의사항은 400자까지 작성이 가능해요!
        </Typography>
      </div>

      <FormField
        control={control}
        name='etc'
        render={({field}) => (
          <FormItem>
            <FormLabel
              htmlFor='etc'
              className='text-xl font-bold text-[#18181B]'
            >
              유의사항*
              <span className='text-[0.625rem] font-medium'>최대 400자</span>
            </FormLabel>
            <FormControl>
              <textarea
                id='etc'
                className='w-full resize-none rounded-lg border border-solid border-[#F5F5F7] bg-[#FAFAFB] p-3 text-sm font-medium placeholder:text-[#ADB5BD]'
                rows={7}
                maxLength={etcLimit}
                placeholder='유의사항을 작성해주세요'
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <div className='fixed inset-x-0 bottom-0 bg-white px-4'>
        <Button
          type='submit'
          onClick={() => onNext(etc)}
          disabled={!etc}
          className='mb-5 mt-3 disabled:text-[#A1A1AA]'
        >
          생성 요청하기
        </Button>
      </div>
    </div>
  );
};
