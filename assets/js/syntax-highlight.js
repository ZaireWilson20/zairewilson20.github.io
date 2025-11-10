// Simple syntax highlighter for C# code in modals
// This applies when modals are opened
document.addEventListener('DOMContentLoaded', function() {
    // Wait for modal to be opened
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                highlightCode();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Also run on initial load
    highlightCode();
});

function highlightCode() {
    const codeBlocks = document.querySelectorAll('code.language-csharp');
    
    codeBlocks.forEach(block => {
        if (block.classList.contains('highlighted')) return;
        
        let code = block.textContent; // Use textContent to get plain text
        
        // Escape HTML entities first
        code = code.replace(/&/g, '&amp;')
                   .replace(/</g, '&lt;')
                   .replace(/>/g, '&gt;');
        
        // Apply highlighting in specific order to avoid conflicts
        // 1. Comments first (they override everything else)
        code = code.replace(/(\/\/[^\n]*)/g, '<span class="c1">$1</span>');
        
        // 2. Strings 
        code = code.replace(/"([^"]*)"/g, '<span class="s2">"$1"</span>');
        
        // 3. Attributes (before keywords to catch [Server], [Client], etc.)
        code = code.replace(/\[([A-Za-z]+)\]/g, '<span class="nd">[$1]</span>');
        
        // 4. Numbers
        code = code.replace(/\b(\d+)\b/g, '<span class="mi">$1</span>');
        
        // 5. Keywords (avoid matching inside HTML tags we just created)
        code = code.replace(/\b(public|private|protected|static|abstract|class|interface|void|async|return|if|else|foreach|while|var|new|using|namespace|await|break)\b(?![^<]*>)/g, 
            '<span class="k">$1</span>');
        
        // 6. Types (avoid matching inside HTML tags)
        code = code.replace(/\b(bool|int|string|float|double|List|Stack|Task|ScriptableObject|NetworkBehaviour|VisualElement|CardData|CardAbility|GameContext|StackEntry|Card|Target|Button|TextField|ListView|AbilityListItem|EditorWindow)\b(?![^<]*>)/g, 
            '<span class="kt">$1</span>');
        
        // 7. Method/Function names (capitalized word before opening paren)
        code = code.replace(/\b([A-Z][a-zA-Z0-9_]*)\s*(?=\()/g, 
            '<span class="nf">$1</span>');
        
        block.innerHTML = code;
        block.classList.add('highlighted');
    });
}