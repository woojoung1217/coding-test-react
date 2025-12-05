import { describe, it, expect } from 'vitest';
import * as utils from './dataUtils';
import type { User, Product } from './dataUtils';

// Mock 데이터
const mockUsers: User[] = [
  { id: 1, name: 'Alice', age: 25, isActive: true, department: 'HR', tags: ['react', 'typescript'] },
  { id: 2, name: 'Bob', age: 30, isActive: false, department: 'Engineering', tags: ['nodejs'] },
  { id: 3, name: 'Charlie', age: 35, isActive: true, department: 'Engineering', tags: ['react', 'css'] },
  { id: 4, name: 'David', age: 22, isActive: false, department: 'Marketing', tags: [] },
  { id: 5, name: 'Eve', age: 40, isActive: true, department: 'HR', tags: ['management'] },
  { id: 6, name: 'Grace', age: 19, isActive: true, department: 'Marketing', tags: ['react'] },
];

const mockProducts: Product[] = [
  { id: 1, name: 'Laptop', price: 1200, category: 'Electronics', stock: 10 },
  { id: 2, name: 'Mouse', price: 25, category: 'Electronics', stock: 30 },
  { id: 3, name: 'Keyboard', price: 75, category: 'Electronics', stock: 0 },
  { id: 4, name: 'T-shirt', price: 20, category: 'Apparel', stock: 100 },
  { id: 5, name: 'Jeans', price: 80, category: 'Apparel', stock: 50 },
];

describe('데이터 조작 유틸리티', () => {

  describe('문제 1: filterActiveUsers', () => {
    it('활성 사용자만 반환해야 합니다', () => {
      const result = utils.filterActiveUsers(mockUsers);
      expect(result.length).toBe(4);
      expect(result.every(u => u.isActive)).toBe(true);
    });
  });

  describe('문제 2: findUserById', () => {
    it('사용자를 ID로 찾아야 합니다', () => {
      const result = utils.findUserById(mockUsers, 3);
      expect(result?.name).toBe('Charlie');
    });
  });

  describe('문제 3: createUserMap', () => {
    it('사용자 ID와 name 으로 매핑된 객체를 만들어야 합니다', () => {
      const result = utils.createUserMap(mockUsers);
      expect(result[1]).toBe('Alice');
      expect(result[4]).toBe('David');
      expect(Object.keys(result).length).toBe(6);
    });
  });

  describe('문제 4: sortArrayByKey', () => {
    it('사용자를 나이별 내림차순으로 정렬해야 합니다', () => {
      const result = utils.sortArrayByKey(mockUsers, 'age', 'desc');
      expect(result.map(u => u.age)).toEqual([40, 35, 30, 25, 22, 19]);
    });
    it('제품을 이름별 오름차순으로 정렬해야 합니다', () => {
      const result = utils.sortArrayByKey(mockProducts, 'name', 'asc');
      expect(result.map(p => p.name)).toEqual(['Jeans', 'Keyboard', 'Laptop', 'Mouse', 'T-shirt']);
    });
  });

  describe('문제 5: paginate', () => {
    it('올바른 page item 리스트를 반환해야 합니다', () => {
      const result = utils.paginate(mockProducts, 2, 2);
      expect(result.items.length).toBe(2);
      expect(result.items[0].name).toBe('Keyboard');
      expect(result.currentPage).toBe(2);
      expect(result.totalPages).toBe(3);
      expect(result.totalItems).toBe(5);
    });
  });

  describe('문제 6: addIsAdultProperty', () => {
    it('각 사용자에게 isAdult 속성을 추가해야 합니다', () => {
      const result = utils.addIsAdultProperty(mockUsers);
      expect(result.find(u => u.id === 1)?.isAdult).toBe(true); // Alice, 25
      expect(result.find(u => u.id === 6)?.isAdult).toBe(false); // Grace, 19
      expect(result.every(u => typeof u.isAdult === 'boolean')).toBe(true);
    });
  });

  describe('문제 7: getCategoryTotals', () => {
    it('각 카테고리별 총 가격을 객체 맵으로 계산해야 합니다', () => {
      const result = utils.getCategoryTotals(mockProducts);
      expect(result['Electronics'].totalPrice).toBe(1200 + 25 + 75);
      expect(result['Apparel'].totalPrice).toBe(20 + 80);
    });
  });

  describe('문제 8: mergeAndDeduplicateUsers', () => {
    const moreUsers: User[] = [
      { id: 5, name: 'Eve Updated', age: 41, isActive: true, department: 'HR' },
      { id: 6, name: 'Frank', age: 28, isActive: false, department: 'Finance' },
    ];
    it('두 사용자 배열을 Merge 하고 중복 배열을 제거해야 합니다', () => {
      const result = utils.mergeAndDeduplicateUsers(mockUsers, moreUsers);
      expect(result.length).toBe(6);
      expect(result.find(u => u.id === 5)?.age).toBe(41); // Eve(id 5번) 는 업데이트 되어야 합니다.
      expect(result.find(u => u.id === 6)?.name).toBe('Frank');
    });
  });

  describe('문제 9: findUsersByTag', () => {
    it('특정 태그를 가진 모든 사용자를 찾을 수 있어야 합니다', () => {
      const result = utils.findUsersByTag(mockUsers, 'react');
      expect(result.length).toBe(3);
      expect(result.map(u => u.name).sort()).toEqual(['Alice', 'Charlie', 'Grace']);
    });
  });

  describe('문제 10: getDepartmentSummary', () => {
    it('department 별 DepartmentSummary 를 반환해야 합니다', () => {
      const result = utils.getDepartmentSummary(mockUsers);
      expect(result['HR'].userCount).toBe(2);
      expect(result['HR'].averageAge).toBe((25 + 40) / 2);
      expect(result['Engineering'].userCount).toBe(2);
      expect(result['Engineering'].averageAge).toBe((30 + 35) / 2);
      expect(result['Marketing'].userCount).toBe(2);
      expect(result['Marketing'].averageAge).toBe(20.5);
    });
  });
});
