import { css, html, xml } from 'ttls';

// HTML tagged template literal with interpolation
const name = 'World';
const htmlTemplate = html`
    <div class="greeting">
        <h1>Hello, ${name}!</h1>
        <p>This is a template with dynamic content.</p>
        <ul>
            ${['item1', 'item2', 'item3'].map(item => html`<li>${item}</li>`).join('')}
        </ul>
    </div>
`;

// CSS tagged template literal with variables
const primaryColor = '#007acc';
const styles = css`
    .greeting {
        background: linear-gradient(45deg, ${primaryColor}, #0099ff);
        padding: 2rem;
        border-radius: 12px;
        color: white;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    .greeting h1 {
        margin: 0 0 1rem 0;
        font-size: 2.5rem;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    .greeting ul {
        list-style: none;
        padding: 0;
    }
    
    .greeting li {
        padding: 0.5rem;
        margin: 0.25rem 0;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
    }
`;

// XML/SVG tagged template literal
const width = 100;
const height = 100;
const svgContent = xml`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
            </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="40" fill="url(#grad1)" stroke="black" stroke-width="2"/>
        <text x="50" y="55" text-anchor="middle" fill="black" font-family="Arial">SVG</text>
    </svg>
`;

// Nested template literals
const complexTemplate = html`
    <div class="app">
        <style>
            ${styles}
        </style>
        <header>
            ${svgContent}
        </header>
        <main>
            ${htmlTemplate}
        </main>
    </div>
`;

export { htmlTemplate, styles, svgContent, complexTemplate };
