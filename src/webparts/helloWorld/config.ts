// SPFxのバージョン情報を取得する。
import { Version } from '@microsoft/sp-core-library';
// WEBパーツの外見や動作をカスタマイズする。
import {
	type IPropertyPaneConfiguration,
	PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
// クライアントサイド作成時の基本クラス
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import type { IReadonlyTheme } from '@microsoft/sp-component-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloWorldWebPart.module.scss';
import * as strings from 'HelloWorldWebPartStrings';

export {
	Version,
	IPropertyPaneConfiguration,
	PropertyPaneTextField,
	BaseClientSideWebPart,
	IReadonlyTheme,
	escape,
	styles,
	strings,
};
