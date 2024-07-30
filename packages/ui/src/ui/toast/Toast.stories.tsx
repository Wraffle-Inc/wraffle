import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { type Toast, useToast } from "./use-toast";
import { Toaster } from "./Toaster";
import { Button } from "../button/Button";
import { useEffect } from "react";

const meta: Meta<Toast> = {
	title: "Components/Toast",
	decorators: [
		(Story) => (
			<>
				<Toaster />
				<Story />
			</>
		)
	],
	args: {
		title: ""
	},
	argTypes: {
		title: {
			control: "text"
		},
		variant: {
			control: "select",
			options: ["success", "info", "warning"]
		},
		duration: {
			control: "number"
		},
		icon: {
			control: "select",
			options: ["check", "close"]
		}
	}
};

export default meta;

const Template: StoryFn = (args) => {
	const { toast } = useToast();
	const showToast = () => {
		toast({
			title: args.title,
			duration: args.duration,
			variant: args.variant,
			icon: args.icon
		});
	};

	useEffect(() => {
		showToast();
	}, [args]);

	return (
		<div>
			<Button onClick={showToast}>Show Toast</Button>
		</div>
	);
};

export const Appearance = Template.bind({});
Appearance.args = {
	title: "Toast Title",
	variant: "success",
	duration: 2000,
	icon: "check"
};
