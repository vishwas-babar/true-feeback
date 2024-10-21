import SendMessage from "@/components/SendMessage";
import UserDashboard from "@/components/UserDashboard";
import UserMessages from "@/components/UserMessages";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex mt-20 mx-auto w-full">
      
      this is the landing page for true feedback
      <UserMessages />
      <SendMessage />
    </div>
  );
}
