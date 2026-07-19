/* ======= 工具站通用脚本 ======= */

// 复制到剪贴板
function copyText(text, btnEl) {
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    btnEl.classList.add('copied');
    const orig = btnEl.textContent;
    btnEl.textContent = '已复制';
    setTimeout(() => {
      btnEl.classList.remove('copied');
      btnEl.textContent = orig;
    }, 1800);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  });
}

// 显示输出区域
function showOutput(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}

// 使用事件代理，支持 SPA 导航后的动态内容
document.addEventListener('click', function(e){
  var btn=e.target.closest('.copy-btn[data-target]');
  if(!btn)return;
  var target=document.getElementById(btn.dataset.target);
  if(target) copyText(target.textContent, btn);
});
