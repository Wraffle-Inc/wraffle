import {useFormContext} from 'react-hook-form';
import {terms} from '@/entities/auth/join';
import type {JoinPayload} from '@/entities/auth/join/schema';
import {FormControl, FormField, FormItem} from '@/shared/ui';
import {Button, ErrorMessage, Icon, Typography} from '@wraffle/ui';
import CheckBox from '@wraffle/ui/src/ui/checkbox/CheckBox';

const Extra = () => {
  const {control, setValue, watch, trigger, clearErrors} =
    useFormContext<JoinPayload>();
  const watchAllFields = watch();

  const allChecked = terms.every(term => watchAllFields[term.id]);

  const isAgreed = watch('isAgreed');
  const isPrivacyAgreed = watch('isPrivacyAgreed');
  const isThirdAgreed = watch('isThirdAgreed');

  const allAgreed = isAgreed && isPrivacyAgreed && isThirdAgreed;

  const handleAllCheckChange = (isChecked: boolean) => {
    terms.forEach(term => {
      setValue(term.id, isChecked);
      if (!isChecked) {
        trigger();
      } else {
        clearErrors(term.id);
      }
    });
  };

  return (
    <div>
      <div className='mb-5'>
        <Typography className='text-2xl font-bold'>약관 동의</Typography>
        <Typography className='text-sm font-medium text-[#ADB5BD]'>
          약관 동의
        </Typography>
      </div>

      <FormField
        name='isAllAgreed'
        render={() => (
          <FormItem className='flex flex-col gap-6'>
            <CheckBox
              className='text-[15px] font-bold'
              id='allAgreed'
              label='전체 동의'
              checked={allChecked}
              onCheckedChange={checked => handleAllCheckChange(checked)}
            />
            {terms.map(term => (
              <FormField
                key={term.id}
                control={control}
                name={term.id}
                render={({field, fieldState}) => {
                  return (
                    <FormItem
                      key={term.id}
                      className='flex h-6 flex-col items-start'
                    >
                      <span className='flex w-full justify-between'>
                        <FormControl>
                          <CheckBox
                            className='text-[15px] font-medium text-[#333D4B]'
                            id={term.id}
                            label={term.label}
                            checked={field.value || false}
                            onCheckedChange={checked => {
                              field.onChange(checked);
                              if (checked) {
                                clearErrors(term.id);
                              }
                            }}
                          />
                        </FormControl>
                        <Icon name='arrow-right' color='#ADB5BD' />
                      </span>
                      {fieldState.error && (
                        <ErrorMessage isError className='ml-6'>
                          {fieldState.error.message}
                        </ErrorMessage>
                      )}
                    </FormItem>
                  );
                }}
              />
            ))}
          </FormItem>
        )}
      />

      <div className='fixed inset-x-0 bottom-0 bg-white p-5'>
        <Button type='submit' disabled={!allAgreed}>
          회원가입
        </Button>
      </div>
    </div>
  );
};

export {Extra};
