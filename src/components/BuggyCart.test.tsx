import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BuggyCart from './BuggyCart';

describe('BuggyCart Component', () => {
  it('수량이 증가하면 즉시 총 가격이 업데이트되어야 합니다.', () => {
    // 이 테스트는 지원자가 버그를 수정한 후에 통과해야 합니다.
    render(<BuggyCart />);

    // 초기 총가격: (35000 * 1) + (28000 * 2) + (15000 * 1) = 106,000원
    const initialPrice = screen.getByText(/총가격: 106,000원/i);
    expect(initialPrice).toBeInTheDocument();

    // 첫 번째 상품 '+' 버튼 클릭
    const increaseButtons = screen.getAllByRole('button', { name: '+' });
    fireEvent.click(increaseButtons[0]);

    // 수정 후에는 총가격이 즉시 106,000 + 35,000 = 141,000원으로 변경되어야 합니다.
    const updatedPrice = screen.getByText(/총가격: 141,000원/i);
    expect(updatedPrice).toBeInTheDocument();
  });
});
