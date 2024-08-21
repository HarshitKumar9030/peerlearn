# 🎓 PeerLearn

Welcome to **PeerLearn** – A modern platform designed to help students collaborate, study, and grow together! 🚀

This project is built using **Next.js**, **TypeScript**, **Tailwind CSS**, and **NextAuth.js** for authentication. Let’s get you set up in a few easy steps! 💻

## ⚡ Getting Started

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/HarshitKumar9030/peerlearn.git
cd peerlearn
```

### 2. Install Dependencies

Run the following command to install all necessary dependencies:

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables 🌐

You’ll need to configure a few environment variables to get the app running. Create a `.env.local` file in the root directory and add the following:

```plaintext
MONGODB_URI=your-mongodb-uri-here
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
NEXT_PUBLIC_APP_URL=https://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here
```

> **Pro Tip**: Use `npx nextauth secret` to generate a strong secret for `NEXTAUTH_SECRET`! 🔐

### 4. Run the Development Server 🏃‍♂️

Once everything is set up, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app. You should be good to go! 🎉

## 🛠️ Technologies Used

- **Next.js** – The React framework for production.
- **TypeScript** – Static type checking for better developer experience.
- **Tailwind CSS** – Utility-first CSS framework for styling.
- **NextAuth.js** – Authentication library for Next.js.
- **MongoDB** – NoSQL database for storing user data.
