const POOL_IMAGE =
  "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/398dec83-3f2a-46f8-ad83-4668bb037d5a.jpg";
const SAUNA_IMAGE =
  "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/b26557f3-6845-4507-9ead-5707dc258983.jpg";
const MASSAGE_IMAGE =
  "https://cdn.poehali.dev/files/546728b2-54c4-4bd3-8489-0759f916742c.jpg";

export const HERO_IMAGES = [
  "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/0d547aa0-1c6a-4326-b77f-c8491bc7fb0d.png",
];

export const POOL_IMAGE_EXPORT = POOL_IMAGE;
export const MASSAGE_IMAGE_EXPORT = MASSAGE_IMAGE;
export const SAUNA_IMAGE_EXPORT = SAUNA_IMAGE;

export const NAV_ITEMS = [
  { label: "Главная", href: "#hero" },
  { label: "Пространства", href: "#spaces" },
  { label: "Программы", href: "#programs" },
  { label: "Галерея", href: "#gallery" },
  { label: "О нас", href: "#about" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Блог", href: "#blog" },
  { label: "Контакты", href: "#contacts" },
];

export const MARQUEE_ITEMS = [
  "Бассейн", "Финская сауна", "Хаммам", "Массаж",
  "Можжевеловая комната", "Обёртывания", "Ароматерапия", "Чан на свежем воздухе", "Стоун-терапия", "Beauty-ритуалы",
  "Женская гармония", "Крепость духа", "Ладование", "Трансформация", "Путешествие по состоянию тела",
  "Парение вениками", "Ритуал Колыбель", "Медово-солевой скраб", "Мыльно-веничный массаж", "Контрастное проливание",
];

export const SPACES = [
  { icon: "Waves", title: "Бассейн", desc: "Термальный бассейн — температура воды под ваш запрос от 36°C и выше. Полное расслабление в тёплой воде.", tag: "Вода", img: "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/6a0f613a-b074-4016-81ca-9edc16686f03.jpg", imgs: ["https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/6a0f613a-b074-4016-81ca-9edc16686f03.jpg", POOL_IMAGE] },
  { icon: "Flame", title: "Финская сауна", desc: "Классическая финская сауна до 90°C с берёзовыми вениками и натуральными ароматами. После — чан на свежем воздухе на нашей террасе.", tag: "Жар", img: SAUNA_IMAGE, imgs: [SAUNA_IMAGE, "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/f9297473-a316-4856-83ad-f065e7fa567f.jpg", "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/55d46f04-b3af-40ec-8a72-0d6d3507a70e.jpg"] },
  { icon: "Droplets", title: "Чан на свежем воздухе", desc: "Горячий чан под открытым небом — живой огонь нагревает воду до 40°C. Лежишь в тепле, дышишь свежим воздухом и смотришь в небо. Лучшее после сауны.", tag: "Воздух", img: "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/b503abaf-8203-45d7-b31e-34f8102364d2.jpg", imgs: ["https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/b503abaf-8203-45d7-b31e-34f8102364d2.jpg", "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/7900c746-c09e-4676-bc8b-875efd4855b8.jpg"] },
  { icon: "Wind", title: "Пространство пара", desc: "Турецкая баня с мраморным камнем и традиционным пенным массажем в облаках горячего пара.", tag: "Пар", img: "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/28bdf4f0-62a7-4d59-9b55-99b6d575208f.jpg", imgs: ["https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/28bdf4f0-62a7-4d59-9b55-99b6d575208f.jpg", "https://cdn.poehali.dev/files/218bd40d-5e92-4507-b11c-7e402bd3f13e.JPG", "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/7870c390-eddb-404f-accd-1a723f4987e9.JPG"] },
  { icon: "Leaf", title: "Массажный зал", desc: "2 кабинета для массажа, обёртываний, спа головы и косметолога.", tag: "Тело", img: MASSAGE_IMAGE, imgs: ["https://cdn.poehali.dev/files/546728b2-54c4-4bd3-8489-0759f916742c.jpg", "https://cdn.poehali.dev/files/1f142cc2-f16d-4c72-a8a2-52ecb84d4849.jpg", "https://cdn.poehali.dev/files/1174c867-0a1f-4ab0-8dc4-f00abe9b028c.jpg", "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/6e723f23-60c4-4ac9-a504-892e6223ca14.jpg", "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/46a552c8-ec96-4754-a452-65c01c69ac7c.jpg"] },
  { icon: "Trees", title: "🌿 Арома-комната", desc: "Стены из можжевеловых спилов наполняют воздух живой смолой — природным антисептиком, который очищает дыхание и успокаивает нервную систему.", tag: "Можжевеловая комната", img: SAUNA_IMAGE, imgs: ["https://cdn.poehali.dev/files/ca1bd218-a636-47d0-9274-451e54c2cd18.jpg", "https://cdn.poehali.dev/files/2eced06b-a37e-48f8-a7b3-3443680ee5e1.jpg"] },
  { icon: "Sparkles", title: "СПА — Косметика, которая работает глубже, чем вы думаете", desc: "Используем космецевтику Комфорт Зон и Талассо Бретань — морские водоросли и минералы Атлантики насыщают кожу йодом, магнием и цинком. В сочетании с теплом хаммама активные вещества проникают в 3–4 раза глубже. Результат уже после первой процедуры: кожа мягкая, упругая — как после моря.", tag: "Красота", img: "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/21f81724-a20a-4ce9-a0d4-d093b4801c05.jpg", imgs: ["https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/21f81724-a20a-4ce9-a0d4-d093b4801c05.jpg", "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/6284b1da-37e5-49a7-884b-955656d70c38.jpg", "https://cdn.poehali.dev/files/7b99a33b-4d26-4682-9186-109c55f0f264.jpg"] },
  { icon: "Crown", title: "СПА головы", desc: "Ритуал для волос и кожи головы: глубокое увлажнение, массаж, маски на натуральных маслах. Волосы оживают — блеск, мягкость и лёгкость уже после первой процедуры.", tag: "Красота", img: MASSAGE_IMAGE },
];

export const PROGRAMS = [
  {
    title: "Путешествие по состоянию тела",
    subtitle: "Программа парения на двоих",
    tag: "Для двоих",
    features: ["Встреча с пар-мастером", "Парение на сенном матрасе вдвоём", "Хаммам, бассейн, можжевеловая комната", "Терраса с подвесной кроватью"],
    popular: false,
    img: "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/b26557f3-6845-4507-9ead-5707dc258983.jpg",
    href: "/programmy/puteshestvie",
    modal: {
      label: "ПРОГРАММА ПАРЕНИЯ НА ДВОИХ",
      heading: "ПУТЕШЕСТВИЕ ПО СОСТОЯНИЮ ТЕЛА",
      subtitle: "Для двоих",
      quote: ["Иногда самое ценное — просто быть рядом, в тишине.", "Без телефонов, без планов, без города за окном.", "Три часа в паре — и вы снова чувствуете друг друга."],
      steps: [
        { num: "I", title: "Встреча с пар-мастером", desc: "Мастер слышит настроение каждого и выстраивает день так, чтобы оба чувствовали себя гостями, а не участниками потока. Никакого расписания — только ваш темп." },
        { num: "II", title: "Классическое парение на сенном матрасе — вдвоём", desc: "2 захода по 15 минут. Мастер работает для вас обоих: прогревает, ведёт, подстраивается под каждого. Совместное парение — особый опыт близости." },
        { num: "III", title: "Контрастное проливание горячими травяными отварами", desc: "После каждого захода — контраст с отварами. Уходит усталость, исчезает напряжение — у обоих одновременно. Травяные отвары подобраны под сезон и запрос." },
        { num: "IV", title: "Хаммам, бассейн, можжевеловая комната", desc: "Весь комплекс в вашем распоряжении. Никаких чужих людей рядом. Только вы двое, пар и тишина. Хаммам прогревает до самых глубоких слоёв." },
        { num: "V", title: "Терраса: свежий воздух, подвесная кровать, плед на двоих", desc: "Тела отдыхают, слова не нужны, а время как будто останавливается. Терраса закрыта только для вас — подвесная кровать, пледы, горячий чай." },
      ],
    },
  },
  {
    title: "Ладование",
    subtitle: "Семейная церемония парения",
    tag: "Для пары",
    features: ["Ароматерапия и звуки колокольчиков", "Парное солевое скрабирование", "Можжевеловая комната", "Ритуал «Колыбель» в бассейне"],
    popular: true,
    img: "https://cdn.poehali.dev/files/66df40a0-2180-4282-87dd-1d0b6417d29c.jpg",
    href: "/programmy/ladovanie",
    modal: undefined,
  },
  {
    title: "Трансформация",
    subtitle: "Особенная женская программа",
    tag: "Женская",
    features: ["Четыре стихии — четыре этапа", "Медово-солевой скраб с заговором", "Парение вениками", "Метафорические карты"],
    popular: false,
    img: "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/21f81724-a20a-4ce9-a0d4-d093b4801c05.jpg",
    href: "/programmy/transformaciya",
    modal: undefined,
  },
  {
    title: "Женская гармония",
    subtitle: "День с подружками — без суеты",
    tag: "Женская",
    features: ["Мыльно-веничный массаж в хаммаме", "Парение вениками каждой гостье", "Ритуал «Колыбель» в бассейне", "Тёплый чан + массаж 30 мин"],
    popular: false,
    img: "https://cdn.poehali.dev/files/79e8a835-813d-4f7e-b485-ccd3874a657c.jpg",
    href: "/programmy/zhenskaya-garmoniya",
    modal: undefined,
  },
  {
    title: "Крепость Духа",
    subtitle: "Мужская программа парения · 4 часа",
    tag: "Мужская",
    features: ["Парение на сенном матрасе", "Хаммам, бассейн, чан с хвоей", "5 массажей по 30 минут", "Уха по-приморски и фирменный стол"],
    popular: false,
    img: "https://cdn.poehali.dev/files/815cccc3-7246-43d5-9f64-e703411b71f9.jpg",
    href: "/programmy/krepost-duha",
    modal: undefined,
  },
  {
    title: "Программа на одного гостя",
    subtitle: "Индивидуальная программа парения",
    tag: "Индивидуальная",
    features: ["Встреча с пар-мастером", "Парение на сенном матрасе", "Хаммам, бассейн, можжевеловая комната", "Терраса с подвесной кроватью"],
    popular: false,
    img: "https://cdn.poehali.dev/files/79602049-2177-4efd-ad4b-fffaf6aef0fb.JPG",
    imgFit: "contain" as const,
    href: "/programmy/puteshestvie",
    modal: undefined,
  },
];

export const GALLERY_ITEMS = [
  { img: "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/6a0f613a-b074-4016-81ca-9edc16686f03.jpg", title: "Бассейн", cat: "Бассейн" },
  { img: SAUNA_IMAGE, title: "Финская сауна", cat: "Сауны", imgs: [SAUNA_IMAGE, "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/f9297473-a316-4856-83ad-f065e7fa567f.jpg", "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/55d46f04-b3af-40ec-8a72-0d6d3507a70e.jpg"] },
  { img: "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/28bdf4f0-62a7-4d59-9b55-99b6d575208f.jpg", title: "Хаммам", cat: "Хаммам" },
  { img: "https://cdn.poehali.dev/files/ca1bd218-a636-47d0-9274-451e54c2cd18.jpg", title: "Можжевеловая комната", cat: "Арома" },
  { img: "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/b503abaf-8203-45d7-b31e-34f8102364d2.jpg", title: "Чан на свежем воздухе", cat: "Чан" },
  { img: MASSAGE_IMAGE, title: "Массажный зал", cat: "Массаж" },
  { img: "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/bucket/16925e76-36b5-4168-9b0b-d4cb6025ed94.jpg", title: "Наш интерьер", cat: "Интерьер" },
];

export const REVIEWS = [
  {
    name: "Анна К.",
    stars: 5,
    text: "Была на программе «Ритуал обновления» — это просто космос. Пространство пара с пенным массажем, потом можжевеловая комната... выхожу как новорождённая. Персонал — высший класс.",
    role: "Постоянный гость",
  },
  {
    name: "Дмитрий В.",
    stars: 5,
    text: "Привожу сюда партнёров на деловые встречи в неформальной обстановке. Уровень сервиса соответствует самым высоким стандартам. Рекомендую.",
    role: "Предприниматель",
  },
  {
    name: "Мария Л.",
    stars: 5,
    text: "Брала корпоративный пакет для команды. Все в восторге! Отдельное спасибо за организацию и внимание к деталям. Обязательно вернёмся.",
    role: "HR-директор",
  },
  {
    name: "Сергей М.",
    stars: 5,
    text: "Можжевеловая комната — открытие года. После первой сессии дышать стало заметно легче, хроническое напряжение ушло. Теперь хожу каждую неделю.",
    role: "Постоянный гость",
  },
];

export const BLOG_POSTS = [
  {
    title: "Как пространство пара меняет кожу за один сеанс",
    date: "8 апреля 2026", read: "5 мин", tag: "Процедуры", img: MASSAGE_IMAGE,
    back: "Горячий пар раскрывает поры, усиливает кровообращение и запускает глубокое очищение. Уже после первого сеанса кожа становится мягкой, упругой — как после моря. Это не косметика. Это физиология.",
  },
  {
    title: "Можжевельник: что происходит с телом в ароматной комнате",
    date: "2 апреля 2026", read: "7 мин", tag: "Наука", img: SAUNA_IMAGE,
    back: "Смолы можжевельника — природный антисептик. В комнате они насыщают воздух фитонцидами, которые очищают дыхание, успокаивают нервную систему и снижают уровень кортизола. Наука подтверждает то, что тело чувствует само.",
  },
  {
    title: "Сезонные ритуалы: весеннее очищение тела и духа",
    date: "25 марта 2026", read: "4 мин", tag: "Ритуалы", img: "https://cdn.poehali.dev/projects/96829bf9-8ea6-42db-bc21-6a2d363e218e/files/000b3239-ae8e-4c05-9c8f-1203a2f22d2c.jpg",
    back: "Весной тело просыпается — и просит помощи. Скраб, пар, контраст и тишина. Древние ритуалы работают не потому что мы верим — а потому что они созданы под нашу физиологию. Весеннее очищение — не традиция. Это необходимость.",
  },
];