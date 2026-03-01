import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin-auth";
import { AgentConsole } from "@/components/chat/AgentConsole";

export const metadata = {
  title: "Agent Console",
  robots: { index: false, follow: false },
};

export default async function AgentConsolePage() {
  // Check if user is an authenticated admin/editor
  // Note: getAdminUser requires ADMIN_EDIT_BUTTON_ENABLED=true
  // For the agent console, we bypass that flag and check JWT directly
  let isAuthenticated = false;

  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const token = cookieStore.get("payload-token")?.value;

    if (token) {
      const parts = token.split(".");
      if (parts.length === 3) {
        const claims = JSON.parse(
          Buffer.from(parts[1], "base64url").toString("utf-8"),
        );
        const role = claims?.role;
        if (role && ["admin", "editor", "product-manager"].includes(role)) {
          isAuthenticated = true;
        }
      }
    }
  } catch {
    // No token or invalid
  }

  if (!isAuthenticated) {
    redirect("/admin");
  }

  return <AgentConsole />;
}
