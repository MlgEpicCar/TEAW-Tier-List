let players = [];
const membersContainer = document.querySelector('.members');

// Function to create player cards
function renderPlayerCards(players) {
    membersContainer.innerHTML = ''; // Clear existing cards

    // Sort players alphabetically by gamertag
    players.sort((a, b) => a.gamertag.localeCompare(b.gamertag));

    players.forEach(player => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('member');
        memberDiv.draggable = true; // Make the member draggable

        // Create the player skin image element
        const playerImage = document.createElement('img');
        playerImage.classList.add('player-skin');
        playerImage.src = `https://starlightskins.lunareclipse.studio/render/ultimate/${player.gamertag}/full`;
        playerImage.alt = `${player.gamertag} skin`;
        playerImage.height = 150;

        // Create the name element (now only displaying gamertag)
        const playerName = document.createElement('p');
        playerName.classList.add('name');
        playerName.textContent = player.gamertag; // Only show gamertag

        // Append image and gamertag to the memberDiv
        memberDiv.appendChild(playerImage);
        memberDiv.appendChild(playerName);

        // Set the ID for the memberDiv
        memberDiv.id = player.gamertag;

        // Drag events
        memberDiv.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', player.gamertag);
            event.dataTransfer.effectAllowed = 'move';
        });

        membersContainer.appendChild(memberDiv);
    });
}

// Handle drop events for tiers
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

// Fetch player data
fetch('/data/players.json')
    .then(response => response.json())
    .then(data => {
        players = data.players;
        renderPlayerCards(players);
    })
    .catch(error => {
        console.error('Error loading player data:', error);
    });

// Name or gamertag display toggle (optional, can be removed)
document.getElementById('toggle-display').addEventListener('change', (event) => {
    displayMode = event.target.value; // This part can be simplified or removed
    renderPlayerCards(players);
});
