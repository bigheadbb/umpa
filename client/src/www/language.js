function getTextSetByLanguege(language) {
  var text = {};

  switch(language) {
    case "kr" :
      text.login = "로그인";
      text.kakaoLogin = "카카오톡 로그인";
      text.facebookLogin = "페이스북 로그인";
      text.dialogClose = "닫기";
      break;
    case "en" :
      text.login = "Sign in";
      text.kakaoLogin = "Login with kakaotalk";
      text.facebookLogin = "Login with facebook";
      text.dialogClose = "close";
      break;
    default:
      console.log("Pleae check language parameter!")
      break;
  }
  return text;
}