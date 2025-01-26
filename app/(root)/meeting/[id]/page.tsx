"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { motion, AnimatePresence } from "framer-motion";
import { LoaderUI } from "@/components/custom/LoaderUI";
import MeetingRoom from "../_components/MeetingRoom";
import MeetingSetup from "../_components/MeetingSetup";
import useGetCallById from "@/lib/hooks/useGetCallById";

function MeetingPage() {
  const { id } = useParams();
  const { isLoaded } = useUser();
  const { call, isCallLoading } = useGetCallById(id as string);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (!isLoaded || isCallLoading) return <LoaderUI />;

  if (!call) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="h-screen flex items-center justify-center"
      >
        <p className="text-2xl font-semibold text-primary">Meeting not found</p>
      </motion.div>
    );
  }

  return (
    <StreamCall call={call}>
      <StreamTheme>
        <AnimatePresence mode="wait">
          {!isSetupComplete ? (
            <MeetingSetup
              key="setup"
              onSetupComplete={() => setIsSetupComplete(true)}
            />
          ) : (
            <MeetingRoom key="room" />
          )}
        </AnimatePresence>
      </StreamTheme>
    </StreamCall>
  );
}

export default MeetingPage;
