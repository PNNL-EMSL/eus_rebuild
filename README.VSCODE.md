Plugins to install:

- https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag
- https://marketplace.visualstudio.com/items?itemName=xyz.local-history
- https://marketplace.visualstudio.com/items?itemName=rexebin.classio
- https://marketplace.visualstudio.com/items?itemName=patrys.vscode-code-outline

These are my user settings:
```
// Place your settings in this file to overwrite the default settings
{
    "workbench.editor.enablePreview": false,
    "workbench.editor.enablePreviewFromQuickOpen": false,
    "eslint.enable": true,
    "eslint.trace.server": "verbose",
    "explorer.autoReveal": true,
    "explorer.workingFiles.maxVisible": 50,
    "workbench.quickOpen.closeOnFocusLost": false,
    "editor.formatOnSave": false,
    "editor.tabSize": 2,
    "editor.insertSpaces": true,
    "terminal.integrated.shell.windows": "C:\\Windows\\Sysnative\\WindowsPowerShell\\v1.0\\powershell.exe",
    "editor.fontSize": 16,
    "window.zoomLevel": 0,
    "git.path": "E:\\Program Files\\Git\\bin\\git.exe"
}
```

These are my workspace settings:
```
{
// The number of spaces a tab is equal to. This setting is overriden
// based on the file contents when `editor.detectIndentation` is true.
"editor.tabSize": 2,

// Insert spaces when pressing Tab. This setting is overriden
// based on the file contents when `editor.detectIndentation` is true.
"editor.insertSpaces": true,

// When opening a file, `editor.tabSize` and `editor.insertSpaces`
// will be detected based on the file contents. Set to false to keep
// the values you've explicitly set, above.
"editor.detectIndentation": false
}
```