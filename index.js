// This is a simple proxy to load the correct index.js file
import("./src/index.js").catch((err) => {
  console.error("Error loading src/index.js:", err);
  // Try API directory as fallback
  import("./api/index.js").catch((err) => {
    console.error("Error loading api/index.js:", err);
    console.error(
      "Could not load any valid index.js file. Please check your project structure."
    );
    process.exit(1);
  });
});
