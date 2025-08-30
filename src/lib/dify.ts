export const DIFY_API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_DIFY_API_URL || '',
  apiKey: process.env.NEXT_PUBLIC_DIFY_API_KEY ||  '',
};

export interface DifyMessage {
  // 必要に応じて他のパラメータを追加
}

export interface DifyResponse {
  question: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  ans: string;
}

export const callDifyAPI = async (): Promise<DifyResponse> => {
  if (!DIFY_API_CONFIG.apiKey) {
    throw new Error('DIFY_API_KEY が設定されていません。.env.local ファイルを確認してください。');
  }

  const response = await fetch(`https://api.dify.ai/v1/workflows/run`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${DIFY_API_CONFIG.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: {},
      response_mode: 'blocking',
      user: 'abc-123'
    }),
  });

  if (!response.ok) {
    throw new Error(`Dify API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Dify API レスポンス:', data);
  console.log('data.data.outputs:', data.data?.outputs);
  console.log('正解データ (ans):', data.data?.outputs?.ans);
  
  // Difyのレスポンス形式に合わせてパース
  // data.outputsの中に問題データが格納されている
  const outputs = data.data?.outputs || {};
  
  return {
    question: outputs.question || '問題が生成できませんでした',
    choice1: outputs.choise1 || outputs.choice1 || '選択肢1',
    choice2: outputs.choise2 || outputs.choice2 || '選択肢2',
    choice3: outputs.choise3 || outputs.choice3 || '選択肢3',
    choice4: outputs.choise4 || outputs.choice4 || '選択肢4',
    ans: outputs.ans || '正解が設定されていません'
  };
}; 