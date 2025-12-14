# 📸 MERN Stack Instagram Clone

A full-stack social media application built with the MERN stack (MongoDB, Express, React, Node.js). This project replicates core Instagram functionality, allowing users to share photos, follow friends, like posts, and comment in real-time.

## 🚀 Features

* **Authentication:** Secure Signup & Login using JWT (JSON Web Tokens) and BCrypt for password hashing.
* **Social Feed:** Personalized feed displaying posts from followed users + your own posts.
* **Create Posts:** Upload posts with image URLs and captions.
* **Interactions:**
    * **Like/Unlike:** Real-time heart toggle with optimistic UI updates.
    * **Comments:** View and add comments to posts.
* **User System:**
    * **Profile:** View user stats (posts, followers, following) and post grid.
    * **Follow/Unfollow:** Build a social graph.
    * **Search:** Type-ahead search to find users by username.
    * **Edit Profile:** Update bio, profile picture, and username.
    * **Delete Post:** Remove your own posts directly from the profile.
* **UI/UX:** Fully responsive design built with **React (Vite)** and **Tailwind CSS**.

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS, React Router DOM, Axios, Context API.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB Atlas (Cloud).
* **Tools:** Vite (Build tool), Postman (API Testing), Git.

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v14 or higher)
* [Git](https://git-scm.com/)

---

## 📦 Installation & Setup Guide

### Phase 1: MongoDB Atlas Setup (Database)
1.  Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up/login.
2.  Create a **New Cluster** (The free "Shared" tier is sufficient).
3.  **Database Access:** Create a database user (Username/Password). *Remember these credentials!*
4.  **Network Access:** Whitelist your IP address (or select "Allow Access from Anywhere" `0.0.0.0/0` for development).
5.  Click **Connect** -> **Connect your application**.
6.  Copy the **Connection String** (e.g., `mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority`).

### Phase 2: Backend Setup
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ABHIJIT8008/Instagram-Clone.git]
    cd instagram-clone
    ```

2.  **Install Backend Dependencies:**
    Navigate to the root folder (or `backend` if you separated them) and run:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a file named `.env` in the **root** folder. Add the following content (replace placeholders with your actual data):
    ```env
    PORT=5000
    MONGO_URI=paste_your_mongodb_connection_string_here
    JWT_SECRET=create_a_random_secret_string_like_mysecret123
    ```
    *Note: In the `MONGO_URI`, replace `<password>` with your actual database user password.*

4.  **Start the Backend Server:**
    ```bash
    npm run dev
    ```
    *You should see: "MongoDB Connected" and "Server running on port 5000"*

### Phase 3: Frontend Setup
1.  **Open a new terminal** and navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  **Install Frontend Dependencies:**
    ```bash
    npm install
    ```

3.  **Start the React App:**
    ```bash
    npm run dev
    ```
    *The app will launch at `http://localhost:5173` (or similar).*

---

## 📂 Project Structure

This project follows a Monorepo structure (Root contains Backend, `/frontend` contains React).