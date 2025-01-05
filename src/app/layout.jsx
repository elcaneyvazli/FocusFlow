import { ReduxProvider } from "@/redux/provider";
import "./globals.css";
import MetadataLayout from "./MetadataLayout";
import ClientSideLayout from "./ClientSideLayout";

export default function RootLayout({ children }) {
  return (
    <MetadataLayout>
      <ReduxProvider>
        <ClientSideLayout>{children}</ClientSideLayout>
      </ReduxProvider>
    </MetadataLayout>
  );
}
