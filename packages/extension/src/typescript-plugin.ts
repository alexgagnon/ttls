import * as ts from 'typescript/lib/tsserverlibrary';

import { decorateWithTemplateLanguageService, TemplateLanguageService, type TemplateContext } from 'typescript-template-language-service-decorator';

class EchoTemplateLanguageService implements TemplateLanguageService {
    getCompletionsAtPosition(
        context: TemplateContext,
        position: ts.LineAndCharacter
    ): ts.CompletionInfo {
        const line = context.text.split(/\n/g)[position.line];
        return {
            isGlobalCompletion: false,
            isMemberCompletion: false,
            isNewIdentifierLocation: false,
            entries: [
                {
                    name: line.slice(0, position.character),
                    // @ts-ignore-line
                    kind: '',
                    kindModifiers: 'echo',
                    sortText: 'echo'
                }
            ]
        };
    }
}

export default function(mod: { typescript: typeof ts }) {
    return {
        create(info: ts.server.PluginCreateInfo): ts.LanguageService {
            return decorateWithTemplateLanguageService(
                mod.typescript,
                info.languageService,
                info.project,
                new EchoTemplateLanguageService(),
                { tags: ['echo'] });
        }
    };
}