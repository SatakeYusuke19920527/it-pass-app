# Dify API設定ガイド

## 1. 環境変数の設定

プロジェクトのルートディレクトリに`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```bash
# Dify API設定
NEXT_PUBLIC_DIFY_API_URL=https://api.dify.ai/v1
NEXT_PUBLIC_DIFY_API_KEY=your_dify_api_key_here
```

**重要**: ファイル名は必ず`.env.local`としてください（`.env`ではありません）。

### 手動でファイルを作成する場合

1. プロジェクトのルートディレクトリで右クリック
2. 「新規作成」→「テキスト ドキュメント」
3. ファイル名を`.env.local`に変更（拡張子も含めて）
4. 上記の内容をコピー&ペースト
5. 保存して閉じる

**注意**: Windowsでは`.env.local.`という名前になる場合があります。その場合は`.env.local`に変更してください。

## 2. 必要な値の取得方法

### API Key
1. [Dify](https://dify.ai)にログイン
2. ワークスペースを選択
3. 設定 → API Keys
4. 新しいAPI Keyを作成

### API URL
- 通常は `https://api.dify.ai/v1` を使用
- カスタムドメインを使用している場合は、そのドメインを指定



## 3. 使用方法

設定が完了すると、`src/lib/dify.ts`の`callDifyAPI`関数を使用してDify APIを呼び出すことができます。

```typescript
import { callDifyAPI } from '@/lib/dify';

const data = await callDifyAPI();
```

### API エンドポイント

この実装では、Difyのワークフロー実行エンドポイント `/workflows/run` を使用しています。

### レスポンス形式

Dify APIからのレスポンスは以下の形式で返されます：

```json
{
  "task_id": "3fac4096-3907-46da-a2a8-c7998f3d05ec",
  "workflow_run_id": "4b19cac0-4346-4c72-af70-1748b416d27a",
  "data": {
    "outputs": {
      "question": "エベレスト山はどの大陸に位置していますか？",
      "choise1": "選択肢1: アフリカ",
      "choise2": "選択肢2: 南アメリカ",
      "choise3": "選択肢3: アジア",
      "choise4": "選択肢4: ヨーロッパ",
      "ans": "3"
    }
  }
}
```

curlコマンドの例：

```bash
curl -X POST 'https://api.dify.ai/v1/workflows/run' \
--header 'Authorization: Bearer {api_key}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "inputs": {},
    "response_mode": "blocking",
    "user": "abc-123"
}'
```

## 4. 注意事項

- `.env.local`ファイルはGitにコミットしないでください
- API Keyは機密情報なので、適切に管理してください
- 本番環境では、環境変数を適切に設定してください

## 5. トラブルシューティング

### 401 Unauthorized エラーが発生する場合

1. **API Keyの確認**
   - Difyの設定画面でAPI Keyが正しく生成されているか確認
   - API Keyが有効期限切れになっていないか確認

2. **環境変数の確認**
   - `.env.local`ファイルが正しい場所にあるか確認
   - ファイル名が`.env.local`になっているか確認
   - 値に余分なスペースや改行が含まれていないか確認

3. **アプリケーションの再起動**
   - 環境変数を変更した後は、開発サーバーを再起動してください
   - `npm run dev` または `yarn dev` を停止して再実行

4. **デバッグ情報の確認**
   - ブラウザの開発者ツールのコンソールでログを確認
   - `Dify API Config:` のログで設定値が正しく読み込まれているか確認 