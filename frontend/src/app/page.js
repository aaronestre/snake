"use client";

import Link from "next/link";
import { useEffect } from "react";
import { io } from "socket.io-client";

export default function Home() {

    useEffect(() => {
        const socket = io("http://localhost:4000");
        socket.on("connect", () => {
            console.log("Connected to server");
            socket.emit("message", "Hello from client!");
        });

        socket.on("response", (data) => {
            console.log(data);
        });
        
        socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        return () => {
            socket.disconnect();
        };

    }, []);




	return (
		<div className="bg-(--primary-dark) w-full h-screen flex flex-col items-center justify-center">
			<h1 className="text-8xl font-bold text-white">Snake Battle</h1>
			<p className="text-2xl text-white">A multiplayer snake game</p>
			<Link
				href="/singleplayer"
				className="mt-12"
			>
				<button className="w-50 h-12 bg-red-500 hover:bg-red-900 transition-colors duration-200 rounded-lg text-(--primary-light) font-bold text-lg px-4 cursor-pointer">
					Play Singleplayer
				</button>
			</Link>
		</div>
	);
}
