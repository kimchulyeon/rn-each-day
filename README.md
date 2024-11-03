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

## 코멘트

React Native로 작업을 하게 될거란 것을 들었었기 때문에 React Native로 진행하였습니다. React Native에 대한 기본 개념을 문서와 강의로 빠르게 훑고 TODO와 기능에 대한 플로우를 정리하여 진행해나갔습니다. 그리고 서버 개발자분으로부터 파이어베이스 키워드를 들었던 것과 소셜 앱인 점을 통해 파이어베이스를 도입하였습니다. 파이어베이스 관련 로직은 훅으로 관리하였고 인증, 스토리지, DB 관련 로직을 분리하였습니다.

피드는 인스타그램을 참고하였고 이미지는 최대 3개까지 업로드 가능하게끔 하였고 캐러셀뷰로 좌우 슬라이드 가능하게 작업하였습니다. 
새로운 피드 작성 뷰는 페이스북을 참고해서 이미지 개수(1개, 2개, 3개)에 따라 선택된 이미지들 미리보기 UI가 다른게끔 작업하였습니다. 이미지는 스토리지에 업로드되기 전에 최적화 라이브러리를 통해 사이즈와 확장자를 변경해주었습니다.
또한 리스트는 FlatList를 사용하여 무한스크롤을 구현하였고 파이어베이스의 limit과 마지막으로 가져온 스냅샷을 통해 페이징 처리를 하였습니다.
