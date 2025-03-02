import { ReduxProvider } from "@/redux/provider";
import "./globals.css";
import MetadataLayout from "./MetadataLayout";
import ClientSideLayout from "./ClientSideLayout";
import { PostHogProvider } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MetadataLayout>
          <PostHogProvider>
            <ReduxProvider>
              <ClientSideLayout>{children}</ClientSideLayout>
            </ReduxProvider>
          </PostHogProvider>
        </MetadataLayout>
      </body>
    </html>
  );
}
