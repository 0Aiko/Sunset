"use client";

import React, { useState } from "react";

function SimpleModal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-stone-800 p-4 rounded"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

type Props = {
  beatmapId: number;
  beatmapSetId: number;
};

export default function RankBeatmapButton({ beatmapId, beatmapSetId }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] =
    useState<"Ranked" | "Loved" | "reset">("Ranked");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/RankBeatmap/${beatmapId}/rank`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status: selectedStatus }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        alert(`Error: ${errorText}`);
      } else {
        const successText = await res.text();
        alert(successText);
        window.location.reload();
      }
    } catch (err: any) {
      alert(`Request failed: ${err.message}`);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <button
        className="px-2 py-1 bg-red-500 rounded-md"
        onClick={() => setOpen(true)}
      >
        Rank
      </button>

      <SimpleModal open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col space-y-4">
          <p className="text-xl text-white">
            Rank beatmap <b>{beatmapId}</b> in set <b>{beatmapSetId}</b>
          </p>

          <div className="flex flex-col text-white space-y-1">
            <label>
              <input
                type="radio"
                name="rankStatus"
                value="Ranked"
                checked={selectedStatus === "Ranked"}
                onChange={() => setSelectedStatus("Ranked")}
              />
              <span className="ml-2">Ranked</span>
            </label>
            <label>
              <input
                type="radio"
                name="rankStatus"
                value="Loved"
                checked={selectedStatus === "Loved"}
                onChange={() => setSelectedStatus("Loved")}
              />
              <span className="ml-2">Loved</span>
            </label>
            <label>
              <input
                type="radio"
                name="rankStatus"
                value="reset"
                checked={selectedStatus === "reset"}
                onChange={() => setSelectedStatus("reset")}
              />
              <span className="ml-2">reset</span>
            </label>
          </div>

          <button
            className="bg-green-600 rounded-md px-4 py-2 text-white"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Confirm"}
          </button>
        </div>
      </SimpleModal>
    </>
  );
}
