# DearMe

A web application to write some notes for yourself.

## Features

- **Diary Entries**: Write and save your daily thoughts and experiences.
- **Mood Tracking**: Track your mood daily and visualize trends over time.
- **Search**: Easily search through your diary entries.
- **Statistics**: View statistics about your mood trends.
- **Theme Switching**: Switch between different themes to personalize your experience.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type safety and better developer experience.
- **Tailwind CSS**: For styling the application.
- **Framer Motion**: For animations.
- **Vite**: For fast development and build tooling.

## Getting Started

1. **Clone the repository**:

   ```sh
   git clone https://github.com/yourusername/dearme.git
   cd dearme
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Run the development server**:

   ```sh
   npm run dev
   ```

4. **Build for production**:

   ```sh
   npm run build
   ```

5. **Preview the production build**:
   ```sh
   npm run preview
   ```

## Folder Structure

- `src/`: Contains the source code.
  - `components/`: Contains React components.
  - `context/`: Contains context providers and types.
  - `utils/`: Contains utility functions.
  - `assets/`: Contains static assets like images.
- `public/`: Contains public assets.
- `index.html`: The main HTML file.
- `index.css`: The main CSS file.
- `main.tsx`: The entry point for the React application.

## Future Ideas

### Mood Tracking Reminders

- Implement push notifications or email reminders to encourage users to log their mood daily.
- Allow users to set custom reminder times.

### Journal Prompts

- Add a feature that provides daily or weekly writing prompts to inspire users when they're not sure what to write about.
- Include different categories of prompts (e.g., self-reflection, gratitude, goal-setting).

### Data Export and Backup

- Allow users to export their diary entries and mood data in various formats (e.g., PDF, CSV).
- Implement cloud backup functionality to prevent data loss.

### Advanced Search and Filtering

- Enhance the search functionality to allow filtering by date range, mood, or tags.
- Implement a calendar view to easily navigate entries by date.

### Mood Correlations

- Analyze mood patterns in relation to other factors like weather, sleep, or custom user-defined variables.
- Provide insights and visualizations based on these correlations.

### Voice-to-Text Entry

- Allow users to dictate their diary entries using speech recognition.

### Goal Tracking

- Integrate a goal-setting feature where users can set and track personal goals alongside their diary entries.

### Collaboration Features

- Allow users to share specific entries or mood data with trusted friends or therapists.
- Implement a commenting system for shared entries.

### Multimedia Entries

- Expand on the existing image upload feature to allow video and audio attachments to entries.

### Journaling Streaks and Gamification

- Implement a streak system to encourage consistent journaling.
- Add achievements or badges for reaching certain milestones.

### Guided Journaling Sessions

- Create structured journaling exercises or guided reflection sessions.

### Integration with Wearables

- Allow integration with fitness trackers or smartwatches to automatically log physical activity or sleep data alongside mood entries.

### AI-Powered Insights

- Implement natural language processing to analyze entry content and provide insights on emotional trends or recurring themes.

### Encryption and Privacy Features

- Add end-to-end encryption for entries.
- Implement a PIN or biometric lock for the app.

## License

This project is licensed under the MIT License.
