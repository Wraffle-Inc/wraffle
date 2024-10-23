import {Form} from '../RHF/core/Form';
import type {SubmitHandler, UseFormProps, FieldValues} from 'react-hook-form';
import {useForm} from 'react-hook-form';

interface GenericFormInterface<TFormData extends FieldValues> {
  onSubmit: SubmitHandler<TFormData>;
  formOptions: UseFormProps<TFormData>;
  children: React.ReactNode;
}

const GenericForm = <TFormData extends FieldValues>({
  onSubmit,
  formOptions,
  children,
}: GenericFormInterface<TFormData>) => {
  const methods = useForm<TFormData>(formOptions);

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </Form>
  );
};

export default GenericForm;
