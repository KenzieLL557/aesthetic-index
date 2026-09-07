const enriched = window.ATLAS_CONTENT || [];
const catalog = window.ATLAS_CATALOG || { count: enriched.length, items: [], facets: { types: [], moods: [] } };

const featuredMeta = {
  '2000s Modern Baroque': { key: 'baroque', cn: '千禧现代巴洛克', year: '2000s', tags: ['华丽', '装饰', '戏剧'], summary: '兴起于 2000 年代的设计趋势，将巴洛克式装饰与现代线条、材料结合，见于室内、时装和标志设计。' },
  Bauhaus: { key: 'bauhaus', cn: '包豪斯', year: '1919—1933', tags: ['几何', '功能', '现代主义'], summary: '1919 年创立的德国艺术学校，连接艺术、工艺与工业生产，深刻影响现代设计与建筑。' },
  'Frutiger Aero': { key: 'aero', cn: '弗鲁提格空气', year: '2004—2013', tags: ['自然', '透明', '乐观'], summary: '拟物界面、光泽材质、天空、水与气泡，共同构成早期 Web 2.0 对友好技术未来的想象。' },
  'Dark Academia': { key: 'academia', cn: '暗黑学院', year: '2010s', tags: ['文学', '学院', '暗色'], summary: '围绕古典文学、知识追求与自我探索形成的互联网美学，常见书籍、图书馆与古典艺术。' },
  Minimalism: { key: 'minimal', cn: '极简主义', year: '1960s', tags: ['留白', '秩序', '形式'], summary: '以减少杂乱与非必要细节为核心，从二战后的艺术运动延伸至设计与生活方式。' },
  'Y2K Futurism': { key: 'y2k', cn: '千禧未来主义', year: '1997—2004', tags: ['金属', '科技', '未来'], summary: '液态金属、抽象三维图形与半透明产品设计，呈现千禧年前后乐观而技术化的未来。' }
};

const chineseBody = {
  '2000s Modern Baroque': [
    '2000s Modern Baroque 是兴起于 2000 年代的一种设计趋势，它在当代语境中重新解释历史上的巴洛克风格。除“现代巴洛克”外，这种风格也被称作“后现代巴洛克”“塑料巴洛克”或“新巴洛克”，常见于室内、时装与标志设计；在经济大衰退时期，它的流行度逐渐下降。',
    '这种风格选择性地借用巴洛克的丰盛感与装饰性，而非严格复制历史样式。常见特征包括繁复细节、镀金点缀、天鹅绒和织锦等华贵面料、挂毯、蕾丝与花卉刺绣，并将它们与现代线条、利落轮廓和当代材料并置。'
  ],
  Bauhaus: [
    '包豪斯，全称“国立包豪斯”，是建筑师瓦尔特·格罗皮乌斯于 1919 年在德国魏玛创立的艺术学校。学校运营至 1933 年，成为现代主义艺术与设计史上影响最深远的机构之一。',
    '它的教学强调艺术、工艺与工业生产之间的联系。设计应由用途和结构出发，减少没有功能依据的装饰，并适应现代材料与批量生产。',
    '包豪斯在十四年间先后位于魏玛、德绍与柏林。不同阶段由格罗皮乌斯、汉内斯·迈耶和密斯·凡·德·罗领导，其思想持续影响建筑、字体、家具与视觉传达。'
  ],
  'Frutiger Aero': [
    'Frutiger Aero 是约 2004 至 2013 年间广泛出现的设计美学。它承接 Y2K Futurism，并与 Web 2.0、拟物化界面和早期智能设备的视觉语言重叠。',
    '它常以高光、透明层、气泡、水面、蓝天、草地和柔和曲线表现技术。自然景观与数字界面并置，传达一种清洁、友好而乐观的未来想象。',
    '这一名称结合了字体设计师 Adrian Frutiger 与 Windows Aero 界面。名称虽然后来才被总结出来，但相关视觉在当时的系统界面、包装、广告和消费电子产品中非常常见。',
    '它的早期线索可追溯至 2000 年前后的操作系统和数码产品视觉，随后在游戏主机、手机、软件与商业传播中进入主流。'
  ],
  'Dark Academia': [
    'Dark Academia 是一种围绕古典文学、知识追求与自我探索形成的互联网美学。它受到欧洲历史文化、哥特式建筑、古典艺术与传统学院着装的共同影响。',
    '书籍、图书馆、旧校舍、手写文字、深色服装与低照度影像构成其常见视觉。神秘、颓废、危险和智识上的戏剧感也经常被纳入叙事。',
    '追随者有时被称为“Dark Academics”，但这一称呼通常指一种自我塑造的形象，而非真实职业。',
    '它延续了浪漫主义、唯美主义和颓废主义中的若干文化想象，也吸收了牛津、剑桥等历史学院环境被大众媒介反复塑造的视觉符号。'
  ],
  Minimalism: [
    '极简主义强调减少杂乱与非必要细节，其影响从艺术、建筑和平面设计延伸到日常生活方式。',
    '作为艺术运动，它在二战后的西方艺术中发展，并在 1960 年代至 1970 年代初最为突出。形式通常被压缩为清晰的几何关系、材料本身和可感知的空间秩序。',
    '作为生活方式时，极简主义常表现为对消费主义和过度占有的反思，强调简单生活、有限物品与有意识的选择。',
    '极简并非现代社会独有。许多宗教传统、古代建筑和早期现代设计运动都曾通过节制、重复与材料诚实，形成相近的形式观念。'
  ],
  'Y2K Futurism': [
    'Y2K Futurism 也被称作 Cyber Y2K，约在 1997 至 2004 年间活跃于科技、音乐、时装与平面设计领域。它集中呈现了世纪之交对数字未来的兴奋与不安。',
    '快速发展的计算机图像是其核心媒介。抽象三维形体、液态金属、有机曲面、半透明塑料、冰蓝与银色常被组合在一起。',
    '“Y2K aesthetic”一词由 Consumer Aesthetics Research Institute 的 Evan Collins 用于描述这一未来主义风格，名称源自千年虫问题与 2000 年前后的技术文化。',
    '它的来源可追溯到 1980 年代末至 1990 年代初的英国锐舞文化，以及当时的唱片设计、派对传单和早期计算机图形。',
    '到 1990 年代中后期，CGI、互联网、电子游戏与科技广告共同推动这套视觉语言进入大众文化。'
  ]
};

const enrichedByName = Object.fromEntries(enriched.map((entry) => [entry.name, entry]));
const catalogBySlug = Object.fromEntries(catalog.items.map((item) => [item.slug, item]));
const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
let saved;
try { saved = new Set(JSON.parse(localStorage.getItem('atlas-saved') || '[]')); } catch { saved = new Set(); }

function persist() {
  localStorage.setItem('atlas-saved', JSON.stringify([...saved]));
  document.querySelectorAll('#save-count').forEach((node) => { node.textContent = saved.size; });
  document.querySelectorAll('[data-save]').forEach((button) => {
    const selected = saved.has(button.dataset.save);
    button.setAttribute('aria-pressed', selected);
    button.textContent = selected ? '◆ 已收藏' : '◇ 收藏';
  });
}

function entryKey(item) { return featuredMeta[item.name]?.key || item.slug; }
function localUrl(item) { return `style.html?style=${encodeURIComponent(entryKey(item))}`; }
function sourceUrl(item) { return `https://aesthetics.fandom.com/wiki/${encodeURIComponent(item.slug)}`; }
function imageSrc(image) { return image.localAvailable ? image.local : image.src; }
function previewSrc(image) {
  const source = imageSrc(image);
  const match = /^images\/detail\/(\d+)\.[a-z0-9]+$/i.exec(source || '');
  return match ? `images/detail-preview/${match[1]}.webp` : source;
}
function imageIdentity(url) { try { return decodeURIComponent(String(url || '').split('/revision/')[0]).toLowerCase(); } catch { return String(url || '').toLowerCase(); } }
function recentNames() { try { return JSON.parse(localStorage.getItem('atlas-recent') || '[]'); } catch { return []; } }
function rememberVisit(name) {
  const next = [name, ...recentNames().filter((item) => item !== name)].slice(0, 100);
  localStorage.setItem('atlas-recent', JSON.stringify(next));
}

function initCatalog() {
  const grid = document.querySelector('#catalog-grid');
  if (!grid) return;
  const params = new URLSearchParams(location.search);
  const savedView = params.get('view') === 'saved';
  const state = {
    type: params.get('type') || '全部', era: params.get('era') || '全部',
    mood: params.get('mood') || '全部', letter: params.get('letter') || '全部',
    query: params.get('q') || '', sort: params.get('sort') || 'az',
    page: Math.max(1, Number(params.get('page')) || 1), savedOnly: savedView
  };
  const perPage = 48;
  const initialReturnKey = `catalog.html${location.search}`;
  let restoredScroll = false;
  document.body.classList.toggle('saved-view', savedView);
  document.querySelector('#browse-nav')?.classList.toggle('active', !savedView);
  document.querySelector('#saved-nav')?.classList.toggle('active', savedView);
  document.querySelector('#catalog-total').textContent = catalog.count;
  document.querySelector('#search').value = state.query;
  document.querySelector('#sort').value = state.sort;
  const types = ['全部', ...catalog.facets.types, '其他'];
  const eras = ['全部', ...['2020s', '2010s', '2000s', '1990s', '1980s', '1970s', '1960s', '1950s', '1940s', '1930s', '1920s', '1910s', '1900s', 'Victorian', 'Renaissance', 'Medieval', 'Ancient'].filter((value) => catalog.items.some((item) => item.eras.includes(value)))];
  const moods = ['全部', ...catalog.facets.moods];
  const letters = ['全部', '#', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
  const buttons = (list, key, node) => { node.innerHTML = list.map((value) => `<button data-filter="${key}" data-value="${value}" class="${state[key] === value ? 'active' : ''}">${value}</button>`).join(''); };
  const updateUrl = () => {
    const next = new URLSearchParams();
    if (savedView) next.set('view', 'saved');
    for (const [key, value] of [['type', state.type], ['era', state.era], ['mood', state.mood], ['letter', state.letter]]) if (value !== '全部') next.set(key, value);
    if (state.query) next.set('q', state.query);
    if (state.sort !== 'az') next.set('sort', state.sort);
    if (state.page > 1) next.set('page', state.page);
    history.replaceState(null, '', `catalog.html${next.size ? `?${next}` : ''}`);
  };
  const renderPager = (totalPages) => {
    const pager = document.querySelector('#pagination');
    if (savedView || totalPages <= 1) { pager.hidden = true; pager.innerHTML = ''; return; }
    pager.hidden = false;
    const pages = [...new Set([1, totalPages, state.page - 1, state.page, state.page + 1].filter((n) => n >= 1 && n <= totalPages))].sort((a, b) => a - b);
    let previous = 0;
    const middle = pages.map((page) => {
      const gap = previous && page - previous > 1 ? '<span aria-hidden="true">…</span>' : '';
      previous = page;
      return `${gap}<button data-page="${page}" class="${page === state.page ? 'active' : ''}" aria-current="${page === state.page ? 'page' : 'false'}">${page}</button>`;
    }).join('');
    pager.innerHTML = `<button data-page="${state.page - 1}" ${state.page === 1 ? 'disabled' : ''} aria-label="上一页">←</button>${middle}<button data-page="${state.page + 1}" ${state.page === totalPages ? 'disabled' : ''} aria-label="下一页">→</button>`;
  };
  const render = () => {
    const query = state.query.toLowerCase();
    const rows = catalog.items.filter((item) => (state.type === '全部' || item.types.includes(state.type)) && (state.era === '全部' || item.eras.includes(state.era)) && (state.mood === '全部' || item.moods.includes(state.mood)) && (state.letter === '全部' || (state.letter === '#' ? /^[^A-Z]/i.test(item.name) : item.letter === state.letter)) && (!state.savedOnly || saved.has(item.name)) && [item.name, item.nameZh, ...item.categories].join(' ').toLowerCase().includes(query));
    if (state.sort === 'trend') rows.sort((a, b) => (b.trendScore || 0) - (a.trendScore || 0) || a.name.localeCompare(b.name, 'en'));
    else if (state.sort === 'recent') {
      const order = new Map(recentNames().map((name, index) => [name, index]));
      rows.sort((a, b) => (order.get(a.name) ?? 99999) - (order.get(b.name) ?? 99999) || a.name.localeCompare(b.name, 'en'));
    } else rows.sort((a, b) => a.name.localeCompare(b.name, 'en') * (state.sort === 'az' ? 1 : -1));
    const totalPages = Math.max(1, Math.ceil(rows.length / perPage));
    state.page = Math.min(state.page, totalPages);
    updateUrl();
    document.querySelector('#result-count').textContent = `${rows.length} 个结果`;
    const start = (state.page - 1) * perPage;
    const returnUrl = `catalog.html${location.search}`;
    grid.innerHTML = rows.slice(start, start + perPage).map((item) => {
      const record = enrichedByName[item.name];
      const cover = record?.images?.[0];
      const thumbnail = item.localThumbnail || (cover ? imageSrc(cover) : item.thumbnail);
      const url = `${localUrl(item)}&return=${encodeURIComponent(returnUrl)}`;
      return `<article class="catalog-card"><a class="catalog-image" data-catalog-link href="${url}">${thumbnail ? `<img src="${escapeHTML(thumbnail)}" alt="${escapeHTML(item.name)}" loading="lazy" decoding="async">` : `<span class="fallback">${escapeHTML(item.name)}</span>`}</a><div class="catalog-info"><h2><a data-catalog-link href="${url}">${escapeHTML(item.name)}</a></h2>${item.nameZh ? `<div class="catalog-cn">${escapeHTML(item.nameZh)}</div>` : ''}<p>${escapeHTML((item.types || []).join(' · ') || '待分类')}</p><div class="chips">${[...(item.moods || []), ...(item.eras || [])].slice(0, 3).map((tag) => `<span>${escapeHTML(tag)}</span>`).join('')}</div></div></article>`;
    }).join('') || '<p class="empty-state">还没有收藏内容。</p>';
    renderPager(totalPages);
    if (!savedView) {
      buttons(types, 'type', document.querySelector('#type-filters'));
      buttons(eras, 'era', document.querySelector('#era-filters'));
      buttons(moods, 'mood', document.querySelector('#mood-filters'));
      buttons(letters, 'letter', document.querySelector('#letter-filters'));
    }
    persist();
    if (!restoredScroll) {
      restoredScroll = true;
      const stored = Number(sessionStorage.getItem(`atlas-scroll:${initialReturnKey}`));
      if (stored) requestAnimationFrame(() => scrollTo(0, stored));
    }
  };
  document.addEventListener('click', (event) => {
    const link = event.target.closest('[data-catalog-link]');
    if (link) sessionStorage.setItem(`atlas-scroll:catalog.html${location.search}`, String(scrollY));
    const filter = event.target.closest('[data-filter]');
    if (filter) { state[filter.dataset.filter] = filter.dataset.value; state.page = 1; render(); scrollTo(0, 0); }
    const page = event.target.closest('[data-page]');
    if (page && !page.disabled) { state.page = Number(page.dataset.page); render(); scrollTo(0, 0); }
  });
  document.querySelector('#search').addEventListener('input', (event) => { state.query = event.target.value.trim(); state.page = 1; render(); });
  document.querySelector('#sort').addEventListener('change', (event) => { state.sort = event.target.value; state.page = 1; render(); });
  render();
}
let current;
let shown = 0;
function addImages() {
  const grid = document.querySelector('#gallery-grid');
  const images = current.images || [];
  const next = images.slice(shown, shown + 24);
  grid.insertAdjacentHTML('beforeend', next.map((image, index) => `<figure><button class="gallery-image" data-image="${shown + index}"><img src="${escapeHTML(previewSrc(image))}" alt="${escapeHTML(image.caption || current.name)}" loading="lazy" decoding="async" referrerpolicy="no-referrer"></button>${image.caption ? `<figcaption><span>${escapeHTML(image.caption)}</span></figcaption>` : ''}</figure>`).join(''));
  grid.querySelectorAll('img:not([data-error-ready])').forEach((image) => {
    image.dataset.errorReady = 'true';
    const recover = () => {
      const fallback = current.fallback;
      if (fallback && image.getAttribute('src') !== fallback) image.src = fallback;
      else image.closest('figure')?.remove();
    };
    image.addEventListener('error', recover);
    setTimeout(() => { if (image.complete && image.naturalWidth === 0) recover(); }, 0);
  });
  shown += next.length;
  document.querySelector('#gallery-count').textContent = `${shown} / ${images.length}`;
  const button = document.querySelector('#more-images');
  button.hidden = shown >= images.length;
  button.textContent = `再显示 ${Math.min(24, images.length - shown)} 张`;
}

function findDetailItem(key) { return catalogBySlug[key] || catalog.items.find((item) => featuredMeta[item.name]?.key === key); }
function genericBody(item) {
  const types = item.types?.length ? item.types.join('、') : '其他';
  const moods = item.moods?.length ? `常见气质包括${item.moods.join('、')}。` : '';
  const eras = item.eras?.length ? `它与${item.eras.join('、')}的视觉文化有关。` : '';
  return [`${item.name} 是 Aesthetics Wiki 收录的美学概念。本站依据原站分类，将它归入${types}。${moods}${eras}`, '这一页已接入站内目录、收藏与图像浏览。更完整的中文释义和原站画廊正在持续整理；页面底部保留来源与许可信息。'];
}

async function initDetail() {
  const root = document.querySelector('#article-root');
  if (!root) return;
  const detailParams = new URLSearchParams(location.search);
  const key = detailParams.get('style') || '';
  const requestedReturn = detailParams.get('return') || '';
  const returnTarget = requestedReturn.startsWith('catalog.html') ? requestedReturn : 'catalog.html';
  const item = findDetailItem(key);
  if (!item) { root.innerHTML = '<div class="not-found"><h1>没有找到这个词条</h1><a href="catalog.html">返回目录</a></div>'; return; }
  root.innerHTML = '<div class="detail-loading" role="status">正在读取词条…</div>';
  let record = enrichedByName[item.name];
  if (!record && item.contentPath) {
    try {
      const response = await fetch(`${item.contentPath}?v=6`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      record = await response.json();
    } catch (error) {
      console.warn(`Unable to load ${item.contentPath}`, error);
    }
  }
  const firstChineseParagraph = record?.blocksZh?.find((block) => block.kind === 'paragraph')?.text;
  const meta = featuredMeta[item.name] || { cn: item.nameZh || '', year: item.eras?.join(' · ') || 'Aesthetics Wiki', tags: [...(item.moods || []), ...(item.types || [])].slice(0, 4), summary: firstChineseParagraph ? `${firstChineseParagraph.slice(0, 120)}${firstChineseParagraph.length > 120 ? '…' : ''}` : `${item.nameZh || item.name} 的站内资料页。` };
  const coverImage = item.localThumbnail || item.thumbnail ? { src: item.localThumbnail || item.thumbnail, caption: item.name } : null;
  const distinctRemoteImages = (record?.images || []).filter((image) => imageIdentity(image.src) !== imageIdentity(item.thumbnail));
  const images = record?.language === 'en'
    ? [coverImage, ...distinctRemoteImages.slice(0, 2)].filter(Boolean)
    : record?.images?.length ? record.images : coverImage ? [coverImage] : [];
  current = { ...(record || {}), name: item.name, images, fallback: coverImage?.src || '' };
  shown = 0;
  rememberVisit(item.name);
  document.title = `${item.name} — 形外 Index`;
  const translatedBlocks = record?.blocksZh || [];
  const sourceBlocks = record?.blocks || [];
  const readableBlocks = translatedBlocks.length ? translatedBlocks : sourceBlocks;
  const bodyLanguage = translatedBlocks.length ? 'zh-CN' : sourceBlocks.length ? 'en' : 'zh-CN';
  let section = 0;
  const body = readableBlocks.length
    ? readableBlocks.map((block) => block.kind === 'heading' ? `<h3 id="s${++section}">${escapeHTML(block.text)}</h3>` : block.kind === 'quote' ? `<blockquote>${escapeHTML(block.text)}</blockquote>` : `<p class="${block.kind === 'list' ? 'article-list-item' : ''}">${escapeHTML(block.text)}</p>`).join('')
    : (chineseBody[item.name] || genericBody(item)).map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join('');
  const originalUrl = record?.url || sourceUrl(item);
  const versionLink = record?.revision ? `<a href="${originalUrl}?oldid=${record.revision}" target="_blank" rel="noreferrer">来源版本</a> · ` : '';
  const contentNote = translatedBlocks.length ? '中文内容为本站编译与整理；' : sourceBlocks.length ? '正文保留原站英文内容；' : '';
  const usefulSummary = meta.summary && !/的站内资料页。?$/.test(meta.summary.trim());
  root.innerHTML = `<div class="split-detail"><article class="detail-copy"><a class="detail-back" href="${escapeHTML(returnTarget)}">← 返回目录</a><h1>${escapeHTML(item.name)}</h1><div class="detail-cn">${meta.cn ? `${escapeHTML(meta.cn)} · ` : ''}${escapeHTML(meta.year)}</div>${usefulSummary ? `<p class="detail-summary">${escapeHTML(meta.summary)}</p>` : ''}<div class="detail-tags">${meta.tags.map((tag) => `<span>${escapeHTML(tag)}</span>`).join('')}</div><div class="detail-actions"><button data-save="${escapeHTML(item.name)}">◇ 收藏</button><a href="${originalUrl}" target="_blank" rel="noreferrer">查看原站 ↗</a></div><section class="detail-section"><h2>概念与背景</h2><div class="article-body" lang="${bodyLanguage}">${body}</div></section><section class="detail-section"><h2>来源与许可</h2><div class="source-credit">资料来源于 Aesthetics Wiki《${escapeHTML(record?.title || item.name)}》及其贡献者；${contentNote}原站文字按 <a href="${record?.licenseUrl || 'https://www.fandom.com/licensing'}" target="_blank" rel="noreferrer">CC BY-SA</a> 使用。<br>${versionLink}<a href="${originalUrl}?action=history" target="_blank" rel="noreferrer">编辑历史</a><br>图片授权需在原站对应文件说明页核实。</div></section></article><aside class="detail-gallery"><div class="gallery-toolbar"><strong>GALLERY</strong><span id="gallery-count"></span></div><div class="gallery-grid" id="gallery-grid"></div><button class="more-images" id="more-images">显示更多</button></aside></div><dialog id="viewer"><button id="close-viewer" aria-label="关闭">×</button><img id="viewer-image" alt="" referrerpolicy="no-referrer"><div class="viewer-caption"><span id="viewer-caption"></span></div></dialog>`;
  document.querySelector('#gallery-grid').addEventListener('error', (event) => {
    if (event.target.tagName !== 'IMG') return;
    event.target.closest('figure')?.remove();
    document.querySelector('#gallery-count').textContent = `${document.querySelectorAll('#gallery-grid figure').length} / ${current.images.length}`;
  }, true);
  addImages();
  persist();
  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-save]')) { saved.has(item.name) ? saved.delete(item.name) : saved.add(item.name); persist(); }
    if (event.target.closest('#more-images')) addImages();
    const imageButton = event.target.closest('[data-image]');
    if (imageButton) {
      const image = current.images[Number(imageButton.dataset.image)];
      const dialog = document.querySelector('#viewer');
      document.querySelector('#viewer-image').src = imageSrc(image);
      document.querySelector('#viewer-image').alt = image.caption || item.name;
      document.querySelector('#viewer-caption').textContent = image.caption || item.name;
      dialog.showModal();
    }
    if (event.target.closest('#close-viewer')) document.querySelector('#viewer').close();
  });
}

initCatalog();
initDetail();
persist();
