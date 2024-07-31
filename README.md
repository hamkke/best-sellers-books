# 과제22 뉴욕타임즈베스트셀러 익스플로러 2024.07.28까지 제출

## Challenge goals:

- 새로운 Next JS 프로젝트를 여러분 컴퓨터에 생성하세요.
- "뉴욕 타임즈 베스트셀러" 익스플로러를 빌드하세요.
- Vercel 로 배포하세요. (꼭 시크릿창에서도 확인하기)

## 요구사항:

- Home Page (/): 베스트셀러 전체 리스트를 보여주세요.
- Detail Page (/list/[id]): 베스트셀러 각 카테고리별 책의 리스트를 보여주세요.
- About Page (/about): About 페이지 입니다.
- Layout Component 를 사용하세요.
- CSS Modules를 이용하여 예쁘게 꾸며주세요.
- Don't give up.

## Notes:

- GET all best sellers lists : https://books-api.nomadcoders.workers.dev/lists
- GET the books inside of a list named: 'hardcover-fiction(하드커버 픽션)': https://books-api.nomadcoders.workers.dev/list?name=hardcover-fiction

## 제출방법

- #4 Deployment 강의를 보고 Vercel 로 배포하세요.
- 제출하는 링크가 반드시 vercel.app 로 끝나야 정상 제출 됩니다!
- 제출기간: 4일 챌린지! 차주 월요일 오전 6시까지

## 20240727

내가 원하는 색으로 바탕화면 O
좋아요 X
디테일 페이지 완성 O
이번에는 footer도 넣어보고 X
ts O
next의 이미지 컴포넌트도 써보고 O
loading, not-found 파일도 만들어야 하고 X
CORS때문에 color-thief는 실패

## 20240731

CORS때문에 color-thief는 실패했는데 next.js rewrites 사용해서 성공
좋아요 X
이번에는 footer도 넣어보고 X
loading, not-found 파일도 만들어야 하고 X
