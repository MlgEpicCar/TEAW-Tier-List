
// this is all stolen, i am the phantom thief, i will learn how it works and slowly change it and stuff

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.innerHTML);
    event.dataTransfer.setData("id", event.target.id);
}

function drop(event) {
    event.preventDefault();

    // Prevent dropping on another item
    if (event.target.className !== "drop-zone") {
        return;
    }

    const data = event.dataTransfer.getData("text");
    
    // Create a new div for the dropped item
    const newItem = document.createElement("div");
    newItem.className = "item";
    newItem.innerHTML = data;
    newItem.draggable = true;

    // Add event listeners for the new item
    newItem.ondragstart = drag;
    newItem.ondragend = function () {
        this.remove(); // Remove item when dragged out
    };

    // Append to the drop zone
    event.target.appendChild(newItem);

    // Remove the original item
    const originalItemId = event.dataTransfer.getData("id");
    const originalItem = document.getElementById(originalItemId);
    originalItem.remove();

    // Adjust the height of the drop zone
    adjustDropZoneHeight(event.target);
}

function adjustDropZoneHeight(dropZone) {
    const items = dropZone.querySelectorAll('.item');
    const height = items.length > 0 ? items.length * 40 + 20 : 100; // Dynamic height based on items
    dropZone.style.height = `${height}px`; // Update height
}




// Handle drag events for tiers
document.querySelectorAll('.tier').forEach(tier => {
    tier.addEventListener('dragover', (event) => {
        event.preventDefault(); // Allow drop
        event.dataTransfer.dropEffect = 'move';
    });

    tier.addEventListener('drop', (event) => {
        event.preventDefault();
        const gamertag = event.dataTransfer.getData('text/plain');
        const playerDiv = document.getElementById(gamertag);
        if (playerDiv) {
            tier.appendChild(playerDiv); // Move the player card to the tier
        }
    });
});

// Enable scrolling while dragging
document.addEventListener('dragover', (event) => {
    event.preventDefault(); // Prevent default behavior to allow drop
    const scrollAmount = 20; // Number of pixels to scroll
    const windowHeight = window.innerHeight;
    const scrollY = event.clientY; // Mouse Y position

    // Scroll down
    if (scrollY > windowHeight - 50) {
        window.scrollBy(0, scrollAmount);
    }

    // Scroll up
    if (scrollY < 50) {
        window.scrollBy(0, -scrollAmount);
    }
});





// Make tiers editable
document.querySelectorAll('.tier').forEach(tier => {
    tier.addEventListener('dblclick', () => {
        const currentText = tier.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.classList.add('tier-input');
        
        // Replace tier text with input field
        tier.innerHTML = '';
        tier.appendChild(input);
        
        // Focus and select input text
        input.focus();
        input.select();

        // Save changes on blur or enter
        input.addEventListener('blur', () => {
            tier.textContent = input.value || 'Tier Name'; // Default text if empty
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                tier.textContent = input.value || 'Tier Name'; // Default text if empty
                e.preventDefault(); // Prevent new line
            }
        });
    });
});
