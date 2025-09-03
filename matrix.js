// Matrix rain background (lightweight)
(function(){
  const c = document.getElementById('matrix');
  const ctx = c.getContext('2d');
  let w = c.width = window.innerWidth;
  let h = c.height = window.innerHeight;
  const fontSize = 16;
  const cols = Math.floor(w / fontSize);
  const chars = '01SNAKE#@$%&*CHAOS'.split('');
  let drops = Array(cols).fill(1);

  function draw(){
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fillRect(0,0,w,h);
    ctx.fillStyle = '#39ff14';
    ctx.font = fontSize + 'px monospace';
    for(let i=0; i<drops.length; i++){
      const text = chars[Math.floor(Math.random()*chars.length)];
      const x = i*fontSize;
      const y = drops[i]*fontSize;
      ctx.fillText(text, x, y);
      if(y > h && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }
  function resize(){
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  draw();
})();
