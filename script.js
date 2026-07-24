const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelectorAll(".nav a");
const galleryItems = [...document.querySelectorAll(".gallery-item")];
const revealElements = document.querySelectorAll(".reveal-on-scroll");
const modal = document.querySelector(".product-modal");
const modalImage = document.querySelector(".modal-image");
const modalTitle = document.querySelector("#modalTitle");
const modalKicker = document.querySelector(".modal-kicker");
const modalDescription = document.querySelector(".modal-description");
const modalProductTitle = document.querySelector(".modal-product-title");
const modalProductCopy = document.querySelector(".modal-product-copy");
const modalProductPrice = document.querySelector(".modal-product-price dd");
const modalPanel = document.querySelector(".modal-panel");
const closeButtons = document.querySelectorAll("[data-close-modal]");
const prevButton = document.querySelector(".modal-nav.prev");
const nextButton = document.querySelector(".modal-nav.next");
const canvas = document.querySelector(".particle-canvas");
const ctx = canvas.getContext("2d");
const clickEffectImages = [
  "Page_Resource/Click_Effect_Image/Click_Img_1.png",
  "Page_Resource/Click_Effect_Image/Click_Img_2.png",
  "Page_Resource/Click_Effect_Image/Click_Img_3.png",
  "Page_Resource/Click_Effect_Image/Click_Img_4.png",
  "Page_Resource/Click_Effect_Image/Click_Img_5.png",
  "Page_Resource/Click_Effect_Image/Click_Img_6.png",
];

const products = [
  {
    title: "번뇌타파 부적",
    src: "Product_Image/번뇌타파 부적.jpg",
    description: "번뇌는 타파하고, 마음에는 평안 입주 완료.",
    detailTitle: "번뇌는 타파하고, 마음에는 평안 입주 완료",
    detailCopy: [
      "생각은 꼬리에 꼬리를 물고, 마음은 왜 자꾸 야근 중일까요? '번뇌타파·마음평안 카드 부적'은 복잡한 생각은 가볍게 내려놓고 평온한 하루를 보내길 바라는 마음을 담은 카드형 부적입니다.",
      "지갑이나 다이어리, 휴대폰 케이스 속에 쏙 넣어두고 번뇌가 슬금슬금 올라올 때마다 꺼내 보세요. 귀여운 연꽃 캐릭터가 근심 걱정은 툭툭 털어내고, 마음의 평안은 야무지게 챙겨드립니다.",
      "※ 번뇌가 완전히 사라지지 않을 수 있습니다. 그만큼 번뇌가 성실하게 근무 중이라는 뜻입니다.",
      "※ 실제 효능보다는 평안을 기원하는 마음과 귀여움이 강력하게 포함되어 있습니다.",
    ],
    price: "1,000원",
  },
  {
    title: "칼퇴기원 마우스패드",
    src: "Product_Image/칼퇴기원 마우스패드.jpg",
    description: "나무칼퇴불, 오늘도 정시 퇴근.",
    detailTitle: "나무칼퇴불, 오늘도 정시 퇴근",
    detailCopy: [
      "끝없이 쌓이는 업무와 멈추지 않는 메신저 알림 속에서, 직장인의 가장 간절한 소원은 단 하나. 칼.퇴.기.원.",
      "마우스를 움직일 때마다 마음속으로 퇴근을 염원할 수 있는 칼퇴 기원 마우스 패드입니다. 부드러운 마우스 이동은 물론, 연꽃처럼 평온한 마음으로 업무를 마무리할 수 있도록 직장인의 간절한 기운을 담았습니다.",
      "책상 위에 정갈하게 펼쳐두고 업무 번뇌는 내려놓고, 퇴근 버튼은 가볍게 클릭해 보세요. 오늘의 야근도 언젠가는 지나가고, 퇴근 시간은 반드시 찾아옵니다.",
      "※ 칼퇴를 기원하는 상품으로, 상사의 갑작스러운 호출까지 막아주지는 못합니다.",
      "※ 오후 6시 이후에도 효과가 없을 경우 컴퓨터 전원 버튼을 직접 눌러주세요.",
    ],
    price: "5,000원",
  },
  {
    title: "번뇌스티커",
    src: "Product_Image/번뇌스티커판(앞).jpg",
    description: "열받을 때마다 한 장씩, 붙이다 보면 어느새 수행 완료.",
    detailTitle: "열받을 때마다 한 장씩, 붙이다 보면 어느새 수행 완료",
    detailCopy: [
      "욱하는 순간, 참는 건 어렵고 터뜨리자니 더 피곤할 때가 있죠. '번뇌타파 스티커판'은 열받는 일이 생길 때마다 목탁 스티커를 하나씩 붙이며, 내 마음을 다독여보는 유쾌한 수행템입니다.",
      "짜증 한 번, 스티커 한 장. 분노 한 번, 목탁 한 개. 그렇게 차곡차곡 붙이다 보면 \"내가 오늘도 그냥 참은 게 아니라 수행 중이었구나\" 하는 묘한 뿌듯함이 생깁니다.",
      "20개의 목탁이 모두 모이면 작은 성불(?) 달성! 화는 삼키고, 마음은 다스리고, 결과적으로는 자비까지 연습하게 되는 참는 자의 기록판입니다.",
      "책상 옆, 냉장고 앞, 또는 열받는 일이 자주 발생하는 그 공간 어디든 붙여두고 사용해 보세요.",
      "※ 스티커를 붙인다고 화가 완전히 사라지진 않을 수 있습니다. 다만 붙이고 나면 일단 손은 바빠져서 진정에 도움이 됩니다.",
      "※ 분노 게이지 관리용이며, 실제 목탁 소리는 나지 않습니다.",
      "※ 오늘도 참았다면, 그 자체로 이미 대단한 수행입니다.",
    ],
    price: "1,000원",
  },
  {
    title: "이루리 아크릴 무드등",
    src: "Product_Image/무드등.png",
    description: "불은 켰고, 마음은 이미 잔잔해졌습니다.",
    detailTitle: "불은 켰고, 마음은 이미 잔잔해졌습니다",
    detailCopy: [
      "방은 어두운데 마음까지 어두워질 필요는 없으니까. 승가원의 이루리가 두 손을 가지런히 모으고 은은하게 빛나는 아크릴 무드등입니다.",
      "책상이나 침대 옆에 올려두고 불을 켜면, 이루리가 말없이 평안을 기원해 줍니다. 대단한 말씀은 하지 않습니다. 그저 가만히 앉아 빛날 뿐인데, 이상하게 나보다 마음이 편해 보입니다.",
      "불을 켜는 순간 방 안에는 따뜻한 빛이, 마음속에는 근거 없는 평온이 차오릅니다. 오늘 하루를 잘 버틴 나에게 선물하기에도 좋고, 평안이 시급해 보이는 사람에게 슬쩍 건네기에도 좋습니다.",
      "※ 이루리는 빛나지만 사용자의 앞날까지 밝혀주지는 못합니다.",
      "※ 오래 바라본다고 깨달음이 자동으로 설치되지는 않습니다.",
      "※ 마음이 편해지지 않는다면 조명을 끄고 일단 주무시는 것을 권장합니다.",
    ],
    price: "5,000원",
  },
  {
    title: "이루리 악착키링",
    src: "Product_Image/이루리 악착키링.png",
    description: "놓지 않는 자에게 버틸 힘이 있나니.",
    detailTitle: "놓지 않는 자에게 버틸 힘이 있나니",
    detailCopy: [
      "살다 보면 모든 걸 내려놓고 싶은 순간이 찾아옵니다. 하지만 지금은 내려놓음보다 악착같이 매달릴 때일지도 모릅니다.",
      "악착키링은 오색 줄을 붙잡고 끝까지 버티는 이루리의 모습을 담은 키링입니다. 힘들어도 놓지 않고, 지쳐도 다시 붙잡는 모습은 마치 우리 시대의 생활형 보살, '악착보살'을 떠올리게 합니다.",
      "악착보살은 거창한 깨달음을 말하지 않습니다. 그저 조용히 보여줍니다.",
      "\"오늘 하루도 버텼으면 이미 수행 완료.\"",
      "\"놓지 않는 것도 하나의 공덕.\"",
      "\"악착같이 매달리다 보면 언젠가 땅에 발이 닿는다.\"",
      "가방이나 파우치, 열쇠에 달아두고 마음이 흔들릴 때마다 이루리를 바라보세요. 현실을 대신 해결해주지는 않지만, 적어도 오늘 하루를 버틸 핑계 하나쯤은 만들어드립니다.",
      "※ 악착보살의 가피는 개인의 의지와 체력에 따라 다르게 느껴질 수 있습니다.",
      "※ 너무 오래 매달려 있다면 내려놓음도 수행임을 기억해 주세요.",
      "※ 키링은 가방에, 집착은 적당히 달아두시길 권장합니다.",
    ],
    price: "3,000원",
  },
  {
    title: "부산 사투리 소원부적",
    src: "Product_Image/소원부적.jpg",
    description: "단디 해라, 잘될끼다.",
    detailTitle: "단디 해라, 잘될끼다",
    detailCopy: [
      "마음이 복잡하고 앞이 좀 캄캄할 때, 누가 옆에서 거창한 말 해주는 것보다 한마디 툭 던져주는 이 말이 더 힘날 때가 있심더.",
      "\"단디 해라, 잘될끼다.\"",
      "이 부산 사투리 소원부적은 소중한 마음과 응원을 부산식으로 화끈하게 담아낸 부적입니더. 지갑에 넣어도 좋고, 책상 한쪽에 세워둬도 좋고, 요즘 좀 기운 빠진다 싶을 때 한 번씩 꺼내 보면 괜히 마음이 든든해지는 묘한 맛이 있습니더.",
      "말투는 쪼매 터프해도 속뜻은 아주 따뜻합니더. \"정신 똑띠 차리고, 너무 쫄지 말고, 니 할 거 단디 하면 결국 잘된다\" 하는 마음을 담은 현실 밀착형 응원 부적이라 보면 됩니더.",
      "시험 앞둔 사람한테도 좋고, 새로운 일 시작하는 사람한테도 좋고, 요즘 되는 일 하나 없다 싶은 사람한테도 아주 찰떡입니더.",
      "※ 부적이 대신 해주진 않습니더. 본인이 단디 해야 합니더.",
      "※ 그래도 가끔은 \"내는 잘될끼다\" 하고 믿는 마음이 제일 중요합니더.",
      "※ 부산 말투라 쪼매 세 보여도, 응원은 진심입니더.",
    ],
    price: "1,000원",
  },
  {
    title: "이루리 럭키비키 포스트잇",
    src: "Product_Image/이루리 포스트잇.jpg",
    description: "까먹기 전에 적었으니, 오늘도 제법 럭키비키.",
    detailTitle: "일단 적어두면, 안 까먹은 척은 할 수 있습니다",
    detailCopy: [
      "할 일은 많고 기억력은 짧고, 메모는 해야겠는데 평범한 포스트잇은 조금 심심할 때 쓰는 이루리 럭키비키 포스트잇입니다.",
      "반짝이는 별과 네잎클로버, 그리고 이루리의 응원을 함께 담아 중요한 일정부터 별로 중요하지 않지만 괜히 적고 싶은 말까지 자유롭게 기록할 수 있습니다.",
      "회의 내용, 오늘의 할 일, 잊으면 큰일 나는 약속을 적어두고 마지막에는 마음속으로 한마디 외쳐보세요.",
      "\"이걸 미리 적어둔 나, 완전 럭키비키잖아.\"",
      "일이 잘 풀리면 행운 덕분이고, 안 풀리면 아직 포스트잇을 덜 붙인 겁니다.",
      "※ 포스트잇이 일정을 대신 수행하지는 않습니다.",
      "※ 적어두고도 잊었다면 그것은 메모의 문제가 아니라 사용자의 문제일 수 있습니다.",
      "※ 네잎클로버는 인쇄되어 있으며 실제 행운의 양은 개인차가 있습니다.",
    ],
    price: "2,000원",
  },
  {
    title: "피우리 행복팡팡 포스트잇",
    src: "Product_Image/피우리 포스트잇.jpg",
    description: "별일 없어도 축하부터 하고 보는 행복 과몰입 메모지.",
    detailTitle: "할 일도 팡팡, 행복도 팡팡",
    detailCopy: [
      "축하할 일은 크게 적고, 해야 할 일은 더 크게 적는 피우리 행복팡팡 포스트잇입니다.",
      "알록달록한 폭죽과 피우리의 신나는 기운이 담겨 있어 평범한 메모도 괜히 중요한 발표처럼 보이게 만들어줍니다. 오늘의 목표, 응원 메시지, 생일 축하, 간식 요청, 그리고 은근한 업무 독촉까지 무엇이든 큼직하게 적어보세요.",
      "내용은 \"자료 제출 부탁드립니다\"여도, 디자인만큼은 \"당첨을 축하드립니다\"처럼 화려합니다.",
      "행복한 소식이 있다면 적어서 자랑하고, 행복한 소식이 없다면 일단 '행복 예정'이라고 써두면 됩니다.",
      "※ 폭죽은 그림이며 실제로 터지지 않습니다. 안심하고 사무실에서 사용하세요.",
      "※ 행복이 팡팡 터지지 않을 경우 간식과 함께 사용해 보세요.",
    ],
    price: "2,000원",
  },
  {
    title: "감천마을 피우리 키링",
    src: "Product_Image/감천마을 피우리 키링.png",
    description: "부산의 골목과 바다, 그리고 피우리까지 한 번에 달았습니다.",
    displayCopy: "알록달록 감천마을과 귀여운 피우리를 가방에 달고 부산 한 조각을 데려가세요.",
    detailTitle: "부산 한 조각, 피우리 한 스푼",
    detailCopy: [
      "알록달록한 집들이 층층이 이어지고, 골목마다 이야기가 숨어 있는 감천문화마을. 그 풍경 속에 피우리가 슬쩍 자리 잡았습니다.",
      "감천마을 피우리 키링은 감천마을의 다채로운 마을 풍경과 부산을 상징하는 바다, 광안대교의 이미지를 피우리와 함께 담아낸 아크릴 키링입니다.",
      "지붕 위에 나란히 앉은 피우리와 친구들의 모습이 더해져, 부산 여행의 추억을 귀엽고 재치 있게 간직할 수 있습니다.",
      "가방이나 파우치, 열쇠에 달아두면 언제 어디서든 감천마을 한 조각을 데리고 다니는 기분. 부산을 다녀온 사람에게는 추억을, 아직 가보지 못한 사람에게는 여행 욕구를 슬쩍 자극해주는 휴대용 부산 풍경 굿즈입니다.",
    ],
    price: "3,000원",
  },
  {
    title: "피우리 모래사장 키링",
    src: "Product_Image/피우리 모래사장 키링.png",
    description: "몸은 일상에 있어도, 마음은 피우리와 모래놀이 중.",
    displayCopy: "바다와 모래사장, 신난 피우리까지 가방에 달고 작은 휴가를 챙겨가세요.",
    detailTitle: "피우리와 함께하는 휴대용 해변 휴가",
    detailCopy: [
      "파도 소리 들리는 모래사장에 앉아 모래성을 쌓는 피우리.",
      "피우리 모래사장 키링은 부산 바다의 여유로운 풍경과 해변에서 신나게 모래놀이를 즐기는 피우리의 모습을 담은 아크릴 키링입니다.",
      "푸른 바다와 모래사장, 정자와 갈매기까지 한 장면에 담겨 있어, 가방에 달기만 해도 마음만큼은 바로 해변으로 출발합니다.",
      "현실에서는 일정에 치이고 업무에 쫓기더라도, 피우리만큼은 모래성을 쌓으며 제대로 쉬는 중. 바쁜 하루 속 잠깐의 여유와 즐거운 여행의 추억을 귀엽게 간직할 수 있는 휴대용 바캉스 굿즈입니다.",
      "가방이나 파우치, 열쇠에 달아두고 답답할 때마다 한 번씩 바라보세요. 당장 바다로 떠날 수는 없어도, 적어도 마음속 휴가 신청은 가능합니다.",
    ],
    price: "3,000원",
  },
  {
    title: "피우리 광안대교 키링",
    src: "Product_Image/피우리 광안대교 키링.png",
    description: "파도는 거세도 피우리는 평온하다. 부산 바다 휴대 완료.",
    displayCopy: "광안대교와 부산 바다, 태평한 피우리까지 가방에 한 번에 달아보세요.",
    detailTitle: "파도는 넘실대고, 피우리는 수행 중",
    detailCopy: [
      "부산의 밤과 바다를 대표하는 광안대교 아래, 피우리가 파도를 타고 있습니다.",
      "피우리 광안대교 키링은 광안대교와 부산 바다의 시원한 풍경, 그리고 물결 위에서도 평온하게 웃고 있는 피우리의 모습을 담은 아크릴 키링입니다.",
      "파도는 제법 거세 보이지만 피우리는 흔들림 없이 태연합니다. 보는 사람만 조금 걱정될 뿐입니다.",
      "가방이나 파우치에 달아두면 부산 바다의 시원함과 피우리의 무근본 평온함을 언제든 함께 데리고 다닐 수 있습니다.",
      "일상이 파도처럼 몰아치는 날에도 피우리를 보며 한 번쯤 생각해 보세요.",
      "\"저 정도 파도에도 웃는데, 나도 오늘은 버텨보자.\"",
    ],
    price: "3,000원",
  },
  {
    title: "피우리 서핑 키링",
    src: "Product_Image/피우리 서핑 키링.png",
    description: "파도는 못 막아도, 올라탈 기세는 챙겨드립니다.",
    displayCopy: "몰아치는 일상도 피우리처럼 신나게 타보세요. 기세만큼은 이미 프로 서퍼입니다.",
    detailTitle: "인생의 파도? 일단 타고 봅니다",
    detailCopy: [
      "잔잔한 날만 기다리다가는 평생 해변에 서 있을지도 모릅니다. 파도가 왔다면 피우리처럼 냅다 올라타 보세요.",
      "피우리 서핑 키링은 거대한 파도를 타며 자신감 넘치는 표정을 짓고 있는 피우리의 모습을 담은 아크릴 키링입니다.",
      "선캡까지 야무지게 눌러쓰고 자세를 잡은 모습에서 실력보다 기세가 중요하다는 생활의 지혜를 배울 수 있습니다.",
      "가방이나 열쇠에 달아두고 예상치 못한 일이 밀려올 때마다 피우리를 바라보세요. 상황을 잠재우지는 못하지만, 적어도 파도에 휩쓸리는 대신 타고 있는 척할 용기는 드립니다.",
      "잘 타면 서핑이고, 못 타면 경험이며, 넘어져도 다시 올라가면 콘텐츠입니다.",
    ],
    price: "3,000원",
  },
];

let currentIndex = 0;
let particles = [];
let shockwaves = [];
let particleFrame = null;
let lastScrollY = window.scrollY;
let scrollDirection = "up";
let revealFrame = null;
let shouldReplayVisibleReveal = false;

menuButton.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "메뉴 열기");
  });
});

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    openModal(Number(item.dataset.index));
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

prevButton.addEventListener("click", () => showProduct(currentIndex - 1, true));
nextButton.addEventListener("click", () => showProduct(currentIndex + 1, true));

window.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("is-open")) return;

  if (event.key === "Escape") closeModal();
  if (event.key === "ArrowLeft") showProduct(currentIndex - 1, true);
  if (event.key === "ArrowRight") showProduct(currentIndex + 1, true);
});

window.addEventListener("resize", handleResize);
window.addEventListener("scroll", handleScroll, { passive: true });
document.addEventListener("click", showClickEffect);
initializeScrollReveal();

function initializeScrollReveal() {
  revealElements.forEach((element) => {
    element.dataset.revealState = "hidden";
    element.dataset.revealDirection = scrollDirection;
    setRevealDirection(element);
  });

  requestRevealUpdate();
}

function handleResize() {
  resizeCanvas();
  requestRevealUpdate();
}

function handleScroll() {
  if (!updateScrollDirection()) return;

  requestRevealUpdate(true);
}

function updateScrollDirection() {
  const currentScrollY = window.scrollY;
  if (currentScrollY === lastScrollY) return false;

  scrollDirection = currentScrollY >= lastScrollY ? "down" : "up";
  lastScrollY = currentScrollY;
  return true;
}

function requestRevealUpdate(replayVisible = false) {
  shouldReplayVisibleReveal = shouldReplayVisibleReveal || replayVisible;

  if (revealFrame) return;

  revealFrame = requestAnimationFrame(() => {
    const replayVisibleReveal = shouldReplayVisibleReveal;

    revealFrame = null;
    shouldReplayVisibleReveal = false;
    updateRevealElements(replayVisibleReveal);
  });
}

function updateRevealElements(replayVisible = false) {
  const viewportHeight = window.innerHeight;

  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const isInPlayZone = rect.top < viewportHeight * 0.86 && rect.bottom > viewportHeight * 0.14;
    const isOutOfResetZone = rect.bottom < viewportHeight * 0.04 || rect.top > viewportHeight * 0.96;

    if (isOutOfResetZone) {
      element.dataset.revealState = "hidden";
      element.classList.remove("is-visible");
      return;
    }

    if (!isInPlayZone) return;

    const isHidden = element.dataset.revealState !== "visible";

    if (isHidden || replayVisible) {
      playRevealAnimation(element);
    }
  });
}

function setRevealDirection(element) {
  element.dataset.revealDirection = scrollDirection;
  const shouldFloatDown = scrollDirection === "down";

  element.classList.toggle("scroll-down", !shouldFloatDown);
  element.classList.toggle("scroll-up", shouldFloatDown);
}

function playRevealAnimation(element) {
  element.dataset.revealState = "visible";
  setRevealDirection(element);
  element.classList.remove("is-visible");
  void element.offsetWidth;
  element.classList.add("is-visible");
}

function showClickEffect(event) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const effect = document.createElement("span");
  const image = document.createElement("img");
  const size = 42 + Math.random() * 8;
  const imageSrc = clickEffectImages[Math.floor(Math.random() * clickEffectImages.length)];

  effect.className = "click-effect";
  effect.style.left = `${event.clientX}px`;
  effect.style.top = `${event.clientY}px`;
  effect.style.setProperty("--effect-size", `${size}px`);
  effect.style.setProperty("--effect-rotate", `${Math.random() * 24 - 12}deg`);

  image.src = imageSrc;
  image.alt = "";
  image.setAttribute("aria-hidden", "true");
  effect.append(image);

  for (let i = 0; i < 12; i += 1) {
    const particle = document.createElement("span");
    const edge = i % 4;
    const offset = 10 + Math.random() * 28;
    const driftX = (Math.random() - 0.5) * 44;
    const driftY = (Math.random() - 0.5) * 44;

    particle.className = "click-effect-particle";
    particle.style.setProperty("--drift-x", `${driftX}px`);
    particle.style.setProperty("--drift-y", `${driftY}px`);

    if (edge === 0) {
      particle.style.left = `${offset}%`;
      particle.style.top = "0";
    } else if (edge === 1) {
      particle.style.left = "100%";
      particle.style.top = `${offset}%`;
    } else if (edge === 2) {
      particle.style.left = `${offset}%`;
      particle.style.top = "100%";
    } else {
      particle.style.left = "0";
      particle.style.top = `${offset}%`;
    }

    effect.append(particle);
  }

  document.body.append(effect);
  effect.addEventListener("animationend", () => effect.remove(), { once: true });
}

function openModal(index) {
  showProduct(index, false);
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  resizeCanvas();

  restartPopAnimation();
  burstFromImageFrame();
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  particles = [];
  shockwaves = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (particleFrame) {
    cancelAnimationFrame(particleFrame);
    particleFrame = null;
  }
}

function showProduct(index, animate) {
  currentIndex = (index + products.length) % products.length;
  const product = products[currentIndex];

  modalImage.src = product.src;
  modalImage.alt = `${product.title} 확대 이미지`;
  modalTitle.textContent = product.title;
  modalKicker.textContent = product.displayCopy || product.description;
  modalDescription.textContent = product.description;
  modalProductTitle.textContent = product.detailTitle;
  modalProductCopy.replaceChildren(...product.detailCopy.map((paragraph) => {
    const element = document.createElement("p");
    element.textContent = paragraph;
    return element;
  }));
  modalProductPrice.textContent = product.price;
  modalPanel.scrollTop = 0;

  if (animate) {
    restartPopAnimation();
    burstFromImageFrame();
  }
}

function restartPopAnimation() {
  modalPanel.classList.remove("pop-in");
  void modalPanel.offsetWidth;
  modalPanel.classList.add("pop-in");
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function burstFromImageFrame() {
  requestAnimationFrame(() => {
    const rect = modalImage.getBoundingClientRect();
    burstFrameParticles(rect);
  });
}

function burstFrameParticles(rect) {
  resizeCanvas();
  const colors = ["#176b5b", "#d99735", "#ffffff", "#8ec6b6", "#f2c879", "#ffe9a8"];
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  shockwaves.push(
    { x: centerX, y: centerY, radius: Math.min(rect.width, rect.height) * 0.45, speed: 12, life: 32, maxLife: 32, width: 8, color: "#ffffff" },
    { x: centerX, y: centerY, radius: Math.min(rect.width, rect.height) * 0.38, speed: 8, life: 42, maxLife: 42, width: 3, color: "#d99735" },
  );

  for (let i = 0; i < 220; i += 1) {
    const edgePoint = getRandomFramePoint(rect);
    const normal = getOutwardNormal(edgePoint.edge);
    const tangentJitter = (Math.random() - 0.5) * 0.9;
    const angle = Math.atan2(normal.y, normal.x) + tangentJitter;
    const speed = 4 + Math.random() * 13;
    const isSpark = i % 4 === 0;

    particles.push({
      x: edgePoint.x,
      y: edgePoint.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: isSpark ? 2 + Math.random() * 3 : 4 + Math.random() * 8,
      life: isSpark ? 46 + Math.random() * 18 : 64 + Math.random() * 34,
      maxLife: 98,
      color: colors[Math.floor(Math.random() * colors.length)],
      spin: Math.random() * Math.PI,
      shape: isSpark ? "spark" : "circle",
    });
  }

  if (!particleFrame) {
    animateParticles();
  }
}

function getRandomFramePoint(rect) {
  const edge = Math.floor(Math.random() * 4);

  if (edge === 0) {
    return { edge, x: rect.left + Math.random() * rect.width, y: rect.top };
  }

  if (edge === 1) {
    return { edge, x: rect.right, y: rect.top + Math.random() * rect.height };
  }

  if (edge === 2) {
    return { edge, x: rect.left + Math.random() * rect.width, y: rect.bottom };
  }

  return { edge, x: rect.left, y: rect.top + Math.random() * rect.height };
}

function getOutwardNormal(edge) {
  const normals = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ];

  return normals[edge];
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  shockwaves = shockwaves.filter((wave) => {
    wave.radius += wave.speed;
    wave.life -= 1;

    const alpha = Math.max(wave.life / wave.maxLife, 0);
    ctx.globalAlpha = alpha * 0.72;
    ctx.strokeStyle = wave.color;
    ctx.lineWidth = wave.width * alpha;
    ctx.beginPath();
    ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
    ctx.stroke();

    return wave.life > 0;
  });

  particles = particles.filter((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += 0.12;
    particle.vx *= 0.972;
    particle.vy *= 0.972;
    particle.spin += 0.16;
    particle.life -= 1;

    const alpha = Math.max(particle.life / particle.maxLife, 0);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = particle.color;

    if (particle.shape === "spark") {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.spin);
      ctx.fillRect(-particle.radius * 2, -particle.radius / 2, particle.radius * 4, particle.radius);
      ctx.restore();
    } else {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius * alpha, 0, Math.PI * 2);
      ctx.fill();
    }

    return particle.life > 0;
  });

  ctx.globalAlpha = 1;

  if (particles.length || shockwaves.length) {
    particleFrame = requestAnimationFrame(animateParticles);
  } else {
    particleFrame = null;
  }
}
