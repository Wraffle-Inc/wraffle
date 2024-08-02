import { useForm } from "react-hook-form";
import { z } from "zod";
import type { Meta, StoryFn } from "@storybook/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDefaults } from "@/shared/utils";
import { RHFInput, RHFInputProps, Form } from "@/ui/form";

const meta: Meta<typeof RHFInput> = {
  title: "Form/RHFInput",
  component: RHFInput,
  argTypes: {
    name: {
      control: "text",
      description: "Input의 name",
    },
    label: {
      control: "text",
      describe: "Label의 name",
    },
    type: {
      control: "text",
      description: "Input의 type",
    },
    placeholder: {
      control: "text",
      description: "Input의 placeholder",
    },
  },
};

export default meta;

const Template: StoryFn<RHFInputProps> = (args) => <RHFInput {...args} />;

export const Login = Template.bind({});
Login.decorators = [
  () => {
    const passwordSchema = z
      .string()
      .regex(/^(?=.*[A-Z])/, "One uppercase letter.")
      .regex(/^(?=.*[a-z])/, "One lowercase letter.")
      .regex(/^(?=.*\d)/, "One digit.")
      .regex(/^(?=.*[\W_])/, "One special character.")
      .min(8, { message: "At least 8 characters." })
      .default("");

    const emailSchema = z
      .string()
      .min(1, { message: "Email required." })
      .email({ message: "Invalid email." })
      .default("");

    const loginSchema = z.object({
      email: emailSchema,
      password: passwordSchema,
    });

    type LoginPayload = z.infer<typeof loginSchema>;
    const form = useForm<LoginPayload>({
      mode: "onChange",
      resolver: zodResolver(loginSchema),
      defaultValues: getDefaults(loginSchema),
    });
    return (
      <Form {...form}>
        <RHFInput
          name="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요."
        />
        <RHFInput
          name="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
      </Form>
    );
  },
];

export const Email = Template.bind({});
Email.decorators = [
  (Story, context) => {
    const emailSchema = z
      .string()
      .min(1, { message: "Email required." })
      .email({ message: "Invalid email." })
      .default("");

    const emailSchemaObj = z.object({
      email: emailSchema,
    });

    type EmailPayload = z.infer<typeof emailSchemaObj>;
    const form = useForm<EmailPayload>({
      mode: "onChange",
      resolver: zodResolver(emailSchemaObj),
      defaultValues: getDefaults(emailSchemaObj),
    });
    return (
      <Form {...form}>
        <Story args={{ ...context.args }} />
      </Form>
    );
  },
];
Email.args = {
  name: "email",
  label: "이메일",
  type: "이메일을 입력해주세요.",
  placeholder: "Email",
};

export const Password = Template.bind({});
Password.decorators = [
  (Story, context) => {
    const passwordSchema = z
      .string()
      .regex(/^(?=.*[A-Z])/, "One uppercase letter.")
      .regex(/^(?=.*[a-z])/, "One lowercase letter.")
      .regex(/^(?=.*\d)/, "One digit.")
      .regex(/^(?=.*[\W_])/, "One special character.")
      .min(8, { message: "At least 8 characters." })
      .default("");
    const passwordSchemaObj = z.object({
      password: passwordSchema,
    });

    type PasswordPayload = z.infer<typeof passwordSchemaObj>;
    const form = useForm<PasswordPayload>({
      mode: "onChange",
      resolver: zodResolver(passwordSchemaObj),
      defaultValues: getDefaults(passwordSchemaObj),
    });
    return (
      <Form {...form}>
        <Story args={{ ...context.args }} />
      </Form>
    );
  },
];
Password.args = {
  name: "password",
  label: "비밀번호",
  type: "password",
  placeholder: "비밀번호를 입력해주세요.",
};
