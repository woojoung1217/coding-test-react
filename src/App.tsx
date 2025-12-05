// src/App.tsx
import { useState } from 'react';
import './App.css';

// 과제 컴포넌트 임포트
import UserProfile from './components/UserProfile';
import ProductSearch from './components/ProductSearch';
import DataDisplay from './components/DataDisplay';
import BuggyCart from './components/BuggyCart';
import CodeReviewChallenge from './components/CodeReviewChallenge';

// --- Mock 데이터 ---
const mockUserProfile = {
  user: {
    id: 1,
    name: '신입개발',
    username: 'newbie.dev',
    bio: '프론트엔드 개발자를 꿈꾸고 있습니다. React와 TypeScript에 관심이 많습니다.',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  stats: {
    posts: 123,
    followers: 456,
    following: 789,
  },
  posts: Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    imageUrl: `https://picsum.photos/id/${i + 10}/300/300`,
    caption: `게시물 ${i + 1}`,
  })),
};

type Tab = 'ui' | 'async' | 'data' | 'bug' | 'review';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('ui');

  const renderContent = () => {
    switch (activeTab) {
      case 'ui':
        return <UserProfile {...mockUserProfile} />;
      case 'async':
        return <ProductSearch />;
      case 'data':
        return <DataDisplay />;
      case 'bug':
        return <BuggyCart />;
      case 'review':
        return <CodeReviewChallenge />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>FE 신입 개발자 코딩 테스트</h1>
        <nav className="app-nav">
          <button
            onClick={() => setActiveTab('ui')}
            className={activeTab === 'ui' ? 'active' : ''}
          >
            과제 1: UI 리팩토링
          </button>
          <button
            onClick={() => setActiveTab('async')}
            className={activeTab === 'async' ? 'active' : ''}
          >
            과제 2: Debounce 구현
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className={activeTab === 'data' ? 'active' : ''}
          >
            과제 3: 데이터 조작
          </button>
          <button
            onClick={() => setActiveTab('bug')}
            className={activeTab === 'bug' ? 'active' : ''}
          >
            과제 4: 버그 수정
          </button>
          <button
            onClick={() => setActiveTab('review')}
            className={activeTab === 'review' ? 'active' : ''}
          >
            과제 5: 코드 리뷰
          </button>
        </nav>
      </header>
      <main className="app-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
