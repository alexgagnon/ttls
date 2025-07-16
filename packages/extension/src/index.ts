import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('TTL Helpers extension is now active!');

  // Register semantic tokens provider for template literals
  const legend = new vscode.SemanticTokensLegend(
    ['string', 'keyword', 'property', 'tag', 'attribute', 'value'],
    ['declaration', 'definition', 'readonly']
  );

  const provider: vscode.DocumentSemanticTokensProvider = {
    provideDocumentSemanticTokens(document: vscode.TextDocument): vscode.ProviderResult<vscode.SemanticTokens> {
      const builder = new vscode.SemanticTokensBuilder(legend);
      const text = document.getText();
      
      // Find css``, html``, and svg`` template literals
      const templateLiteralRegex = /(css|html|svg)`([^`]*)`/g;
      let match;
      
      while ((match = templateLiteralRegex.exec(text)) !== null) {
        const startPos = document.positionAt(match.index);
        const endPos = document.positionAt(match.index + match[0].length);
        
        // Highlight the tag (css, html, svg)
        const tagEndPos = document.positionAt(match.index + match[1].length);
        builder.push(
          new vscode.Range(startPos, tagEndPos),
          'keyword',
          ['declaration']
        );
      }
      
      return builder.build();
    }
  };

  // Register the provider for TypeScript and JavaScript files
  const selector = [
    { language: 'typescript', scheme: 'file' },
    { language: 'javascript', scheme: 'file' },
    { language: 'typescriptreact', scheme: 'file' },
    { language: 'javascriptreact', scheme: 'file' }
  ];

  context.subscriptions.push(
    vscode.languages.registerDocumentSemanticTokensProvider(selector, provider, legend)
  );

  // Register completion provider for CSS intellisense in css`` template literals
  const completionProvider: vscode.CompletionItemProvider = {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.ProviderResult<vscode.CompletionItem[]> {
      const text = document.getText();
      const offset = document.offsetAt(position);
      
      // Check if we're inside a css`` template literal from ttl-helpers
      if (isInsideCSSTemplateLiteral(text, offset)) {
        return getCSSCompletions(document, position);
      }
      
      // Check if we're inside an html`` template literal
      if (isInsideHTMLTemplateLiteral(text, offset)) {
        return getHTMLCompletions();
      }
      
      // Check if we're inside an svg`` template literal
      if (isInsideSVGTemplateLiteral(text, offset)) {
        return getSVGCompletions();
      }
      
      return [];
    }
  };

  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(selector, completionProvider)
  );

  const disposable = vscode.commands.registerCommand('first-extension.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World from TTL Helpers!');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
  console.log('TTL Helpers extension is now deactivated!');
}

// Helper functions for detecting template literals
function isInsideCSSTemplateLiteral(text: string, offset: number): boolean {
  // Look backwards to find the start of a css`` template literal
  const beforeCursor = text.substring(0, offset);
  const cssMatch = beforeCursor.lastIndexOf('css`');
  const endMatch = beforeCursor.lastIndexOf('`', cssMatch);
  
  // Check if we're inside a css`` template literal and it's from ttl-helpers
  if (cssMatch !== -1 && (endMatch === -1 || endMatch < cssMatch)) {
    // Check if there's an import from ttl-helpers
    return text.includes("from 'ttl-helpers'") || text.includes('from "ttl-helpers"');
  }
  
  return false;
}

function isInsideHTMLTemplateLiteral(text: string, offset: number): boolean {
  const beforeCursor = text.substring(0, offset);
  const htmlMatch = beforeCursor.lastIndexOf('html`');
  const endMatch = beforeCursor.lastIndexOf('`', htmlMatch);
  
  if (htmlMatch !== -1 && (endMatch === -1 || endMatch < htmlMatch)) {
    return text.includes("from 'ttl-helpers'") || text.includes('from "ttl-helpers"');
  }
  
  return false;
}

function isInsideSVGTemplateLiteral(text: string, offset: number): boolean {
  const beforeCursor = text.substring(0, offset);
  const svgMatch = beforeCursor.lastIndexOf('svg`');
  const endMatch = beforeCursor.lastIndexOf('`', svgMatch);
  
  if (svgMatch !== -1 && (endMatch === -1 || endMatch < svgMatch)) {
    return text.includes("from 'ttl-helpers'") || text.includes('from "ttl-helpers"');
  }
  
  return false;
}

function getCSSCompletions(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
  const completions: vscode.CompletionItem[] = [];
  
  // CSS Properties
  const cssProperties = [
    { name: 'color', snippet: 'color: ${1:#000};', description: 'Sets the color of text' },
    { name: 'background-color', snippet: 'background-color: ${1:#fff};', description: 'Sets the background color' },
    { name: 'font-size', snippet: 'font-size: ${1:16px};', description: 'Sets the size of the font' },
    { name: 'font-family', snippet: 'font-family: ${1:Arial, sans-serif};', description: 'Sets the font family' },
    { name: 'margin', snippet: 'margin: ${1:0};', description: 'Sets the margin on all sides' },
    { name: 'padding', snippet: 'padding: ${1:0};', description: 'Sets the padding on all sides' },
    { name: 'border', snippet: 'border: ${1:1px solid #000};', description: 'Sets the border' },
    { name: 'width', snippet: 'width: ${1:100%};', description: 'Sets the width' },
    { name: 'height', snippet: 'height: ${1:auto};', description: 'Sets the height' },
    { name: 'display', snippet: 'display: ${1|block,inline,flex,grid,none|};', description: 'Sets the display type' },
    { name: 'position', snippet: 'position: ${1|static,relative,absolute,fixed,sticky|};', description: 'Sets the positioning method' },
    { name: 'flex', snippet: 'flex: ${1:1};', description: 'Sets flex properties' },
    { name: 'grid', snippet: 'grid: ${1:auto};', description: 'Sets grid properties' },
    { name: 'text-align', snippet: 'text-align: ${1|left,center,right,justify|};', description: 'Sets text alignment' },
    { name: 'opacity', snippet: 'opacity: ${1:1};', description: 'Sets the opacity level' },
    { name: 'transform', snippet: 'transform: ${1:scale(1)};', description: 'Applies transformations' },
    { name: 'transition', snippet: 'transition: ${1:all 0.3s ease};', description: 'Sets transition effects' },
    { name: 'box-shadow', snippet: 'box-shadow: ${1:0 2px 4px rgba(0,0,0,0.1)};', description: 'Sets box shadow' },
    { name: 'border-radius', snippet: 'border-radius: ${1:4px};', description: 'Sets border radius' }
  ];
  
  cssProperties.forEach(prop => {
    const item = new vscode.CompletionItem(prop.name, vscode.CompletionItemKind.Property);
    item.insertText = new vscode.SnippetString(prop.snippet);
    item.documentation = new vscode.MarkdownString(prop.description);
    item.detail = 'CSS Property';
    completions.push(item);
  });
  
  // CSS Selectors
  const selectors = [
    { name: '.class', snippet: '.${1:class-name} {\n\t$2\n}', description: 'Class selector' },
    { name: '#id', snippet: '#${1:id-name} {\n\t$2\n}', description: 'ID selector' },
    { name: 'element', snippet: '${1:div} {\n\t$2\n}', description: 'Element selector' },
    { name: ':hover', snippet: ':hover {\n\t$1\n}', description: 'Hover pseudo-class' },
    { name: ':focus', snippet: ':focus {\n\t$1\n}', description: 'Focus pseudo-class' },
    { name: ':active', snippet: ':active {\n\t$1\n}', description: 'Active pseudo-class' }
  ];
  
  selectors.forEach(sel => {
    const item = new vscode.CompletionItem(sel.name, vscode.CompletionItemKind.Keyword);
    item.insertText = new vscode.SnippetString(sel.snippet);
    item.documentation = new vscode.MarkdownString(sel.description);
    item.detail = 'CSS Selector';
    completions.push(item);
  });
  
  return completions;
}

function getHTMLCompletions(): vscode.CompletionItem[] {
  const completions: vscode.CompletionItem[] = [];
  
  // Common HTML tags
  const htmlTags = [
    { name: 'div', snippet: '<div${1: class="$2"}>$3</div>', description: 'Division element' },
    { name: 'span', snippet: '<span${1: class="$2"}>$3</span>', description: 'Inline container' },
    { name: 'p', snippet: '<p${1: class="$2"}>$3</p>', description: 'Paragraph' },
    { name: 'h1', snippet: '<h1${1: class="$2"}>$3</h1>', description: 'Heading level 1' },
    { name: 'h2', snippet: '<h2${1: class="$2"}>$3</h2>', description: 'Heading level 2' },
    { name: 'a', snippet: '<a href="${1:#}"${2: class="$3"}>$4</a>', description: 'Anchor/link' },
    { name: 'img', snippet: '<img src="${1}" alt="${2}"${3: class="$4"} />', description: 'Image' },
    { name: 'button', snippet: '<button${1: type="button"}${2: class="$3"}>$4</button>', description: 'Button' },
    { name: 'input', snippet: '<input type="${1:text}"${2: class="$3"} />', description: 'Input field' },
    { name: 'ul', snippet: '<ul${1: class="$2"}>\n\t<li>$3</li>\n</ul>', description: 'Unordered list' },
    { name: 'ol', snippet: '<ol${1: class="$2"}>\n\t<li>$3</li>\n</ol>', description: 'Ordered list' },
    { name: 'li', snippet: '<li${1: class="$2"}>$3</li>', description: 'List item' }
  ];
  
  htmlTags.forEach(tag => {
    const item = new vscode.CompletionItem(tag.name, vscode.CompletionItemKind.Keyword);
    item.insertText = new vscode.SnippetString(tag.snippet);
    item.documentation = new vscode.MarkdownString(tag.description);
    item.detail = 'HTML Tag';
    completions.push(item);
  });
  
  return completions;
}

function getSVGCompletions(): vscode.CompletionItem[] {
  const completions: vscode.CompletionItem[] = [];
  
  // Common SVG elements
  const svgElements = [
    { name: 'circle', snippet: '<circle cx="${1:50}" cy="${2:50}" r="${3:25}"${4: fill="$5"} />', description: 'Circle element' },
    { name: 'rect', snippet: '<rect x="${1:0}" y="${2:0}" width="${3:100}" height="${4:100}"${5: fill="$6"} />', description: 'Rectangle element' },
    { name: 'line', snippet: '<line x1="${1:0}" y1="${2:0}" x2="${3:100}" y2="${4:100}"${5: stroke="$6"} />', description: 'Line element' },
    { name: 'path', snippet: '<path d="${1:M 10 10 L 90 90}"${2: stroke="$3"} />', description: 'Path element' },
    { name: 'text', snippet: '<text x="${1:50}" y="${2:50}"${3: fill="$4"}>$5</text>', description: 'Text element' },
    { name: 'g', snippet: '<g${1: transform="$2"}>\n\t$3\n</g>', description: 'Group element' },
    { name: 'polygon', snippet: '<polygon points="${1:0,0 100,0 50,100}"${2: fill="$3"} />', description: 'Polygon element' },
    { name: 'polyline', snippet: '<polyline points="${1:0,0 100,0 50,100}"${2: stroke="$3"} />', description: 'Polyline element' }
  ];
  
  svgElements.forEach(element => {
    const item = new vscode.CompletionItem(element.name, vscode.CompletionItemKind.Keyword);
    item.insertText = new vscode.SnippetString(element.snippet);
    item.documentation = new vscode.MarkdownString(element.description);
    item.detail = 'SVG Element';
    completions.push(item);
  });
  
  return completions;
}