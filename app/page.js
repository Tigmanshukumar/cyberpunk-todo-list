"use client"
import React, { useState } from 'react';

const page = () => {
    const [title, settitle] = useState("");
    const [desc, setdesc] = useState("");
    const [mainTask, setmainTask] = useState([]);

    const submitHandler = (e) => {
        e.preventDefault()
        if (title.trim() && desc.trim()) {
            const now = new Date();
            setmainTask([...mainTask, {
                title,
                desc,
                id: Date.now(),
                createdAt: now.toISOString(),
                displayDate: now.toLocaleDateString(),
                displayTime: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }])
            settitle("")
            setdesc("")
        }
    };

    const deleteHandler = (index) => {
        let copytask = [...mainTask];
        copytask.splice(index, 1);
        setmainTask(copytask);
    }

    let renderTask = (
        <div className="flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 border-4 border-cyan-400 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-60"></div>
            </div>
            <h2 className="text-2xl font-light text-gray-400 tracking-wide">No missions assigned</h2>
            <p className="text-sm text-gray-500 mt-2">Create your first task to begin</p>
        </div>
    );

    if (mainTask.length > 0) {
        renderTask = mainTask.map((task, index) => {
            return (
                <div key={task.id} className="group relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-cyan-400/30 rounded-xl p-6 mb-4 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20 transform hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                                <div className="flex items-center mb-2">
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
                                    <h5 className="text-xl font-semibold text-white tracking-wide">{task.title}</h5>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed ml-5">{task.desc}</p>
                            </div>

                            <button
                                onClick={() => deleteHandler(index)}
                                className="ml-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25 transform hover:scale-105 active:scale-95"
                            >
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Delete
                                </span>
                            </button>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center">
                                <div className="w-1 h-1 bg-gray-500 rounded-full mr-2"></div>
                                Task #{index + 1}
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 110 2h-1v11a1 1 0 01-1 1H6a1 1 0 01-1-1V9H4a1 1 0 110-2h4z" />
                                    </svg>
                                    {task.displayDate}
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {task.displayTime}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-cyan-400/30">
                    <div className="container mx-auto px-6 py-8">
                        <h1 className="text-6xl font-bold text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
                            NEURAL TASK MATRIX
                        </h1>
                        <p className="text-center text-gray-400 mt-2 text-lg tracking-wide">Advanced Mission Control System</p>
                    </div>
                </div>

                {/* Form Section */}
                <div className="container mx-auto px-6 py-12">
                    <form onSubmit={submitHandler} className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-cyan-400/30 rounded-2xl p-8 mb-8 shadow-2xl">
                            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                                <div className="w-3 h-3 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
                                Initialize New Mission
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 tracking-wide">Mission Title</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all duration-200"
                                        placeholder="Enter mission objective..."
                                        value={title}
                                        onChange={(e) => settitle(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 tracking-wide">Mission Details</label>
                                    <input
                                        type='text'
                                        className='w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all duration-200'
                                        placeholder='Describe mission parameters...'
                                        value={desc}
                                        onChange={(e) => setdesc(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className='w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 transform hover:scale-[1.02] active:scale-[0.98] tracking-wide'
                            >
                                <span className="flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    DEPLOY MISSION
                                </span>
                            </button>
                        </div>
                    </form>

                    {/* Tasks Section */}
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-cyan-400/30 rounded-2xl p-8 shadow-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-white flex items-center">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3 animate-pulse"></div>
                                    Active Missions
                                </h2>
                                <div className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                                    {mainTask.length} {mainTask.length === 1 ? 'Mission' : 'Missions'}
                                </div>
                            </div>

                            <div className="space-y-4">
                                {renderTask}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page;