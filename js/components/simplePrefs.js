import { q } from '../util/utils.js';

const metaTag = q('meta[name="theme-color"]')[0];
const icon =  q('.nav__icon')[0];
const menu = q('.nav__menu')[0];
const menuList = q('.nav__menu__list')[0];

const colorPicker1 = q('[data-ref="colorPicker1"]')[0];
const colorPicker2 = q('[data-ref="colorPicker2"]')[0];
const colorPicker3 = q('[data-ref="colorPicker3"]')[0];
const menuPositioner = q('[data-ref="nav:pos"]')[0];

let themeColor1 = '#7ee';
let themeColor2 = '#808';
let themeColor3 = '#333';

let vPos = 'top';
let hPos = 'left';

function setThemeColor1({ target: { value }}) {
    themeColor1 = value;
    metaTag.setAttribute('content', value);
    document.body.style.setProperty('--theme-color-1', value);
}

function setThemeColor2({ target: { value }}) {
    themeColor2 = value;
    document.body.style.setProperty('--theme-color-2', value);
}

function setThemeColor3({ target: { value }}) {
    themeColor3 = value;
    document.body.style.setProperty('--theme-color-3', value);
}

function setMenuPosition({ target: { value }}) {
    [vPos, hPos] = value.toLowerCase().split(' ');
    updateView();
}

function updateView() {
    icon.style.cssText = `${vPos}: 0; ${hPos}: 0;`;
    menu.style.cssText = `${vPos}: 0; ${hPos}: 0;`;
    menuList.style.cssText = `
        justify-content: ${vPos === 'top' ? 'flex-start' : 'flex-end'};
        text-align: ${hPos};
    `;
}

colorPicker1.addEventListener('change', setThemeColor1);
colorPicker2.addEventListener('change', setThemeColor2);
colorPicker3.addEventListener('change', setThemeColor3);
menuPositioner.addEventListener('change', setMenuPosition);

export default function init() {
    return {
        themeColor1,
    }
}