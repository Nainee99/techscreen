# TechScreen Project

## 🚀 Tech Stack
- **Frameworks and Languages**: [Next.js](https://nextjs.org/) & [TypeScript](https://www.typescriptlang.org/)
- **Services and Libraries**:
  - [Stream](https://getstream.io/): Real-time communication and activity feeds
  - [Convex](https://convex.dev/): Backend as a Service (BaaS)
  - [Clerk](https://clerk.dev/): Authentication and Authorization
- **Styling**: Tailwind CSS & [Shadcn](https://shadcn.dev/)

## 🎯 Features
- **Video Calls**: Seamless video communication
- **Screen Sharing**: Share your screen during calls
- **Screen Recording**: Record your sessions for future reference
- **Authentication & Authorization**: Secure user authentication and role-based access
- **Server-Side Features**:
  - Server Components
  - Server Actions
  - Dynamic & Static Routes
- **Client-Side Features**:
  - Client Components
- **Styling**: Consistent and modern UI with Tailwind CSS & Shadcn

---

## 🛠️ Setup Instructions

### 1. Environment Variables
Ensure the following environment variables are set in a `.env` file in the root directory:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
CONVEX_DEPLOYMENT=your-convex-deployment-url
NEXT_PUBLIC_CONVEX_URL=your-convex-public-url
NEXT_PUBLIC_STREAM_API_KEY=your-stream-api-key
STREAM_SECRET_KEY=your-stream-secret-key
```

Replace the placeholders (`your-clerk-publishable-key`, `your-clerk-secret-key`, etc.) with the actual keys from your respective services.

### 2. Install Dependencies
Run the following command to install all required dependencies:

```bash
npm install
```

### 3. Run the Application
Start the development server using:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure
```plaintext
├── components/          # Reusable UI components
├── pages/               # Next.js pages
├── styles/              # Tailwind CSS and Shadcn styles
├── lib/                 # Utility functions and libraries
├── api/                 # Server-side API routes
├── public/              # Static assets
├── .env                 # Environment variables
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation
```

---

## 🧩 Key Concepts
- **Server Components**: Rendered on the server for optimized performance
- **Client Components**: Rendered on the client for interactive features
- **Server Actions**: Handle server-side logic directly within your components
- **Dynamic & Static Routes**: Support for dynamic routing and pre-rendering

---

## 🖼️ Styling
This project uses **Tailwind CSS** for utility-first styling and **Shadcn** for advanced design components. Refer to the official documentation for detailed guidance:
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn](https://shadcn.dev/)

---

## 📜 License
This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributions
Contributions, issues, and feature requests are welcome! Feel free to check out the [issues page](https://github.com/techscreen/issues).

---

## 🧑‍💻 Author
Created by [Your Name](https://github.com/Nainee99). For any questions, feel free to reach out!
