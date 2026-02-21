// ===== Namaz App Logic - Dynamic Rakat Tabs =====

let currentPrayer = 'fajr';
let currentType = 'farz'; // farz, sunnah, or nofol
let currentPhase = 'info'; // Default to info for safety

document.addEventListener('DOMContentLoaded', () => {
    changePrayer('fajr');
    setupStickyLogic();
});

function setupStickyLogic() {
    const stickyEl = document.getElementById('sticky-status');
    const navEl = document.getElementById('dynamic-nav');

    window.addEventListener('scroll', () => {
        if (!navEl || !stickyEl) return;
        const navBottom = navEl.offsetTop + navEl.offsetHeight;
        if (window.scrollY > navBottom) {
            stickyEl.classList.remove('translate-y-[-100%]', 'opacity-0', 'pointer-events-none');
            stickyEl.classList.add('translate-y-0', 'opacity-100');
        } else {
            stickyEl.classList.add('translate-y-[-100%]', 'opacity-0', 'pointer-events-none');
            stickyEl.classList.remove('translate-y-0', 'opacity-100');
        }
    });
}

function changePrayer(key) {
    currentPrayer = key;
    currentPhase = 'info'; // Set to info by default when changing prayer

    // Update Prayer Selection UI
    document.querySelectorAll('.prayer-chip').forEach(btn => btn.classList.remove('active'));
    const activePrayerBtn = document.getElementById(`p-${key}`);
    if (activePrayerBtn) activePrayerBtn.classList.add('active');

    // Update Titles
    const p = PRAYERS[key];
    document.getElementById('main-title').textContent = `${p.name} এর নামাজ`;

    // Hide/Show Toggle Buttons based on availability
    document.getElementById('t-sunnah').classList.toggle('hidden', p.sunnah === 0);
    document.getElementById('t-nofol').classList.toggle('hidden', p.nofol === 0);

    // Reset type if current selected type is hidden or not available for this prayer
    if (p[currentType] === 0) {
        if (p.farz > 0) currentType = 'farz';
        else if (p.sunnah > 0) currentType = 'sunnah';
        else if (p.nofol > 0) currentType = 'nofol';
    }

    updateNav();

    // Center active prayer chip horizontally using safe scrollLeft calculation
    setTimeout(() => {
        const activeChip = document.getElementById(`p-${key}`);
        const container = activeChip ? activeChip.parentElement : null;
        if (activeChip && container) {
            const scrollPos = activeChip.offsetLeft - (container.clientWidth / 2) + (activeChip.clientWidth / 2);
            container.scrollTo({ left: scrollPos, behavior: 'smooth' });
        }
    }, 50);
}

function setPrayerType(type) {
    currentType = type;
    currentPhase = 'info'; // Default to info when changing type
    updateNav();
}

function updateNav() {
    const nav = document.getElementById('dynamic-nav');
    if (!nav) return;

    const p = PRAYERS[currentPrayer];
    const typeCount = p[currentType];

    // Update Type Toggle UI
    const farzBtn = document.getElementById('t-farz');
    const sunnahBtn = document.getElementById('t-sunnah');
    const nofolBtn = document.getElementById('t-nofol');

    const activeClass = "flex-1 py-2.5 rounded-xl text-[10px] font-bold transition-all bg-emerald-600 text-white shadow-lg shadow-emerald-100";
    const inactiveClass = "flex-1 py-2.5 rounded-xl text-[10px] font-bold transition-all bg-transparent text-emerald-700 hover:bg-emerald-50";

    // Show/Hide and set classes
    farzBtn.className = currentType === 'farz' ? activeClass : inactiveClass;
    farzBtn.classList.toggle('hidden', p.farz === 0);

    sunnahBtn.className = currentType === 'sunnah' ? activeClass : inactiveClass;
    sunnahBtn.classList.toggle('hidden', p.sunnah === 0);

    nofolBtn.className = currentType === 'nofol' ? activeClass : inactiveClass;
    nofolBtn.classList.toggle('hidden', p.nofol === 0);

    // Update Sticky Status Bar
    const stickyStatus = document.getElementById('sticky-status');
    const typeLabel = currentType === 'farz' ? 'ফরজ' : (currentType === 'sunnah' ? 'সুন্নত' : 'নফল');
    const phaseLabel = currentPhase === 'info' ? 'জরুরি তথ্য' : `${["", "১ম", "২য়", "৩য়", "৪র্থ"][currentPhase]} রাকাত`;

    if (stickyStatus) {
        stickyStatus.innerHTML = `
            <div class="flex items-center justify-between px-4 py-2.5 bg-emerald-600/95 backdrop-blur-md text-white rounded-2xl shadow-xl border border-emerald-500/30">
                <div class="flex items-center gap-2 overflow-hidden">
                    <span class="text-[10px] font-bold opacity-80 uppercase tracking-tighter whitespace-nowrap">${p.name} • ${typeLabel}</span>
                    <span class="w-1 h-1 bg-white/30 rounded-full"></span>
                    <span class="text-xs font-black whitespace-nowrap">${phaseLabel}</span>
                </div>
                <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="bg-white/20 p-1.5 rounded-lg hover:bg-white/30 transition-all ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                </button>
            </div>
        `;
    }

    // Build Nav Buttons
    let navHtml = `
        <button onclick="setPhase('info')" id="btn-info" class="namaz-tab ${currentPhase === 'info' ? 'active' : ''} whitespace-nowrap px-4 py-3 rounded-xl font-bold transition-all duration-300">
            জরুরি তথ্য
        </button>
    `;

    // Add Rakat buttons if available
    const bnNums = ["১ম", "২য়", "৩য়", "৪র্থ"];
    for (let i = 1; i <= typeCount; i++) {
        navHtml += `
            <button onclick="setPhase(${i})" id="btn-rakat-${i}" class="namaz-tab ${currentPhase === i ? 'active' : ''} whitespace-nowrap px-4 py-3 rounded-xl font-bold transition-all duration-300">
                ${bnNums[i - 1]} রাকাত
            </button>
        `;
    }

    nav.innerHTML = navHtml;
    renderContent();
}

function setPhase(phase) {
    currentPhase = phase;
    updateNav();

    const nav = document.getElementById('dynamic-nav');

    // Smoothly scroll window to just above the tabs (better UX than scrolling to very top)
    if (nav) {
        const yOffset = nav.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: Math.max(0, yOffset), behavior: 'smooth' });
    }

    // Center the active tab horizontally using safe scrollLeft calculation
    setTimeout(() => {
        const activeTab = document.querySelector('.namaz-tab.active');
        if (activeTab && nav) {
            const scrollPos = activeTab.offsetLeft - (nav.clientWidth / 2) + (activeTab.clientWidth / 2);
            nav.scrollTo({ left: scrollPos, behavior: 'smooth' });
        }
    }, 50);
}

function renderContent() {
    const container = document.getElementById('content-container');
    if (!container) return;

    if (currentPhase === 'info') {
        let infoHtml = renderInfoTab(currentPrayer);
        const p = PRAYERS[currentPrayer];
        const typeCount = p[currentType];

        if (typeCount > 0) {
            infoHtml += `
                <div class="flex gap-4 mt-8 pb-10">
                    <button onclick="setPhase(1)" class="flex-1 py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all">১ম রাকাত শুরু করুন →</button>
                </div>
            `;
        }
        container.innerHTML = infoHtml;
    } else {
        const prayerKey = currentPrayer;
        const typeStepsKey = currentType === 'farz' ? 'farz_steps' : (currentType === 'sunnah' ? 'sunnah_steps' : 'nofol_steps');
        const allSteps = NAMAZ_DATA_DYNAMIC[prayerKey][typeStepsKey];

        // Filter steps for specific rakat
        const rakatSteps = allSteps.filter(s => s.rakat === currentPhase);

        if (rakatSteps.length === 0) {
            container.innerHTML = `
                <div class="p-10 text-center text-gray-400 bg-white rounded-3xl border border-dashed border-gray-100">
                    এই রুকনের তথ্য পাওয়া যায়নি।
                </div>
            `;
        } else {
            let contentHtml = rakatSteps.map((step, idx) => renderStepCard(step, idx + 1)).join('');

            // Add Navigation Buttons (Next/Prev)
            const p = PRAYERS[currentPrayer];
            const typeCount = p[currentType];

            let navButtons = `<div class="flex gap-4 mt-6 pb-6">`;

            // Previous Button
            if (currentPhase === 1) {
                navButtons += `<button onclick="setPhase('info')" class="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all">← তথ্য ট্যাব</button>`;
            } else if (typeof currentPhase === 'number' && currentPhase > 1) {
                navButtons += `<button onclick="setPhase(${currentPhase - 1})" class="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all">← পূর্ববর্তী রাকাত</button>`;
            }

            // Next Button
            if (currentPhase === 'info' && typeCount > 0) {
                navButtons += `<button onclick="setPhase(1)" class="flex-1 py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all">১ম রাকাত শুরু করুন →</button>`;
            } else if (typeof currentPhase === 'number' && currentPhase < typeCount) {
                const bnNext = ["১ম", "২য়", "৩য়", "৪র্থ"][currentPhase];
                navButtons += `<button onclick="setPhase(${currentPhase + 1})" class="flex-1 py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all">${bnNext} রাকাত →</button>`;
            }

            navButtons += `</div>`;
            container.innerHTML = contentHtml + navButtons;
        }
    }
}

function renderStepCard(step, displayIndex) {
    let duasHtml = '';
    if (step.duas && step.duas.length > 0) {
        duasHtml = step.duas.map((dua, di) => {
            if (!dua) return '';
            const duaId = `dua-${currentPhase}-${displayIndex}-${di}`;
            return `
                <div class="dua-box mt-4">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-[10px] uppercase font-bold text-emerald-600 tracking-widest bg-white px-2 py-0.5 rounded border border-emerald-50">${dua.label || 'দোয়া'}</span>
                        <button onclick="toggleMeaning('${duaId}')" class="text-[10px] font-extrabold text-emerald-700 bg-emerald-100/50 px-3 py-1 rounded-lg hover:bg-emerald-200 transition-colors">📄 অর্থ দেখুন</button>
                    </div>
                    ${dua.arabic ? `<p class="text-2xl md:text-3xl text-center text-emerald-950 font-serif leading-loose mb-3" dir="rtl" style="font-family: 'Amiri', serif;">${dua.arabic}</p>` : ''}
                    ${dua.pronunciation ? `<p class="text-sm md:text-base text-emerald-950 leading-relaxed bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50 text-justify"><span class="font-black text-emerald-800 underline decoration-emerald-200 decoration-2 underline-offset-4 mr-1">উচ্চারণ:</span> ${dua.pronunciation}</p>` : ''}
                    <div id="${duaId}" class="hidden mt-3 p-3 bg-white/80 rounded-lg border border-dashed border-emerald-200 animate-in fade-in zoom-in duration-300">
                        <p class="text-xs md:text-sm italic text-gray-700 leading-relaxed text-justify"><span class="font-bold not-italic text-emerald-600">অনুবাদ:</span> ${dua.bangla || 'অনুবাদ দেওয়া হয়নি'}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    return `
        <div class="step-card animate-in fade-in slide-in-from-bottom-2 duration-400">
            <div class="flex justify-between items-start mb-3">
                <div class="flex items-center gap-3">
                    <span class="w-8 h-8 flex items-center justify-center bg-emerald-600 text-white font-bold rounded-xl text-sm shadow-md shadow-emerald-100">${displayIndex}</span>
                    <h3 class="text-lg font-bold text-gray-800">${step.title}</h3>
                </div>
                <div class="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl text-[10px] font-bold">
                    <span class="text-emerald-500 scale-90">${getIcon(step.posture)}</span>
                    <span class="uppercase tracking-tighter opacity-80">${step.postureLabel}</span>
                </div>
            </div>
            <p class="text-xs md:text-sm text-gray-600 leading-relaxed mb-4 font-medium text-justify">${step.description}</p>
            ${duasHtml}
        </div>
    `;
}

function renderInfoTab(prayerKey) {
    const p = PRAYERS[prayerKey];
    const items = [
        { label: "নামাজ", val: p.name },
        { label: "সময়", val: p.summary },
        { label: "ফরজ", val: `${p.farz} রাকাত` },
        { label: "সুন্নত", val: p.sunnah > 0 ? `${p.sunnah} রাকাত` : "নেই" },
        { label: "নফল", val: p.nofol > 0 ? `${p.nofol} রাকাত` : "নেই" }
    ];

    return `
        <div class="grid grid-cols-2 gap-2 animate-in fade-in duration-400">
            ${items.map(i => `
                <div class="flex flex-col p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-tight mb-1">${i.label}</span>
                    <span class="text-xs font-bold text-emerald-800">${i.val}</span>
                </div>
            `).join('')}
            <div class="col-span-2 mt-2 p-4 bg-emerald-600 text-white rounded-xl shadow-md relative overflow-hidden">
                <div class="relative z-10">
                    <h4 class="text-xs font-bold mb-1">নির্দেশনা:</h4>
                    <p class="text-[10px] opacity-90 leading-snug">
                        নিয়ত ও নামাজের প্রতিটি ধাপ সিরিয়ালি দেখতে নিচের বাটনগুলো ব্যবহার করুন। 
                    </p>
                </div>
            </div>
        </div>
    `;
}

const ICON_MAP = {
    "🙌": `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`,
    "🧎": `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    "🙇": `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m7 10 5 5 5-5"/></svg>`,
    "🤲": `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 11V7a5 5 0 0 1 10 0v4"/><path d="M11 21a8 8 0 0 0 8-8v-2H5v2a8 8 0 0 0 8 8Z"/></svg>`,
    "🕊️": `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
};

function getIcon(e) { return ICON_MAP[e] || e; }

function toggleMeaning(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden');
}
