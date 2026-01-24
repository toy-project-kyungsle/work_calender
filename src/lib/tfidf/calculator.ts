/**
 * TF-IDF 계산 모듈
 * Term Frequency, Inverse Document Frequency 계산
 */

/**
 * TF (Term Frequency) 계산
 * TF(t, d) = count(t in d) / total_tokens(d)
 *
 * @param tokens 문서의 토큰 배열
 * @returns 각 토큰의 TF 값 Map
 */
export function calculateTF(tokens: string[]): Map<string, number> {
  const tfMap = new Map<string, number>();
  const totalTokens = tokens.length;

  if (totalTokens === 0) {
    return tfMap;
  }

  // 각 토큰의 출현 횟수 계산
  const tokenCounts = new Map<string, number>();
  for (const token of tokens) {
    tokenCounts.set(token, (tokenCounts.get(token) || 0) + 1);
  }

  // TF 계산: 출현 횟수 / 전체 토큰 수
  for (const [token, count] of tokenCounts) {
    tfMap.set(token, count / totalTokens);
  }

  return tfMap;
}

/**
 * IDF (Inverse Document Frequency) 계산
 * IDF(t) = log(N / df(t)) + 1
 * where N = total documents, df(t) = documents containing t
 *
 * @param documents 문서별 토큰 배열의 배열
 * @returns 각 토큰의 IDF 값 Map
 */
export function calculateIDF(documents: string[][]): Map<string, number> {
  const idfMap = new Map<string, number>();
  const totalDocs = documents.length;

  if (totalDocs === 0) {
    return idfMap;
  }

  // 각 토큰이 등장한 문서 수 계산
  const docFrequency = new Map<string, number>();

  for (const doc of documents) {
    // 문서 내 고유 토큰만 카운트 (중복 제거)
    const uniqueTokens = new Set(doc);
    for (const token of uniqueTokens) {
      docFrequency.set(token, (docFrequency.get(token) || 0) + 1);
    }
  }

  // IDF 계산: log(N / df) + 1
  for (const [token, df] of docFrequency) {
    idfMap.set(token, Math.log(totalDocs / df) + 1);
  }

  return idfMap;
}

/**
 * TF-IDF 점수 계산
 * TF-IDF(t, d) = TF(t, d) × IDF(t)
 *
 * @param tf 토큰별 TF 값 Map
 * @param idf 토큰별 IDF 값 Map
 * @returns 각 토큰의 TF-IDF 점수 Map
 */
export function calculateTFIDF(
  tf: Map<string, number>,
  idf: Map<string, number>
): Map<string, number> {
  const tfidfMap = new Map<string, number>();

  for (const [token, tfValue] of tf) {
    const idfValue = idf.get(token) || 1; // IDF가 없으면 1 사용
    tfidfMap.set(token, tfValue * idfValue);
  }

  return tfidfMap;
}

/**
 * 여러 문서에서 전체 IDF를 계산하고 각 문서의 TF-IDF를 반환합니다.
 *
 * @param documents 문서별 토큰 배열의 배열
 * @returns 문서별 TF-IDF Map 배열
 */
export function calculateAllTFIDF(
  documents: string[][]
): Map<string, number>[] {
  const idf = calculateIDF(documents);

  return documents.map((doc) => {
    const tf = calculateTF(doc);
    return calculateTFIDF(tf, idf);
  });
}
