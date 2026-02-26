<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { Renderer, Program, Triangle, Mesh } from "ogl";

    export let enableRainbow = false;
    export let gridColor = "#ffffff";
    export let rippleIntensity = 0.01;
    export let gridSize = 10.0;
    export let gridThickness = 15.0;
    export let fadeDistance = 10;
    export let vignetteStrength = 2.0;
    export let glowIntensity = 0.1;
    export let opacity = 1.0;
    export let gridRotation = 0;
    export let mouseInteraction = true;
    export let mouseInteractionRadius = 1;

    let container: HTMLDivElement;
    let renderer: Renderer;
    let gl: WebGLRenderingContext;
    let program: Program;
    let request: number;

    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? [
                  parseInt(result[1], 16) / 255,
                  parseInt(result[2], 16) / 255,
                  parseInt(result[3], 16) / 255,
              ]
            : [1, 1, 1];
    };

    const vert = `
    attribute vec2 position;
    varying vec2 vUv;
    void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

    const frag = `
    precision highp float;
    uniform float iTime;
    uniform vec2 iResolution;
    uniform bool enableRainbow;
    uniform vec3 gridColor;
    uniform float rippleIntensity;
    uniform float gridSize;
    uniform float gridThickness;
    uniform float fadeDistance;
    uniform float vignetteStrength;
    uniform float glowIntensity;
    uniform float opacity;
    uniform float gridRotation;
    uniform bool mouseInteraction;
    uniform vec2 mousePosition;
    uniform float mouseInfluence;
    uniform float mouseInteractionRadius;
    varying vec2 vUv;

    float pi = 3.141592;

    mat2 rotate(float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat2(c, -s, s, c);
    }

    void main() {
        vec2 uv = vUv * 2.0 - 1.0;
        uv.x *= iResolution.x / iResolution.y;

        if (gridRotation != 0.0) {
            uv = rotate(gridRotation * pi / 180.0) * uv;
        }

        float dist = length(uv);
        float func = sin(pi * (iTime - dist));
        vec2 rippleUv = uv + uv * func * rippleIntensity;

        if (mouseInteraction && mouseInfluence > 0.0) {
            vec2 mouseUv = (mousePosition * 2.0 - 1.0);
            mouseUv.x *= iResolution.x / iResolution.y;
            float mouseDist = length(uv - mouseUv);
            
            float influence = mouseInfluence * exp(-mouseDist * mouseDist / (mouseInteractionRadius * mouseInteractionRadius));
            
            float mouseWave = sin(pi * (iTime * 2.0 - mouseDist * 3.0)) * influence;
            rippleUv += normalize(uv - mouseUv) * mouseWave * rippleIntensity * 0.3;
        }

        vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);
        vec2 b = abs(a);

        float aaWidth = 0.5;
        vec2 smoothB = vec2(
            smoothstep(0.0, aaWidth, b.x),
            smoothstep(0.0, aaWidth, b.y)
        );

        vec3 color = vec3(0.0);
        color += exp(-gridThickness * smoothB.x * (0.8 + 0.5 * sin(pi * iTime)));
        color += exp(-gridThickness * smoothB.y);

        if (glowIntensity > 0.0) {
            color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.x);
            color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.y);
        }

        float ddd = 1.0;
        
        vec2 vignetteCoords = vUv - 0.5;
        float vignetteDistance = length(vignetteCoords);
        float vignette = 1.0;
        
        vec3 t;
        if (enableRainbow) {
            t = vec3(
                uv.x * 0.5 + 0.5 * sin(iTime),
                uv.y * 0.5 + 0.5 * cos(iTime),
                pow(cos(iTime), 4.0)
            ) + 0.5;
        } else {
            t = gridColor;
        }

        float finalFade = ddd * vignette;
        float alpha = length(color) * finalFade * opacity;
        gl_FragColor = vec4(color * t * finalFade * opacity, alpha);
    }
  `;

    let mousePosition = { x: 0.5, y: 0.5 };
    let targetMouse = { x: 0.5, y: 0.5 };
    let mouseInfluence = 0;
    let targetInfluence = 0;

    onMount(() => {
        renderer = new Renderer({
            dpr: Math.min(window.devicePixelRatio, 2),
            alpha: true,
        });
        gl = renderer.gl;
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        (gl.canvas as HTMLCanvasElement).style.width = "100%";
        (gl.canvas as HTMLCanvasElement).style.height = "100%";
        container.appendChild(gl.canvas as HTMLCanvasElement);

        const geometry = new Triangle(gl as any);
        program = new Program(gl as any, {
            vertex: vert,
            fragment: frag,
            uniforms: {
                iTime: { value: 0 },
                iResolution: { value: [0, 0] },
                enableRainbow: { value: enableRainbow },
                gridColor: { value: hexToRgb(gridColor) },
                rippleIntensity: { value: rippleIntensity },
                gridSize: { value: gridSize },
                gridThickness: { value: gridThickness },
                fadeDistance: { value: fadeDistance },
                vignetteStrength: { value: vignetteStrength },
                glowIntensity: { value: glowIntensity },
                opacity: { value: opacity },
                gridRotation: { value: gridRotation },
                mouseInteraction: { value: mouseInteraction },
                mousePosition: { value: [0.5, 0.5] },
                mouseInfluence: { value: 0 },
                mouseInteractionRadius: { value: mouseInteractionRadius },
            },
        });

        const mesh = new Mesh(gl as any, { geometry, program });

        const resize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            renderer.setSize(w, h);
            program.uniforms.iResolution.value = [w, h];
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!mouseInteraction || !container) return;
            const rect = container.getBoundingClientRect();
            targetMouse.x = (e.clientX - rect.left) / rect.width;
            targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
        };

        const handleMouseEnter = () => {
            if (!mouseInteraction) return;
            targetInfluence = 1.0;
        };

        const handleMouseLeave = () => {
            if (!mouseInteraction) return;
            targetInfluence = 0.0;
        };

        window.addEventListener("resize", resize);
        if (mouseInteraction) {
            window.addEventListener("mousemove", handleMouseMove);
            container.addEventListener("mouseenter", handleMouseEnter);
            container.addEventListener("mouseleave", handleMouseLeave);
        }
        resize();

        const render = (t: number) => {
            request = requestAnimationFrame(render);
            program.uniforms.iTime.value = t * 0.001;

            const lerpFactor = 0.1;
            mousePosition.x += (targetMouse.x - mousePosition.x) * lerpFactor;
            mousePosition.y += (targetMouse.y - mousePosition.y) * lerpFactor;

            mouseInfluence += (targetInfluence - mouseInfluence) * 0.05;

            program.uniforms.mousePosition.value = [
                mousePosition.x,
                mousePosition.y,
            ];
            program.uniforms.mouseInfluence.value = mouseInfluence;

            renderer.render({ scene: mesh });
        };

        requestAnimationFrame(render);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(request);
            gl.getExtension("WEBGL_lose_context")?.loseContext();
            (gl.canvas as HTMLCanvasElement).remove?.();
        };
    });

    $: if (program) {
        program.uniforms.enableRainbow.value = enableRainbow;
        program.uniforms.gridColor.value = hexToRgb(gridColor);
        program.uniforms.rippleIntensity.value = rippleIntensity;
        program.uniforms.gridSize.value = gridSize;
        program.uniforms.gridThickness.value = gridThickness;
        program.uniforms.fadeDistance.value = fadeDistance;
        program.uniforms.vignetteStrength.value = vignetteStrength;
        program.uniforms.glowIntensity.value = glowIntensity;
        program.uniforms.opacity.value = opacity;
        program.uniforms.gridRotation.value = gridRotation;
        program.uniforms.mouseInteraction.value = mouseInteraction;
        program.uniforms.mouseInteractionRadius.value = mouseInteractionRadius;
    }
</script>

<div bind:this={container} class="ripple-grid-container" />

<style>
    .ripple-grid-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
        overflow: hidden;
    }
    :global(.ripple-grid-container canvas) {
        display: block;
        width: 100%;
        height: 100%;
    }
</style>
