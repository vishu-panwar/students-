# GharBazaar Services Page (React + Vite)

Responsive Services page inspired by the supplied GharBazaar mobile UI reference.

## Add to an existing Vite project

1. Copy `src/Services.jsx` and `src/Services.css` into your project's `src/` directory.
2. Install the icon dependency:

   ```bash
   npm install lucide-react
   ```

3. Render the page from your route or `App.jsx`:

   ```jsx
   import Services from './Services';
   export default function App() { return <Services />; }
   ```

4. Ensure your `index.html` contains the usual Vite root element and that your app imports its normal entry file.

## Important integration notes

- This is a front-end UI implementation. The enquiry modal currently validates the form locally and shows a demo success state; connect its `submit` handler to your real API/backend before production.
- Replace the example phone number, email address, social links, and any service pricing with your verified business details.
- Property photos load from Unsplash URLs. For production, download approved images into your own assets or use your existing image CDN.
- If your existing site already has a header/footer, keep those shared components and remove the page-level header/footer in `Services.jsx` to avoid duplication.
- The component is self-contained and uses no routing library. Add it to your existing route configuration as appropriate.
