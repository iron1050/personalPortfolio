import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap, ScrollTrigger, reduceMotion } from '../lib/gsap'

// Ashima 3D simplex noise (public domain)
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`

const VERT = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uFreq;
varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;
${NOISE}
void main(){
  float n1 = snoise(position * uFreq + uTime * 0.22);
  float n2 = snoise(position * uFreq * 2.6 - uTime * 0.35) * 0.3;
  float d = (n1 + n2) * uAmp;
  vec3 p = position + normal * d;
  vDisp = d;
  vNormal = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vView = -mv.xyz;
  gl_Position = projectionMatrix * mv;
}`

const FRAG = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uOpacity;
varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;
void main(){
  vec3 V = normalize(vView);
  float fres = pow(1.0 - clamp(dot(normalize(vNormal), V), 0.0, 1.0), 2.2);
  vec3 base = mix(uColorA, uColorB, smoothstep(-0.25, 0.35, vDisp));
  vec3 col = base * 0.10 + fres * base * 1.05;
  float alpha = (0.04 + fres * 0.75) * uOpacity;
  gl_FragColor = vec4(col, alpha);
}`

/**
 * One blob, one wireframe shell, one point cloud. ~2 draw calls of
 * geometry plus points. DPR capped at 1.5, renders only while the hero
 * is on screen, and shares GSAP's rAF ticker so there is a single loop.
 */
export default function HeroScene({ ready }) {
  const mount = useRef(null)
  const api = useRef(null)

  useEffect(() => {
    const el = mount.current
    if (!el) return

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50)
    camera.position.set(0, 0, 7)

    const uniforms = {
      uTime: { value: 0 },
      uAmp: { value: 0.3 },
      uFreq: { value: 1.15 },
      uOpacity: { value: 1 },
      uColorA: { value: new THREE.Color('#6a5cff') },
      uColorB: { value: new THREE.Color('#c8ff3d') },
    }

    // non-indexed: 20 * 28^2 tris ≈ 47k verts through the noise shader
    const geo = new THREE.IcosahedronGeometry(1.5, 28)
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const blob = new THREE.Mesh(geo, mat)

    const wireGeo = new THREE.IcosahedronGeometry(1.5, 7)
    const wireMat = mat.clone()
    wireMat.wireframe = true
    // share every uniform except opacity so both meshes animate in sync
    wireMat.uniforms = { ...uniforms, uOpacity: { value: 0.22 } }
    const wire = new THREE.Mesh(wireGeo, wireMat)

    const group = new THREE.Group()
    group.add(blob, wire)
    scene.add(group)

    // Sparse particle field
    const COUNT = 320
    const pos = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const r = 3 + Math.random() * 4
      const t = Math.random() * Math.PI * 2
      const p = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(p) * Math.cos(t)
      pos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * 0.6
      pos[i * 3 + 2] = r * Math.cos(p) - 2
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const pMat = new THREE.PointsMaterial({
      color: 0xecebe4,
      size: 0.018,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    })
    const points = new THREE.Points(pGeo, pMat)
    scene.add(points)

    // State driven by pointer + scroll, smoothed each frame
    const target = { mx: 0, my: 0, scroll: 0 }
    const cur = { mx: 0, my: 0, scroll: 0 }
    const intro = { scale: reduceMotion() ? 1 : 0 }
    let visible = true
    let w = 1
    let h = 1

    const resize = () => {
      w = el.clientWidth
      h = el.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      // push the blob to the right on wide screens, top-centre on mobile
      const wide = w > 900
      group.position.x = wide ? 2.1 : 0
      group.position.y = wide ? 0.5 : 1.0
      group.userData.baseScale = wide ? 0.9 : 0.5
      group.userData.baseY = group.position.y
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)

    const onMove = (e) => {
      target.mx = (e.clientX / window.innerWidth) * 2 - 1
      target.my = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom top',
      onToggle: (self) => (visible = self.isActive),
      onUpdate: (self) => (target.scroll = self.progress),
    })

    const tick = (time, delta) => {
      if (!visible) return
      const dt = Math.min(delta, 50) / 1000
      // frame-rate independent damping
      const k = 1 - Math.exp(-dt * 4)
      cur.mx += (target.mx - cur.mx) * k
      cur.my += (target.my - cur.my) * k
      cur.scroll += (target.scroll - cur.scroll) * k

      uniforms.uTime.value += dt * (1 + Math.abs(cur.mx) * 0.6)
      uniforms.uAmp.value = 0.3 + cur.scroll * 0.45
      uniforms.uOpacity.value = 1 - cur.scroll * 0.9

      const s = (group.userData.baseScale || 1) * intro.scale * (1 + cur.scroll * 0.6)
      group.scale.setScalar(s)
      group.rotation.y += dt * 0.12
      group.rotation.x = cur.my * 0.25 + cur.scroll * 0.8
      group.rotation.z = cur.mx * 0.15
      group.position.y = (group.userData.baseY ?? 0.5) - cur.scroll * 2.5

      points.rotation.y += dt * 0.03
      points.rotation.x = cur.my * 0.08
      points.position.y = -cur.scroll * 1.2

      renderer.render(scene, camera)
    }
    gsap.ticker.add(tick)

    api.current = { intro }

    return () => {
      gsap.ticker.remove(tick)
      st.kill()
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      geo.dispose()
      wireGeo.dispose()
      pGeo.dispose()
      mat.dispose()
      wireMat.dispose()
      pMat.dispose()
      renderer.dispose()
      el.removeChild(renderer.domElement)
      api.current = null
    }
  }, [])

  // Intro pop once the preloader finishes
  useEffect(() => {
    if (!ready || !api.current) return
    gsap.to(api.current.intro, { scale: 1, duration: 2.2, ease: 'expo.out', delay: 0.2 })
  }, [ready])

  return <div className="hero__canvas" ref={mount} aria-hidden="true" />
}
