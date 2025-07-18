import type * as ts from 'typescript/lib/tsserverlibrary';

interface TemplateContext {
  node: ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral;
  tag: string;
  offset: number;
  stringContent: string;
}

interface Configuration {
  tags: string[];
  format: {
    enabled: boolean;
  };
}

function init(modules: { typescript: typeof ts }) {
  const ts = modules.typescript;

  function create(info: ts.server.PluginCreateInfo): ts.LanguageService {
    const logger = info.project.projectService.logger;
    logger.info('TTL Helpers CSS TypeScript plugin loaded');

    // Configuration
    let config: Configuration = {
      tags: ['css'],
      format: { enabled: true }
    };

    // Set up decorator object
    const proxy: ts.LanguageService = Object.create(null);
    for (let k of Object.keys(info.languageService) as Array<keyof ts.LanguageService>) {
      const x = info.languageService[k]!;
      // @ts-expect-error - we need to proxy all methods
      proxy[k] = (...args: Array<{}>) => x.apply(info.languageService, args);
    }

    // Enhance completions for CSS tagged template literals
    proxy.getCompletionsAtPosition = (fileName, position, options) => {
      const templateContext = getCSSTemplateContext(info, fileName, position);
      if (!templateContext) {
        return info.languageService.getCompletionsAtPosition(fileName, position, options);
      }

      return getCSSCompletions(templateContext, fileName, position, info);
    };

    // Add CSS semantic diagnostics (errors/warnings)
    proxy.getSemanticDiagnostics = (fileName) => {
      const originalDiagnostics = info.languageService.getSemanticDiagnostics(fileName);
      const cssDiagnostics = getCSSTemplateDiagnostics(fileName, info);
      return [...originalDiagnostics, ...cssDiagnostics];
    };

    // Add CSS hover information
    proxy.getQuickInfoAtPosition = (fileName, position) => {
      const templateContext = getCSSTemplateContext(info, fileName, position);
      if (!templateContext) {
        return info.languageService.getQuickInfoAtPosition(fileName, position);
      }

      return getCSSQuickInfo(templateContext, fileName, position, info);
    };

    return proxy;
  }

  function getCSSTemplateContext(info: ts.server.PluginCreateInfo, fileName: string, position: number): TemplateContext | undefined {
    const program = info.languageService.getProgram();
    if (!program) return undefined;

    const sourceFile = program.getSourceFile(fileName);
    if (!sourceFile) return undefined;

    let templateContext: TemplateContext | undefined;

    function visit(node: ts.Node): void {
      if (position >= node.getStart() && position <= node.getEnd()) {
        if (ts.isTaggedTemplateExpression(node)) {
          const tag = node.tag.getText();
          if (tag === 'css') {
            const templateStart = node.template.getStart() + 1; // +1 to skip opening backtick
            const offset = position - templateStart;
            const stringContent = getTemplateStringContent(node.template);
            
            if (stringContent && offset >= 0 && offset <= stringContent.length) {
              templateContext = {
                node: node.template,
                tag: tag,
                offset: offset,
                stringContent: stringContent
              };
            }
          }
        }
        ts.forEachChild(node, visit);
      }
    }

    visit(sourceFile);
    return templateContext;
  }

  function getTemplateStringContent(templateNode: ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral): string {
    if (ts.isNoSubstitutionTemplateLiteral(templateNode)) {
      return templateNode.text;
    } else if (ts.isTemplateExpression(templateNode)) {
      // Handle template expressions with interpolations
      // Replace ${...} with placeholder text to maintain positions
      let content = templateNode.head.text;
      for (const span of templateNode.templateSpans) {
        content += '${...}' + span.literal.text;
      }
      return content;
    }
    return '';
  }

  function getCSSCompletions(
    templateContext: TemplateContext,
    fileName: string,
    position: number,
    info: ts.server.PluginCreateInfo
  ): ts.CompletionInfo {
    
    // Comprehensive CSS properties
    const cssProperties = [
      // Layout
      'display', 'position', 'top', 'left', 'right', 'bottom', 'z-index',
      'float', 'clear', 'visibility', 'overflow', 'overflow-x', 'overflow-y',
      
      // Box Model
      'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height',
      'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
      'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
      'border', 'border-top', 'border-right', 'border-bottom', 'border-left',
      'border-width', 'border-style', 'border-color', 'border-radius',
      'box-sizing', 'box-shadow',
      
      // Background
      'background', 'background-color', 'background-image', 'background-size',
      'background-position', 'background-repeat', 'background-attachment',
      'background-clip', 'background-origin',
      
      // Typography
      'color', 'font-family', 'font-size', 'font-weight', 'font-style',
      'font-variant', 'font-stretch', 'line-height', 'letter-spacing',
      'word-spacing', 'text-align', 'text-decoration', 'text-transform',
      'text-indent', 'text-shadow', 'white-space', 'word-wrap', 'word-break',
      
      // Flexbox
      'flex', 'flex-direction', 'flex-wrap', 'flex-flow', 'justify-content',
      'align-items', 'align-content', 'align-self', 'flex-grow', 'flex-shrink',
      'flex-basis', 'order',
      
      // Grid
      'grid', 'grid-template-columns', 'grid-template-rows', 'grid-template-areas',
      'grid-template', 'grid-column', 'grid-row', 'grid-area', 'grid-gap',
      'grid-column-gap', 'grid-row-gap', 'justify-items', 'justify-self',
      'align-items', 'align-self', 'place-items', 'place-self',
      
      // Transforms & Animations
      'transform', 'transform-origin', 'transition', 'transition-property',
      'transition-duration', 'transition-timing-function', 'transition-delay',
      'animation', 'animation-name', 'animation-duration', 'animation-timing-function',
      'animation-delay', 'animation-iteration-count', 'animation-direction',
      'animation-fill-mode', 'animation-play-state',
      
      // Appearance
      'opacity', 'cursor', 'outline', 'outline-color', 'outline-style',
      'outline-width', 'outline-offset', 'resize', 'user-select',
      
      // Table
      'table-layout', 'border-collapse', 'border-spacing', 'caption-side',
      'empty-cells', 'vertical-align',
      
      // Lists
      'list-style', 'list-style-type', 'list-style-position', 'list-style-image',
      
      // Content
      'content', 'counter-reset', 'counter-increment', 'quotes'
    ];

    // Context-aware completions based on cursor position
    const contextualCompletions = getCSSContextualCompletions(templateContext);

    return {
      isGlobalCompletion: false,
      isMemberCompletion: false,
      isNewIdentifierLocation: false,
      entries: [
        ...cssProperties.map(prop => ({
          name: prop,
          kind: ts.ScriptElementKind.constElement,
          kindModifiers: 'declare',
          sortText: '0',
          source: 'css-language-service'
        })),
        ...contextualCompletions
      ]
    };
  }

  function getCSSContextualCompletions(templateContext: TemplateContext): ts.CompletionEntry[] {
    const completions: ts.CompletionEntry[] = [];
    const content = templateContext.stringContent;
    const offset = templateContext.offset;
    
    // Get the current line context
    const beforeCursor = content.substring(0, offset);
    const afterCursor = content.substring(offset);
    
    // Check if we're after a colon (property value context)
    const lastColonIndex = beforeCursor.lastIndexOf(':');
    const lastSemicolonIndex = beforeCursor.lastIndexOf(';');
    
    if (lastColonIndex > lastSemicolonIndex) {
      // We're in a property value context
      const propertyMatch = beforeCursor.substring(0, lastColonIndex).match(/(\w+[-\w]*)\s*$/);
      if (propertyMatch) {
        const property = propertyMatch[1];
        const values = getCSSPropertyValues(property);
        
        completions.push(...values.map(value => ({
          name: value,
          kind: ts.ScriptElementKind.enumElement,
          kindModifiers: 'declare',
          sortText: '0',
          source: 'css-values'
        })));
      }
    }
    
    return completions;
  }

  function getCSSPropertyValues(property: string): string[] {
    const propertyValues: { [key: string]: string[] } = {
      'display': ['block', 'inline', 'inline-block', 'flex', 'grid', 'none', 'table', 'table-cell', 'table-row'],
      'position': ['static', 'relative', 'absolute', 'fixed', 'sticky'],
      'float': ['left', 'right', 'none'],
      'clear': ['left', 'right', 'both', 'none'],
      'overflow': ['visible', 'hidden', 'scroll', 'auto'],
      'visibility': ['visible', 'hidden', 'collapse'],
      'text-align': ['left', 'center', 'right', 'justify'],
      'text-decoration': ['none', 'underline', 'overline', 'line-through'],
      'text-transform': ['none', 'uppercase', 'lowercase', 'capitalize'],
      'font-weight': ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
      'font-style': ['normal', 'italic', 'oblique'],
      'flex-direction': ['row', 'column', 'row-reverse', 'column-reverse'],
      'flex-wrap': ['nowrap', 'wrap', 'wrap-reverse'],
      'justify-content': ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
      'align-items': ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
      'align-content': ['stretch', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around'],
      'cursor': ['auto', 'pointer', 'default', 'text', 'wait', 'help', 'move', 'crosshair', 'not-allowed', 'grab', 'grabbing'],
      'box-sizing': ['content-box', 'border-box'],
      'white-space': ['normal', 'nowrap', 'pre', 'pre-wrap', 'pre-line'],
      'word-wrap': ['normal', 'break-word'],
      'user-select': ['none', 'auto', 'text', 'all']
    };

    return propertyValues[property] || [];
  }

  function getCSSTemplateDiagnostics(fileName: string, info: ts.server.PluginCreateInfo): ts.Diagnostic[] {
    const program = info.languageService.getProgram();
    if (!program) return [];

    const sourceFile = program.getSourceFile(fileName);
    if (!sourceFile) return [];

    const diagnostics: ts.Diagnostic[] = [];

    function visit(node: ts.Node): void {
      if (ts.isTaggedTemplateExpression(node)) {
        const tag = node.tag.getText();
        if (tag === 'css') {
          const templateContent = getTemplateStringContent(node.template);
          const templateDiagnostics = validateCSSContent(templateContent, node, sourceFile!);
          diagnostics.push(...templateDiagnostics);
        }
      }
      ts.forEachChild(node, visit);
    }

    visit(sourceFile);
    return diagnostics;
  }

  function validateCSSContent(
    content: string,
    node: ts.TaggedTemplateExpression,
    sourceFile: ts.SourceFile
  ): ts.Diagnostic[] {
    const diagnostics: ts.Diagnostic[] = [];

    // Check for common CSS syntax errors
    if (content.includes(';;')) {
      diagnostics.push({
        file: sourceFile,
        start: node.template.getStart() + 1,
        length: content.length,
        messageText: 'Double semicolon found in CSS',
        category: ts.DiagnosticCategory.Warning,
        code: 50001
      });
    }

    // Check for unclosed braces
    const openBraces = (content.match(/{/g) || []).length;
    const closeBraces = (content.match(/}/g) || []).length;
    if (openBraces !== closeBraces) {
      diagnostics.push({
        file: sourceFile,
        start: node.template.getStart() + 1,
        length: content.length,
        messageText: 'Unmatched braces in CSS',
        category: ts.DiagnosticCategory.Error,
        code: 50002
      });
    }

    // Check for missing semicolons (basic check)
    const rules = content.split('}').filter(rule => rule.trim());
    for (const rule of rules) {
      const declarations = rule.split('{')[1]?.split(';').filter(decl => decl.trim());
      if (declarations && declarations.length > 0) {
        const lastDecl = declarations[declarations.length - 1];
        if (lastDecl && lastDecl.includes(':') && !lastDecl.endsWith(';')) {
          diagnostics.push({
            file: sourceFile,
            start: node.template.getStart() + 1,
            length: content.length,
            messageText: 'Missing semicolon in CSS declaration',
            category: ts.DiagnosticCategory.Warning,
            code: 50003
          });
        }
      }
    }

    return diagnostics;
  }

  function getCSSQuickInfo(
    templateContext: TemplateContext,
    fileName: string,
    position: number,
    info: ts.server.PluginCreateInfo
  ): ts.QuickInfo | undefined {
    
    // Provide hover information for CSS properties
    const wordAtPosition = getWordAtPosition(templateContext.stringContent, templateContext.offset);
    
    if (wordAtPosition) {
      const cssPropertyInfo = getCSSPropertyInfo(wordAtPosition);
      if (cssPropertyInfo) {
        return {
          kind: ts.ScriptElementKind.constElement,
          kindModifiers: 'declare',
          textSpan: {
            start: position - wordAtPosition.length,
            length: wordAtPosition.length
          },
          displayParts: [
            { text: 'CSS Property: ', kind: 'text' },
            { text: wordAtPosition, kind: 'propertyName' }
          ],
          documentation: [{ text: cssPropertyInfo, kind: 'text' }]
        };
      }
    }

    return undefined;
  }

  function getWordAtPosition(content: string, offset: number): string | undefined {
    const before = content.substring(0, offset);
    const after = content.substring(offset);
    
    const beforeMatch = before.match(/[\w-]+$/);
    const afterMatch = after.match(/^[\w-]*/);
    
    if (beforeMatch && afterMatch) {
      return beforeMatch[0] + afterMatch[0];
    }
    
    return undefined;
  }

  function getCSSPropertyInfo(property: string): string | undefined {
    const cssPropertyDocs: { [key: string]: string } = {
      'display': 'Specifies the display behavior (the type of rendering box) of an element.',
      'position': 'Sets how an element is positioned in a document.',
      'background-color': 'Sets the background color of an element.',
      'color': 'Sets the color of text.',
      'font-size': 'Sets the size of the font.',
      'margin': 'Sets the margin area on all four sides of an element.',
      'padding': 'Sets the padding area on all four sides of an element.',
      'border': 'Sets the border properties of an element.',
      'width': 'Sets the width of an element.',
      'height': 'Sets the height of an element.',
      'flex': 'Sets the flexible length on flexible items.',
      'flex-direction': 'Sets the direction of the flexible items.',
      'justify-content': 'Defines how the browser distributes space between and around content items.',
      'align-items': 'Sets the align-self value on all direct children as a group.',
      'grid': 'A shorthand property for all the explicit grid properties.',
      'grid-template-columns': 'Defines the columns of the grid with a space-separated list of values.',
      'transform': 'Lets you rotate, scale, skew, or translate an element.',
      'transition': 'Sets the CSS properties to transition and how long the transition should take.',
      'animation': 'Sets the keyframe-based animations.',
      'opacity': 'Sets the opacity level for an element.',
      'z-index': 'Sets the z-order of a positioned element.'
    };
    
    return cssPropertyDocs[property];
  }

  return { create };
}

export default init;
