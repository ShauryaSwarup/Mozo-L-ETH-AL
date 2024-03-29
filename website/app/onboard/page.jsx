"use client";
import {
	Paper,
	TextInput,
	PasswordInput,
	Checkbox,
	Button,
	Title,
	Text,
	Anchor,
	Select,
} from "@mantine/core";
import classes from "./AuthenticationImage.module.css";
function page() {
	return (
		<div className={classes.wrapper}>
			<Paper className={classes.form} radius={0} p={30}>
				<Title order={2} className={classes.title} ta="center" mt="md" mb={30}>
					Onboard yourself as a Researcher
				</Title>

				<TextInput label="Your name" placeholder="name" size="md" />

				<TextInput
					label="Email address"
					placeholder="hello@gmail.com"
					size="md"
				/>
				<TextInput
					label="Affiliated university"
					placeholder="university"
					size="md"
				/>
				<Select
					label="Your occupation"
					size="md"
					placeholder="Pick occupation"
					data={["Student", "Post Grad", "Professor", "Scientist"]}
				/>
				{/* <PasswordInput
					label="Password"
					placeholder="Your password"
					mt="md"
					size="md"
				/> */}
				{/* <Checkbox label="Keep me logged in" mt="xl" size="md" /> */}
				<Button fullWidth mt="xl" size="md">
					Onboard
				</Button>

				<Text ta="center" mt="md">
					{/* Don&apos;t have an account?{" "}
					<Anchor href="#" fw={700} onClick={(event) => event.preventDefault()}>
						Register
					</Anchor> */}
				</Text>
			</Paper>
		</div>
	);
}
export default page;
