Repository for verifying email sending by `verifyBeforeUpdateEmail` for firebase authentication.

## Setup

### 1. Install packages
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Configure environment variables
1. Copy `.env.example` to create `.env.local`
2. Replace the environment variables in `.env.local` with configuration from the Firebase app used for verification

```
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=**********
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=**********
NEXT_PUBLIC_FIREBASE_PROJECT_ID=**********
NEXT_PUBLIC_FIREBASE_APP_ID=**********
```

### 3. Start the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser

### 4. Change the action URL
From the Firebase Authentication console, change the action URL in the email address change template to `http://localhost:3000/user_account/auth_action`

## Steps to Reproduce
### 1. Create User
On the top page, enter an email address A and a password, then click "Create User"

### 2. Change email from A to B
1. On the top page, enter email address A and the password, then click "Login"
2. Enter an email address B and click "Change Email"
3. A verification email will be sent to B. Click the verification link
4. A confirmation email about the email address change will be sent to A

### 3. Change email from B to C
1. On the top page, enter email address B and the password, then click "Login"
2. Enter an email address C and click "Change Email"
3. A verification email will be sent to C. Click the verification link
4. A confirmation email about the email address change will be sent to A again

## Expected Behavior
In step 4 of "3. Change email from B to C", the confirmation email should be sent to B
