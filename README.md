# Get Me a Chai

A platform that lets fans support their favourite creators — like Buy Me a Coffee, but built from scratch.

Built with Next.js, MongoDB, and a focus on clean UX. Handles authentication, payments, and creator profiles end to end.

---

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Home Page](#home-page)

---

## 🛠️ Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or above)
- [Git](https://git-scm.com/)
- A package manager: `npm`, `yarn`, or `pnpm`

---

## 🔐 Environment Setup

This project requires environment variables to run correctly.

### Step 1 — Create the `.env.local` file

In the **root directory** of the project, create a file named `.env.local`:

```bash
touch .env.local
```

### Step 2 — Add the following variables

Open `.env.local` and add the values below:

```env
# ============================
# 🔑 GitHub Credentials
# ============================
GITHUB_SECRET=your_github_secret_here
GITHUB_KEY=your_github_key_here

# ============================
# 🌐 Public URL
# ============================
NEXT_PUBLIC_URL=https://your-public-url.com

# ============================
# 🗄️ Database
# ============================
DATABASE_URL=your_database_connection_string_here

# ============================
# 🏠 Home Page Content
# ============================
NEXT_PUBLIC_HOME_TITLE=Welcome to Our Platform
NEXT_PUBLIC_HOME_SUBTITLE=Your one-stop solution for everything awesome
NEXT_PUBLIC_HOME_DESCRIPTION=We help you build, ship, and scale faster than ever before.
```

> ⚠️ **Never commit `.env.local` to version control.**  
> Make sure `.env.local` is listed in your `.gitignore` file.

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
# Clone the repo
git clone https://github.com/your-username/your-repo.git

# Navigate into the project
cd your-repo

# Install dependencies
npm install
```

---

## ▶️ Running the Project

```bash
# Start the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The app will be available at **http://localhost:3000**

---

 

---

## 🔒 Security Notice

- **Never share** your `.env.local` file publicly.
- **Rotate** your GitHub secret and keys regularly.
- Use environment variable managers (like [Doppler](https://www.doppler.com/) or [Vercel Env](https://vercel.com/docs/environment-variables)) for production deployments.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

[MIT](LICENSE)
