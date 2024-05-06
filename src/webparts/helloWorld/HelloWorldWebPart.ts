import {
	Version,
	DisplayMode,
	Environment,
	EnvironmentType,
	IPropertyPaneConfiguration,
	PropertyPaneTextField,
	BaseClientSideWebPart,
	IReadonlyTheme,
	escape,
	styles,
	strings,
} from './config';
// プロパティを定義している(らしい)
export interface IHelloWorldWebPartProps {
	description: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {
	private _isDarkTheme: boolean = false;
	private _environmentMessage: string = '';

	public render(): void {
		const pageMode: string =
			this.displayMode === DisplayMode.Edit
				? '編集中です。'
				: '読取モードです。';
		const environmentType: string =
			Environment.type === EnvironmentType.ClassicSharePoint
				? 'クラシックページです。'
				: 'モダンページです。';
		this.domElement.innerHTML = `
    <section class="${styles.helloWorld} ${
			!!this.context.sdks.microsoftTeams ? styles.teams : ''
		}">
	  <div>Page mode: <strong>${escape(pageMode)}</strong></div>
	  <div>Environment: <strong>${escape(environmentType)}</strong></div>
      <div class="${styles.welcome}">
        <img alt="" src="${
					this._isDarkTheme
						? require('./assets/welcome-dark.png')
						: require('./assets/welcome-light.png')
				}" class="${styles.welcomeImage}" />
        <h2>Well done, ${escape(
					this.context.pageContext.user.displayName
				)}!</h2>
        <div>${this._environmentMessage}</div>
        <div>Webパーツのプロパティから値を取得: <strong>${escape(
					this.properties.description
				)}</strong></div>
      </div>
      <div>
        <h3>やっほー! 元気？</h3>
        <p>
        The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It's the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
        </p>
		<button type="button">Show welcome message</button>
      </div>
    </section>`;
		this.domElement
			.getElementsByTagName('button')[0]
			.addEventListener('click', (event: MouseEvent) => {
				event.preventDefault();
				alert('Welcome to the SharePoint Framework!');
			});
	}

	protected onInit(): Promise<void> {
		// onInitメソッドはWEBパーツ初期化時に読まれる
		// 環境メッセージが読み出された後に環境メッセージを表示する。
		return this._getEnvironmentMessage().then((message) => {
			this._environmentMessage = message;
		});
	}
	// 現在の実行環境に応じて適切な環境メッセージを取得する機能
	private _getEnvironmentMessage(): Promise<string> {
		if (!!this.context.sdks.microsoftTeams) {
			// running in Teams, office.com or Outlook
			return this.context.sdks.microsoftTeams.teamsJs.app
				.getContext()
				.then((context) => {
					let environmentMessage: string = '';
					switch (context.app.host.name) {
						case 'Office': // running in Office
							environmentMessage = this.context.isServedFromLocalhost
								? strings.AppLocalEnvironmentOffice
								: strings.AppOfficeEnvironment;
							break;
						case 'Outlook': // running in Outlook
							environmentMessage = this.context.isServedFromLocalhost
								? strings.AppLocalEnvironmentOutlook
								: strings.AppOutlookEnvironment;
							break;
						case 'Teams': // running in Teams
						case 'TeamsModern':
							environmentMessage = this.context.isServedFromLocalhost
								? strings.AppLocalEnvironmentTeams
								: strings.AppTeamsTabEnvironment;
							break;
						default:
							environmentMessage = strings.UnknownEnvironment;
					}

					return environmentMessage;
				});
		}

		return Promise.resolve(
			this.context.isServedFromLocalhost
				? strings.AppLocalEnvironmentSharePoint
				: strings.AppSharePointEnvironment
		);
	}
	// テーマが変更されたときに呼び出されるハンドラーを提供する機能
	protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
		if (!currentTheme) {
			return;
		}

		this._isDarkTheme = !!currentTheme.isInverted;
		const { semanticColors } = currentTheme;

		if (semanticColors) {
			this.domElement.style.setProperty(
				'--bodyText',
				semanticColors.bodyText || null
			);
			this.domElement.style.setProperty('--link', semanticColors.link || null);
			this.domElement.style.setProperty(
				'--linkHovered',
				semanticColors.linkHovered || null
			);
		}
	}
	// データのバージョンを管理する機能
	protected get dataVersion(): Version {
		return Version.parse('1.0');
	}
	// プロパティペインの構成を定義する機能
	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription,
					},
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField('description', {
									label: strings.DescriptionFieldLabel,
								}),
							],
						},
					],
				},
			],
		};
	}
}
