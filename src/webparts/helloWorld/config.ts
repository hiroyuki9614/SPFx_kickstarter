// SPFxのバージョン情報を取得する。
import {
	Version,
	DisplayMode,
	Environment,
	EnvironmentType,
} from '@microsoft/sp-core-library';
// WEBパーツの外見や動作をカスタマイズする。
import {
	type IPropertyPaneConfiguration,
	PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
// クライアントサイド作成時の基本クラス 必須
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
// SharePoint サイトのテーマ情報を取得するためのインターフェースです。これを使用すると、Web パーツがテーマに適合した外観を提供できます。
import type { IReadonlyTheme } from '@microsoft/sp-component-base';
// HTML エスケープを行うための関数です。これにより、ユーザーが提供した入力やデータを安全に表示することができます。
import { escape } from '@microsoft/sp-lodash-subset';
// scssを読み込む
import styles from './HelloWorldWebPart.module.scss';
// 言語のローカライズ
import * as strings from 'HelloWorldWebPartStrings';

export {
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
};
