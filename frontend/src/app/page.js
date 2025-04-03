"use client";

import Link from "next/link";

export default function Home() {

	return (
		<div className="bg-(--primary-dark) w-full h-screen flex flex-col items-center justify-center">
			<h1 className="text-8xl font-bold text-white">Snake Battle</h1>
			<p className="text-2xl text-white">A multiplayer snake game</p>
			<Link
				href="/singleplayer"
				className="mt-12"
			>
				<button className="w-50 h-12 bg-red-500 hover:bg-red-900 transition-colors duration-200 rounded-lg text-(--primary-light) font-bold text-lg px-4 cursor-pointer">
					Singleplayer
				</button>
			</Link>
            <Link
				href="/multiplayer"
				className="mt-12"
			>
				<button className="w-50 h-12 bg-red-500 hover:bg-red-900 transition-colors duration-200 rounded-lg text-(--primary-light) font-bold text-lg px-4 cursor-pointer">
					Multiplayer
				</button>
			</Link>
		</div>
	);
}
