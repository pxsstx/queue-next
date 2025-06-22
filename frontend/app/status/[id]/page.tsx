"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { socket } from "@/socket";

export default function StatusPage() {
  const searchParams = useParams();
  const id = searchParams.id;
  const [position, setPosition] = useState<number | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  useEffect(() => {
    socket.on("queue-updated", (queue: any[]) => {
      const idx = queue.findIndex((item) => item.id === id);
      setPosition(idx !== -1 ? idx + 1 : null);
      setLastChecked(new Date());
      console.log(idx);
    });

    socket.on("queue-called", (calledId: string) => {
      if (calledId === id) {
        alert("ถึงคิวของคุณแล้ว!");
      }
    });

    // Add beforeunload event listener to warn when closing
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (position && position > 0) {
        const message = "You're in the queue! If you close this page, you might miss your turn. Are you sure you want to leave?";
        
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [id, position]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Queue Status</h1>
      <p className="text-gray-600 mb-4">Queue ID: {id}</p>
      
      {position ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-lg">
            คุณอยู่ลำดับที่ <strong className="text-blue-600">{position}</strong>
          </p>
        </div>
      ) : (
        <div className="text-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-lg">รออัปเดต...</p>
        </div>
      )}

      {/* Last updated info */}
      {lastChecked && (
        <div className="text-xs text-gray-500 mb-4 text-center">
          Last updated: {lastChecked.toLocaleTimeString()}
        </div>
      )}

      {/* Warning when in queue */}
      {position && position > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-orange-800">
                Don't close this page!
              </h3>
              <div className="mt-2 text-sm text-orange-700">
                <p>
                  You're currently in the queue. If you close this page, you might miss your turn.
                  Keep this page open to see your position in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 text-sm text-gray-600">
        <h3 className="font-semibold mb-2">How it works:</h3>
        <ul className="space-y-1">
          <li>• Your position updates in real-time</li>
          <li>• You'll get an alert when it's your turn</li>
          <li>• Keep this page open to see your position</li>
          <li>• Don't close this page to avoid missing your turn</li>
        </ul>
      </div>
    </div>
  );
}
