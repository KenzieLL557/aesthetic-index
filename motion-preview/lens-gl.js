(()=>{
  const canvas=document.querySelector('#glStage');
  const gl=canvas.getContext('webgl2',{alpha:false,antialias:true,premultipliedAlpha:false});
  if(!gl){window.lensGL={ready:false};return}
  const vert=`#version 300 es
    in vec2 position;out vec2 vUv;
    void main(){vUv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`;
  const frag=`#version 300 es
    precision highp float;
    in vec2 vUv;out vec4 outColor;
    uniform sampler2D image;uniform vec2 resolution,mouse,textureSize,velocity;
    uniform float time,reveal,hasImage;
    vec2 coverUv(vec2 uv){float screenAspect=resolution.x/resolution.y;float texAspect=textureSize.x/textureSize.y;vec2 s=vec2(1.);if(screenAspect>texAspect)s.y=texAspect/screenAspect;else s.x=screenAspect/texAspect;return(uv-.5)*s+.5;}
    float noise(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
    void main(){
      vec2 px=vec2(vUv.x*resolution.x,(1.-vUv.y)*resolution.y);
      vec2 delta=px-mouse;float speed=min(length(velocity)/28.,1.);
      float angle=length(velocity)>.001?atan(velocity.y,velocity.x):0.;float ca=cos(angle),sa=sin(angle);mat2 rot=mat2(ca,-sa,sa,ca);
      vec2 local=rot*delta;local.x/=1.+speed*.115;local.y/=1.-speed*.065;local=transpose(rot)*local;
      float targetRadius=mix(126.,length(resolution)*.92,reveal);float radial=length(local)/targetRadius;
      float mask=1.-smoothstep(.985,1.005,radial);
      vec3 base=vec3(.027,.031,.035);float halo=max(0.,1.-length((px-resolution*.52)/resolution.y));base+=halo*.008;
      if(hasImage<.5){outColor=vec4(base,1.);return;}
      float z=sqrt(max(0.,1.-radial*radial));float fresnel=pow(1.-z,3.2);
      float liquid=(sin(local.y*.052+time*1.1)+sin(local.x*.035-time*.8))*.0018*(1.-z);
      vec2 dir=local/max(length(local),.001);vec2 refractedPx=px-local*(.105*z+.035*fresnel)+dir.yx*liquid*resolution.y*radial;
      vec2 uv=coverUv(vec2(refractedPx.x/resolution.x,1.-refractedPx.y/resolution.y));
      float aberration=mix(1.8,0.35,reveal)*(fresnel+.08);vec2 ab=dir*aberration/resolution;
      float r=texture(image,uv+ab).r,g=texture(image,uv).g,b=texture(image,uv-ab).b;vec3 col=vec3(r,g,b);
      col*=.96+z*.08;col+=fresnel*vec3(.16,.19,.24);
      float spec=pow(max(0.,dot(normalize(vec3(-.46,.58,.68)),normalize(vec3(local/targetRadius,z)))),34.);col+=spec*.21;
      float rim=pow(1.-z,7.);col+=rim*vec3(.3,.34,.4);
      col+=mix(0.,noise(px+time)-.5,.018);
      outColor=vec4(mix(base,col,mask),1.);
    }`;
  function shader(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s}
  const program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vert));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,frag));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
  gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);const pos=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
  const U={};['resolution','mouse','textureSize','velocity','time','reveal','hasImage'].forEach(n=>U[n]=gl.getUniformLocation(program,n));const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  let dpr=1,w=innerWidth,h=innerHeight,mouse={x:w*.58,y:h*.54},target={...mouse},last={...mouse},velocity={x:0,y:0},targetReveal=0,reveal=0,texW=1,texH=1,hasImage=0,visible=true;
  function resize(){dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;gl.viewport(0,0,canvas.width,canvas.height)}addEventListener('resize',resize);resize();
  function render(t){mouse.x+=(target.x-mouse.x)*.12;mouse.y+=(target.y-mouse.y)*.12;velocity.x+=(mouse.x-last.x-velocity.x)*.2;velocity.y+=(mouse.y-last.y-velocity.y)*.2;last={...mouse};reveal+=(targetReveal-reveal)*.045;gl.uniform2f(U.resolution,w,h);gl.uniform2f(U.mouse,mouse.x,mouse.y);gl.uniform2f(U.textureSize,texW,texH);gl.uniform2f(U.velocity,velocity.x,velocity.y);gl.uniform1f(U.time,t*.001);gl.uniform1f(U.reveal,reveal);gl.uniform1f(U.hasImage,hasImage);gl.drawArrays(gl.TRIANGLES,0,6);requestAnimationFrame(render)}requestAnimationFrame(render);
  window.lensGL={ready:true,setPointer(x,y){target={x,y}},setImage(src){const im=new Image();im.onload=()=>{texW=im.naturalWidth;texH=im.naturalHeight;gl.bindTexture(gl.TEXTURE_2D,texture);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,im);hasImage=1};im.src=src},reveal(){targetReveal=1},reset(){targetReveal=0;reveal=0},setVisible(on){visible=on;document.body.classList.toggle('lens-mode',on)},getState(){return{targetReveal,reveal,mouse,target,hasImage,texW,texH}}};
})();
