"use client";

import { useEffect, useState, useCallback } from "react";
import { CallRecording } from "@stream-io/video-react-sdk";
import { motion, AnimatePresence } from "framer-motion";
import { LoaderUI } from "@/components/custom/LoaderUI";
import RecordingCard from "./_components/RecordingCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import useGetCalls from "@/lib/hooks/useGetCalls";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, FilterIcon } from "lucide-react";

function RecordingsPage() {
  const { calls, isLoading } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const [filteredRecordings, setFilteredRecordings] = useState<CallRecording[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");

  const fetchRecordings = useCallback(async () => {
    if (!calls) return;

    try {
      const callData = await Promise.all(
        calls.map((call) => call.queryRecordings())
      );
      const allRecordings = callData.flatMap((call) => call.recordings);
      setRecordings(allRecordings);
      setFilteredRecordings(allRecordings);
    } catch (error) {
      console.error("Error fetching recordings:", error);
    }
  }, [calls]);

  useEffect(() => {
    fetchRecordings();
  }, [fetchRecordings]);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const term = event.target.value.toLowerCase();
      setSearchTerm(term);
      const filtered = recordings.filter((recording) =>
        recording.start_time?.toLowerCase().includes(term)
      );
      setFilteredRecordings(filtered);
    },
    [recordings]
  );

  const handleRefresh = useCallback(() => {
    fetchRecordings();
  }, [fetchRecordings]);

  if (isLoading) return <LoaderUI />;

  return (
    <div className="container max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Recordings</h1>
          <p className="text-muted-foreground mt-1">
            {filteredRecordings.length}{" "}
            {filteredRecordings.length === 1 ? "recording" : "recordings"}{" "}
            available
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search recordings..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-8"
            />
          </div>
          <Button variant="outline" onClick={handleRefresh}>
            <FilterIcon className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)]">
        <AnimatePresence>
          {filteredRecordings.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-6"
            >
              {filteredRecordings.map((recording) => (
                <motion.div
                  key={recording.end_time}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <RecordingCard recording={recording} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-[400px] gap-4"
            >
              <p className="text-xl font-medium text-muted-foreground">
                No recordings available
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollArea>
    </div>
  );
}

export default RecordingsPage;
