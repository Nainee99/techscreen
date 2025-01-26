"use client";

import Link from "next/link";
import { CodeIcon } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import DashboardBtn from "./DashboardBtn";
import { ModeToggle } from "./ModeToggle";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center pl-4 space-x-2">
          <CodeIcon className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg sm:text-xl">TechScreen</span>
        </Link>
        <div className="flex items-center space-x-2">
          <SignedIn>
            <nav className="flex items-center space-x-2">
              <DashboardBtn />
              <ModeToggle />
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8 sm:h-9 sm:w-9",
                  },
                }}
              />
            </nav>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
