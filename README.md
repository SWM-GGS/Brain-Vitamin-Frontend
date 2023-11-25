# 경도인지장애 가정 케어 서비스, 두뇌비타민

## 상태 관리
- id
- 이름 name
- 별명 nickname
- 전화번호 phoneNumber
- 가족 고유번호 familyKey
- 가족 아이디 familyId
- 폰트 사이즈 fontSize
- 프로필 이미지 profileImgUrl
- 학력 education
- accessToken

## 페이지 구조
- 스플래시 Splash
- 폰트 사이즈 설정 FontSize (최초 앱 시작 시)
- 로그인 LogIn
- 회원가입
    - 전화번호 입력 PhoneNumberSet
    - 이름/별명 입력 NameSet
- 부가 회원정보
    - 생년월일/성별 입력 BirthDateSet
    - 최종학력 입력 EducationSet
- 홈 Home
- 선별검사 ScreeningTest
- 선별검사 결과 ScreeningTestResult
- 인지향상 프로그램 CogTraining
- 인지향상 프로그램 결과 CogTrainingResult
- 가족 커뮤니티 Family
- 게시글 상세보기 FamilyPostRead
- 마이페이지 MyPage
- 회원정보 Setting
    - 회원정보 변경 Profile
    - 전화번호 변경 PhoneNumberEdit
    - 글자크기 변경 FontSizeEdit
- 우리가족 비타민 Vitamin
    - 비타민 사진 모음 VitaminAlbum
    - 비타민 만들기 VitaminWrite
    - 비타민 문제 풀이 VitaminPlay

## 폰트 사이즈 설정
- 루트 폰트 사이즈
  - 작게 10px -> 62.5% (16px)
  - 중간 11.25px -> 70.3125% (18px)
  - 크게 12.5px -> 78.125% (20px)
- 디자인은 작은 폰트 사이즈를 기준으로 작성되었다는 점
    - -> 개발 시 작은 폰트 사이즈(루트 10px)를 기준으로 rem 단위로 작성
- 박스와 같은 레이아웃에 rem 적용 시 폰트 사이즈 변경에 따라 레이아웃도 달라지는 문제
    - -> 폰트 사이즈만 rem, 나머진 px로 작성

## Git 프로젝트 관리
`이슈 등록` -> `개발` -> `Pull Request` -> `Review` -> `수정` -> `Merge`

- 이슈 등록
    - Task별로 Issue 생성
    - Label 설정
- 개발
    - branch 생성: develop/기능명/이슈번호 or develop/이슈번호
    - 커밋 메시지에 #이슈번호 함께 작성하여 링킹
- PR
    - 키워드 #이슈번호: 이슈 연결하여 merge 시 자동 이슈 닫기
        - 키워드: close, closes, closed, fix, fixes, fixed, resolve, resolves, resolved
        - 이슈 개수만큼 키워드 작성. ex) close #1 close #2
        - 이슈가 닫아지면 자동으로 추적되어 Task 체크 표시됨
- 리뷰
    - SonarCloud 정적분석기 사용

### 커밋 메시지 Tag Type
- Feat: 기능 구현
- Fix: 버그 수정
- Docs: 문서 수정 (리드미와 같은 마크다운 파일)
- Style: 코드 로직 변경 없이, 코드 포맷 수정 (세미콜론 누락과 같은 코드 스타일)
- Design: UI 작업
- Refactor: 코드 개선
- Chore: 패키지, gitignore, 자잘한 수정
