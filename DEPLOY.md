# Firebase App Hosting — Deploy & GitHub Auto-Deploy

This project uses **Firebase App Hosting only** (no legacy Firebase Hosting, no `firebase.json`). Pushing to `main` triggers a build and deploy after you connect the repo in the Firebase Console.

## 1. One-time setup

### Create a Firebase project (if needed)

1. Go to [Firebase Console](https://console.firebase.google.com) and create or select a project.
2. Upgrade to the **Blaze (pay-as-you-go)** plan (required for App Hosting).

### Set local default project

```bash
firebase login
firebase use your-firebase-project-id
```

Replace `your-firebase-project-id` with your project ID. You can also edit `.firebaserc` and set the `default` project there.

### Connect GitHub and create App Hosting backend

**Option A — Firebase Console (recommended)**

1. In Firebase Console, open **Build** → **App Hosting** → **Get started** (or **Create backend**).
2. Create a new Firebase web app if prompted.
3. Set **Live branch** to `main`.
4. Set **App root directory** to `/` (repo root; `package.json` is here).
5. **Connect to GitHub**: choose **codyjay831/EvoMotorsInc** and authorize.
6. Pick a **region** (e.g. us-central1).
7. Finish and deploy. Firebase will build and deploy from `main`.

**Option B — Firebase CLI**

```bash
firebase apphosting:backends:create --project YOUR_PROJECT_ID
```

Follow the prompts (region, GitHub repo, live branch `main`, root `/`).

## 2. Environment variables

- Set **production** env vars in **Firebase Console** → **App Hosting** → your backend → **Settings** → **Environment**.
- Copy variable names from `.env.example` (e.g. `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_VEHICLIX_API_URL`). Do not commit `.env` or `.env.local`.
- Optional: add non-secret defaults in `apphosting.yaml`; Console values override them.

## 3. After setup

- **Push to `main`** → Firebase builds and deploys automatically.
- Live URL format: `https://<backend-id>--<project-id>.<region>.hosted.app`
- Optional: [Connect a custom domain](https://firebase.google.com/docs/app-hosting/custom-domain).

## 4. Optional: init apphosting config in repo

To regenerate or tweak `apphosting.yaml`:

```bash
firebase init apphosting
```

## 5. Validate build locally

```bash
npm ci
npm run build
npm run start
```

No `firebase deploy` is needed for App Hosting when using GitHub; deploys are triggered by pushes to the live branch.
