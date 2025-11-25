<div className="relative hidden md:block mt-8 md:mt-0">
    <div className="relative">
        {/* Floating code window */}
        <div className="bg-gray-900 rounded-2xl p-5 md:p-6 shadow-2xl border border-gray-800 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs text-gray-500 font-mono">portfolio.tsx</span>
            </div>
            <div className="font-mono text-sm space-y-2">
                <div><span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = {"{"}</div>
                <div className="pl-4"><span className="text-green-400">name</span>: <span className="text-yellow-300">"Ragavendiran G"</span>,</div>
                <div className="pl-4"><span className="text-green-400">role</span>: <span className="text-yellow-300">"Full-Stack Leader"</span>,</div>
                <div className="pl-4"><span className="text-green-400">skills</span>: [<span className="text-yellow-300">"MERN"</span>, <span className="text-yellow-300">"MEAN"</span>, <span className="text-yellow-300">"Cloud"</span>],</div>
                <div className="pl-4"><span className="text-green-400">impact</span>: <span className="text-yellow-300">"$3.8M+"</span>,</div>
                <div className="pl-4"><span className="text-green-400">users</span>: <span className="text-yellow-300">"500K+"</span></div>
                <div>{"}"};</div>
            </div>
        </div>

        {/* Floating badges */}
        <div className="absolute -top-6 -right-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-xl animate-bounce">
            🏆 4x Winner
        </div>
        <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-xl animate-pulse">
            📦 NPM Author
        </div>
    </div>
</div>