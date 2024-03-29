"use client";
import { useState } from "react";
import { Paper, TextInput, Button, Title, Text, Select } from "@mantine/core";
import classes from "./AuthenticationImage.module.css";

function Page() {
	// State variables to store input values
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [university, setUniversity] = useState("");
	const [occupation, setOccupation] = useState("");

	// Function to handle form submission
	const handleSubmit = () => {
		// Log input values
		console.log("Name:", name);
		console.log("Email:", email);
		console.log("Affiliated University:", university);
		console.log("Occupation:", occupation);
	};

	return (
		<div className={classes.wrapper}>
			<Paper className={classes.form} radius={0} p={30}>
				<Title order={2} className={classes.title} ta="center" mt="md" mb={30}>
					Onboard yourself as a Researcher
				</Title>

				<TextInput
					label="Your name"
					placeholder="name"
					size="md"
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>

				<TextInput
					label="Email address"
					placeholder="hello@gmail.com"
					size="md"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>

				<TextInput
					label="Affiliated university"
					placeholder="university"
					size="md"
					value={university}
					onChange={(event) => setUniversity(event.target.value)}
				/>

				<Select
					label="Your occupation"
					size="md"
					placeholder="Pick occupation"
					data={["Student", "Post Grad", "Professor", "Scientist"]}
					value={occupation}
					onChange={(value) => setOccupation(value)}
				/>

				<Button fullWidth mt="xl" size="md" onClick={handleSubmit}>
					Onboard
				</Button>

				<Text ta="center" mt="md"></Text>
			</Paper>
		</div>
	);
}

export default Page;
