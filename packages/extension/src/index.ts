import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('TTL Helpers extension is now active!');

  	const disposable = vscode.commands.registerCommand('first-extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from TTL Helpers!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
  console.log('TTL Helpers extension is now deactivated!');
}