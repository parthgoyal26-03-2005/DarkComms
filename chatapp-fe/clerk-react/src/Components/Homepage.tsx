import LandingFlow from "./LandingFlow";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextType from "./TextType";
import GlitchText from "./GlitchText";
import DecryptedText from "./DecryptedText";
import CircularText from "./CircularText";
import LandingStats from "./LandingStats";
import LandingHowItWorks from "./LandingHowItWorks";
import LandingFeedback from "./LandingFeedback";


export const Homepage = () => {

    const navigate = useNavigate();
    const { isSignedIn, user } = useUser();

    // const [userdata, setuserdata] = useState<any>({});
    console.log(isSignedIn);
    console.log(user);
    useEffect(() => {
        if (isSignedIn && user) {
            // setuserdata(user);
            senduserdata(user);
            localStorage.setItem("user", user.id);
            localStorage.setItem("firstname", user.firstName as any);
        }
        else {
            localStorage.clear();
        }
    }, [isSignedIn, user])

    const senduserdata = async (user: any) => {

        try {
            const data = {
                clerkId: user.id,
                email: user.primaryEmailAddress?.emailAddress,
                name: user.fullName,
            }

            const response = await axios.post("http://localhost:8080/api/auth/signin", data);
            if (response.data.success) {
                navigate("/chat-room");
            }
        } catch (error) {
            console.log(error);

        }

    }

    return (
        <div className="relative max-h-screen text-white overflow-y-scroll">
            {/* 🌌 Star Background */}
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>

            {/* Navbar */}
            <nav className="flex justify-between items-center mt-[-5px] px-8 py-5 border-b-1 bg-[#0d210cb1] sticky top-0 z-40 ">
                <h1 className="text-2xl font-mono tracking-widest text-green-500">
                    <CircularText
                        text="DarkComms*DarkComms*"
                        onHover="speedUp"
                        spinDuration={20}
                        className="size-1"
                    />
                </h1>
                <div className="flex gap-3 items-center">
                    <div className="md:block  hidden">
                    <button onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })} className="px-3 py-1 rounded font-mono text-green-400 hover:bg-green-900 hover:text-white transition cursor-pointer">Stats</button>
                    <button onClick={() => document.getElementById('flow')?.scrollIntoView({ behavior: 'smooth' })} className="px-3 py-1 rounded font-mono text-green-400 hover:bg-green-900 hover:text-white transition cursor-pointer">How to Use</button>
                    <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="px-3 py-1 rounded font-mono text-green-400 hover:bg-green-900 hover:text-white transition cursor-pointer">About</button>
                    <button onClick={() => document.getElementById('howitworks')?.scrollIntoView({ behavior: 'smooth' })} className="px-3 py-1 rounded font-mono text-green-400 hover:bg-green-900 hover:text-white transition cursor-pointer">How It Works</button>
                    <button onClick={() => document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' })} className="px-3 py-1 rounded font-mono text-green-400 hover:bg-green-900 hover:text-white transition cursor-pointer">Feedback</button>
                    </div>
                    <SignedOut>
                        <div className="px-4 py-2 border cursor-pointer border-green-500 rounded-lg hover:bg-green-500 font-mono hover:text-black transition ml-2">
                            <SignInButton />
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex flex-col justify-center items-center min-h-[60vh] text-center">
                <h2 className="text-5xl md:text-7xl font-mono tracking-widest text-green-500 mb-6">
                    <DecryptedText
                        text="Welcome To DarkComms"
                        characters="ABCD1234!?"
                        speed={100}
                        sequential={true}
                        animateOn="both"
                        revealDirection="start"
                    />
                </h2>
                <p className="text-lg md:text-2xl text-gray-300 max-w-2xl">
                    <TextType
                        text={["Welcome to DarkComms!", "Secure. Encrypted. Beyond the stars.", "Where Conversations Stay in the Dark.", "Step into the command line of the future and connect with your crew."]}
                        textColors={["#00c950"]}
                        typingSpeed={95}
                        pauseDuration={2000}
                        showCursor={true}
                        cursorCharacter="_"
                        className="text-green-500"
                    />
                </p>
            </main>

            <div id="stats">
                <LandingStats />
            </div>

            <div id="flow">
                <LandingFlow />
            </div>

            {/* About DarkComms */}
            <div id="about">
                <div className="max-w-5xl sm:mx-auto mx-3  mt-8 bg-[#101c13] bg-opacity-80 rounded-xl p-6 shadow-lg border border-green-900">
                    <h3 className="text-green-400 font-mono text-xl mb-4">What is DarkComms?</h3>
                    <div className="text-green-200 font-mono text-left space-y-4 leading-relaxed">
                        <p>
                            <span className="text-green-400 font-bold">DarkComms</span> is not just another chat app—it's a secure, encrypted, and futuristic communication platform designed for privacy and collaboration. Inspired by the look and feel of classic terminals and hacker culture, DarkComms brings a unique, immersive experience to your conversations.
                        </p>
                        <p>
                            Every message you send is protected with end-to-end encryption, ensuring that only you and your intended recipients can ever read your chats. Whether you're collaborating with a team, chatting with friends, or building a private community, DarkComms gives you the tools to communicate freely and securely.
                        </p>
                        <p>
                            The interface is designed to be both nostalgic and modern, with animated text, glitch effects, and a starfield background that transports you to a digital universe. You can create or join rooms in seconds, invite others with a simple room ID, and enjoy real-time chat with zero hassle.
                        </p>
                        <p>
                            DarkComms is open to everyone—no technical expertise required. Just sign in, create or join a room, and start chatting. Your privacy is our priority, and your experience is our passion. Welcome to the future of secure communication.
                        </p>
                    </div>
                </div>
            </div>

            <div id="howitworks">
                <LandingHowItWorks />
            </div>

            <div id="feedback">
                <LandingFeedback />
            </div>
        </div>
    );
}
