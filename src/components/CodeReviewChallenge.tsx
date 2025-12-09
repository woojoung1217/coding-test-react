import React, { useEffect, useState } from "react";
import styles from "./CodeReviewChallenge.module.css";

/**
 * ## 과제 5: 코드 리뷰
 *
 * 아래 `UserList`는 사용자 목록을 렌더링합니다. 정상 동작하지만 개선 여지가 있습니다.
 *
 * ### 요구사항:
 * 1. 코드(JSX 포함)를 읽고 잠재적인 문제점이나 개선점을 찾아보세요.
 * 2. 발견한 내용에 대해, 해당 코드 라인 근처에 주석을 사용하여 코드 리뷰를 작성해주세요.
 *    - 무엇이 문제인지, 왜 문제인지, 어떻게 개선할지 제시해주세요.
 * 3. 최소 3가지 이상의 유의미한 코드 리뷰를 작성해야 합니다.
 *
 * ### 선택사항:
 * - 코드 리뷰 작성을 넘어, 실제로 코드를 개선하여 리팩토링을 진행해보세요.
 * - (주의: 이 과제는 코드 리뷰 능력을 중점적으로 보기 때문에, 리뷰 작성 없이 리팩토링만 진행하면 안 됩니다.)
 */

type UserData = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};

// 가짜 API 호출 함수
const fetchUsers = (): Promise<UserData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "김철수", email: "chulsoo@example.com", isAdmin: false },
        { id: 2, name: "이영희", email: "younghee@example.com", isAdmin: true },
        { id: 3, name: "스티브", email: "steve@example.com", isAdmin: false },
        { id: 4, name: "관리자", email: "admin@example.com", isAdmin: true },
        { id: 5, name: "Steve Jobs", email: "sj@apple.com", isAdmin: false },
        { id: 6, name: "Apple Mint", email: "mint@gmail.com", isAdmin: false },
      ]);
    }, 500);
  });
};

const UserList = () => {
  // 상태의 타입으로 any 값을 사용해 타입스크립트를 활용한 런타임 과정에 오류 방지에 장점을 살릴 수 없다.
  // 해당 상태값의 해당하는 인터페이스를 만들어 대체하는 것이 좋다
  const [users, setUsers] = useState<any[]>([]); // state 1
  const [filter, setFilter] = useState(""); // state 2
  const [loading, setLoading] = useState(true); // state 3
  const [showAdminsOnly, setShowAdminsOnly] = useState(false); // state 4

  // 데이터 로딩
  // 최초의 한번 useEffect를 사용해 부수효과를 처리하고있는데 메소드 체이닝으로 fetchUsers가 완료된 뒤에
  // 상태를 변경하고 로딩 상태를 변경하기를 원하고 있지만 실제로는 좋은 방법이 아니다.(API 오류로 사이드 이펙트를 발생 시킬 수 있음)
  // useEffect의 dependency를 조정하여 처리하는 방식이나
  // ReactQuery를 활용해 서버 상태를 추적하는 방식으로 값을 처리하는게 더 효율적이고 직관적이다.
  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  // 필터링 로직
  // 하나의 함수 내에서 다양한 값을 검증 및 조회 하고 있다.
  // 순수 함수로써의 책임을 잃었고 가독성이 좋지 않다.
  // 이 경우 각 변수에 값을 각각 대입해서 조건을다는 것보다
  // 조건문을 연결하거나 한번에 처리해서 그 값을 넘기는것이 좋아 보인다.
  const filteredUsers = users.filter((user) => {
    const nameMatches = user.name.includes(filter);
    const emailMatches = user.email.includes(filter);
    const adminMatches = !showAdminsOnly || user.isAdmin;
    return (nameMatches || emailMatches) && adminMatches;
  });

  return (
    <div className={styles.container}>
      <h2>과제 5: 코드 리뷰하기</h2>
      <p className={styles.description}>이 파일(`CodeReviewChallenge.tsx`)의 코드에 대한 리뷰를 주석으로 작성해주세요.</p>

      <div className={styles.controls}>
        <input type="text" placeholder="이름으로 검색..." onChange={(e) => setFilter(e.target.value)} className={styles.input} />
        <label>
          <input type="checkbox" checked={showAdminsOnly} onChange={(e) => setShowAdminsOnly(e.target.checked)} />
          관리자만 보기
        </label>
      </div>

      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>이름</th>
              <th>이메일</th>
              <th>역할</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                {/* 역할(Role) 표시 */}
                <td style={{ color: u.isAdmin ? "blue" : "black" }}>{u.isAdmin ? "Admin" : "User"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
