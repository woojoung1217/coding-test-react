import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import styles from './ProductSearch.module.css';

// Mock API: 실제 네트워크 호출 대신 비동기 동작을 시뮬레이션합니다.
const searchProductsAPI = async (query: string): Promise<string[]> => {
  console.log(`Searching for: ${query}`);
  // 실제 API라면 여기에서 fetch/axios를 사용하여 서버에 요청을 보냅니다.
  if (!query) {
    return [];
  }
  // 검색어에 따라 가짜 데이터를 반환합니다.
  const mockData = ['Apple', 'Banana', 'Orange', 'Grape', 'Pineapple'];
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockData.filter(item => item.toLowerCase().includes(query.toLowerCase())));
    }, 500); // 500ms의 네트워크 지연을 시뮬레이션합니다.
  });
};


const ProductSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // useDebounce 훅을 사용하여 사용자의 타이핑을 지연시킵니다.
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms 지연

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsLoading(true);
      searchProductsAPI(debouncedSearchTerm).then(data => {
        setIsLoading(false);
        setResults(data);
      });
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className={styles.searchContainer}>
      <h2>상품 검색 (Debounce 테스트)</h2>
      <p>아래 입력창에 과일 이름을 입력하면, 500ms 후에 검색 결과가 나타납니다.</p>
      <p><code>utils/debounce.ts</code> 파일을 수정하여 <code>debounce</code> 함수를 완성하세요.</p>
      <input
        type="text"
        placeholder="과일 이름 검색... (예: apple)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      {isLoading && <div>검색 중...</div>}
      <ul className={styles.resultsList}>
        {results.map(result => (
          <li key={result}>{result}</li>
        ))}
        {!isLoading && results.length === 0 && debouncedSearchTerm && (
          <li>검색 결과가 없습니다.</li>
        )}
      </ul>
    </div>
  );
};

export default ProductSearch;
