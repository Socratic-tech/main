document.addEventListener('DOMContentLoaded', () => {
    const toolsContainer = document.getElementById('tools-container');
    const siteManager = document.getElementById('site-manager');
    const managerToggle = document.getElementById('manager-toggle');
    const jsonEditor = document.getElementById('json-editor');
    const saveToolsButton = document.getElementById('save-tools');

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
            
            // Load content into the editor
            jsonEditor.value = JSON.stringify(tools, null, 4);

        } catch (error) {
            console.error('Could not load tools.json:', error);
            toolsContainer.innerHTML = '<p style="text-align: center;">Error loading tools. Please check console.</p>';
        }
    }

    // --- Site Manager Interaction ---
    managerToggle.addEventListener('click', (e) => {
        e.preventDefault();
        // Toggle visibility of the manager section
        siteManager.style.display = (siteManager.style.display === 'block' ? 'none' : 'block');
    });

    saveToolsButton.addEventListener('click', () => {
        try {
            // Parse JSON from the editor
            const newTools = JSON.parse(jsonEditor.value);
            
            // Re-render the tools on the page
            renderTools(newTools);
            
            alert('Homepage updated successfully! Remember to commit tools.json to GitHub for permanent change.');

        } catch (error) {
            alert('Error: Invalid JSON format. Please check your syntax.');
            console.error(error);
        }
    });

    // Initial load
    loadTools();
});
