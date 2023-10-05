import { useEffect, useRef } from 'react';
import cist1Sound from '/assets/sounds/1.mp3';
import cist2Sound from '/assets/sounds/2.mp3';
import cist3Sound from '/assets/sounds/3.mp3';
import cist4Sound from '/assets/sounds/4.mp3';
import cist5Sound from '/assets/sounds/5.mp3';
import cist6Sound from '/assets/sounds/6.mp3';
import cist7Sound from '/assets/sounds/7.mp3';
import { useModal } from '../hooks/useModal';
import LayerPopup from '../components/common/LayerPopup';
import correctSound from '/assets/sounds/correct.mp3';

function Privacy() {
  //   const html = `<p class=ls2 lh6 bs5 ts4><em class=emphasis>< GGS >(&apos;https://play.google.com/store/apps?hl=ko&apos;이하 &apos;두뇌비타민&apos;)</em>은(는) 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.</p><p class=ls2>○ 이 개인정보처리방침은 <em class=emphasis>2023</em>년 <em class=emphasis>8</em>월 <em class=emphasis>14</em>부터 적용됩니다.</p></br><p class='lh6 bs4'><strong>제1조(개인정보의 처리 목적)<br/><br/><em class="emphasis">< GGS >('https://play.google.com/store/apps/details?id=com.brainvitamin'이하  '두뇌비타민')</em>은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</strong></p><ul class="list_indent2 mgt10"><p class="ls2">1. 홈페이지 회원가입 및 관리</p><p class="ls2">회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 만14세 미만 아동의 개인정보 처리 시 법정대리인의 동의여부 확인, 각종 고지·통지 목적으로 개인정보를 처리합니다.</p></br><p class="ls2">2. 재화 또는 서비스 제공</p><p class="ls2">서비스 제공, 콘텐츠 제공, 맞춤서비스 제공, 본인인증, 연령인증을 목적으로 개인정보를 처리합니다.</p></br><p class="ls2">3. 마케팅 및 광고에의 활용</p><p class="ls2">신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공 , 인구통계학적 특성에 따른 서비스 제공 및 광고 게재 , 서비스의 유효성 확인, 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.</p></br></ul></br></br><p class='lh6 bs4'><strong>제2조(개인정보의 처리 및 보유 기간)</strong></br></br>① <em class="emphasis">< GGS ></em>은(는) 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</br></br>② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</p><ul class='list_indent2 mgt10'><li class='tt'>1.<홈페이지 회원가입 및 관리></li><li class='tt'><홈페이지 회원가입 및 관리>와 관련한 개인정보는 수집.이용에 관한 동의일로부터<준영구>까지 위 이용목적을 위하여 보유.이용됩니다.</li><li>보유근거 : 서비스 이용 기록</li><li>관련법령 : </li><li>예외사유 : </li></ul></br></br><p class='lh6 bs4'><strong>제3조(처리하는 개인정보의 항목) </strong></br></br> ① <em class="emphasis">< GGS ></em>은(는) 다음의 개인정보 항목을 처리하고 있습니다.</p><ul class='list_indent2 mgt10'><li class='tt'>1< 홈페이지 회원가입 및 관리 ></li><li>필수항목 : 이름, 휴대전화번호, 쿠키, 접속 로그, 서비스 이용 기록</li><li>선택항목 : 생년월일, 성별, 학력</li></ul></br></br><p class='lh6 bs4'><strong>제4조(개인정보의 파기절차 및 파기방법)<em class="emphasis"></strong></p><p class='ls2'></br>① < GGS > 은(는) 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</br></br>② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.</br>1. 법령 근거 :</br>2. 보존하는 개인정보 항목 : 계좌정보, 거래날짜</br></br>③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.</br>1. 파기절차</br> < GGS > 은(는) 파기 사유가 발생한 개인정보를 선정하고, < GGS > 의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.</br></p><p class='sub_p mgt10'>2. 파기방법</p><p class='sub_p'>종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</p>전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다</p><br/><br/><p class="lh6 bs4"><strong>제5조(정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항)</strong></p><p class="ls2"><br/><br/>① 정보주체는 GGS에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.</p><p class='sub_p'>② 제1항에 따른 권리 행사는GGS에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 GGS은(는) 이에 대해 지체 없이 조치하겠습니다.</p><p class='sub_p'>③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.</p><p class='sub_p'>④ 개인정보 열람 및 처리정지 요구는  「개인정보 보호법」  제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.</p><p class='sub_p'>⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.</p><p class='sub_p'>⑥ GGS은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.</p></br></br><p class='lh6 bs4'><strong>제6조(개인정보의 안전성 확보조치에 관한 사항)<em class="emphasis"></br></br>< GGS ></em>은(는) 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</strong></p><p class='sub_p mgt10'>1. 내부관리계획의 수립 및 시행</br> 개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.</br></br>2. 개인정보 취급 직원의 최소화 및 교육</br> 개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고 있습니다.</br></br>3. 정기적인 자체 감사 실시</br> 개인정보 취급 관련 안정성 확보를 위해 정기적(분기 1회)으로 자체 감사를 실시하고 있습니다.</br></br>4. 개인정보에 대한 접근 제한</br> 개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.</br></br>5. 접속기록의 보관 및 위변조 방지</br> 개인정보처리시스템에 접속한 기록을 최소 1년 이상 보관, 관리하고 있으며,다만, 5만명 이상의 정보주체에 관하여 개인정보를 추가하거나, 고유식별정보 또는 민감정보를 처리하는 경우에는 2년이상 보관, 관리하고 있습니다.<br/>또한, 접속기록이 위변조 및 도난, 분실되지 않도록 보안기능을 사용하고 있습니다.</br></br>6. 개인정보의 암호화</br> 이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.</br></br>7. 해킹 등에 대비한 기술적 대책</br> <<em class=emphasis>GGS</em>>(&apos;<em class=emphasis>두뇌비타민</em>&apos;)은 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.</br></br>8. 비인가자에 대한 출입 통제</br> 개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를 수립, 운영하고 있습니다.</br></br>9. 문서보안을 위한 잠금장치 사용</br> 개인정보가 포함된 서류, 보조저장매체 등을 잠금장치가 있는 안전한 장소에 보관하고 있습니다.</br></br></p></br></br><p class="lh6 bs4"><strong>제7조(개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항)</strong></p><p class="ls2"><br/><br/>① GGS 은(는) 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.</br>② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.</br>가. 쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.</br>나. 쿠키의 설치•운영 및 거부 : 웹브라우저 상단의 도구>인터넷 옵션>개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다.</br>다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.<br/><br/><p class="lh6 bs4"><strong>제8조(행태정보의 수집·이용·제공 및 거부 등에 관한 사항)</strong></p><p class="ls2"><br/><br/>① <개인정보처리자>은(는) 서비스 이용과정에서 정보주체에게 최적화된 맞춤형 서비스 및 혜택, 온라인 맞춤형 광고 등을 제공하기 위하여 행태정보를 수집·이용하고 있습니다.</p><p class='sub_p'>② <개인정보처리자>은(는) 다음과 같이 행태정보를 수집합니다.</p><table class="tb_board td_border_all tb_board_view tb_row mgt10">    <caption>8. 행태정보의 수집·이용·제공 및 거부 등에 관한 사항 제공을 위해 수집하는 행태정보의 항목, 행태정보 수집 방법, 행태정보 수집 목적, 보유·이용기간 및 이후 정보처리 방법을 입력하기 위한 표입니다.</caption>    <colgroup>        <col width="auto">        <col width="auto">        <col width="auto">        <col width="auto">    </colgroup>    <tbody>        <tr>            <th scope="row" class="bdl">수집하는 행태정보의 항목</th>            <th scope="row" class="bdl">행태정보 수집 방법</th>            <th scope="row" class="bdl">행태정보 수집 목적</th>            <th scope="row" class="bdl">보유·이용기간 및 이후 정보처리 방법</th>        </tr>        <tr>            <td class="txtc">이용자의 앱 방문/앱내 서비스 이용이력</td>            <td class="txtc">이용자의 앱 방문/앱내 서비스 이용시 자동 수집</td>            <td class="txtc">이용자의 앱 서비스 이용 내역에 기반한 맞춤형 서비스 제공</td>            <td class="txtc">수집일로부터 회원탈퇴일 이후 파기</td>        </tr>    </tbody></table><p class='sub_p'><div class="panel_box panel_white"><온라인 맞춤형 광고 등을 위해 제3자(온라인 광고사업자 등)가 이용자의 행태정보를 수집·처리할수 있도록 허용한 경우></p><p class='sub_p'>③ <개인정보처리자>은(는) 다음과 같이 온라인 맞춤형 광고 사업자가 행태정보를 수집·처리하도록 허용하고 있습니다.</p><p class='sub_p'>- 행태정보를 수집 및 처리하려는 광고 사업자 : ○○○, ○○○, ○○○, ○○○,</p><p class='sub_p'>- 행태정보 수집 방법 : 이용자가 당사 웹사이트를 방문하거나 앱을 실행할 때 자동 수집 및 전송</p><p class='sub_p'>- 수집·처리되는 행태정보 항목 : 이용자의 웹/앱 방문이력, 검색이력, 구매이력</p><p class='sub_p'>- 보유·이용기간 : 00일</p><p class='sub_p'></div>④ <개인정보처리자>은(는) 온라인 맞춤형 광고 등에 필요한 최소한의 행태정보만을 수집하며, 사상, 신념, 가족 및 친인척관계, 학력·병력, 기타 사회활동 경력 등 개인의 권리·이익이나 사생활을 뚜렷하게 침해할 우려가 있는 민감한 행태정보를 수집하지 않습니다.</p><p class='sub_p'>⑤ <개인정보처리자>은(는) 만 14세 미만임을 알고 있는 아동이나 만14세 미만의 아동을 주 이용자로 하는 온라인 서비스로부터 맞춤형 광고 목적의 행태정보를 수집하지 않고, 만 14세 미만임을 알고 있는 아동에게는 맞춤형 광고를 제공하지 않습니다.</p><p class='sub_p'>⑥ <개인정보처리자>은(는) 모바일 앱에서 온라인 맞춤형 광고를 위하여 광고식별자를 수집·이용합니다. 정보주체는 모바일 단말기의 설정 변경을 통해 앱의 맞춤형 광고를 차단·허용할 수 있습니다.</p><p class='sub_p'>‣ 스마트폰의 광고식별자 차단/허용</p><p class='sub_p'>(1) (안드로이드) ① 설정 → ② 개인정보보호 → ③ 광고 → ③ 광고 ID 재설정 또는 광고ID 삭제</p><p class='sub_p'>(2) (아이폰) ① 설정 → ② 개인정보보호 → ③ 추적 → ④ 앱이 추적을 요청하도록 허용 끔</p><p class='sub_p'>※ 모바일 OS 버전에 따라 메뉴 및 방법이 다소 상이할 수 있습니다.</p><p class='sub_p'>⑦ 정보주체는 웹브라우저의 쿠키 설정 변경 등을 통해 온라인 맞춤형 광고를 일괄적으로 차단·허용할 수 있습니다. 다만, 쿠키 설정 변경은 웹사이트 자동로그인 등 일부 서비스의 이용에 영향을 미칠 수 있습니다.</p><p class='sub_p'>‣ 웹브라우저를 통한 맞춤형 광고 차단/허용</p><p class='sub_p'>(1) 인터넷 익스플로러(Windows 10용 Internet Explorer 11)</p><p class='sub_p'>- Internet Explorer에서 도구 버튼을 선택한 다음 인터넷 옵션을 선택</p><p class='sub_p'>- 개인 정보 탭을 선택하고 설정에서 고급을 선택한 다음 쿠키의 차단 또는 허용을 선택</p><p class='sub_p'>(2) Microsoft Edge</p><p class='sub_p'>- Edge에서 오른쪽 상단 ‘…’ 표시를 클릭한 후, 설정을 클릭합니다.</p><p class='sub_p'>- 설정 페이지 좌측의 ‘개인정보, 검색 및 서비스’를 클릭 후 「추적방지」 섹션에서 ‘추적방지’ 여부 및 수준을 선택합니다.</p><p class='sub_p'>- ‘InPrivate를 검색할 때 항상 ""엄격"" 추적 방지 사용’ 여부를 선택합니다.</p><p class='sub_p'>- 아래 「개인정보」 섹션에서 ‘추적 안함 요청보내기’ 여부를 선택합니다.</p><p class='sub_p'>(3) 크롬 브라우저</p><p class='sub_p'>- Chrome에서 오른쪽 상단 ‘⋮’ 표시(chrome 맞춤설정 및 제어)를 클릭한 후, 설정 표시를 클릭합니다.</p><p class='sub_p'>- 설정 페이지 하단에 ‘고급 설정 표시’를 클릭하고 「개인정보」 섹션에서 콘텐츠 설정을 클릭합니다.</p><p class='sub_p'>- 쿠키 섹션에서 ‘타사 쿠키 및 사이트 데이터 차단’의 체크박스를 선택합니다.</p><p class='sub_p'>52 | 개인정보 처리방침 작성지침 일반</p><p class='sub_p'>⑧ 정보주체는 아래의 연락처로 행태정보와 관련하여 궁금한 사항과 거부권 행사, 피해 신고 접수 등을 문의할 수 있습니다.</p><p class='sub_p'>‣ 개인정보 보호 담당부서</p><p class='sub_p'>부서명 : ○○○ 팀</p><p class='sub_p'>담당자 : ○○○</p><p class='sub_p'>연락처 : <전화번호>, <이메일>, <팩스번호></p></br></br><p class='lh6 bs4'><strong>제9조(가명정보를 처리하는 경우 가명정보 처리에 관한 사항)</strong><em class="emphasis"></br></br>< GGS > 은(는) 다음과 같은 목적으로 가명정보를 처리하고 있습니다.</p><p class='sub_p'></p><p class='sub_p'>▶ 가명정보의 처리 목적</p><p class='sub_p'>- 직접작성 가능합니다. </p><p class='sub_p'></p><p class='sub_p'>▶ 가명정보의 처리 및 보유기간</p><p class='sub_p'>- 직접작성 가능합니다. </p><p class='sub_p'></p><p class='sub_p'>▶ 가명정보의 제3자 제공에 관한 사항(해당되는 경우에만 작성)</p><p class='sub_p'>- 직접작성 가능합니다. </p><p class='sub_p'></p><p class='sub_p'>▶ 가명정보 처리의 위탁에 관한 사항(해당되는 경우에만 작성)</p><p class='sub_p'>- 직접작성 가능합니다. </p><p class='sub_p'></p><p class='sub_p'>▶ 가명처리하는 개인정보의 항목</p><p class='sub_p'>- 직접작성 가능합니다. </p><p class='sub_p'></p><p class='sub_p'>▶ 법 제28조의4(가명정보에 대한 안전조치 의무 등)에 따른 가명정보의 안전성 확보조치에 관한 사항</p><p class='sub_p'>- 직접작성 가능합니다. </p><p class='sub_p'></p><p class='sub_p'></p><p class='sub_p mgt30'><strong>제10조 (개인정보 보호책임자에 관한 사항) </strong></p><p class='sub_p mgt10'> ①  <span class='colorLightBlue'>GGS</span> 은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p><ul class='list_indent2 mgt10'><li class='tt'>▶ 개인정보 보호책임자 </li><li>성명 :봉지수</li><li>직책 :사원</li><li>직급 :사원</li><li>연락처 :01043481380, qhdwltn1380@gmail.com, </li></ul><p class='sub_p'>※ 개인정보 보호 담당부서로 연결됩니다.<p/> <ul class='list_indent2 mgt10'><li class='tt'>▶ 개인정보 보호 담당부서</li><li>부서명 :</li><li>담당자 :</li><li>연락처 :, , </li></ul><p class='sub_p'>② 정보주체께서는 GGS 의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. GGS 은(는) 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.</p><p class='sub_p mgt30'><strong>제11조(개인정보의 열람청구를 접수·처리하는 부서)</br> 정보주체는 ｢개인정보 보호법｣ 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다.<br/>< GGS ></span>은(는) 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다. </strong></p><ul class='list_indent2 mgt10'><li class='tt'>▶ 개인정보 열람청구 접수·처리 부서 </li><li>부서명 : </li><li>담당자 : </li><li>연락처 : , , </li></ul></br></br><p class='lh6 bs4'><strong>제12조(정보주체의 권익침해에 대한 구제방법)<em class="emphasis"></em></strong></p><br/><br/>정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.<br/><br/>

  //   1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)<br/>

  //   2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)<br/>

  //   3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)<br/>

  //   4. 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)<br/><br/>

  // 「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.<br/><br/>

  // ※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.</br></br><p class='lh6 bs4'><strong>제13조(개인정보 처리방침 변경)<em class="emphasis"></em></strong></p><br/></p><p class='sub_p'>① 이 개인정보처리방침은 2023년 8월 14부터 적용됩니다.</p><p class='sub_p'></p><p class='sub_p'></p><p class='sub_p'>② 이전의 개인정보 처리방침은 아래에서 확인하실 수 있습니다. </p><p class='sub_p'></p><p class='sub_p'></p><p class='sub_p'>예시 ) - 20XX. X. X ~ 20XX. X. X 적용   (클릭) </p><p class='sub_p'></p><p class='sub_p'></p><p class='sub_p'>예시 ) - 20XX. X. X ~ 20XX. X. X 적용   (클릭) </p><p class='sub_p'></p><p class='sub_p'></p><p class='sub_p'>예시 ) - 20XX. X. X ~ 20XX. X. X 적용   (클릭)</p>`;
  //   return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
  const { isModalOpen, modalText, openModal, closeModal } = useModal();
  const img1ref = useRef<HTMLImageElement | null>(null);
  const img2ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    openModal('인지선별검사를 시작합니다.');
    const audio = new Audio(cist1Sound);
    audio.play();
  }, []);

  const cnt = useRef(0);
  console.log(cnt);
  const goNext = (id: number) => {
    if (img1ref.current && img2ref.current) {
      if (id === 1) {
        if (cnt.current === 0) {
          const audio = new Audio(cist3Sound);
          audio.play();
          cnt.current++;
        } else if (cnt.current === 1) {
          const audio = new Audio(cist4Sound);
          audio.play();
          cnt.current++;
        } else if (cnt.current === 2) {
          const audio = new Audio(cist5Sound);
          audio.play();
          cnt.current++;
        } else if (cnt.current === 3) {
          const audio = new Audio(correctSound);
          audio.play();
          cnt.current++;
        } else {
          img2ref.current.style.display = 'block';
          img1ref.current.style.display = 'none';
          const audio = new Audio(cist6Sound);
          audio.play();
          cnt.current++;
        }
      } else if (id === 2) {
        if (cnt.current === 5) {
          const audio = new Audio(cist7Sound);
          audio.play();
          cnt.current++;
        } else {
          const audio = new Audio(correctSound);
          audio.play();
        }
      }
    }
  };

  const handleModal = () => {
    closeModal();
    const audio = new Audio(cist2Sound);
    audio.play();
  };

  return (
    <div>
      <img
        ref={img1ref}
        style={{ width: '100%' }}
        alt=""
        src="/assets/images/cist0.png"
        onClick={() => goNext(1)}
      />
      <img
        ref={img2ref}
        style={{ width: '100%', display: 'none' }}
        alt=""
        src="/assets/images/cist3.png"
        onClick={() => goNext(2)}
      />
      {isModalOpen && (
        <LayerPopup
          label={modalText}
          centerButtonText="확인"
          onClickCenterButton={handleModal}
          sound={cist1Sound}
        />
      )}
    </div>
  );
}

export default Privacy;
