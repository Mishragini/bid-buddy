'use client'
import {
    KnockFeedProvider,
    KnockProvider,
  } from "@knocklabs/react";
  // Required CSS import, unless you're overriding the styling
import { ReactNode } from "react";
import { useSession } from "next-auth/react"
  
export function Providers ({children}:{children : ReactNode}) {
    
    const session = useSession();

    const userId = session?.data?.user?.id

    return (
      <KnockProvider apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY as string} userId={userId as string}>
        {/* Optionally, use the KnockFeedProvider to connect an in-app feed */}
        <KnockFeedProvider feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_ID as string}>
          <div>
            {children}
          </div>
        </KnockFeedProvider>
      </KnockProvider>
    );
  };