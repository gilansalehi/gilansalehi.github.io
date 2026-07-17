# Test Backlog

- Loads each page directly from its `?page=` URL
- Falls back to Home for unknown and inherited-property `?page=` values
- Loads the correct data-wrapper view from every navigation link
- Displays routed article views without requiring a hash `:target`
- Restores the correct view with browser Back and Forward navigation
- Preserves the global CSS cascade inside every loaded view
- Preserves resume visual styling from the original site
- Updates menu position and theme colors from Preferences
- Closes the navigation menu with Escape and the page overlay
- Initializes scroll animations after each view loads
- Smoothly scrolls `#scrolltarget` into view after the Home view loads
- Preserves the Home hero and Resume visual design
- Presents About and Contact together below the Home hero
- Recolors the About and Contact composition from all three theme controls
- Loads About as a standalone routed view
- Presents Skills above the project entries within the Portfolio view
- Keeps the combined Portfolio layout readable across mobile and desktop widths
- Fails closed when the pinned shim artifact fails integrity validation
