"use client";

import { useMemo, useCallback } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Doc, Id } from "../../../convex/_generated/dataModel";
import toast from "react-hot-toast";
import { LoaderUI } from "@/components/custom/LoaderUI";
import { getCandidateInfo, groupInterviews } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { INTERVIEW_CATEGORY } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarIcon,
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
} from "lucide-react";
import { format } from "date-fns";
import CommentDialog from "./_components/CommentDialog";
import { motion, AnimatePresence } from "framer-motion";

type Interview = Doc<"interviews">;

function DashboardPage() {
  const users = useQuery(api.users.getUsers);
  const interviews = useQuery(api.interviews.getAllInterviews);
  const updateStatus = useMutation(api.interviews.updateInterviewStatus);

  const handleStatusUpdate = useCallback(
    async (interviewId: Id<"interviews">, status: string) => {
      try {
        await updateStatus({ id: interviewId, status });
        toast.success(`Interview marked as ${status}`);
      } catch (error) {
        console.error("Failed to update status:", error);
        toast.error("Failed to update status. Please try again.");
      }
    },
    [updateStatus]
  );

  const groupedInterviews = useMemo(() => {
    if (!interviews) return {};
    return groupInterviews(interviews);
  }, [interviews]);

  if (!interviews || !users) return <LoaderUI />;

  return (
    <div className="container mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center mb-8"
      >
        <Link href="/schedule">
          <Button>Schedule New Interview</Button>
        </Link>
      </motion.div>

      <div className="space-y-8">
        <AnimatePresence>
          {INTERVIEW_CATEGORY.map(
            (category) =>
              groupedInterviews[category.id]?.length > 0 && (
                <motion.section
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-xl font-semibold">{category.title}</h2>
                    <Badge variant={category.variant}>
                      {groupedInterviews[category.id].length}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupedInterviews[category.id].map(
                      (interview: Interview, index: number) => {
                        const candidateInfo = getCandidateInfo(
                          users,
                          interview.candidateId
                        );
                        const startTime = new Date(interview.startTime);

                        return (
                          <motion.div
                            key={interview._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Card className="hover:shadow-md transition-all">
                              <CardHeader className="p-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage src={candidateInfo.image} />
                                    <AvatarFallback>
                                      {candidateInfo.initials}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <CardTitle className="text-base">
                                      {candidateInfo.name}
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                      {interview.title}
                                    </p>
                                  </div>
                                </div>
                              </CardHeader>

                              <CardContent className="p-4">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <CalendarIcon className="h-4 w-4" />
                                    {format(startTime, "MMM dd")}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <ClockIcon className="h-4 w-4" />
                                    {format(startTime, "hh:mm a")}
                                  </div>
                                </div>
                              </CardContent>

                              <CardFooter className="p-4 pt-0 flex flex-col gap-3">
                                {interview.status === "completed" && (
                                  <div className="flex gap-2 w-full">
                                    <Button
                                      className="flex-1"
                                      onClick={() =>
                                        handleStatusUpdate(
                                          interview._id,
                                          "succeeded"
                                        )
                                      }
                                    >
                                      <CheckCircle2Icon className="h-4 w-4 mr-2" />
                                      Pass
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      className="flex-1"
                                      onClick={() =>
                                        handleStatusUpdate(
                                          interview._id,
                                          "failed"
                                        )
                                      }
                                    >
                                      <XCircleIcon className="h-4 w-4 mr-2" />
                                      Fail
                                    </Button>
                                  </div>
                                )}
                                <CommentDialog interviewId={interview._id} />
                              </CardFooter>
                            </Card>
                          </motion.div>
                        );
                      }
                    )}
                  </div>
                </motion.section>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default DashboardPage;
