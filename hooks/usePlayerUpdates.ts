"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Player } from "@/lib/types";
import { updatePlayerStats } from "@/lib/mockData";
import { UPDATE_INTERVAL_MS } from "@/lib/constants";

export function usePlayerUpdates(initialPlayers: Player[]) {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const prevPlayersRef = useRef<Player[]>(initialPlayers);
  const selectedPlayerRef = useRef<Player | null>(null);

  useEffect(() => {
    selectedPlayerRef.current = selectedPlayer;
  }, [selectedPlayer]);

  // Keep a default selection like the original component.
  useEffect(() => {
    if (players.length > 0 && !selectedPlayer) {
      setSelectedPlayer(players[0]);
    }
  }, [players, selectedPlayer]);

  const tick = useCallback(() => {
    setPlayers((prevPlayers) => {
      prevPlayersRef.current = [...prevPlayers];

      const updatedPlayers = prevPlayers.map((player) => updatePlayerStats(player));

      const sortedPlayers = [...updatedPlayers].sort((a, b) => b.score - a.score);
      sortedPlayers.forEach((player, index) => {
        player.rank = index + 1;
      });

      const currentSelected = selectedPlayerRef.current;
      if (currentSelected) {
        const updatedSelected = sortedPlayers.find((p) => p.id === currentSelected.id);
        if (updatedSelected) {
          // Mirror original behaviour: keep selected player object in sync.
          setSelectedPlayer(updatedSelected);
        }
      }

      return sortedPlayers;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(tick, UPDATE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [tick]);

  return {
    players,
    selectedPlayer,
    setSelectedPlayer,
    prevPlayersRef
  };
}
