import type { Meta, StoryObj } from "@storybook/react";
import IconWithLabel from "./IconWithLabel";
import { SVGIcon } from "@wds/ui/icon/SVGIcon";

const meta: Meta<typeof IconWithLabel> = {
	component: IconWithLabel
};

export default meta;
type Story = StoryObj<typeof IconWithLabel>;

export const MenuIconWithLabel: Story = {
	args: {
		Icon: <SVGIcon id='menu' width={20} height={20} />,
		label: "Search"
	}
};
