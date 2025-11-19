import { UIExtension } from '@voiden/sdk/ui';

export class HelloWorldExtension extends UIExtension {
  name = 'hello-world';
  version = '1.0.0';
  description = 'A simple Hello World extension';
  author = 'Voiden Team';

  async onLoad(): Promise<void> {
    // Register a simple slash command
    this.registerSlashCommand({
      name: 'hello',
      label: 'Say Hello',
      description: 'Insert a friendly greeting',
      slash: '/hello',
      icon: 'Smile',
      action: (editor) => {
        // Insert text at cursor position
        editor.commands.insertContent({
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Hello from Voiden! 👋'
            }
          ]
        });

        // Show a toast notification
        this.showToast('Hello World command executed!', 'success');
      }
    });

    console.log('Hello World extension loaded!');
  }

  async onUnload(): Promise<void> {
    console.log('Hello World extension unloaded!');
  }
}
