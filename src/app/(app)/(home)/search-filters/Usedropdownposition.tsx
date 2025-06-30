import React, { RefObject } from 'react'

// Custom function to calculate dropdown position based on a reference element
export const useDropDownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement> // Accepts a ref to a div element
) => {
  // Function to compute the dropdown's top and left position
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 }; 
    // If the ref is not attached to any DOM element, return default (top: 0, left: 0)

    const rect = ref.current.getBoundingClientRect();
    // Get the bounding box of the element (position and dimensions relative to the viewport)

    const dropdownWidth = 240; // Fixed dropdown width (w-60 in Tailwind = 15rem = 240px)

    let left = rect.left + window.scrollX;
    // Start with the element's left edge (accounting for horizontal scroll)

    const top = rect.bottom + window.scrollY;
    // Position the dropdown below the element (accounting for vertical scroll)

    // Check if dropdown will overflow the right side of the screen
    if (left + dropdownWidth > window.innerWidth) {
      // Reposition the dropdown to align its right edge with the element’s right edge
      left = rect.right + window.scrollX - dropdownWidth;

      // If repositioning causes left edge to go off-screen, push it back into view
      if (left < 0) {
        left = window.innerWidth - dropdownWidth - 16; // Leave a 16px margin from right
      }
    }

    if (left < 0) {
      left = 16; // Leave at least 16px margin from the left edge
    }

    return { top, left };
  };

  return { getDropdownPosition };
}
