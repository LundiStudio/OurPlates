document.addEventListener('DOMContentLoaded', function () {
    const foodItems = document.querySelectorAll('.food');

    foodItems.forEach(item => {
        item.addEventListener('mousedown', dragStart);
    });

    function dragStart(e) {
        const item = e.target;

        // Ensure the element is absolutely positioned
        item.style.position = 'absolute';

        // Get current position (from inline style or calculated style)
        const rect = item.getBoundingClientRect();
        const offsetX = e.clientX - rect.left; // Calculate how far the mouse is from the element
        const offsetY = e.clientY - rect.top;

        // Prevent the item from jumping to the mouse position on mousedown
        // The item stays at its current position until the dragging starts

        function dragMove(e) {
            e.preventDefault();  // Prevent default drag behavior

            // Update the position of the food item based on mouse movements
            item.style.left = `${e.clientX - offsetX}px`;  // Set the position of the left side to align with mouse
            item.style.top = `${e.clientY - offsetY}px`;   // Set the position of the top side to align with mouse
        }

        function dragEnd() {
            // Save the position of the dragged food item
            localStorage.setItem(item.id, JSON.stringify({
                left: item.style.left,
                top: item.style.top
            }));

            // Remove the dragMove listener after the item is dropped
            document.removeEventListener('mousemove', dragMove);
            document.removeEventListener('mouseup', dragEnd);
        }

        // Listen for dragging movements and release
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', dragEnd);
    }

    // Load saved positions from localStorage on page load
    foodItems.forEach(item => {
        const savedPosition = localStorage.getItem(item.id);

        if (savedPosition) {
            const { left, top } = JSON.parse(savedPosition);
            item.style.left = left;
            item.style.top = top;
        }
    });
});

