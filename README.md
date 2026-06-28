# Cakery Cafe

Static website prepared for Firebase Hosting.

## Deploy

1. Install and sign in to the Firebase CLI:

   ```sh
   npm install -g firebase-tools
   firebase login
   ```

2. Connect the site to your Firebase project:

   ```sh
   firebase use --add
   ```

   Or copy `.firebaserc.example` to `.firebaserc` and replace `your-firebase-project-id`.

3. Deploy Hosting:

   ```sh
   firebase deploy --only hosting
   ```

## Local Preview

```sh
firebase emulators:start --only hosting
```
