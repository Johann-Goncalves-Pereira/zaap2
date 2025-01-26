interface GoogleAuthConfig {
  client_id: string;
  project_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_secret: string;
  redirect_uris: string[];
  javascript_origins: string[];
}

const config: GoogleAuthConfig = {
  client_id: import.meta.env.WEB_CLIENT_ID,
  project_id: import.meta.env.WEB_PROJECT_ID,
  auth_uri: import.meta.env.WEB_AUTH_URI,
  token_uri: import.meta.env.WEB_TOKEN_URI,
  auth_provider_x509_cert_url: import.meta.env.WEB_AUTH_PROVIDER_X509_CERT_URL,
  client_secret: import.meta.env.WEB_CLIENT_SECRET,
  redirect_uris: [import.meta.env.WEB_REDIRECT_URIS],
  javascript_origins: [import.meta.env.WEB_JAVASCRIPT_ORIGINS],
};

export const initGooglePhotos = () => {
  return new Promise((resolve, reject) => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          apiKey: config.client_secret,
          clientId: config.client_id,
          discoveryDocs: [
            "https://photoslibrary.googleapis.com/$discovery/rest?version=v1",
          ],
          scope: "https://www.googleapis.com/auth/photoslibrary.readonly",
        })
        .then(() => {
          resolve(true);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  });
};

export const authenticateUser = async () => {
  if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
    await gapi.auth2.getAuthInstance().signIn();
  }
  return gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse()
    .access_token;
};

export const fetchPhotos = async () => {
  try {
    const token = await authenticateUser();
    const response = await fetch(
      "https://photoslibrary.googleapis.com/v1/mediaItems",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch photos");

    const data = await response.json();
    return data.mediaItems || [];
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
};
