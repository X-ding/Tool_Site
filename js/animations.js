(function(){
  if(window.__animLoaded)return;window.__animLoaded=true;

  function initReveal(){
    var els=document.querySelectorAll('[data-reveal]');
    if(!els.length)return;
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          var delay=parseInt(entry.target.getAttribute('data-reveal-delay'))||0;
          setTimeout(function(){entry.target.classList.add('revealed');},delay);
          obs.unobserve(entry.target);
        }
      });
    },{threshold:0.1});
    els.forEach(function(el){obs.observe(el);});
  }

  function initStagger(){
    document.querySelectorAll('.tool-grid').forEach(function(grid){
      var obs=new IntersectionObserver(function(entries){
        if(entries[0].isIntersecting){
          var cards=grid.querySelectorAll('.tool-card');
          cards.forEach(function(card,i){
            card.style.setProperty('--stagger-i',i);
            card.style.animation='cardEnter .45s ease-out both';
            card.style.animationDelay=(i*60)+'ms';
          });
          obs.unobserve(grid);
        }
      },{threshold:0.05});
      obs.observe(grid);
    });
  }

  // Button ripple (delegated)
  document.addEventListener('click',function(e){
    var btn=e.target.closest('.btn');
    if(!btn||btn.classList.contains('no-ripple')||btn.tagName==='A')return;
    var rect=btn.getBoundingClientRect();
    var ripple=document.createElement('span');
    ripple.className='ripple';
    var size=Math.max(rect.width,rect.height);
    ripple.style.width=ripple.style.height=size+'px';
    var x=(e.clientX||e.pageX)-rect.left-size/2;
    var y=(e.clientY||e.pageY)-rect.top-size/2;
    ripple.style.left=x+'px';
    ripple.style.top=y+'px';
    btn.style.position='relative';
    btn.style.overflow='hidden';
    btn.appendChild(ripple);
    setTimeout(function(){ripple.remove();},600);
  });

  // Page transition loading bar
  var loadingBar=null;
  function showLoading(){
    if(!loadingBar){
      loadingBar=document.createElement('div');
      loadingBar.className='page-loading-bar';
      document.body.appendChild(loadingBar);
    }
    requestAnimationFrame(function(){loadingBar.style.width='60%';loadingBar.style.opacity='1';});
  }
  function hideLoading(){
    if(!loadingBar)return;
    loadingBar.style.width='100%';
    setTimeout(function(){loadingBar.style.opacity='0';loadingBar.style.width='0';},200);
  }

  function init(){
    initReveal();
    initStagger();
  }

  init();
  window.__initAnimations=init;
  window.__showPageLoading=showLoading;
  window.__hidePageLoading=hideLoading;
})();
