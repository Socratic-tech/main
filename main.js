document.addEventListener('DOMContentLoaded', () => {
    const toolsContainer = document.getElementById('tools-container');

    // --- Core Function: Render Tools ---
    function renderTools(tools) {
        toolsContainer.innerHTML = ''; // Clear existing cards
        if (!tools || tools.length === 0) {
            toolsContainer.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">No tools available yet!</p>';
            return;
        }

        tools.forEach(tool => {
            const card = document.createElement('div');
            card.className = 'tool-card';
            card.innerHTML = `
                <h2>${tool.icon} ${tool.title}</h2>
                <p>${tool.description}</p>
                <div class="button-group">
                    <a href="${tool.launch_url}" class="btn primary">Launch Tool</a>
                    <a href="${tool.source_url}" class="btn secondary">View Source</a>
                </div>
            `;
            toolsContainer.appendChild(card);
        });
    }

    // --- Fetch Tools from JSON File ---
    async function loadTools() {
        try {
            const response = await fetch('tools.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const tools = await response.json();
            
            // Render on the main page
            renderTools(tools);

        } catch (error) {
            console.error('Could not load tools.json:', error);
            toolsContainer.innerHTML = '<p style="text-align: center;">Error loading tools. Please check console.</p>';
        }
    }

    // Initial load
    loadTools();
});
