import { ChatArea } from "@/chat/ChatArea";
import { SideBar } from "@/layout/components/SideBar";

export const TicketListShell = () => {
  return (
    <div style={{ display: "flex" }}>
      <SideBar />

      <ChatArea />
    </div>
  );
};
