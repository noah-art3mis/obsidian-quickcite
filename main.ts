import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
	Vault,
	TFile,
	TFolder,
} from "obsidian";
import {
	blank_book,
	blank_article,
	blank_inbook,
	blank_misc,
} from "src/blanks";
import { makeAliases, makeApa } from "src/utils";

interface QuickCiteSettings {
	referencesFolder: string;
}

const DEFAULT_SETTINGS: Partial<QuickCiteSettings> = {
	referencesFolder: "QuickSite References",
};

export default class QuickCite extends Plugin {
	settings: QuickCiteSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// ==================================

		this.makeRefFolder();

		this.addCommand({
			id: "create-reference",
			name: "Create Reference",
			callback: async () => {
				let filePath = this.settings.referencesFolder;
				let path = filePath + "/TESTE.md";
				let contents = " ";

				let fileExists = this.app.vault.getAbstractFileByPath(path);
				if (!fileExists) {
					await this.app.vault.create(path, contents);
					// handle naming
					// set file as active
					// select title
				} else {
					new Notice("Error! File already exists or is not a file");
				}
			},
		});

		this.addCommand({
			id: "blank-ref-note",
			name: "Add blank frontmatter (book type) to current note",
			callback: async () => {
				const file = this.app.workspace.getActiveFile();

				if (file) {
					this.makeFrontmatter(file, blank_book);
				} else {
					new Notice("Error! File not found");
				}
			},
		});

		this.addCommand({
			id: "gen-ref-note",
			name: "Generate aliases and APA ref from frontmatter (current note)",
			callback: async () => {
				const file = this.app.workspace.getActiveFile();
				if (file) {
					try {
						await this.app.fileManager.processFrontMatter(
							file,
							(frontmatter) => {
								frontmatter.apa = makeApa(frontmatter);
								frontmatter.aliases = makeAliases(frontmatter);
							}
						);
					} catch (e) {
						throw e;
					}
				}
			},
		});

		// ==================================

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: "open-sample-modal-simple",
			name: "Open sample modal (simple)",
			callback: () => {
				new SampleModal(this.app).open();
			},
		});

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: "sample-editor-command",
			name: "Sample editor command",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection("Sample Editor Command");
			},
		});

		// This adds a settings tab so the user can configure various aspects of the plugin

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		// this.registerDomEvent(document, "click", (evt: MouseEvent) => {
		// 	console.log("click", evt);
		// });

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(
			window.setInterval(() => console.log("setInterval"), 5 * 60 * 1000)
		);
	}

	onunload() {
		console.log("unloading plugin");
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	// ==================================

	async makeRefFolder() {
		const default_folder = this.settings.referencesFolder;
		let folder = this.app.vault.getAbstractFileByPath(default_folder);
		if (folder === null) {
			await this.app.vault.createFolder(default_folder);
		}
	}

	// cant test; object is modified directly
	async makeFrontmatter(file: TFile, fm: any) {
		await this.app.fileManager.processFrontMatter(file, (frontmatter) => {
			Object.keys(fm).forEach((key) => {
				frontmatter[key] = fm[key];
			});
		});
	}

	// ==============================================
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText("Woah!");
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: QuickCite;

	constructor(app: App, plugin: QuickCite) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("References Folder")
			.setDesc(
				"Reference Notes are saved here. The folder can be anywhere, such as 'Project A/Refs' YOU NEED TO SET ONE BEFORE USING. THERE IS NO DEFAULT SETTING"
			)
			.addText((text) =>
				text
					.setPlaceholder("NO DEFAULT")
					.setValue(this.plugin.settings.referencesFolder)
					.onChange(async (value) => {
						this.plugin.settings.referencesFolder = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
