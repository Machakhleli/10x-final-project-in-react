import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function GoogleButton() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (window.google) {
      google.accounts.id.initialize({
        client_id:
          "999997054771-ml746hajhha2sivtt2qe225miqdaf0lc.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      google.accounts.id.renderButton(document.getElementById("google-btn"), {
        theme: "outline",
        size: "large",
        width: "100%",
        shape: "pill",
      });
    }
  }, []);

  const handleCredentialResponse = (response) => {
    const userInfo = JSON.parse(atob(response.credential.split(".")[1]));
    console.log("Google User:", userInfo);

    // Store auth flag
    sessionStorage.setItem("auth", "true");
    // Store user info including the profile picture
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
      })
    );

    const from = location.state?.from?.pathname || "/dashboard";
    navigate(from, { replace: true });
  };

  return (
    <div className="mt-4">
      <div id="google-btn"></div>
    </div>
  );
}
