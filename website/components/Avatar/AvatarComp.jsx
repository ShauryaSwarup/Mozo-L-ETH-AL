import { UnstyledButton, Group, Avatar, Text, rem } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./UserButton.module.css";
export function AvatarComp({ wallet_id, researcher_name }) {
	return (
		<UnstyledButton className={classes.user}>
			<Group>
				<Avatar
					src="https://cdnl.iconscout.com/lottie/premium/thumb/metamask-5663350-4718999.gif"
					radius="xl"
				/>

				<div style={{ flex: 1 }}>
					<Text size="sm" fw={500} className="hover:underline">
						~ by {researcher_name}
					</Text>

					<Text c="dimmed" size="xs">
						{wallet_id}
					</Text>
				</div>

				{/* <IconChevronRight
					style={{ width: rem(14), height: rem(14) }}
					stroke={1.5}
				/> */}
			</Group>
		</UnstyledButton>
	);
}
