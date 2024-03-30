import Image from "next/image";
import Link from "next/link";

function Hero() {
	return (
		<div className="flex flex-col mr-8  lg:flex-col gap-24">
			<div className="border border-base-400 bg-white shadow-xl rounded-2xl p-16 flex flex-col w-auto min-w-96 max-lg:text-center text-left max-lg:pb-10">
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 justify-center">
					DOS DAO
				</h1>
				<h2 className="text-2xl sm:text-2xl md:text-5xl font-semibold text-gray-500 mb-6">
					A decentralized automated open science platform
				</h2>
				<h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 justify-center">
					Your Proposals. Community driven funding.
				</h3>
				<Link href="/onboard">
					<button className="p-3 bg-gray-500 text-white text-primary-content hover:bg-gray-600 transition-all duration-100 rounded-xl">
						Onboard as Researcher
					</button>
				</Link>
			</div>
		</div>
	);
}

export default Hero;
