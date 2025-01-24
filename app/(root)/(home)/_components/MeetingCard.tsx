import { motion } from "framer-motion";
import { format } from "date-fns";
import { CalendarIcon, UserIcon } from "lucide-react";
// import useMeetingActions from "@/hooks/useMeetingActions";
import type { Doc } from "@/convex/_generated/dataModel";
// import { getMeetingStatus } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Interview = Doc<"interviews">;

export function MeetingCard({ interview }: { interview: Interview }) {
//   const { joinMeeting } = useMeetingActions();

//   const status = getMeetingStatus(interview);
  const formattedDate = format(
    new Date(interview.startTime),
    "EEEE, MMMM d · h:mm a"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="space-y-2 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              {formattedDate}
            </div>

            <Badge
              variant={
                status === "live"
                  ? "default"
                  : status === "upcoming"
                    ? "secondary"
                    : "outline"
              }
            >
              {status === "live"
                ? "Live Now"
                : status === "upcoming"
                  ? "Upcoming"
                  : "Completed"}
            </Badge>
          </div>

          <CardTitle className="line-clamp-1">{interview.title}</CardTitle>

          {interview.description && (
            <CardDescription className="line-clamp-2">
              {interview.description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UserIcon className="h-4 w-4" />
              {/* {interview.participants.length} Participant(s) */}
            </div>
            <div className="text-sm font-medium text-primary">
              {format(new Date(interview.startTime), "h:mm a")} -{" "}
              {/* {format(new Date(interview.endTime), "h:mm a")} */}
            </div>
          </div>

          {status === "live" && (
            <Button
              className="w-full"
            //   onClick={() => joinMeeting(interview.streamCallId)}
            >
              Join Meeting
            </Button>
          )}

          {status === "upcoming" && (
            <Button variant="outline" className="w-full" disabled>
              Waiting to Start
            </Button>
          )}

          {status === "completed" && (
            <Button variant="secondary" className="w-full">
              View Summary
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

