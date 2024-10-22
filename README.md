# E-Commerce Product List Application

## Project Overview
This project is a Simple E-Commerce Product List Application built using **React**, **TypeScript**, and **RTK Query**. The application displays a list of products fetched from a mock API, supports infinite scrolling for dynamic loading of products, and allows users to search for specific items. Users can add products to their cart, with a cart summary(total items and total price) displayed at the top of the app. The cart data is persisted in the Redux state, ensuring that users retain their selections even after refreshing the page.

## Functionalities 
1. **Product Listing with Infinite Scroll**
2. **Search Functionality**
3. **Cart Management**
4. **Responsive Design**
 

## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- Node.js (version 17 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Nisha0202/ecommerce-app.git
   cd ecommerce-app
   ```

2. Install dependencies:
   ```bash
   npm install
   Running the App Locally
   ```


3. Start the development server:
   ```bash
   npm start
   ```

### Open your browser and navigate to http://localhost:3000.

## Project Structure

The directory structure of the application is organized as follows:
```
/src
  /app
    └── store.ts
  /components
    ├── CartSummary.tsx
    └── ProductList.tsx
  /features
    /cart
      └── cartSlice.ts
  /services
    └── productApi.ts
  /types
    └── types.ts
  ├── App.css
  ├── App.tsx
  └── main.tsx
```

## Key Architectural Choices

### React Functional Components
Leveraged React's functional components and hooks for state and lifecycle management.
### RTK Query
Used for efficient data fetching and caching from the FakeStore API.
### Redux Toolkit
Simplified the process of managing global state, particularly for the shopping cart.
### Redux Persist
Integrated redux-persist to automatically save and rehydrate the shopping cart state in localStorage, ensuring that users' cart data is preserved even after refreshing the page.
### ypeScript
Ensured type safety across the application, reducing runtime errors and improving developer experience.
### Tailwind CSS
Utilized Tailwind CSS for styling, allowing for rapid design implementation with a utility-first approach that promotes responsive and adaptive UI.



For any questions or suggestions, feel free to open an issue on the repository or contact me at [nishajabatunnessa@gmail.com].