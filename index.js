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
    position: relative;
    height: 26px;
    margin: 8px 0 10px;
}
.dsh-es-sliderRail::before {
    content: "";
    position: absolute;
    inset: 2px 0;
    border: 1px solid rgb(116 190 255 / 18%);
    border-radius: 13px;
    box-shadow: 0 0 10px rgb(72 153 255 / 22%);
    opacity: var(--slider-rail-glow, .28);
    pointer-events: none;
}
.dsh-es-sliderGroove {
    position: absolute;
    inset: 0;
    overflow: hidden;
    border-radius: 13px;
    pointer-events: none;
}
.dsh-es-sliderGroove::before {
    content: "";
    position: absolute;
    z-index: 2;
    inset: 0;
    background:
        repeating-linear-gradient(90deg, rgb(255 255 255 / 10%) 0 1px, transparent 1px 12px),
        repeating-linear-gradient(0deg, transparent 0 5px, rgb(255 255 255 / 7%) 5px 6px, transparent 6px 12px);
    background-size: 24px 100%, 100% 12px;
    opacity: .48;
    mix-blend-mode: screen;
    animation: dsh-es-tech-grid 4.8s linear infinite;
}
.dsh-es-sliderGroove::after {
    content: "";
    position: absolute;
    z-index: 3;
    inset: 0;
    background: linear-gradient(90deg, transparent 0 30%, rgb(199 242 255 / 34%) 46%, rgb(255 255 255 / 52%) 50%, transparent 67%);
    background-size: 190% 100%;
    opacity: var(--slider-scan-opacity, 0);
    mix-blend-mode: screen;
    animation: dsh-es-track-scan 3.2s ease-in-out infinite;
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
        linear-gradient(180deg, rgb(255 255 255 / 8%), transparent 46%, rgb(0 0 0 / 9%)),
        var(--dsw-alias-interactive-bg-hover);
}
.dsh-es-sliderFill {
    z-index: 1;
    overflow: hidden;
    background: #4c8dff;
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 18%), 0 0 8px rgb(76 141 255 / 26%);
    transition: width .25s ease;
}
.dsh-es-sliderFill::before {
    content: "";
    position: absolute;
    z-index: 3;
    top: -5px;
    right: -8px;
    bottom: -5px;
    width: 22px;
    border-radius: 50%;
    background: radial-gradient(ellipse at 70% 50%, rgb(255 255 255 / 92%) 0 4%, rgb(144 231 255 / 72%) 18%, rgb(70 164 255 / 24%) 48%, transparent 72%);
    filter: blur(.2px);
    opacity: var(--fill-core-opacity, .26);
    animation: dsh-es-fill-core 1.8s ease-in-out infinite;
}
.dsh-es-sliderFill::after {
    content: "";
    position: absolute;
    z-index: 2;
    top: 1px;
    right: 0;
    left: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0 18%, rgb(190 235 255 / 34%) 42%, rgb(255 255 255 / 74%) 74%, transparent);
    opacity: var(--fill-edge-opacity, .3);
    box-shadow: 0 0 4px rgb(135 218 255 / 55%);
}
.dsh-es-sliderBloom {
    position: absolute;
    z-index: 0;
    inset: 0;
    background:
        linear-gradient(180deg, rgb(255 255 255 / 16%), transparent 42%, rgb(24 48 136 / 16%)),
        linear-gradient(90deg, #36a6ff 0%, #4c8dff 30%, #716dff 58%, #b56bff 100%);
    background-size: 100% 100%, 190% 100%;
    background-position: 0 0, 0% 50%;
    opacity: 0;
    transition: opacity .25s ease;
}
.dsh-es-sliderBloom::before {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(115deg, transparent 0 12px, rgb(255 255 255 / 17%) 12px 13px, transparent 13px 25px);
    background-size: 58px 100%;
    opacity: .46;
    animation: dsh-es-energy-stream 2.4s linear infinite;
}
.dsh-es-sliderBloom::after {
    content: "";
    position: absolute;
    top: 1px;
    right: 0;
    left: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgb(220 249 255 / 80%) 42%, rgb(255 255 255 / 75%) 70%, transparent);
    opacity: .6;
    box-shadow: 0 0 5px rgb(159 224 255 / 70%);
}
.dsh-es-sliderFillMax .dsh-es-sliderBloom {
    opacity: 1;
}
.dsh-es-sliderFillPeak .dsh-es-sliderBloom {
    background-position: 0 0, 100% 50%;
    animation: dsh-es-cosmic-flow 4s ease-in-out infinite alternate;
}
.dsh-es-sliderFillPeak .dsh-es-sliderBloom::before {
    opacity: .72;
    animation-duration: 1.55s;
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
    background: linear-gradient(110deg, transparent 32%, rgb(146 246 255 / 22%) 40%, rgb(255 255 255 / 25%) 43%, transparent 49%, rgb(255 232 190 / 18%) 64%, transparent 70%);
    animation: dsh-es-aurora 2.8s ease-in-out infinite alternate;
}
.dsh-es-sliderStarsPeak::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 28%), inset 0 0 7px rgb(222 240 255 / 18%);
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
    filter: drop-shadow(0 0 2px var(--star-color, #fff));
    transform: translate(-50%, -50%);
    animation: dsh-es-star-twinkle var(--star-duration) ease-in-out var(--star-delay) infinite;
}
.dsh-es-sliderStar:nth-child(3n) {
    animation-name: dsh-es-star-drift;
}
.dsh-es-sliderMeteor {
    position: absolute;
    left: calc(var(--meteor-x) - var(--meteor-length));
    top: var(--meteor-y);
    width: var(--meteor-length);
    height: 1px;
    transform-origin: right center;
    background: linear-gradient(90deg, transparent, rgb(119 216 255 / 72%) 52%, #fff);
    box-shadow: 0 0 4px rgb(216 245 255 / 50%), 0 0 9px rgb(109 198 255 / 35%);
    opacity: 0;
    animation: dsh-es-meteor var(--meteor-duration) linear var(--meteor-delay) infinite;
}
.dsh-es-sliderMeteor::before {
    content: "";
    position: absolute;
    inset: -3px 0;
    background: inherit;
    filter: blur(2px);
    opacity: .5;
}
.dsh-es-sliderMeteor::after {
    content: "";
    position: absolute;
    right: -2px;
    top: -1.5px;
    width: 4px;
    height: 4px;
    background: #fff;
    box-shadow: 0 0 5px #fff, 0 0 9px rgb(113 219 255 / 70%);
    clip-path: polygon(50% 0, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0 50%, 35% 35%);
}
.dsh-es-sliderBurst {
    position: absolute;
    left: 68%;
    top: 50%;
    width: 16px;
    height: 16px;
    background: #fff;
    clip-path: polygon(50% 0, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0 50%, 40% 40%);
    animation: dsh-es-star-burst .75s ease-out both;
}
@keyframes dsh-es-tech-grid {
    from { background-position: 0 0, 0 0; }
    to { background-position: 24px 0, 0 12px; }
}
@keyframes dsh-es-track-scan {
    0%, 18% { background-position: 160% 50%; }
    58%, 78% { background-position: -50% 50%; }
    100% { background-position: -50% 50%; }
}
@keyframes dsh-es-energy-stream {
    from { background-position: 0 0; }
    to { background-position: 58px 0; }
}
@keyframes dsh-es-fill-core {
    0%, 100% { opacity: calc(var(--fill-core-opacity, .26) * .62); transform: scaleX(.78); }
    50% { opacity: var(--fill-core-opacity, .26); transform: scaleX(1.16); }
}
@keyframes dsh-es-knob-ring {
    0%, 100% { transform: scale(.88); opacity: calc(var(--knob-ring-opacity, .3) * .72); }
    50% { transform: scale(1.08); opacity: var(--knob-ring-opacity, .3); }
}
@keyframes dsh-es-knob-orbit {
    from { transform: rotate(0); }
    to { transform: rotate(360deg); }
}
@keyframes dsh-es-knob-scan {
    0%, 100% { transform: translateX(-52%); }
    50% { transform: translateX(48%); }
}
@keyframes dsh-es-knob-core {
    0%, 100% { transform: translate(-50%, -50%) scale(.7); }
    50% { transform: translate(-50%, -50%) scale(1.35); }
}
@keyframes dsh-es-tick-pulse {
    0%, 100% { transform: scale(.72); opacity: .62; }
    45% { transform: scale(1.2); opacity: 1; }
}
@keyframes dsh-es-star-twinkle {
    0%, 100% {
        opacity: calc(var(--star-alpha) * .5);
        transform: translate(-50%, -50%) scale(.65) rotate(0);
    }
    45% {
        opacity: var(--star-alpha);
        transform: translate(-50%, -50%) scale(1.2) rotate(18deg);
    }
    70% {
        opacity: calc(var(--star-alpha) * .6);
        transform: translate(-50%, -50%) scale(.85) rotate(8deg);
    }
}
@keyframes dsh-es-star-drift {
    0%, 100% {
        opacity: calc(var(--star-alpha) * .42);
        transform: translate(-50%, -50%) scale(.72) rotate(-12deg);
    }
    50% {
        opacity: var(--star-alpha);
        transform: translate(calc(-50% + 2px), calc(-50% - 1px)) scale(1.16) rotate(22deg);
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
    from { background-position: 0% 50%; }
    to { background-position: 100% 50%; }
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
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.4) rotate(20deg);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(.5) rotate(45deg);
    }
}
@media (prefers-reduced-motion: reduce) {
    .dsh-es-sliderStar,
    .dsh-es-sliderStar:nth-child(3n),
    .dsh-es-sliderFillPeak .dsh-es-sliderBloom,
    .dsh-es-sliderBloom::before,
    .dsh-es-sliderGroove::before,
    .dsh-es-sliderGroove::after,
    .dsh-es-sliderFill::before,
    .dsh-es-sliderKnob::before,
    .dsh-es-sliderKnob::after,
    .dsh-es-sliderKnobFace::before,
    .dsh-es-sliderKnobFace::after,
    .dsh-es-sliderTickActive,
    .dsh-es-sliderStarsPeak::before,
    .dsh-es-sliderRail::before {
        animation: none;
    }
    .dsh-es-sliderRail::before {
        opacity: .28;
    }
    .dsh-es-sliderMeteor, .dsh-es-sliderBurst {
        display: none;
        animation: none;
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
    transition: left .25s ease;
}
.dsh-es-sliderKnob::before {
    content: "";
    position: absolute;
    inset: -4px;
    border: 1px solid rgb(119 214 255 / 54%);
    border-radius: 50%;
    opacity: var(--knob-ring-opacity, .3);
    box-shadow: 0 0 6px rgb(82 183 255 / 46%), inset 0 0 5px rgb(152 222 255 / 28%);
    animation: dsh-es-knob-ring 2.2s ease-in-out infinite;
}
.dsh-es-sliderKnob::after {
    content: "";
    position: absolute;
    inset: -8px;
    border: 1px dashed rgb(167 226 255 / 38%);
    border-radius: 50%;
    opacity: var(--knob-ring-opacity, .3);
    animation: dsh-es-knob-orbit 6s linear infinite;
}
.dsh-es-sliderKnobPeak::before {
    border-color: rgb(228 191 255 / 76%);
    box-shadow: 0 0 8px rgb(118 215 255 / 68%), 0 0 16px rgb(180 112 255 / 36%), inset 0 0 6px rgb(255 255 255 / 30%);
    animation-duration: 1.4s;
}
.dsh-es-sliderKnobPeak::after {
    border-color: rgb(232 191 255 / 52%);
    animation-duration: 3.6s;
}
.dsh-es-sliderKnobFace {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.62);
    background: Canvas;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2), 0 0 8px rgb(98 196 255 / 38%), inset 0 0 7px rgb(255 255 255 / 28%);
}
.dsh-es-sliderKnobFace::before {
    content: "";
    position: absolute;
    inset: -70% 18%;
    background: linear-gradient(108deg, transparent 38%, rgb(214 249 255 / 62%) 48%, transparent 58%);
    opacity: var(--knob-energy, .16);
    transform: translateX(-42%);
    animation: dsh-es-knob-scan 2.7s ease-in-out infinite;
}
.dsh-es-sliderKnobFace::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: var(--knob-core-size, 3px);
    height: var(--knob-core-size, 3px);
    border-radius: 50%;
    background: #e9fbff;
    box-shadow: 0 0 4px #fff, 0 0 9px rgb(85 202 255 / 88%), 0 0 14px rgb(163 112 255 / 52%);
    opacity: var(--knob-energy, .22);
    transform: translate(-50%, -50%);
    animation: dsh-es-knob-core 1.7s ease-in-out infinite;
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
    border: 1px solid rgb(170 218 255 / 28%);
    border-radius: 50%;
    background: rgb(0 0 0 / 15%);
    box-shadow: 0 0 0 1px rgb(0 0 0 / 8%);
}
.dsh-es-sliderTickActive {
    background: rgb(220 249 255 / 92%);
    border-color: rgb(255 255 255 / 76%);
    box-shadow: 0 0 4px rgb(116 213 255 / 86%), 0 0 8px rgb(127 148 255 / 38%);
    animation: dsh-es-tick-pulse 2.3s ease-in-out var(--tick-delay, 0s) infinite;
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
    cursor: pointer;
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
    cursor: pointer;
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

        const STAR_POINTS = [
            [5, 30, 3, 3.2, -1.1],
            [32, 82, 3, 2.9, -1.6],
            [59, 78, 4, 4.2, -2.5],
            [87, 28, 5, 3.3, -2.1],
            [19, 18, 3, 4.1, -.7],
            [45, 64, 3, 3.4, -.9],
            [73, 56, 5, 2.7, -.4],
            [94, 65, 3, 3.9, -1.7],
            [12, 72, 5, 2.8, -2.2],
            [38, 25, 4, 4.3, -3.1],
            [66, 19, 3, 3.7, -1.3],
            [80, 80, 3, 4.4, -3.5],
            [25, 55, 6, 3.6, -2.8],
            [52, 35, 6, 3.1, -1.9],
            [8, 58, 3, 3.5, -.8],
            [22, 83, 3, 2.6, -1.8],
            [29, 20, 4, 3.8, -2.4],
            [42, 84, 3, 3.1, -1.4],
            [48, 17, 3, 4.1, -3.2],
            [61, 43, 5, 2.9, -.6],
            [70, 83, 3, 3.6, -2.6],
            [77, 22, 4, 3.3, -1.2],
            [85, 61, 3, 4.2, -3.4],
            [91, 16, 4, 2.8, -2.0]
        ];
        const METEOR_POINTS = [
            [12, -6, 1.8, .15],
            [58, -8, 2.3, .62],
            [34, -5, 2.0, .38],
            [78, -7, 2.5, .83],
            [23, -9, 1.9, .95],
            [65, -4, 2.2, .46]
        ];

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
            const starCount = effectIntensity > 0 ? atMax ? STAR_POINTS.length : Math.round(5 + effectIntensity * 12) : 0;
            const meteorCount = effectIntensity > 0 ? atMax ? METEOR_POINTS.length : Math.max(1, Math.round(effectIntensity * 3)) : 0;
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
                        { className: "dsh-es-sliderRail", style: {
                             "--slider-rail-glow": (.18 + effectIntensity * .36 + (peakActive ? .16 : 0)).toFixed(2),
                             "--slider-scan-opacity": effectIntensity > 0 ? (.12 + effectIntensity * .34).toFixed(2) : ".04"
                         } },
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
                                     "--fill-core-opacity": (.1 + effectIntensity * .64 + (peakActive ? .14 : 0)).toFixed(2),
                                     "--fill-edge-opacity": (.12 + effectIntensity * .48 + (peakActive ? .12 : 0)).toFixed(2)
                                 }
                            },
                                react.createElement("div", { className: "dsh-es-sliderBloom" }),
                                starCount > 0
                                    ? react.createElement(
                                        "div",
                                        {
                                            className: atMax ? "dsh-es-sliderStars dsh-es-sliderStarsPeak" : "dsh-es-sliderStars",
                                            "aria-hidden": true
                                        },
                                        STAR_POINTS.slice(0, starCount).map(([x, y, size, duration, delay], index) => react.createElement("span", {
                                            key: index,
                                            className: "dsh-es-sliderStar",
                                            style: {
                                                "--star-x": `${x}%`,
                                                "--star-y": `${y}%`,
                                                "--star-size": `${(size * (atMax ? 1.2 : .85 + effectIntensity * .3)).toFixed(2)}px`,
                                                "--star-alpha": (.35 + effectIntensity * .5 + (atMax ? .15 : 0)).toFixed(2),
                                                "--star-duration": `${(duration * (1.15 - effectIntensity * .3)).toFixed(2)}s`,
                                                "--star-delay": `${delay}s`,
                                                "--star-color": ["#fff", "#d8f5ff", "#fff2c6"][index % 3]
                                            }
                                        })),
                                        METEOR_POINTS.slice(0, meteorCount).map(([x, y, period, phase], index) => {
                                            const duration = period * (atMax ? .85 : 1.8 - effectIntensity * .5);
                                            return react.createElement("span", {
                                                key: `meteor-${index}`,
                                                className: "dsh-es-sliderMeteor",
                                                style: {
                                                    "--meteor-x": `${x}%`,
                                                    "--meteor-y": `${y}px`,
                                                    "--meteor-angle": "28deg",
                                                    "--meteor-distance": "72px",
                                                    "--meteor-length": `${atMax ? 36 + (index % 2) * 6 : 20 + effectIntensity * 12}px`,
                                                    "--meteor-alpha": atMax ? ".95" : (.35 + effectIntensity * .45).toFixed(2),
                                                    "--meteor-duration": `${duration.toFixed(2)}s`,
                                                    "--meteor-delay": `${(-phase * duration).toFixed(2)}s`
                                                }
                                            });
                                        }),
                                        atMax ? react.createElement("span", { className: "dsh-es-sliderBurst" }) : null
                                    )
                                    : null
                            )
                        ),
                        react.createElement(
                            "div",
                            {
                                className: peakActive ? "dsh-es-sliderKnob dsh-es-sliderKnobPeak" : "dsh-es-sliderKnob",
                                "aria-hidden": true,
                                style: {
                                     left: knobLeft,
                                     "--knob-ring-opacity": (.12 + effectIntensity * .48 + (peakActive ? .16 : 0)).toFixed(2),
                                     "--knob-energy": (.12 + effectIntensity * .62 + (peakActive ? .14 : 0)).toFixed(2),
                                     "--knob-core-size": `${(2.5 + effectIntensity * 2 + (peakActive ? 1 : 0)).toFixed(1)}px`
                                 }
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
