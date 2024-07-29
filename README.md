# Pet Adoption Application

This project is a React-based application that allows users to search for pets that are available for adoption. The application fetches data from a pet adoption API and displays a list of pets. Users can filter the list based on animal type, location, and breed, and view detailed information about each pet.

## Features

- **Search Pets**: Users can search for pets based on animal type, location (city), and breed.
- **View Pet Details**: Detailed information about each pet, including name, animal type, breed, description, state, city, and images.
- **Responsive Design**: The application is designed to work on various screen sizes.

## Technologies Used

- React
- Axios for HTTP requests
- Context API for state management
- React Router for navigation
- Tailwind CSS for styling

  ## Usage

1. **Search for Pets**: Use the search form to filter pets by animal type, location, and breed.
2. **View Pet Details**: Click on a pet's name in the list to view detailed information.

## Components

- **PetList**: Displays a list of pets. Fetches the list of pets from the API on component mount.
- **PetDetails**: Displays detailed information about a selected pet.
- **SearchComponent**: Provides a form for users to search for pets based on animal type, location, and breed.
- **ErrorBoundary**: Catches and displays errors gracefully.

## Screenshots
### Home Page
![Home Page](https://github.com/user-attachments/assets/c7007c50-1fb2-4aee-aae8-8d8584358afc)

### Details Page
![Details Page](https://github.com/user-attachments/assets/c5163471-8ed7-46e7-8d6d-1520bbabfdca)


## Installation


1. Clone the repository:
    ```sh
    git clone https://github.com/Dervin29/front_end_assignment.git
    cd frontend_assignment
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm run dev
    ```

## Hosted Link
[Project URL](https://pet-application.netlify.app/)
