import * as vscode from 'vscode';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
	// shift + ctrl + p 输入helloworld
	const disposable = vscode.commands.registerCommand('helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from play-plugin!');
		vscode.window.showInformationMessage('Hello World from play-plugin!',{ modal: true });
	});

    // 资源管理器和编辑器右键查看文件信息
    const commandOfgetFileSize = vscode.commands.registerCommand('getFileSize', uri => {
        // 文件路径
        const filePath = uri.path.substring(1);
        fs.stat(filePath, (err, stats) => {
            if (err) {
                vscode.window.showErrorMessage(`获取文件时遇到错误了${err}!!!`);
            }

            if (stats.isDirectory()) {
                vscode.window.showWarningMessage(`检测的是文件夹，不是文件，请重新选择！！！`);
            }

            if (stats.isFile()) {
                const size = stats.size;
                const createTime = stats.birthtime.toLocaleString();
                const modifyTime = stats.mtime.toLocaleString();
                vscode.window.showInformationMessage(`
	    文件大小为: ${size}字节
    文件创建时间为: ${createTime}
    文件修改时间为: ${modifyTime}
                `, { modal: true });
            }
        });

        const stats = fs.statSync(filePath);
        console.log('stats', stats);
        console.log('isFile', stats.isFile());
    });

    // 将命令放入其上下文对象中，使其生效
    context.subscriptions.push(disposable, commandOfgetFileSize);
}

// This method is called when your extension is deactivated
export function deactivate() {}
