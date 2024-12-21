// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as path from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "rgaa-checker" is now active!');

	const disposable = vscode.commands.registerCommand('extension.runCheck', () => {
        vscode.window.showErrorMessage('runCheck.');
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('Ouvrez un fichier HTML pour effectuer la vérification.');
            return;
        }

        const filePath = editor.document.fileName;

        // Chemin du script Python
        const scriptPath = path.join(context.extensionPath, 'src/rgaa_checker.py');

        // Commande pour exécuter le script Python
        const command = `python "${scriptPath}" "${filePath}"`;

        exec(command, (err, stdout, stderr) => {
            if (err) {
                vscode.window.showErrorMessage(`Erreur lors de l'exécution du script : ${stderr}`);
                return;
            }
            vscode.window.showInformationMessage('Vérification RGAA terminée.');
            const outputChannel = vscode.window.createOutputChannel('RGAA Checker');
            outputChannel.appendLine(stdout);
            outputChannel.show();
        });
    });
	context.subscriptions.push(disposable);
}
