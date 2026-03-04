// Example Plugin: Bouncing Ball (registers itself)
// Drop this file next to the HTML and include it with: <script type="module" src="./plugin-example.js"></script>

// If serving with the import map already loaded, you can access OPL from window:
const OPL_G = window.OPL;

export class BouncingBallExperiment{
  constructor({ renderer }){ this.renderer = renderer; this.running=false; this.paused=false; this.points=[]; this.params={ g:9.81 }; this.t=0; this.x=0; this.y=2; this.vx=2; this.vy=0; this.e=0.8; }
  _style(){ return { color:'#A7F3D0', width:2, dash:null }; }
  startRun(){ this.running=true; this.paused=false; }
  pauseRun(){ this.paused=true; this.running=false; }
  startNewRun(){ this.points=[]; this.t=0; this.x=0; this.y=2; this.vx=2; this.vy=0; this.running=true; this.paused=false; }
  resetRun(){ this.points=[]; this.t=0; this.x=0; this.y=2; this.vx=2; this.vy=0; this.running=false; this.paused=false; }
  saveCurrentRun(){}
  update(dt){ if(!this.running||this.paused) return; this.t+=dt; this.vy -= this.params.g*dt; this.x += this.vx*dt; this.y += this.vy*dt; if(this.y<0){ this.y=0; this.vy = -this.vy*this.e; } this.points.push({t:this.t,x:this.x,y:this.y}); }
  draw(){ this.renderer.clear(); this.renderer.line(-10,0,10,0,'#8B949E',2); this.renderer.trail(this.points,this._style()); this.renderer.ball(this.x,this.y,0.15,'#10B981'); }
  updateUI(){ }
}

OPL_G.registerExperiment('bouncing', (deps)=> new BouncingBallExperiment(deps), {
  label:'Bouncing Ball',
  presets:[ {label:'Default', p:{}} ],
  camera:{x:0,y:0,scale:20},
  autoStart:true
});
