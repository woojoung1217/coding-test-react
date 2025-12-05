import React, { useState } from 'react';
import * as utils from '../utils/dataUtils';
import type { User, Product } from '../utils/dataUtils';
import styles from './DataDisplay.module.css';

// 확장된 Mock 데이터
const mockUsers: User[] = [
  { id: 1, name: '앨리스', age: 28, isActive: true, department: '인사팀' },
  { id: 2, name: '밥', age: 35, isActive: false, department: '개발팀' },
  { id: 3, name: '찰리', age: 22, isActive: true, department: '개발팀' },
  { id: 4, name: '데이브', age: 40, isActive: false, department: '마케팅팀' },
  { id: 5, name: '이브', age: 31, isActive: true, department: '인사팀' },
];

const mockProducts: Product[] = [
  { id: 1, name: '노트북', price: 1200000, category: '전자기기', stock: 15 },
  { id: 2, name: '마우스', price: 25000, category: '전자기기', stock: 30 },
  { id: 3, name: '티셔츠', price: 30000, category: '의류', stock: 100 },
  { id: 4, name: '청바지', price: 80000, category: '의류', stock: 0 },
  { id: 5, name: '소설책', price: 15000, category: '도서', stock: 50 },
  { id: 6, name: '키보드', price: 75000, category: '전자기기', stock: 5 },
  { id: 7, name: '모니터', price: 350000, category: '전자기기', stock: 10 },
  { id: 8, name: '후드티', price: 55000, category: '의류', stock: 20 },
];

const DataDisplay: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  // dataUtils.ts의 함수들을 호출하여 결과를 계산합니다.
  const activeUsers = utils.filterActiveUsers(mockUsers);
  const categoryTotals = utils.getCategoryTotals(mockProducts);
  const paginatedProducts = utils.paginate(mockProducts, currentPage, pageSize);
  const departmentSummary = utils.getDepartmentSummary(mockUsers);

  return (
    <div className={styles.container}>
      <h2>데이터 조작 결과 (UI 연동)</h2>
      <p><code>utils/dataUtils.ts</code> 파일의 함수들을 완성하면 아래 결과가 올바르게 표시됩니다.</p>

      <div className={styles.section}>
        <h3>문제 1: 활성 사용자 (filterActiveUsers)</h3>
        {activeUsers.length > 0 ? (
          <ul className={styles.list}>{activeUsers.map(u => <li key={u.id}>{u.name}</li>)}</ul>
        ) : <p className={styles.noResult}>결과 없음</p>}
      </div>

      <div className={styles.section}>
        <h3>문제 7: 카테고리별 총액 (getCategoryTotals)</h3>
        {Object.keys(categoryTotals).length > 0 ? (
          <table className={styles.table}>
            <thead><tr><th>카테고리</th><th>총액</th></tr></thead>
            <tbody>
              {Object.entries(categoryTotals).map(([category, { totalPrice }]) => (
                <tr key={category}><td>{category}</td><td>{totalPrice.toLocaleString()}원</td></tr>
              ))}
            </tbody>
          </table>
        ) : <p className={styles.noResult}>결과 없음</p>}
      </div>

      <div className={styles.section}>
        <h3>문제 5: 상품 목록 페이지네이션 (paginate)</h3>
        {paginatedProducts.items.length > 0 ? (
          <>
            <table className={styles.table}>
              <thead><tr><th>ID</th><th>상품명</th><th>가격</th></tr></thead>
              <tbody>
                {paginatedProducts.items.map(p => (
                  <tr key={p.id}><td>{p.id}</td><td>{p.name}</td><td>{p.price.toLocaleString()}원</td></tr>
                ))}
              </tbody>
            </table>
            <div className={styles.paginationControls}>
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>이전</button>
              <span>페이지 {paginatedProducts.currentPage} / {paginatedProducts.totalPages}</span>
              <button onClick={() => setCurrentPage(p => Math.min(paginatedProducts.totalPages, p + 1))} disabled={currentPage === paginatedProducts.totalPages}>다음</button>
            </div>
          </>
        ) : <p className={styles.noResult}>결과 없음</p>}
      </div>

      <div className={styles.section}>
        <h3>문제 10: 부서별 요약 (getDepartmentSummary)</h3>
        {Object.keys(departmentSummary).length > 0 ? (
          <table className={styles.table}>
            <thead><tr><th>부서</th><th>인원수</th><th>평균 연령</th></tr></thead>
            <tbody>
              {Object.entries(departmentSummary).map(([dept, summary]) => (
                <tr key={dept}>
                  <td>{dept}</td>
                  <td>{summary.userCount}명</td>
                  <td>{summary.averageAge.toFixed(1)}세</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p className={styles.noResult}>결과 없음</p>}
      </div>
    </div>
  );
};

export default DataDisplay;
