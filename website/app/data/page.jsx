"use client";
import InputFile from "@/components/DataPage/InputFile";
import RichTextEditorComp from "@/components/DataPage/RichTextEditor";
import {
	Container,
	Divider,
	Fieldset,
	FileInput,
	Text,
	TextInput,
	Textarea,
	Title,
	rem,
} from "@mantine/core";
import React, { useState } from "react";
import classes from "./styles.module.css";
import { Button } from "@mantine/core";
import { IconFileCv } from "@tabler/icons-react";

function page() {
	const [selectedComponent, setSelectedComponent] = useState(null);
	console.log(selectedComponent);
	const icon = (
		<IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
	);
	return (
		<div className="">
			<div className={classes.inner}>
				<div className="m-4">
					<Title className={classes.title}>
						Create your proposal{" "}
						{/* <Text component="span" inherit className={classes.highlight}></Text> */}
					</Title>
					<Container size={640}>
						<Text size="lg" className={classes.description}>
							Type down or upload the file (make it more descriptive)
						</Text>
					</Container>
				</div>
				<div className="m-4">
					<Fieldset legend="Proposal information" variant="filled" radius="lg">
						<TextInput
							size="md"
							label="Title"
							withAsterisk
							description="Choose a relevant title"
							placeholder="Your Title"
						/>
						<Textarea
							resize="vertical"
							className="my-2"
							label="Description"
							size="md"
							withAsterisk
							description="Give a crisp description of your proposal"
							placeholder="Your description"
						/>
					</Fieldset>
				</div>
				<div className="flex justify-center items-center">
					<FileInput
						size="md"
						leftSection={icon}
						label="Attach your Proposal"
						placeholder="Your Proposal"
						leftSectionPointerEvents="none"
					/>
				</div>
				<div className="flex justify-center items-center">
					<Divider
						size="md"
						label="Or draft a proposal"
						labelPosition="center"
						my="xl"
						className="min-w-96"
					/>
				</div>
				<div>
					<Container size={640}>
						<Text size="sm" className={classes.title1}>
							Draft your proposal
						</Text>
					</Container>
					<RichTextEditorComp
						onSelect={() => setSelectedComponent("RichTextEditor")}
					/>
					<div className="">
						<div className=" min-w-96"></div>
					</div>
					<div className="flex justify-center mt-4">
						<Button
							onClick={() => console.log("Submit")}
							variant="filled"
							color="gray"
							size="lg"
							radius="md"
						>
							Submit
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default page;
