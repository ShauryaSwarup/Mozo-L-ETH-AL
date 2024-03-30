import React from "react";

function HashAndError({
	failed,
	processed,
	processing,
	hash,
	isConfirming,
	isConfirmed,
	error,
}) {
	return (
		<div className="rounded p-4">
			<div>
				{hash && (
					<div className="truncate bg-gray-700 font-bold text-white border text-center rounded-xl p-2">
						Transaction Hash: {hash}
					</div>
				)}
				{processing && (
					<div className="truncate bg-gray-700 font-bold text-white text-info border text-center rounded-xl p-2">
						Storing in Polybase
						<span className="loading loading-dots mx-4 text-white loading-m text-info"></span>
					</div>
				)}
				{failed && (
					<div className="text-alert bg-gray-700 font-bold text-white border text-center rounded-xl p-2">
						Failed storing in Polybase
					</div>
				)}
				{processed && (
					<div className="truncate bg-gray-700 font-bold text-white text-success border text-center rounded-xl p-2">
						Stored in Polybase
					</div>
				)}
				{isConfirming && (
					<div className="text-info bg-gray-700 font-bold text-white text-center border rounded-xl p-2">
						Waiting for confirmation
						<span className="loading loading-dots mx-4 text-whiteloading-m text-info"></span>
					</div>
				)}
				{isConfirmed && (
					<div className="text-success font-bold text-center border rounded-xl p-2">
						Transaction confirmed
					</div>
				)}
				{error && (
					<div className="text-alert bg-gray-700 text-white font-bold text-center border rounded-xl p-2">
						{error.shortMessage || error.message}
					</div>
				)}
			</div>
		</div>
	);
}

export default HashAndError;
