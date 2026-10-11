"use client";
import { useEffect, useState } from "react";

export default function BanglaDate({
  className = "text-xs text-gray-600",
}: {
  className?: string;
}) {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  return <span className={className}>{date}</span>;
}