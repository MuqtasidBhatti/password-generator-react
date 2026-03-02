import React, { useState } from 'react'

const PasswordGenerator = () => {
    const [selectedOption, setSelectedOption] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [copied, setCopied] = useState(false)

    const handleGenerate = () => {
        let option = selectedOption;
        let lowerCase;
        let upperCase;
        let useNumber;
        let length;

        if (!option) {
            setError("Please select any option first")
            return;
        }

        if (option === "random") {
            const options = ["easy", "medium", "hard"]
            option = options[Math.floor(Math.random() * options.length)]
        }

        if (option === "easy") {
            length = 5;
            useNumber = false
            lowerCase = true;
            upperCase = true;
        } else if (option === "medium") {
            length = 7;
            useNumber = true
            upperCase = true;
            lowerCase = true;
        } else if (option === "hard") {
            length = 12;
            lowerCase = true;
            upperCase = true;
            useNumber = true
        }

        let characters = ""
        if (upperCase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        if (lowerCase) characters += "abcdefghijklmnopqrstuvwxyz"
        if (useNumber) characters += "0123456789"

        if (!characters) {
            setError("No characters selected");
            return;
        }

        let newPassword = ""
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length)
            newPassword += characters[randomIndex]
        }
        setError("")
        setPassword(newPassword)
    }

    const handleCopy = () => {
        if (!password) return;

        navigator.clipboard.writeText(password)
            .then(() => {
                setCopied(true)
                setTimeout(() => setCopied(false), 1500)
            })
            .catch(() => {
                setError("Failed to copy password")
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-emerald-900 p-4">
            <div className="w-full max-w-md bg-black/70 border border-emerald-500/30 rounded-2xl p-8 shadow-[0_0_30px_rgba(16,185,129,0.25)] text-emerald-400">

                <h2 className="text-3xl font-bold text-center mb-6 tracking-widest">
                    Password Generator
                </h2>

                <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-full mb-5 bg-black border border-emerald-500/40 rounded-lg px-4 py-2 text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                    <option value="">Select any option</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="random">Random</option>
                </select>

                <div className="relative bg-black border border-dashed border-emerald-500/50 rounded-lg p-4 mb-4 text-center font-mono text-lg tracking-wider break-all min-h-14">
                    {password || "Your password will appear here"}

                    {password && (
                        <button
                            onClick={handleCopy}
                            className="absolute top-2 right-2 text-xs bg-emerald-500 text-black px-2 py-1 rounded hover:bg-emerald-600 transition"
                        >
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    )}
                </div>

                {error && (
                    <p className="text-red-500 text-sm mb-3 text-center">
                        {error}
                    </p>
                )}

                <button
                    onClick={handleGenerate}
                    className="w-full mt-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-lg transition duration-300 shadow-[0_0_15px_rgba(16,185,129,0.5)] cursor-pointer"
                >
                    Generate Password
                </button>

            </div>
        </div>
    )
}

export default PasswordGenerator
