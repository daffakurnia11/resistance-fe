import * as React from "react";
import { Metadata } from "next";
import Homepage from "./_components/Homepage";

export const metadata: Metadata = {
  title: "Host or Join Room - The Resistance",
};

export default function Home() {
  return <Homepage />;
}
