window.__ModuleLoader__.load({
    id: "dsh-effort-switcher",
    factory: (require) => {
        const module = { exports: {} };
        const exports = module.exports;
        const react = require("react");

        // 插件元数据：名称、依赖项和插槽注册目标
        const name = "effort-switcher";
        const inject = ["slots", "modelDirectories", "sessions", "remote.session"];
        const slotName = "conversation.input.model";

        const css = `
code {
    font-size: 14px !important;
    font-family: "Cascadia Code", "Fira Code", "JetBrains Mono", "HarmonyOS Sans SC" !important;
}
.dsh-es-root {
    min-width: 0;
    position: relative;
    display: inline-flex;
}
.dsh-es-trigger {
    min-width: 0;
    max-width: 200px;
    height: 26px;
    color: var(--dsw-alias-label-secondary);
    cursor: pointer;
    background: 0 0;
    border: none;
    border-radius: 22px;
    outline: none;
    align-items: center;
    gap: 3px;
    padding: 0 3px 0 6px;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    display: flex;
}
.dsh-es-trigger:hover:not(:disabled) {
    background: var(--dsw-alias-interactive-bg-hover);
}
.dsh-es-trigger:focus-visible {
    box-shadow: 0 0 0 2px var(--dsw-alias-border-l3);
}
.dsh-es-trigger:disabled {
    color: var(--dsw-alias-label-dimmed);
    cursor: default;
}
.dsh-es-triggerLabel {
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
    overflow: hidden;
}
.dsh-es-triggerEffort {
    color: var(--dsw-alias-label-caption);
    flex: none;
}
.dsh-es-chevron {
    color: var(--dsw-alias-label-caption);
    flex: none;
    transition: transform .12s;
}
.dsh-es-chevronOpen {
    transform: rotate(180deg);
}
.dsh-es-menu {
    z-index: 9999;
    border: 1px solid var(--dsw-alias-border-inverted);
    background: Canvas;
    width: min(240px, calc(100vw - 32px));
    max-height: min(380px, calc(100vh - 96px));
    box-shadow: var(--dsw-shadow-lv3);
    color: var(--dsw-alias-label-primary);
    --dsh-scrollbar-thumb: var(--dsw-alias-scrollbar-bg-l2);
    --dsh-scrollbar-thumb-hover: var(--dsw-alias-scrollbar-hover-l2);
    border-radius: 10px;
    flex-direction: column;
    padding: 3px;
    display: flex;
    position: absolute;
    bottom: calc(100% + 8px);
    right: 0;
    overflow: hidden;
    animation: dsh-es-pop .12s ease-out;
}
.dsh-es-modelRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    width: 100%;
    border: none;
    background: 0 0;
    color: inherit;
    font: inherit;
    text-align: left;
    border-radius: 6px;
    padding: 4px 6px;
    cursor: pointer;
    font-size: 12px;
    line-height: 18px;
    color: var(--dsw-alias-label-secondary);
}
.dsh-es-modelRow:hover {
    background: var(--dsw-alias-interactive-bg-hover);
}
.dsh-es-modelRowLabel {
    color: var(--dsw-alias-label-tertiary);
    flex: none;
    font-size: 11px;
}
.dsh-es-modelRowValue {
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
    overflow: hidden;
    color: var(--dsw-alias-label-primary);
    font-weight: 500;
}
.dsh-es-modelList {
    overflow-y: auto;
    min-height: 0;
    flex: 1 1 auto;
    border-radius: 6px;
    margin: 0 2px;
    scrollbar-width: none;
    -ms-overflow-style: none;
}
.dsh-es-modelList::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
}
.dsh-es-modelMenu {
    z-index: 10000;
    border: 1px solid var(--dsw-alias-border-inverted);
    background: Canvas;
    width: min(220px, calc(100vw - 32px));
    max-height: min(240px, calc(100vh - 96px));
    box-shadow: var(--dsw-shadow-lv3);
    color: var(--dsw-alias-label-primary);
    --dsh-scrollbar-thumb: var(--dsw-alias-scrollbar-bg-l2);
    --dsh-scrollbar-thumb-hover: var(--dsw-alias-scrollbar-hover-l2);
    border-radius: 10px;
    flex-direction: column;
    padding: 3px;
    display: flex;
    overflow: hidden;
    animation: dsh-es-pop .12s ease-out;
}
.dsh-es-modelMenu .dsh-es-modelList {
    max-height: none;
    margin: 0;
}
.dsh-es-modelMenu .dsh-es-menuGroup:first-child {
    padding-top: 6px;
}
.dsh-es-menuGroup {
    color: var(--dsw-alias-label-tertiary);
    padding: 6px 8px 2px;
    font-size: 10px;
    line-height: 14px;
}
.dsh-es-menuItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    width: 100%;
    border: none;
    background: 0 0;
    color: inherit;
    font: inherit;
    text-align: left;
    border-radius: 6px;
    padding: 4px 6px;
    cursor: pointer;
    font-size: 12px;
    line-height: 18px;
}
.dsh-es-menuItem:hover {
    background: var(--dsw-alias-interactive-bg-hover);
}
.dsh-es-menuItemActive {
    color: var(--dsw-alias-state-info-primary);
}
.dsh-es-menuItemBlocked {
    color: var(--dsw-alias-label-tertiary);
    cursor: not-allowed;
}
.dsh-es-menuItemBlocked:hover {
    background: var(--dsw-alias-interactive-bg-hover);
}
.dsh-es-menuItemNotice {
    position: relative;
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    color: var(--dsw-alias-label-tertiary);
}
.dsh-es-menuItemTip {
    z-index: 10001;
    position: fixed;
    width: max-content;
    max-width: 200px;
    padding: 5px 6px;
    border: 1px solid var(--dsw-alias-border-inverted);
    border-radius: 6px;
    background: Canvas;
    box-shadow: var(--dsw-shadow-lv3);
    color: var(--dsw-alias-label-primary);
    font-size: 11px;
    line-height: 15px;
    white-space: normal;
    pointer-events: none;
}
.dsh-es-menuItemDesc {
    color: var(--dsw-alias-label-caption);
    font-size: 11px;
    line-height: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.dsh-es-menuStatus, .dsh-es-menuEmpty {
    color: var(--dsw-alias-label-tertiary);
    padding: 8px;
    font-size: 12px;
    line-height: 18px;
}
.dsh-es-menuError {
    background: var(--dsw-alias-interactive-bg-hover-danger);
    color: var(--dsw-alias-state-error-primary);
    border-radius: 6px;
    margin: 3px;
    padding: 5px 6px;
    font-size: 11px;
    line-height: 18px;
}
.dsh-es-menuDivider {
    height: 1px;
    margin: 4px 0;
    background: var(--dsw-alias-border-l1);
    flex: none;
}
.dsh-es-sliderWrap {
    padding: 3px 8px 5px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: none;
}
.dsh-es-sliderHead {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    font-size: 11px;
    line-height: 16px;
    color: var(--dsw-alias-label-secondary);
}
.dsh-es-sliderHead strong {
    color: var(--dsw-alias-label-primary);
    font-weight: 600;
}
.dsh-es-sliderRail {
    --slider-cycle: 5.6s;
    --slider-motion: .22s cubic-bezier(.22, .61, .36, 1);
    --slider-tint: 132 224 227;
    position: relative;
    height: 26px;
    margin: 8px 0 10px;
}
.dsh-es-sliderRail::before {
    content: "";
    position: absolute;
    inset: 0;
    border: 1px solid rgb(var(--slider-tint) / 28%);
    border-radius: 13px;
    box-shadow: 0 0 8px rgb(var(--slider-tint) / 16%), 0 2px 3px rgb(0 0 0 / 10%);
    opacity: var(--slider-rail-glow, .28);
    pointer-events: none;
    transition: opacity .3s ease;
}
.dsh-es-sliderGroove {
    position: absolute;
    inset: 0;
    isolation: isolate;
    overflow: hidden;
    border-radius: 13px;
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 32%);
    pointer-events: none;
}
.dsh-es-sliderGroove::before {
    content: "";
    position: absolute;
    z-index: 2;
    inset: 0 -24px;
    background:
        repeating-linear-gradient(90deg, rgb(255 255 255 / 12%) 0 1px, transparent 1px 12px),
        repeating-linear-gradient(0deg, transparent 0 5px, rgb(255 255 255 / 8%) 5px 6px, transparent 6px 12px);
    background-size: 24px 100%, 100% 12px;
    opacity: .23;
    mix-blend-mode: screen;
    animation: dsh-es-tech-grid calc(var(--slider-cycle) * 3) linear infinite;
}
.dsh-es-sliderGroove::after {
    content: "";
    position: absolute;
    z-index: 3;
    top: 1px;
    bottom: 1px;
    left: 0;
    width: 42%;
    background: linear-gradient(105deg, transparent 12%, rgb(var(--slider-tint) / 8%) 38%, rgb(240 255 252 / 46%) 51%, rgb(var(--slider-tint) / 14%) 58%, transparent 78%);
    opacity: 0;
    transform: translateX(-120%);
    mix-blend-mode: screen;
    animation: dsh-es-track-scan var(--slider-cycle) cubic-bezier(.4, 0, .2, 1) infinite;
}
.dsh-es-sliderTrack, .dsh-es-sliderFill {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    border-radius: 13px;
    pointer-events: none;
}
.dsh-es-sliderTrack {
    z-index: 0;
    right: 0;
    background:
        linear-gradient(180deg, rgb(255 255 255 / 12%), transparent 60%),
        linear-gradient(0deg, rgb(128 156 166 / 6%), rgb(128 156 166 / 6%)),
        Canvas;
    box-shadow: inset 0 0 0 1px rgb(128 156 166 / 12%);
}
.dsh-es-sliderFill {
    z-index: 1;
    overflow: hidden;
    background:
        linear-gradient(180deg, rgb(255 255 255 / 22%), transparent 42%, rgb(0 0 0 / 12%)),
        linear-gradient(90deg, #398bdd, #55b8d9 65%, #80dcd6);
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 28%), inset 0 -1px 0 rgb(18 62 100 / 18%);
    transition: width var(--slider-motion);
}
.dsh-es-sliderFill::before {
    content: "";
    position: absolute;
    z-index: 3;
    top: 1px;
    right: -4px;
    bottom: 1px;
    width: 16px;
    border-radius: 8px;
    background: linear-gradient(90deg, transparent, rgb(var(--slider-tint) / 44%) 54%, rgb(243 255 251 / 80%));
    opacity: var(--fill-core-opacity, .26);
    transform-origin: right center;
    animation: dsh-es-fill-core var(--slider-cycle) ease-in-out infinite;
}
.dsh-es-sliderFill::after {
    content: "";
    position: absolute;
    z-index: 4;
    top: 1px;
    right: 0;
    left: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 5%, rgb(224 254 247 / 46%) 32%, rgb(255 245 220 / 74%) 76%, transparent);
    opacity: var(--fill-edge-opacity, .3);
    box-shadow: 0 0 3px rgb(var(--slider-tint) / 34%);
}
.dsh-es-sliderBloom {
    position: absolute;
    z-index: 0;
    inset: 0;
    background:
        linear-gradient(180deg, rgb(255 255 255 / 16%), transparent 42%, rgb(20 62 104 / 12%)),
        linear-gradient(90deg, #429be5 0%, #63ccd6 45%, #93d9d4 70%, #a49bdc 100%);
    background-size: 100% 100%, 200% 100%;
    background-position: 0 0, 0% 50%;
    opacity: var(--fill-bloom-opacity, .2);
    transition: opacity .4s ease;
}
.dsh-es-sliderBloom::before {
    content: "";
    position: absolute;
    inset: 0 -36px;
    background: repeating-linear-gradient(110deg, transparent 0 18px, rgb(255 255 255 / 14%) 18px 19px, transparent 19px 36px);
    background-size: 36px 100%;
    opacity: .28;
    animation: dsh-es-energy-stream var(--slider-cycle) linear infinite;
}
.dsh-es-sliderBloom::after {
    content: "";
    position: absolute;
    top: 1px;
    right: 0;
    left: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgb(220 254 247 / 64%) 42%, rgb(255 246 219 / 70%) 70%, transparent);
    opacity: .42;
    box-shadow: 0 0 3px rgb(var(--slider-tint) / 40%);
}
.dsh-es-sliderFillMax .dsh-es-sliderBloom {
    opacity: .85;
}
.dsh-es-sliderFillPeak .dsh-es-sliderBloom {
    animation: dsh-es-cosmic-flow calc(var(--slider-cycle) * 2) ease-in-out infinite alternate;
}
.dsh-es-sliderFillPeak .dsh-es-sliderBloom::before {
    opacity: .44;
}
.dsh-es-sliderCurrent {
    position: absolute;
    z-index: 2;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
}
.dsh-es-sliderCurrent::before, .dsh-es-sliderCurrent::after {
    content: "";
    position: absolute;
    top: 36%;
    left: 0;
    width: 40%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgb(var(--slider-tint) / 16%) 48%, rgb(239 255 250 / 76%) 94%, transparent);
    opacity: 0;
    transform: translateX(-120%);
    animation: dsh-es-energy-current var(--slider-cycle) linear infinite;
}
.dsh-es-sliderCurrent::after {
    top: 70%;
    width: 28%;
    background: linear-gradient(90deg, transparent, rgb(255 240 208 / 10%) 48%, rgb(255 246 223 / 62%) 94%, transparent);
    animation-delay: calc(var(--slider-cycle) * -.46);
}
.dsh-es-sliderStars {
    position: absolute;
    z-index: 1;
    inset: 0;
    overflow: hidden;
    border-radius: inherit;
    pointer-events: none;
}
.dsh-es-sliderStarsPeak::before {
    content: "";
    position: absolute;
    inset: -45% -65%;
    background: linear-gradient(110deg, transparent 32%, rgb(162 249 227 / 14%) 40%, rgb(255 255 255 / 16%) 43%, transparent 49%, rgb(255 232 190 / 12%) 64%, transparent 70%);
    animation: dsh-es-aurora calc(var(--slider-cycle) * 1.5) ease-in-out infinite alternate;
}
.dsh-es-sliderStarsPeak::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 20%), inset 0 0 5px rgb(222 250 240 / 12%);
}
.dsh-es-sliderStar {
    position: absolute;
    left: var(--star-x);
    top: var(--star-y);
    width: var(--star-size);
    height: var(--star-size);
    background: var(--star-color, #fff);
    clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%);
    opacity: var(--star-alpha);
    filter: drop-shadow(0 0 1px var(--star-color, #fff));
    transform: translate(-50%, -50%);
    animation: dsh-es-star-twinkle var(--star-duration) ease-in-out var(--star-delay) infinite;
}
.dsh-es-sliderStar:nth-child(3n) {
    animation-name: dsh-es-star-drift;
}
.dsh-es-sliderMeteor {
    --meteor-angle: 28deg;
    position: absolute;
    left: calc(var(--meteor-x) - var(--meteor-length));
    top: var(--meteor-y);
    width: var(--meteor-length);
    height: 1px;
    transform-origin: right center;
    background: linear-gradient(90deg, transparent, rgb(159 239 225 / 48%) 62%, #f3fff9);
    box-shadow: 0 0 3px rgb(225 255 244 / 36%);
    opacity: 0;
    animation: dsh-es-meteor var(--meteor-duration) linear var(--meteor-delay) infinite;
}
.dsh-es-sliderMeteor::before {
    content: "";
    position: absolute;
    inset: -2px 0;
    background: inherit;
    filter: blur(1px);
    opacity: .32;
}
.dsh-es-sliderMeteor::after {
    content: "";
    position: absolute;
    right: -2px;
    top: -1px;
    width: 3px;
    height: 3px;
    background: #f5fff9;
    box-shadow: 0 0 4px rgb(225 255 244 / 60%);
    clip-path: polygon(50% 0, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0 50%, 35% 35%);
}
.dsh-es-sliderBurst {
    position: absolute;
    left: 68%;
    top: 50%;
    width: 14px;
    height: 14px;
    background: #fff;
    clip-path: polygon(50% 0, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0 50%, 40% 40%);
    animation: dsh-es-star-burst 1.1s ease-out both;
}
@keyframes dsh-es-tech-grid {
    from { transform: translateX(0); }
    to { transform: translateX(24px); }
}
@keyframes dsh-es-track-scan {
    0%, 12% { transform: translateX(-120%); opacity: 0; }
    26% { opacity: calc(var(--slider-scan-opacity, .18) * .6); }
    54% { opacity: var(--slider-scan-opacity, .18); }
    78%, 100% { transform: translateX(340%); opacity: 0; }
}
@keyframes dsh-es-energy-stream {
    from { transform: translateX(-36px); }
    to { transform: translateX(0); }
}
@keyframes dsh-es-energy-current {
    0% { transform: translateX(-120%); opacity: 0; }
    16%, 52% { opacity: var(--current-opacity, .32); }
    82%, 100% { transform: translateX(460%); opacity: 0; }
}
@keyframes dsh-es-fill-core {
    0%, 100% { opacity: calc(var(--fill-core-opacity, .26) * .72); transform: scaleX(.88); }
    50% { opacity: var(--fill-core-opacity, .26); transform: scaleX(1.08); }
}
@keyframes dsh-es-tick-pulse {
    0%, 100% { transform: scale(.94); opacity: .76; }
    50% { transform: scale(1.06); opacity: 1; }
}
@keyframes dsh-es-star-twinkle {
    0%, 100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(.88) rotate(-6deg);
    }
    45% {
        opacity: var(--star-alpha);
        transform: translate(-50%, -50%) scale(1.08) rotate(12deg);
    }
    70% {
        opacity: calc(var(--star-alpha) * .74);
        transform: translate(-50%, -50%) scale(.96) rotate(4deg);
    }
}
@keyframes dsh-es-star-drift {
    0%, 100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(.9) rotate(-8deg);
    }
    50% {
        opacity: var(--star-alpha);
        transform: translate(calc(-50% + 1.5px), calc(-50% - 1px)) scale(1.08) rotate(14deg);
    }
}
/* Move on the rotated local X axis to keep the trajectory aligned with the tail. */
@keyframes dsh-es-meteor {
    0% {
        opacity: 0;
        transform: rotate(var(--meteor-angle)) translateX(0);
    }
    8%, 42% {
        opacity: var(--meteor-alpha);
    }
    58%, 100% {
        opacity: 0;
        transform: rotate(var(--meteor-angle)) translateX(var(--meteor-distance));
    }
}
@keyframes dsh-es-cosmic-flow {
    from { background-position: 0 0, 0% 50%; }
    to { background-position: 0 0, 100% 50%; }
}
@keyframes dsh-es-aurora {
    from { transform: translateX(-18%) rotate(-5deg); }
    to { transform: translateX(18%) rotate(-5deg); }
}
@keyframes dsh-es-star-burst {
    0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(.2) rotate(0);
    }
    25% {
        opacity: .72;
        transform: translate(-50%, -50%) scale(1.12) rotate(16deg);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(.5) rotate(45deg);
    }
}
.dsh-es-sliderKnob {
    position: absolute;
    z-index: 4;
    top: 50%;
    width: 30px;
    height: 30px;
    margin-left: -15px;
    pointer-events: none;
    transform: translateY(-50%);
    transition: left var(--slider-motion);
}
.dsh-es-sliderKnob::before {
    content: "";
    position: absolute;
    inset: -2px;
    border: 1px solid rgb(var(--slider-tint) / 42%);
    border-radius: 50%;
    box-shadow: 0 0 6px rgb(var(--slider-tint) / 22%);
    animation: dsh-es-knob-halo 5.6s ease-in-out infinite;
}
.dsh-es-sliderKnobFace {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid rgb(42 99 124 / 48%);
    background:
        linear-gradient(145deg, rgb(255 255 255 / 88%), rgb(255 255 255 / 34%) 32%, transparent 56%),
        linear-gradient(180deg, rgb(var(--slider-tint) / 78%), rgb(var(--slider-tint) / 40%) 58%, rgb(49 115 143 / 35%)),
        Canvas;
    box-shadow: 0 2px 4px rgb(0 0 0 / 18%), 0 0 5px rgb(var(--slider-tint) / 20%), inset 0 1px 1px rgb(255 255 255 / 85%), inset 0 -2px 3px rgb(0 0 0 / 14%);
    transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
}
.dsh-es-sliderKnobFace::before {
    content: "";
    position: absolute;
    top: -25%;
    bottom: -25%;
    left: 0;
    width: 10px;
    background: linear-gradient(90deg, transparent, rgb(255 255 255 / 48%), transparent);
    animation: dsh-es-knob-sheen 6.4s ease-in-out infinite;
}
.dsh-es-sliderKnobFace::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4px;
    height: 10px;
    border-radius: 2px;
    background: rgb(27 83 107 / 60%);
    box-shadow: 0 0 0 1px rgb(255 255 255 / 48%);
    transform: translate(-50%, -50%);
}
@keyframes dsh-es-knob-halo {
    0%, 100% { opacity: .36; }
    50% { opacity: .72; }
}
@keyframes dsh-es-knob-sheen {
    0%, 28% { transform: translateX(-18px) rotate(20deg); opacity: 0; }
    42% { opacity: .58; }
    62%, 100% { transform: translateX(42px) rotate(20deg); opacity: 0; }
}
.dsh-es-sliderRail:not([data-locked]):is(:hover, :focus-within) .dsh-es-sliderKnobFace {
    transform: scale(1.045);
    border-color: rgb(var(--slider-tint) / 90%);
    box-shadow: 0 3px 5px rgb(0 0 0 / 20%), 0 0 8px rgb(var(--slider-tint) / 28%), inset 0 1px 1px rgb(255 255 255 / 95%), inset 0 -2px 3px rgb(0 0 0 / 14%);
}
.dsh-es-sliderRail:not([data-locked]):active .dsh-es-sliderKnobFace {
    transform: scale(.97);
    border-color: rgb(var(--slider-tint) / 84%);
    box-shadow: 0 1px 2px rgb(0 0 0 / 14%), 0 0 5px rgb(var(--slider-tint) / 24%), inset 0 1px 1px rgb(255 255 255 / 90%), inset 0 -2px 3px rgb(0 0 0 / 16%);
}
.dsh-es-sliderRail:not([data-locked]):active .dsh-es-sliderFill,
.dsh-es-sliderRail:not([data-locked]):active .dsh-es-sliderKnob {
    transition-duration: .08s;
}
.dsh-es-sliderTicks {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 15px;
    bottom: 0;
    left: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    pointer-events: none;
}
.dsh-es-sliderTick {
    width: 4px;
    height: 4px;
    border: 1px solid rgb(200 230 226 / 26%);
    border-radius: 50%;
    background: rgb(0 0 0 / 15%);
    box-shadow: 0 0 0 1px rgb(0 0 0 / 8%);
}
.dsh-es-sliderTickActive {
    background: rgb(236 255 245 / 86%);
    border-color: rgb(255 250 227 / 66%);
    box-shadow: 0 0 3px rgb(var(--slider-tint) / 46%);
    animation: dsh-es-tick-pulse var(--slider-cycle) ease-in-out var(--tick-delay, 0s) infinite;
}
.dsh-es-slider {
    -webkit-appearance: none;
    appearance: none;
    position: absolute;
    z-index: 3;
    top: 50%;
    right: 0;
    bottom: auto;
    left: 0;
    width: 100%;
    height: 38px;
    transform: translateY(-50%);
    margin: 0;
    background: transparent;
    cursor: pointer;
    outline: none;
    accent-color: transparent;
    color: transparent;
}
.dsh-es-slider:focus-visible {
    border-radius: 16px;
    outline: 1px solid rgb(var(--slider-tint) / 64%);
    outline-offset: 2px;
}
.dsh-es-slider:disabled {
    cursor: wait;
    opacity: .6;
}
.dsh-es-slider::-webkit-slider-runnable-track {
    height: 26px;
    border: none;
    border-radius: 13px;
    background: transparent;
}
.dsh-es-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    margin-top: -2px;
    border-radius: 50%;
    background: transparent;
    border: none;
    box-shadow: none;
    cursor: inherit;
}
.dsh-es-slider::-moz-range-track, .dsh-es-slider::-moz-range-progress {
    height: 26px;
    border: none;
    border-radius: 13px;
    background: transparent;
}
.dsh-es-slider::-moz-range-thumb {
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: transparent;
    border: none;
    box-shadow: none;
    cursor: inherit;
}
.dsh-es-sliderRail[data-locked] {
    opacity: .62;
}
.dsh-es-sliderRail[data-locked] *,
.dsh-es-sliderRail[data-locked] *::before,
.dsh-es-sliderRail[data-locked] *::after {
    animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
    .dsh-es-sliderRail,
    .dsh-es-sliderRail::before,
    .dsh-es-sliderRail *,
    .dsh-es-sliderRail *::before,
    .dsh-es-sliderRail *::after {
        animation: none !important;
        transition: none !important;
    }
    .dsh-es-sliderRail .dsh-es-sliderKnobFace {
        transform: none !important;
    }
    .dsh-es-sliderGroove::after,
    .dsh-es-sliderCurrent,
    .dsh-es-sliderBloom::before,
    .dsh-es-sliderMeteor,
    .dsh-es-sliderBurst {
        display: none;
    }
}
.dsh-es-sliderDesc {
    margin: 2px 0 0;
    color: var(--dsw-alias-label-caption);
    font-size: 11px;
    line-height: 15px;
}
@keyframes dsh-es-pop {
    from {
        transform: translateY(6px) scale(.98);
    }
    to {
        transform: translateY(0) scale(1);
    }
}
`;

        // Inject styles at module load, exactly like the original ModelSelect
        // bundle does — the client sandbox may not run effect callbacks.
        const STYLE_TAG_ID = "dsh-effort-switcher/seat.css";
        if (typeof document !== "undefined" && document.querySelector(`style[data-plugin-css=${JSON.stringify(STYLE_TAG_ID)}]`) === null) {
            const tag = document.createElement("style");
            tag.dataset.plugin = "dsh-effort-switcher";
            tag.dataset.pluginCss = STYLE_TAG_ID;
            tag.textContent = css;
            document.head.appendChild(tag);
        }

        const MAX_STARS = 24;
        const MAX_METEORS = 6;
        const randomBetween = (min, max) => min + Math.random() * (max - min);
        const randomStar = () => ({
            x: randomBetween(6, 94),
            y: randomBetween(16, 84),
            size: randomBetween(2.5, 5.5)
        });
        const randomMeteor = () => ({
            x: randomBetween(8, 76),
            y: randomBetween(-8, 8),
            distance: randomBetween(48, 88),
            length: randomBetween(18, 32)
        });

        function setStarPosition(element, star, scale) {
            element.style.setProperty("--star-x", `${star.x.toFixed(1)}%`);
            element.style.setProperty("--star-y", `${star.y.toFixed(1)}%`);
            element.style.setProperty("--star-size", `${(star.size * scale).toFixed(2)}px`);
        }

        function setMeteorPath(element, meteor) {
            element.style.setProperty("--meteor-x", `${meteor.x.toFixed(1)}%`);
            element.style.setProperty("--meteor-y", `${meteor.y.toFixed(1)}px`);
            element.style.setProperty("--meteor-distance", `${meteor.distance.toFixed(1)}px`);
            element.style.setProperty("--meteor-length", `${meteor.length.toFixed(1)}px`);
        }

        function effortIndex(levels, current) {
            const index = levels.findIndex((level) => level.id === current);
            return index >= 0 ? index : Math.floor((levels.length - 1) / 2);
        }

        function modelKey(provider, model) {
            return `${provider}/${model}`;
        }

        function explainSelectionError(message) {
            if (typeof message !== "string" || message.length === 0) return "无法切换模型";
            if (message.includes("does not accept image input") || message.includes("already contains images")) {
                return IMAGE_BLOCK_REASON;
            }
            if (message.includes("does not support reasoning effort")) {
                return "此模型不支持当前推理强度";
            }
            return message;
        }

        // Same glyphs as DSH's IconChevronDownOutline14 / IconChevronRightOutline14.
        const ICON_CHEVRON_DOWN = "M11.8486 5.5L11.4238 5.92383L8.69727 8.65137C8.44157 8.90706 8.21562 9.13382 8.01172 9.29785C7.79912 9.46883 7.55595 9.61756 7.25 9.66602C7.08435 9.69222 6.91565 9.69222 6.75 9.66602C6.44405 9.61756 6.20088 9.46883 5.98828 9.29785C5.78438 9.13382 5.55843 8.90706 5.30273 8.65137L2.57617 5.92383L2.15137 5.5L3 4.65137L3.42383 5.07617L6.15137 7.80273C6.42595 8.07732 6.59876 8.24849 6.74023 8.3623C6.87291 8.46904 6.92272 8.47813 6.9375 8.48047C6.97895 8.48703 7.02105 8.48703 7.0625 8.48047C7.07728 8.47813 7.12709 8.46904 7.25977 8.3623C7.40124 8.24849 7.57405 8.07732 7.84863 7.80273L10.5762 5.07617L11 4.65137L11.8486 5.5Z";
        const ICON_CHEVRON_RIGHT = "M5.5 2.15137L5.92383 2.57617L8.65137 5.30273C8.90706 5.55843 9.13382 5.78438 9.29785 5.98828C9.46883 6.20088 9.61756 6.44405 9.66602 6.75C9.69222 6.91565 9.69222 7.08435 9.66602 7.25C9.61756 7.55595 9.46883 7.79912 9.29785 8.01172C9.13382 8.21561 8.90706 8.44157 8.65137 8.69727L5.92383 11.4238L5.5 11.8486L4.65137 11L5.07617 10.5762L7.80273 7.84863C8.07732 7.57405 8.24849 7.40124 8.3623 7.25977C8.46904 7.12709 8.47813 7.07728 8.48047 7.0625C8.48703 7.02105 8.48703 6.97895 8.48047 6.9375C8.47813 6.92272 8.46904 6.87291 8.3623 6.74023C8.24848 6.59876 8.07732 6.42595 7.80273 6.15137L5.07617 3.42383L4.65137 3L5.5 2.15137Z";
        const ICON_WARNING_BAR = "M6.3002 3.32843L7.69986 3.32843L7.69986 7.79657H6.3002L6.3002 3.32843Z";
        const ICON_WARNING_DOT = "M6.3002 9.01935H7.69986V10.6711H6.3002V9.01935Z";
        const ICON_WARNING_RING = "M12.6328 6.99976C12.6328 3.88874 10.111 1.36694 7 1.36694C3.88899 1.36695 1.3672 3.88875 1.36719 6.99976C1.36719 10.1108 3.88899 12.6326 7 12.6326C10.111 12.6326 12.6328 10.1108 12.6328 6.99976ZM13.8582 6.99976C13.8582 10.7873 10.7876 13.8579 7 13.8579C3.21244 13.8579 0.141846 10.7873 0.141846 6.99976C0.141857 3.2122 3.21245 0.141612 7 0.141602C10.7876 0.141602 13.8581 3.21219 13.8582 6.99976Z";
        const IMAGE_BLOCK_REASON = "当前草稿包含图片，此模型不支持图片输入";
        const DEEPSEEK_FLASH_VISION_EXP_MODEL = "deepseek-v4-flash-vision-exp";

        const chevronIcon = (path, className) => react.createElement(
            "svg",
            { className, width: 14, height: 14, viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            react.createElement("path", { d: path, fill: "currentColor" })
        );

        const warningIcon = (className) => react.createElement(
            "svg",
            { className, width: 14, height: 14, viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            react.createElement("path", { d: ICON_WARNING_BAR, fill: "currentColor" }),
            react.createElement("path", { d: ICON_WARNING_DOT, fill: "currentColor" }),
            react.createElement("path", { d: ICON_WARNING_RING, fill: "currentColor" })
        );

        function knownTextOnlyModel(provider, model) {
            return provider === "deepseek-official" && model.id !== DEEPSEEK_FLASH_VISION_EXP_MODEL;
        }

        function defaultUseInput(select) {
            return select({ draft: "", imageIds: [], draftRev: 0, phase: "plain", occurrences: [], queue: [] });
        }

        function EffortSliderSeat({ locked, available, directory, load, select, useSession, useInput }) {
            const state = react.useSyncExternalStore(
                (listener) => directory.subscribe(listener),
                () => directory.getSnapshot()
            );

            const [open, setOpen] = react.useState(false);
            const [modelsOpen, setModelsOpen] = react.useState(false);
            const [blockedModels, setBlockedModels] = react.useState({});
            const [hoveredNotice, setHoveredNotice] = react.useState(null);
            const [initialLoading, setInitialLoading] = react.useState(true);
            const [draft, setDraft] = react.useState(-1);
            const [pendingIndex, setPendingIndex] = react.useState(-1);
            const [panelHeight, setPanelHeight] = react.useState(0);
            const rootRef = react.useRef(null);
            const triggerRef = react.useRef(null);
            const panelRef = react.useRef(null);
            const particlesRef = react.useRef(null);
            if (particlesRef.current === null) {
                particlesRef.current = {
                    stars: Array.from({ length: MAX_STARS }, () => {
                        const duration = randomBetween(2.6, 4.8);
                        return { ...randomStar(), duration, delay: -randomBetween(0, duration) };
                    }),
                    meteors: Array.from({ length: MAX_METEORS }, () => ({
                        ...randomMeteor(),
                        period: randomBetween(1.8, 2.8),
                        phase: Math.random()
                    }))
                };
            }
            const inputSnapshot = (useInput ?? defaultUseInput)((s) => s);
            const draftHasImages = inputSnapshot !== null && inputSnapshot !== undefined && (inputSnapshot.imageIds?.length ?? 0) > 0;

            react.useEffect(() => {
                if (available) {
                    load().then(() => setInitialLoading(false), () => setInitialLoading(false));
                }
            }, [available, load]);

            react.useEffect(() => {
                if (!open) setHoveredNotice(null);
            }, [open]);

            react.useEffect(() => {
                if (!open) return;
                const closeOutside = (event) => {
                    if (!rootRef.current?.contains(event.target)) setOpen(false);
                };
                document.addEventListener("mousedown", closeOutside);
                return () => document.removeEventListener("mousedown", closeOutside);
            }, [open]);

            react.useEffect(() => {
                if (open && panelRef.current) {
                    setPanelHeight(panelRef.current.offsetHeight || 0);
                }
            }, [open, state.status]);

            const currentChoice = react.useMemo(() => {
                if (state.current === null) return undefined;
                for (const group of state.groups) {
                    const model = group.models.find((candidate) => candidate.id === state.current.model);
                    if (model !== undefined && group.id === state.current.provider) {
                        return { group, model };
                    }
                }
                return undefined;
            }, [state.current?.provider, state.current?.model, state.groups]);

            // A committed model switch replaces the effort server-side; reset the
            // local draft so the thumb follows the real selection.
            react.useEffect(() => {
                setDraft(-1);
                setPendingIndex(-1);
            }, [state.current?.provider, state.current?.model]);

            if (!available) return null;

            const busy = state.status === "selecting" || state.status === "loading";
            const currentEffort = state.current?.reasoningEffort
                ?? currentChoice?.model.reasoning?.defaultEffort
                ?? undefined;
            const levels = currentChoice?.model.reasoning?.efforts ?? [];
            const currentIndex = currentChoice === undefined ? -1 : effortIndex(levels, currentEffort);
            const currentLevel = currentChoice === undefined ? undefined : levels[currentIndex];
            const effortLabel = currentLevel === undefined
                ? undefined
                : currentLevel.name ?? currentEffort;
            const modelLabel = currentChoice === undefined
                ? "选择模型"
                : currentChoice.model.name;
            const fullLabel = effortLabel === undefined ? modelLabel : `${modelLabel} · ${effortLabel}`;

            const chooseModel = (group, model) => {
                const key = modelKey(group.id, model.id);
                if (blockedModels[key] !== undefined) return;
                if (state.current?.provider === group.id && state.current.model === model.id) {
                    setModelsOpen(false);
                    return;
                }
                const selection = {
                    provider: group.id,
                    model: model.id,
                    ...model.reasoning?.defaultEffort === void 0 ? {} : { reasoningEffort: model.reasoning.defaultEffort }
                };
                select(selection).then((accepted) => {
                    if (!accepted) {
                        setBlockedModels((current) => ({
                            ...current,
                            [key]: explainSelectionError(directory.getSnapshot().error)
                        }));
                        return;
                    }
                    setDraft(-1);
                    setPendingIndex(-1);
                    setModelsOpen(false);
                });
            };

            const updateDraft = (event) => {
                setDraft(Number(event.currentTarget.value));
            };

            // CSS hover on .dsh-es-sliderRail now handles knob scaling.

            // Commit the live thumb value on release. Keep the local pin until
            // the store catches up so the knob does not snap back.
            const commitEffort = (event) => {
                const nextIndex = Number(event?.currentTarget?.value ?? draft);
                if (!Number.isFinite(nextIndex) || nextIndex < 0 || busy) return;
                const nextEffort = levels[nextIndex]?.id;
                if (nextEffort === undefined || nextEffort === currentEffort) {
                    setDraft(-1);
                    setPendingIndex(-1);
                    return;
                }
                setDraft(nextIndex);
                setPendingIndex(nextIndex);
                select({
                    provider: state.current.provider,
                    model: state.current.model,
                    reasoningEffort: nextEffort
                });
            };

            react.useEffect(() => {
                if (pendingIndex < 0) return;
                if (currentIndex === pendingIndex) {
                    setDraft(-1);
                    setPendingIndex(-1);
                }
            }, [currentIndex, pendingIndex]);

            const onSliderKeyUp = (event) => {
                if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "Home" || event.key === "End") {
                    commitEffort(event);
                }
            };

            // Secondary menu: model picker, shown when the model row is clicked.
            if (state.groups.length === 0 && state.status !== "loading" && !initialLoading) {
                console.warn("[effort-switcher] no available models", {
                    status: state.status,
                    initialLoading,
                    error: state.error,
                    current: state.current
                });
            }
            const modelList = (state.status === "loading" || initialLoading) && state.groups.length === 0
                ? react.createElement("div", { className: "dsh-es-menuStatus" }, "加载中…")
                : state.groups.length === 0
                    ? state.error
                        ? react.createElement("div", { className: "dsh-es-menuError" }, state.error)
                        : react.createElement("div", { className: "dsh-es-menuEmpty" }, "没有可用的模型。")
                    : state.groups.map((group) => react.createElement(
                        react.Fragment,
                        { key: group.id },
                        react.createElement("div", { className: "dsh-es-menuGroup" }, group.name),
                        group.models.map((model) => {
                            const active = state.current?.provider === group.id && state.current.model === model.id;
                            const failedReason = blockedModels[modelKey(group.id, model.id)];
                            const imageBlocked = draftHasImages && knownTextOnlyModel(group.id, model);
                            const warned = failedReason !== undefined || imageBlocked;
                            const blocked = failedReason !== undefined;
                            const noticeReason = failedReason ?? (imageBlocked ? IMAGE_BLOCK_REASON : undefined);
                            return react.createElement(
                                "button",
                                {
                                    key: model.id,
                                    type: "button",
                                    className: [
                                        "dsh-es-menuItem",
                                        active ? "dsh-es-menuItemActive" : "",
                                        blocked ? "dsh-es-menuItemBlocked" : ""
                                    ].filter(Boolean).join(" "),
                                    "aria-disabled": blocked,
                                    onClick: () => chooseModel(group, model)
                                },
                                react.createElement("span", { className: "dsh-es-triggerLabel" }, model.name),
                                warned
                                    ? react.createElement(
                                        "span",
                                        {
                                            className: "dsh-es-menuItemNotice",
                                            tabIndex: 0,
                                            onMouseEnter: (event) => {
                                                const box = event.currentTarget.getBoundingClientRect();
                                                setHoveredNotice({
                                                    text: noticeReason,
                                                    left: Math.round(box.right - 8),
                                                    top: Math.round(box.bottom + 6)
                                                });
                                            },
                                            onMouseLeave: () => setHoveredNotice(null)
                                        },
                                        warningIcon()
                                    )
                                    : model.description !== void 0
                                        ? react.createElement("span", { className: "dsh-es-menuItemDesc" }, model.description)
                                        : null
                            );
                        })
                    ));

            // Always-visible slider block below the model row.
            // Dragging updates only the local draft (fluid); the selection is
            // committed on release / keyboard confirm.
            const displayedIndex = draft >= 0 ? draft : pendingIndex >= 0 ? pendingIndex : currentIndex;
            const displayedLevel = levels[displayedIndex];
            const maxIndex = levels.length - 1;
            const fillPct = levels.length <= 1 ? 100 : Math.round((displayedIndex / maxIndex) * 100);
            const atMax = displayedIndex >= levels.length - 1;
            const effectIntensity = levels.length > 1 ? Math.max(0, Math.min(1, displayedIndex / maxIndex)) : 0;
            const peakActive = atMax && effectIntensity > 0;
            const starCount = effectIntensity > 0 ? atMax ? MAX_STARS : Math.round(4 + effectIntensity * 10) : 0;
            const meteorCount = effectIntensity > 0 ? atMax ? MAX_METEORS : Math.max(1, Math.round(effectIntensity * 3)) : 0;
            const starScale = atMax ? .95 : .74 + effectIntensity * .15;
            const thumbRadius = 15;
            const travel = `calc(${fillPct}% + ${Math.round(thumbRadius - (thumbRadius * 2 * fillPct) / 100)}px)`;
            const knobLeft = atMax || levels.length <= 1
                ? `calc(100% - ${thumbRadius}px)`
                : fillPct <= 0
                    ? `${thumbRadius}px` : travel;
            // Fill always ends at the knob center; at max that is
            // calc(100% - 15px), never 100%, so no color bleeds past the knob.
            const fillWidth = travel;

            const slider = currentChoice !== undefined && levels.length > 0
                ? react.createElement(
                    "div",
                    { className: "dsh-es-sliderWrap" },
                    react.createElement(
                        "div",
                        { className: "dsh-es-sliderHead" },
                        react.createElement("span", null, "推理强度"),
                        react.createElement("strong", null, displayedLevel?.name ?? currentEffort)
                    ),
                    react.createElement(
                        "div",
                        {
                            className: "dsh-es-sliderRail",
                            "data-locked": locked ? "true" : undefined,
                            style: {
                                "--slider-tint": peakActive ? "194 191 245" : "132 224 227",
                                "--slider-rail-glow": (.28 + effectIntensity * .28 + (peakActive ? .08 : 0)).toFixed(2),
                                "--slider-scan-opacity": (.08 + effectIntensity * .14 + (peakActive ? .03 : 0)).toFixed(2),
                                "--current-opacity": (.16 + effectIntensity * .26 + (peakActive ? .06 : 0)).toFixed(2)
                            }
                        },
                        react.createElement(
                            "div",
                            { className: "dsh-es-sliderGroove", "aria-hidden": true },
                            react.createElement("div", { className: "dsh-es-sliderTrack" }),
                            react.createElement("div", {
                                className: atMax
                                    ? `dsh-es-sliderFill dsh-es-sliderFillMax${effectIntensity > 0 ? " dsh-es-sliderFillPeak" : ""}`
                                    : "dsh-es-sliderFill",
                                style: {
                                    width: fillWidth,
                                    "--fill-core-opacity": (.14 + effectIntensity * .4 + (peakActive ? .1 : 0)).toFixed(2),
                                    "--fill-edge-opacity": (.24 + effectIntensity * .3).toFixed(2),
                                    "--fill-bloom-opacity": (.14 + effectIntensity * .28).toFixed(2)
                                }
                            },
                                react.createElement("div", { className: "dsh-es-sliderBloom" }),
                                react.createElement("div", { className: "dsh-es-sliderCurrent" }),
                                starCount > 0
                                    ? react.createElement(
                                        "div",
                                        {
                                            className: atMax ? "dsh-es-sliderStars dsh-es-sliderStarsPeak" : "dsh-es-sliderStars",
                                            "aria-hidden": true
                                        },
                                        particlesRef.current.stars.slice(0, starCount).map((star, index) => react.createElement("span", {
                                            key: index,
                                            className: "dsh-es-sliderStar",
                                            onAnimationIteration: (event) => {
                                                const next = randomStar();
                                                Object.assign(star, next);
                                                setStarPosition(event.currentTarget, next, starScale);
                                            },
                                            style: {
                                                "--star-x": `${star.x.toFixed(1)}%`,
                                                "--star-y": `${star.y.toFixed(1)}%`,
                                                "--star-size": `${(star.size * starScale).toFixed(2)}px`,
                                                "--star-alpha": (.28 + effectIntensity * .32 + (atMax ? .08 : 0)).toFixed(2),
                                                "--star-duration": `${(star.duration * (1.65 - effectIntensity * .2)).toFixed(2)}s`,
                                                "--star-delay": `${star.delay.toFixed(2)}s`,
                                                "--star-color": ["#effff9", "#dcf4ff", "#fff0d5"][index % 3]
                                            }
                                        })),
                                        particlesRef.current.meteors.slice(0, meteorCount).map((meteor, index) => {
                                            const duration = meteor.period * (atMax ? 1.35 : 2.2 - effectIntensity * .4);
                                            return react.createElement("span", {
                                                key: `meteor-${index}`,
                                                className: "dsh-es-sliderMeteor",
                                                onAnimationIteration: (event) => {
                                                    const next = randomMeteor();
                                                    Object.assign(meteor, next);
                                                    setMeteorPath(event.currentTarget, next);
                                                },
                                                style: {
                                                    "--meteor-x": `${meteor.x.toFixed(1)}%`,
                                                    "--meteor-y": `${meteor.y.toFixed(1)}px`,
                                                    "--meteor-distance": `${meteor.distance.toFixed(1)}px`,
                                                    "--meteor-length": `${meteor.length.toFixed(1)}px`,
                                                    "--meteor-alpha": atMax ? ".65" : (.22 + effectIntensity * .3).toFixed(2),
                                                    "--meteor-duration": `${duration.toFixed(2)}s`,
                                                    "--meteor-delay": `${(-meteor.phase * duration).toFixed(2)}s`
                                                }
                                            });
                                        }),
                                        atMax ? react.createElement("span", {
                                            className: "dsh-es-sliderBurst",
                                            onAnimationStart: (event) => {
                                                event.currentTarget.style.left = `${randomBetween(18, 82).toFixed(1)}%`;
                                                event.currentTarget.style.top = `${randomBetween(35, 65).toFixed(1)}%`;
                                            }
                                        }) : null
                                    )
                                    : null
                            )
                        ),
                        react.createElement(
                            "div",
                            {
                                className: "dsh-es-sliderKnob",
                                "aria-hidden": true,
                                style: { left: knobLeft }
                            },
                            react.createElement("div", { className: "dsh-es-sliderKnobFace" })
                        ),
                        react.createElement(
                            "div",
                            { className: "dsh-es-sliderTicks", "aria-hidden": true },
                            levels.map((level, index) => react.createElement("span", {
                                key: level.id,
                                className: index <= displayedIndex ? "dsh-es-sliderTick dsh-es-sliderTickActive" : "dsh-es-sliderTick",
                                 style: { "--tick-delay": `${(-index * .16).toFixed(2)}s` }
                            }))
                        ),
                        react.createElement("input", {
                            className: "dsh-es-slider",
                            type: "range",
                            min: 0,
                            max: Math.max(levels.length - 1, 0),
                            step: 1,
                            value: displayedIndex,
                            disabled: locked,
                            onInput: updateDraft,
                            onChange: updateDraft,
                            onMouseUp: commitEffort,
                            onTouchEnd: commitEffort,
                            onKeyUp: onSliderKeyUp,
                            "aria-label": "推理强度"
                        })
                    ),
                    displayedLevel?.description
                        ? react.createElement("p", { className: "dsh-es-sliderDesc" }, displayedLevel.description)
                        : null
                )
                : null;

            // Secondary floating window: model picker, anchored above the main panel.
            const modelMenu = open && modelsOpen ? react.createElement(
                "div",
                {
                    className: "dsh-es-modelMenu",
                    role: "menu",
                    style: {
                        position: "absolute",
                        right: "0",
                        bottom: `calc(100% + 8px + ${panelHeight}px)`,
                        zIndex: 10000
                    }
                },
                react.createElement("div", { className: "dsh-es-modelList" }, modelList)
            ) : null;

            // Popover window floating above the trigger; never occupies the input layout.
            const menu = open ? react.createElement(
                "div",
                {
                    ref: panelRef,
                    className: "dsh-es-menu",
                    role: "menu",
                    style: { position: "absolute", bottom: "calc(100% + 8px)", right: "0" }
                },
                react.createElement(
                    "button",
                    {
                        type: "button",
                        className: "dsh-es-modelRow",
                        "aria-haspopup": "menu",
                        "aria-expanded": modelsOpen,
                        onClick: () => setModelsOpen((value) => !value)
                    },
                    react.createElement("span", { className: "dsh-es-modelRowLabel" }, "模型"),
                    react.createElement("span", { className: "dsh-es-modelRowValue" }, currentChoice?.model.name ?? "—"),
                    chevronIcon(ICON_CHEVRON_RIGHT, "dsh-es-chevron")
                ),
                slider === null
                    ? null
                    : react.createElement(
                        react.Fragment,
                        null,
                                                 react.createElement("div", { className: "dsh-es-menuDivider" }),
                        slider
                    )
            ) : null;

            return react.createElement(
                "div",
                {
                    className: "dsh-es-root",
                    "data-dsh-plugin": name,
                    ref: rootRef,
                    style: { position: "relative", display: "inline-flex" }
                },
                react.createElement(
                    "button",
                    {
                        ref: triggerRef,
                        type: "button",
                        className: "dsh-es-trigger",
                        "aria-label": fullLabel,
                        "aria-haspopup": "menu",
                        "aria-expanded": open,
                        title: fullLabel,
                        disabled: locked,
                        onClick: () => {
                            setOpen((value) => !value);
                            setModelsOpen(false);
                        }
                    },
                    react.createElement("span", { className: "dsh-es-triggerLabel" }, modelLabel),
                    effortLabel !== undefined
                        ? react.createElement("span", { className: "dsh-es-triggerEffort" }, effortLabel)
                        : null,
                    chevronIcon(ICON_CHEVRON_DOWN, open ? "dsh-es-chevron dsh-es-chevronOpen" : "dsh-es-chevron")
                ),
                menu,
                modelMenu,
                hoveredNotice
                    ? react.createElement(
                        "div",
                        {
                            className: "dsh-es-menuItemTip",
                            role: "tooltip",
                            style: {
                                left: `${hoveredNotice.left}px`,
                                top: `${hoveredNotice.top}px`,
                                transform: "translateX(-100%)"
                            }
                        },
                        hoveredNotice.text
                    )
                    : null
            );
        }

        const apply = (ctx) => {
            ctx.inject(inject, (scope) => {
                const slots = scope.get("slots");
                const models = scope.get("modelDirectories");
                const sessions = scope.get("sessions");

                return slots.inject(slotName, () => slots.register({
                    name: slotName,
                    priority: -100,
                    inject: (sessionId) => {
                        const directory = models.directoryFor(sessionId);
                        const available = sessions.subagentAddress(sessionId) === void 0;
                        const snapshot = directory.store?.getSnapshot?.();
                        console.log("[effort-switcher] directory", {
                            sessionId,
                            available,
                            status: snapshot?.status,
                            groupCount: snapshot?.groups?.length ?? 0,
                            error: snapshot?.error ?? null,
                            current: snapshot?.current ?? null
                        });
                        return {
                            available,
                            directory: directory.store,
                            load: () => {
                                if (available) return directory.load().catch(() => { });
                                return Promise.resolve();
                            },
                            select: (selection) => available ? directory.select(selection).then(() => true, () => false) : Promise.resolve(false)
                        };
                    }
                }, EffortSliderSeat));
            });
        };

        const Config = {
            "~standard": {
                version: 1,
                vendor: "dsh-effort-switcher",
                validate(config) {
                    if (config === undefined || config === null) return { value: {} };
                    if (typeof config !== "object" || Array.isArray(config)) {
                        return {
                            issues: [{
                                message: "plugin config must be an object"
                            }]
                        };
                    }
                    return { value: config };
                }
            }
        };

        exports.name = name;
        exports.inject = inject;
        exports.apply = apply;
        exports.Config = Config;
        return module.exports;
    }
});
