# Frontend Summary

This project features a responsive event listing web page built using React, React Hook Form, Axios, React Query, Tailwind CSS, and Zod. The application integrates with the Google Events API to fetch and display real-time events in Sydney, Australia.
> Note: Due to the limitations of the free tier of the Google Events API, a single IP address can only perform 5 searches every 46 minutes.

- [Live Preview of project](https://dummyevent.netlify.app/)  


## 🎯 Key Features

1. Beautiful Event Display

- Grid Layout: Responsive card-based layout, optimized for all screen sizes.

- Event Cards: Showcases image, title, date/time, venue, rating, and description.

- Visual Icons: Intuitive use of icons for calendar, location, ratings, and ticket actions.

- Modern Aesthetic: Clean, minimal, and modern design.

2. Responsive Design

- Mobile-first: Seamless experience on phones, tablets, and desktops.
  
- Dynamic Layout: Adaptive grid (1 to 3 columns) based on screen width.
  
- Touch-Friendly: Optimized button size and spacing for mobile interactions.

3. UI/UX Enhancements

- Hover Effects: Subtle and engaging interactions on cards and buttons.

- Loading States: Spinner and feedback during API requests.

- Empty States: Friendly messages when no events are found.

- Error States: Clearly communicated user-friendly error messages.

4. Search Functionality

- Search Input: Search bar to find events by city or keyword.

- Validation: Zod-based schema validation for input safety.

- Async Handling: Feedback provided during data fetching or failure.

5. Data Integration & Dev Experience

- API Ready: Seamlessly integrates with a backend API using Axios.

- TypeScript Support: Strong typing for maintainability and clarity.

- React Query: Efficient data fetching, caching, and state management.
