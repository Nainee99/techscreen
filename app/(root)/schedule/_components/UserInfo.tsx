import { useMemo } from "react";
import { UserCircleIcon } from "lucide-react";
import type { Doc } from "@/convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type User = Doc<"users">;

function UserInfo({ user }: { user: User }) {
  const initials = useMemo(() => {
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, [user.name]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 hover:bg-muted p-1 rounded-md transition-colors">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user.image} alt={`${user.name}'s avatar`} />
              <AvatarFallback>
                {user.image ? (
                  <UserCircleIcon className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <span className="text-xs font-medium">{initials}</span>
                )}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium truncate max-w-[150px]">
              {user.name}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{user.name}</p>
          {user.role && (
            <p className="text-xs text-muted-foreground capitalize">
              {user.role}
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default UserInfo;
