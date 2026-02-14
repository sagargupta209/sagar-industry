# Sagar Industry Web

A modern corporate website for a snack brand, built with Next.js, Tailwind CSS, Framer Motion, and MongoDB.

## Features

- **Modern UI**: Inspired by Balaji Wafers, with Premium aesthetics.
- **Animations**: Hero Slider, Scroll Reveals, Hover effects using Framer Motion.
- **Product Catalog**: Dynamic fetching of Categories and Products.
- **Admin Panel**: Secure dashboard to manage Products and Categories.
- **Responsive**: Fully optimized for Mobile, Tablet, and Desktop.

## Setup Instructions

1.  **Install Dependencies**:

    ```bash
    npm install
    # Important: Also install these if missed:
    npm install framer-motion mongoose lucide-react clsx tailwind-merge
    ```

2.  **Configure Database**:
    - Open `.env.local`
    - Update `MONGODB_URI` with your MongoDB connection string (from MongoDB Atlas).

3.  **Run Development Server**:

    ```bash
    npm run dev
    ```

4.  **Admin Access**:
    - Go to `/admin/login`
    - Use password: `admin123` (Change this in `src/app/admin/login/page.tsx` for production).
