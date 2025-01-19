import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthClientSideLayout from "./AuthClientSideLayout";

export default function AuthLayout({ children }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  
  if (!clientId) {
    console.error("Google Client ID is not defined");
    return null;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthClientSideLayout>{children}</AuthClientSideLayout>
    </GoogleOAuthProvider>
  );
}
