import SendMessage from "@/components/SendMessage";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import UserDashboard from "@/components/UserDashboard";
import UserMessages from "@/components/UserMessages";
import Image from "next/image";

export default function Home() {
  return (
    <BackgroundBeamsWithCollision className="w-full h-screen">

      <div className="flex mx-auto">

        this is the landing page for true feedback
        <UserMessages />
        <SendMessage />
      </div>
    </BackgroundBeamsWithCollision>
  );
}
