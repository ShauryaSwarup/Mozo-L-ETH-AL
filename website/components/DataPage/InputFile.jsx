import { FileInput, rem } from "@mantine/core";
import { IconFileCv } from "@tabler/icons-react";

function InputFile({ onSelect }) {
	const icon = (
		<IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
	);

	const handleFileSelect = (event) => {
		console.log("File input changed:", event);
		// const files = event.target.files;
		// if (files && files.length > 0) {
		// 	onSelect("InputFile", files); // Call onSelect with file data
		// }
	};

	return (
		<>
			<FileInput
				leftSection={icon}
				label="Attach your Proposal"
				placeholder="Your Proposal"
				leftSectionPointerEvents="none"
				onChange={handleFileSelect}
			/>
		</>
	);
}

export default InputFile;
