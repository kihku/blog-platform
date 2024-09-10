import Header from "@/components/header";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Header/>
      <h1>This is my home page</h1>
      <p><Link href="/about">About us</Link></p>
    </main>
  );
}