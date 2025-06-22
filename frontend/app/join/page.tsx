"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/socket";

export default function JoinPage() {
  const [name, setName] = useState("");
  const [hasJoined, setHasJoined] = useState(false);
  const router = useRouter();

  // Add beforeunload warning if user tries to leave after joining
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasJoined) {
        const message = "You've joined the queue! If you leave this page, you'll lose your place in line. Are you sure you want to leave?";
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasJoined]);

  const handleJoin = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    const id = Date.now().toString();
    socket.emit("add-queue", { id, name });
    setHasJoined(true);
    router.push(`/status/${id}`);
    console.log({id, name});
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Join Queue</h1>
      
      {!hasJoined ? (
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your name
            </label>
            <input 
              id="name"
              type="text"
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your name"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleJoin();
                }
              }}
            />
          </div>
          
          <button 
            onClick={handleJoin} 
            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            disabled={!name.trim()}
          >
            Join Queue
          </button>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  How it works
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="space-y-1">
                    <li>• Enter your name and join the queue</li>
                    <li>• You'll be redirected to your status page</li>
                    <li>• Keep the page open to see your position</li>
                    <li>• You'll be notified when it's your turn</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Joining queue...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait while we redirect you to your status page.</p>
        </div>
      )}
    </div>
  );
}
