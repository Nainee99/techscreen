# TechScreen Project

Welcome to the TechScreen Project! This is a modern, feature-rich application built with the latest tools and technologies.

---

## 🚀 Tech Stack
- **Frontend Framework**: [Next.js](https://nextjs.org/) (leveraging Server and Client Components)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **Key Integrations**:
  - [Stream](https://getstream.io/) for real-time communication and activity feeds
  - [Convex](https://convex.dev/) for backend as a service (BaaS)
  - [Clerk](https://clerk.dev/) for secure authentication and authorization
- **Styling**: Tailwind CSS & [Shadcn](https://shadcn.dev/) for a consistent and polished design system

---

## 🌟 Features
- **Video Calls**: Smooth and reliable real-time video communication
- **Screen Sharing**: Present your screen seamlessly
- **Screen Recording**: Record sessions for playback
- **Authentication & Authorization**: Secure and scalable user authentication
- **Dynamic & Static Routing**: Optimized navigation for all use cases
- **Server-Side Logic**:
  - Server Components for performance
  - Server Actions for streamlined operations

---

## 🛠️ Getting Started

Follow these steps to set up and run the project locally:

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) (v7 or later)

### 2. Environment Variables
Create a `.env` file in the root of the project and add the following keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
CONVEX_DEPLOYMENT=your-convex-deployment-url
NEXT_PUBLIC_CONVEX_URL=your-convex-public-url
NEXT_PUBLIC_STREAM_API_KEY=your-stream-api-key
STREAM_SECRET_KEY=your-stream-secret-key
```

> Replace the placeholders (`your-clerk-publishable-key`, etc.) with actual keys from your service providers.

### 3. Install Dependencies
Run the following command to install the required dependencies:

```bash
npm install
```

### 4. Start the Development Server
Run the app locally with:

```bash
npm run dev
```

Your application will be available at [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure
```plaintext
├── components/          # Reusable React components
├── pages/               # Next.js routing and page components
├── styles/              # Tailwind CSS and Shadcn design files
├── lib/                 # Utility functions and libraries
├── api/                 # Server-side API endpoints
├── public/              # Static assets like images and icons
├── .env                 # Environment configuration
├── package.json         # Project metadata and dependencies
└── README.md            # Documentation (you are here!)
```

---

## 🎨 Styling
This project uses **Tailwind CSS** for utility-first styling and **Shadcn** for modern design components. Refer to their documentation for guidance:
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn](https://shadcn.dev/)

---

## 🤝 Contributions
We welcome contributions to improve this project! To contribute:
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

---

## 📜 License
This project is licensed under the [MIT License](LICENSE).

---

## 📞 Contact
For questions or feedback, please contact [Your Name](mailto:hasnainarif571.com) or visit [GitHub](https://github.com/Nainee99).

---

Thank you for exploring the TechScreen Project! 🚀
