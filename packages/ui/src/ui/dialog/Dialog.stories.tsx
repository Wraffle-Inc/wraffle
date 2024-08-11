import type { Meta, StoryFn } from "@storybook/react";
import { Button } from "../button/Button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "./Dialog";
import { DialogProvider, useDialog } from "./use-dialog";

const meta: Meta<typeof Dialog> = {
	title: "Components/Dialog",
	decorators: [
		(Story) => (
			<>
				<DialogProvider>
					<Story />
				</DialogProvider>
			</>
		)
	],
	args: {
		open: false
	},
	argTypes: {
		open: {
			control: "boolean"
		}
	}
};

export default meta;

const Template: StoryFn = () => {
	return (
		<Dialog>
			<DialogTrigger className='w-full'>
				<Button>Open</Button>
			</DialogTrigger>
			<DialogContent withCloseButton={true}>
				<DialogHeader>
					<DialogTitle>리뷰쓰기</DialogTitle>
					<DialogDescription>
						000고객님! 구매하신 내역이 없어 후기를 작성하실 수 없어요!
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button>확인</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export const Appearance = Template.bind({});
Appearance.args = {};

export const TwoButtonTemplate: StoryFn = () => {
	return (
		<Dialog>
			<DialogTrigger className='w-full'>
				<Button>Open</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className='flex flex-col gap-1'>
					<DialogTitle className='text-center'>
						{"아직 응모기간이\n끝나지 않았어요!"}
					</DialogTitle>
					<DialogDescription>
						지금 당첨자를 발표하면 재추첨이 불가능해요
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className='gap-1'>
					<DialogClose asChild>
						<Button>추첨하기</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button variant='stroke'>돌아가기</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export const CustomHook = () => {
	const { openDialog } = useDialog();

	const onClick = () => {
		openDialog({
			title: "아직 응모기간이\n끝나지 않았어요!",
			description: "지금 당첨자를 발표하면 재추첨이 불가능해요",
			footer: ["추첨하기"],
			justify: "left"
		});
	};

	return <Button onClick={onClick}>Open</Button>;
};
