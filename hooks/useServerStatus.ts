"use client";

import { useEffect, useRef, useState } from "react";
import { UPDATE_INTERVAL_MS } from "@/lib/constants";

export function useServerStatus(
  onOnlineChange?: (prev: boolean, next: boolean) => void
) {
  const [serverLoad, setServerLoad] = useState(88);
	const [activePlayers, setActivePlayers] = useState(18168);
	const [isOnline, setIsOnline] = useState(true);


  const onOnlineChangeRef = useRef(onOnlineChange);
  useEffect(() => {
    onOnlineChangeRef.current = onOnlineChange;
  }, [onOnlineChange]);

  useEffect(() => {
    const interval = setInterval(() => {
      setServerLoad((prev) =>
        Math.max(50, Math.min(98, prev + (Math.random() * 10 - 5)))
      );
      setActivePlayers((prev) =>
        Math.max(
          10000,
          Math.min(25000, prev + Math.floor(Math.random() * 500 - 250))
        )
      );

      if (Math.random() > 0.99) {
        setIsOnline((prev) => {
          const next = !prev;
          onOnlineChangeRef.current?.(prev, next);
          return next;
        });
      }
    }, UPDATE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return { isOnline, serverLoad, activePlayers };
}
