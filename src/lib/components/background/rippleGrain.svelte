<script lang="ts">
	import { onMount } from 'svelte';
	import { Renderer, Program, Mesh, Triangle } from 'ogl';
 
	type Props = {
		timeSpeed?: number;
		rippleFrequency?: number;
		rippleSpeed?: number;
		rippleWidth?: number;
		rippleDecay?: number;
		verticalSoftness?: number;
		grainAmount?: number;
		grainScale?: number;
		grainAnimated?: boolean;
		contrast?: number;
		gamma?: number;
		saturation?: number;
		centerX?: number;
		centerY?: number;
		zoom?: number;
		color1?: string;
		color2?: string;
		class?: string;
	};
 
	let {
		timeSpeed = 0.25,
		rippleFrequency = 50,
		rippleSpeed = 6,
		rippleWidth = 2,
		rippleDecay = 6,
		verticalSoftness = 0.2,
		grainAmount = 0.1,
		grainScale = 2,
		grainAnimated = true,
		contrast = 1.5,
		gamma = 1,
		saturation = 1,
		centerX = 0,
		centerY = 0,
		zoom = 0.9,
		color1 = '#ff8a3d',
		color2 = '#fab386',
		class: className = ''
	}: Props = $props();
 
	let containerRef: HTMLDivElement;
 
	const current = $derived({
		timeSpeed,
		rippleFrequency,
		rippleSpeed,
		rippleWidth,
		rippleDecay,
		verticalSoftness,
		grainAmount,
		grainScale,
		grainAnimated,
		contrast,
		gamma,
		saturation,
		centerX,
		centerY,
		zoom,
		color1,
		color2
	});
 
	function hexToRgb(hex: string): [number, number, number] {
		const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return r ? [parseInt(r[1], 16) / 255, parseInt(r[2], 16) / 255, parseInt(r[3], 16) / 255] : [1, 1, 1];
	}
 
	onMount(() => {
		const renderer = new Renderer({
			webgl: 2,
			alpha: true,
			antialias: false,
			dpr: Math.min(window.devicePixelRatio || 1, 2)
		});
		const gl = renderer.gl;
		const canvas = gl.canvas as HTMLCanvasElement;
		canvas.style.width = '100%';
		canvas.style.height = '100%';
		canvas.style.display = 'block';
		// eslint-disable-next-line svelte/no-dom-manipulating
		containerRef.appendChild(canvas);
 
		const vertex = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`;
 
		const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uRippleFrequency;
uniform float uRippleSpeed;
uniform float uRippleWidth;
uniform float uRippleDecay;
uniform float uVerticalSoftness;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
out vec4 fragColor;
void mainImage(out vec4 o, vec2 C){
  float t=iTime*uTimeSpeed;
  vec2 uv=C/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);
  tuv.y/=ratio;
  float dist=length(tuv);
  float rippleTime=t*uRippleSpeed;
  float decay=exp(-dist*max(uRippleDecay,0.0));
  float wave=sin(dist*uRippleFrequency-rippleTime);
  float width=max(uRippleWidth,0.001);
  float ring=smoothstep(1.0-width,1.0,wave);
  float mixAmt=clamp(ring*decay,0.0,1.0);
  vec3 colTop=mix(uColor1,uColor2,mixAmt);
  vec3 colBottom=mix(uColor2,uColor1,mixAmt);
  float soft=max(uVerticalSoftness,0.001);
  float vBlend=smoothstep(0.5-soft,0.5+soft,uv.y);
  vec3 col=mix(colBottom,colTop,vBlend);
  vec2 grainUv=uv*max(uGrainScale,0.001);
  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);} 
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;
  col=(col-0.5)*uContrast+0.5;
  float luma=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
  col=clamp(col,0.0,1.0);
  o=vec4(col,1.0);
}
void main(){ vec4 o=vec4(0.0); mainImage(o,gl_FragCoord.xy); fragColor=o; }`;
 
		const geometry = new Triangle(gl);
		const program = new Program(gl, {
			vertex,
			fragment,
			uniforms: {
				iTime: { value: 0 },
				iResolution: { value: new Float32Array([1, 1]) },
				uTimeSpeed: { value: timeSpeed },
				uRippleFrequency: { value: rippleFrequency },
				uRippleSpeed: { value: rippleSpeed },
				uRippleWidth: { value: rippleWidth },
				uRippleDecay: { value: rippleDecay },
				uVerticalSoftness: { value: verticalSoftness },
				uGrainAmount: { value: grainAmount },
				uGrainScale: { value: grainScale },
				uGrainAnimated: { value: grainAnimated ? 1 : 0 },
				uContrast: { value: contrast },
				uGamma: { value: gamma },
				uSaturation: { value: saturation },
				uCenterOffset: { value: new Float32Array([centerX, centerY]) },
				uZoom: { value: zoom },
				uColor1: { value: new Float32Array(hexToRgb(color1)) },
				uColor2: { value: new Float32Array(hexToRgb(color2)) }
			}
		});
 
		const mesh = new Mesh(gl, { geometry, program });
 
		const setSize = () => {
			const rect = containerRef.getBoundingClientRect();
			const w = Math.max(1, Math.floor(rect.width));
			const h = Math.max(1, Math.floor(rect.height));
			renderer.setSize(w, h);
			const res = (program.uniforms.iResolution as { value: Float32Array }).value;
			res[0] = gl.drawingBufferWidth;
			res[1] = gl.drawingBufferHeight;
		};
		const ro = new ResizeObserver(setSize);
		ro.observe(containerRef);
		setSize();
 
		let raf = 0;
		const t0 = performance.now();
		const loop = (t: number) => {
			(program.uniforms.iTime as { value: number }).value = (t - t0) * 0.001;
			(program.uniforms.uTimeSpeed as { value: number }).value = current.timeSpeed;
			(program.uniforms.uRippleFrequency as { value: number }).value = current.rippleFrequency;
			(program.uniforms.uRippleSpeed as { value: number }).value = current.rippleSpeed;
			(program.uniforms.uRippleWidth as { value: number }).value = current.rippleWidth;
			(program.uniforms.uRippleDecay as { value: number }).value = current.rippleDecay;
			(program.uniforms.uVerticalSoftness as { value: number }).value = current.verticalSoftness;
			(program.uniforms.uGrainAmount as { value: number }).value = current.grainAmount;
			(program.uniforms.uGrainScale as { value: number }).value = current.grainScale;
			(program.uniforms.uGrainAnimated as { value: number }).value = current.grainAnimated ? 1 : 0;
			(program.uniforms.uContrast as { value: number }).value = current.contrast;
			(program.uniforms.uGamma as { value: number }).value = current.gamma;
			(program.uniforms.uSaturation as { value: number }).value = current.saturation;
			(program.uniforms.uZoom as { value: number }).value = current.zoom;
			const co = (program.uniforms.uCenterOffset as { value: Float32Array }).value;
			co[0] = current.centerX;
			co[1] = current.centerY;
			(program.uniforms.uColor1 as { value: Float32Array }).value.set(hexToRgb(current.color1));
			(program.uniforms.uColor2 as { value: Float32Array }).value.set(hexToRgb(current.color2));
			renderer.render({ scene: mesh });
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
 
		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
		};
	});
</script>

<div bind:this={containerRef} class="grain {className}"></div>

<style lang="scss">
    .grain {
        position: relative;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
</style>