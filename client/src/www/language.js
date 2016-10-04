function getTextSetByLanguege(language) {
  var text = {};
  switch(language) {
    case "kr" :
      text.login = "로그인";
      text.kakaoLogin = "카카오톡 로그인";
      text.facebookLogin = "페이스북 로그인";
      text.dialogClose = "닫기";
      text.loginToast = "안녕하세요, ";
      text.myAsk = "나의 질문";
      text.votedAsk = "나의 선택";
      text.navLogout = "로그아웃";
      text.makeAsks = "Ask 작성하기";
      text.makeTitle = "무엇이 궁금하세요?";
      text.gender = "성별";
      text.total = "전체";
      text.man = "남자";
      text.woman = "여자";
      text.age = "나이";
      text.under = "20세 이하";
      text.over = "20세 이상";
      text.secret = "비밀글";
      text.search = "검색";
      text.send = "보내기";
      text.back = "뒤로가기";
      text.share = "공유하기";
      text.emptyErr = "필수 항목을 채워 주세요.";
      text.emptyErrText = "해당 항목은 필수입니다.";
      text.limitErr = "주의: 1000자 이상의 글은 삭제됩니다.";
      text.choicePop = "당신의 선택은 ";
      text.alreadyPop = "이미 ";
      text.alreadySelPop = "를 선택했습니다";
      text.onlyMan = "남자만 투표 가능합니다.";
      text.onlyWoman = "여자만 투표 가능합니다.";
      text.onlyUnderAge = "20세 이하만 투표 가능합니다.";
      text.onlyOverAge = "20세 이상만 투표 가능합니다.";
      text.more = "더보기";
      text.tag = "태그를 입력해주세요";
      text.tagResult = "결과 없음, 다른 태그를 입력해주세요";
      text.newAskCreated = "새로운 Ask가 생성되었습니다.";
      text.doubleClick = "투표는 더블클릭으로!";
      break;
    case "en" :
      text.login = "Sign in";
      text.kakaoLogin = "Login with kakaotalk";
      text.facebookLogin = "Login with facebook";
      text.dialogClose = "close";
      text.loginToast = "Hi, ";
      text.myAsk = "My Asks";
      text.votedAsk = "Voted Asks";
      text.navLogout = "Logout";
      text.makeAsks = "Make Ask";
      text.makeTitle = "What do you want to ask?";
      text.gender = "Gender";
      text.total = "ALL";
      text.man = "MAN";
      text.woman = "WOMAN";
      text.age = "Age";
      text.under = "UNDER 20";
      text.over = "OVER 20";
      text.secret = "secret";
      text.search = "Search";
      text.send = "Send";
      text.back = "Back";
      text.share = "Share";
      text.emptyErr = "One and more text field value were empty";
      text.emptyErrText = "This field is required";
      text.limitErr = "Warning: Limit text to 1000 characters.";
      text.choicePop = "Your choice is ";
      text.alreadyPop = "You already chose ";
      text.alreadySelPop = "";
      text.onlyMan = "Only men can vote";
      text.onlyWoman = "Only women can vote";
      text.onlyUnderAge = "Only less than 20 years and 20 years.";
      text.onlyOverAge = "Only 21 years and older."; 
      text.more = "More"; 
      text.tag = "Please type #tag...";
      text.tagResult = "No result, please type another tag...";
      text.newAskCreated = "New Ask created";
      text.doubleClick = "Double Tap for voting";
      break;
    default:
      console.log("Please check language parameter!")
      break;
  }
  return text;
}
