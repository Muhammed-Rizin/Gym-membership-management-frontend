# Angular GYM Membership App

This Angular application complements the [GYM Membership backend](https://github.com/Muhammed-Rizin/Gym-membership-mangment-backend) to provide a user-friendly frontend for managing user memberships, user registration, and payment control.

## Installation Steps

Follow these steps to set up and run the Angular app:

1. Ensure you have Node.js and npm installed on your machine.
2. Clone this repository to your local machine using the following command:
   ```bash
   git clone https://github.com/Muhammed-Rizin/Gym-membership-mangment-frontend.git
3. Navigate to the project directory:
    ```bash
   cd Gym-membership-mangment-frontend
4. Install the required dependencies using npm:
    ```bash
    npm install
5. Create an `environment.ts` file in the `src/environments` folder to store environment-specific variables. Here's an example:
    ```bash
    export const environment = {
        production: false,
        apiUrl: 'https://your-backend-api-url.com', 
        razorpayKey: 'your-razorpay-key',
    };
6. Run the app:
    ```bash
    npm start