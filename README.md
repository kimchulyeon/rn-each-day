👉🏻 [Each Day Notion](https://carbonated-stoplight-4f5.notion.site/ReactNative-1297e70c1e6380c1b3e0eb8141e9b737)

👉🏻 [React Native Notion](https://carbonated-stoplight-4f5.notion.site/React-Native-1307e70c1e6380f4b247c1224fa085db?pvs=4)

# Each Day

## 목차
- [개발 환경](#개발-환경)
- [설치 및 실행](#설치-및-실행)
- [폴더 구조](#폴더-구조)
- [주요 라이브러리](#주요-라이브러리)
- [주요 기능](#주요-기능)
- [코멘트](#코멘트)




## 개발 환경
- **언어**: TypeScript
- **프레임워크**: React Native CLI
- **패키지 매니저**: npm
- **버전 관리**: Git



## 설치 및 실행

### 설치
```bash
# 클론
git clone https://github.com/kimchulyeon/rn-each-day.git

# 패키지 설치
npm install

npx pod-install ios/

# 실행
npx react-native start --reset-cache  
```

## 폴더 구조

```
프로젝트_폴더/
├── src/                # 메인
│   ├── components/     # 재사용 가능한 컴포넌트 / 스크린에 종속된 컴포넌트
│   ├── screens/        # 각 화면 컴포넌트
│   ├── navigations/    # 네비게이션 관련 컴포넌트
│   ├── hooks/          # 커스텀 훅
│   ├── layout/         # 레이아웃 컴포넌트
│   ├── store/          # 상태 관리 (Zustand)
│   ├── libs/           # 라이브러리 유틸 함수
│   └── constants/      # 상수 (색상)
├── assets/             # 이미지
└── App.js              # 앱 진입점
```

## 주요 라이브러리
- React Navigation: 화면 전환을 위한 라이브러리
- React Native Firebase: Firebase 연동
- Zustand / Redux: 상태 관리
- React Query: 서버 상태 관리
- Day.js: 날짜 및 시간 처리
- react-native-image-picker: 이미지 선택 기능
- react-native-permissions : 이미지 접근 권한 요청
- react-native-image-resizer : 이미지 최적화
- Firebase : 파이어베이스
- AsyncStorage : 로컬 저장소

## 주요 기능
- 유저 인증 : Firebase Authentication을 사용하여 이메일 회원가입 및 로그인
- 유저 세션 체크 : 앱을 종료해도 AsyncStorage에 저장된 유저 정보와 firestore를 체크하여 로그인 상태 유지
- 유저 정보 및 피드 정보 저장 : Firebase Firestore를 사용하여 저장
- 피드 : 사용자가 캐러셀뷰로 출력되는 이미지(최대 3개)와 텍스트 컨텐츠를 작성하여 피드를 생성, 피드 내용을 탭하면 상세페이지로 이동
- 이미지 업로드: 프로필 이미지, 피드 이미지 선택, 최적화 후 Firebase Storage 업로드 기능
- 페이징: 피드 목록 무한 스크롤 페이징 처리
