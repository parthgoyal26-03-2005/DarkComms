import React, { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "./CountUp";

export default function LandingStats() {
    const [stats, setStats] = useState({ users: 0, rooms: 0, messages: 0 });

    useEffect(() => {
        // Replace with your backend stats endpoint if available
        axios.get("http://localhost:8080/api/auth/stats").then(res => {
            if (res.data.success) setStats(res.data.stats);
        }).catch(() => {
            // fallback demo stats
            setStats({ users: 42, rooms: 7, messages: 1337 });
        });
    }, []);

    return (
        <div className="flex justify-center sm:mx-auto mx-5
         gap-10 py-6 font-mono text-green-400 text-lg">
            <div className="flex flex-col items-center">
                <span className="sm:text-5xl text-3xl font-bold">

                    <CountUp
                        from={0}
                        to={stats.users}
                        separator=","
                        direction="up"
                        duration={1}
                        className="count-up-text"
                    />
                    </span>
                <span className="opacity-70">Active Users</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="sm:text-5xl text-3xl font-bold">

                    <CountUp
                        from={0}
                        to={stats.rooms}
                        separator=","
                        direction="up"
                        duration={1}
                        className="count-up-text"
                    />
                    </span>
                <span className="opacity-70">Rooms Created</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="sm:text-5xl text-3xl font-bold">

                    <CountUp
                        from={0}
                        to={stats.messages}
                        separator=","
                        direction="up"
                        duration={1}
                        className="count-up-text"
                    />
                    </span>
                <span className="opacity-70">Daily messages</span>
            </div>
        </div>
    );
}
