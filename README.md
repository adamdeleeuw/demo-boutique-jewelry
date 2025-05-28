# Demo Site: Elegant Jewelry Boutique

**Live Demo:** [Link to your live GitHub Pages demo will go here]

## About This Project

Elegant single-page website for a jewelry boutique. Showcases a responsive design, interactive image gallery, client-side validated booking form (local Node.js/Nodemailer backend), and modern UI elements using HTML, CSS & JS.

This project serves as a demonstration of a "Starter" website package, perfect for businesses looking for a professional and engaging online presence.

## Key Features

*   **Responsive Design:** Adapts seamlessly to desktops, tablets, and mobile devices.
*   **Hero Section:** Captivating introduction with a clear call to action.
*   **Interactive Image Gallery:**
    *   Showcases products or services visually.
    *   Includes a full-screen lightbox for detailed image viewing.
*   **Smooth Scrolling Navigation:** Easy navigation through different sections of the single page.
*   **Client-Side Form Validation:** Real-time feedback on the booking form for an improved user experience.
*   **Booking Form with Backend (Local Demo):**
    *   Allows users to submit booking requests.
    *   **Note:** The backend (Node.js/Express with Nodemailer for email) is functional when running the project locally. For the live GitHub Pages demo, the form submission will need to be adapted (e.g., using a static form service or be for display only).
*   **Scroll-Triggered Animations:** Subtle animations to enhance user engagement as they scroll.
*   **Mobile-First Navigation:** Includes a hamburger menu and overlay for smaller screens.
*   **Clean & Modern UI/UX:** Focus on aesthetics and usability.

## Tech Stack

*   **Frontend:**
    *   HTML5
    *   CSS3 (with custom properties/variables)
    *   JavaScript (ES6+)
*   **Backend (for local demo of contact form):**
    *   Node.js
    *   Express.js
    *   Nodemailer (for email sending)
*   **Development:**
    *   `dotenv` for environment variable management (local backend)
    *   `nodemon` for live server reloading during development (local backend)

## Running This Project Locally (for Developers)

To run this project on your local machine and test the backend form functionality:

1.  **Prerequisites:**
    *   Node.js and npm (or yarn) installed.
    *   Git installed.

2.  **Clone the repository:**
    ```bash
    git clone https://github.com/adamdeleeuw/demo-boutique-jewelry.git
    cd demo-boutique-jewelry
    ```

3.  **Install dependencies (for the backend server):**
    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    *   Create a `.env` file in the root of the project by copying `.env.example`:
        ```bash
        cp .env.example .env
        ```
    *   Edit the `.env` file with your Gmail credentials (preferably an App Password) and the recipient email address for booking notifications:
        ```
        EMAIL_USER="your_gmail_address@gmail.com"
        EMAIL_PASS="your_gmail_app_password"
        CLIENT_NOTIFICATION_EMAIL="email_to_receive_bookings@example.com"
        ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The site will typically be available at `http://localhost:3000`.

## Notes on the GitHub Pages Live Demo

*   The live demo hosted on GitHub Pages is a **static site**.
*   The Node.js backend for the contact form **will not run on GitHub Pages**.
*   For the live demo, the contact form might be:
    *   Configured to use a static-friendly form service (e.g., Formspree, Getform - *you would need to implement this separately if desired for the live demo*).
    *   Or, it will be for display purposes only, demonstrating the front-end validation and UI.

## Author

*   **Adam De Leeuw**
*   [Link to your Portfolio/LinkedIn if you have one]

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.