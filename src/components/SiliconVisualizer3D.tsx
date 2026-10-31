import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Layers, Eye, RotateCw, Maximize2, Compass, Sliders, ChevronDown, ChevronUp, Cpu, Sparkles } from 'lucide-react';

interface SiliconVisualizer3DProps {
  onClose?: () => void;
  isHeroEmbedded?: boolean;
}

export const SiliconVisualizer3D: React.FC<SiliconVisualizer3DProps> = ({
  onClose,
  isHeroEmbedded = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isExploded, setIsExploded] = useState<number>(20); // 0 to 100%
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activeFinish, setActiveFinish] = useState<'royal' | 'gold' | 'platinum'>('royal');
  const [activeCameraView, setActiveCameraView] = useState<'iso' | 'top' | 'core'>('iso');
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [selectedSubsystem, setSelectedSubsystem] = useState<string>('NPU Systolic Cores');

  // Mutable refs to pass UI state smoothly into the render loop without rebuilding WebGL
  const stateRef = useRef({
    exploded: 20,
    autoRotate: true,
    cameraView: 'iso' as 'iso' | 'top' | 'core',
    targetCameraPos: new THREE.Vector3(7, 6, 8),
    targetLookAt: new THREE.Vector3(0, 0, 0),
  });

  useEffect(() => {
    stateRef.current.exploded = isExploded;
  }, [isExploded]);

  useEffect(() => {
    stateRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    stateRef.current.cameraView = activeCameraView;
    if (activeCameraView === 'iso') {
      stateRef.current.targetCameraPos.set(7, 5.5, 7.5);
      stateRef.current.targetLookAt.set(0, 0, 0);
    } else if (activeCameraView === 'top') {
      stateRef.current.targetCameraPos.set(0, 10, 0.1);
      stateRef.current.targetLookAt.set(0, 0, 0);
    } else if (activeCameraView === 'core') {
      stateRef.current.targetCameraPos.set(2.8, 3.2, 3.2);
      stateRef.current.targetLookAt.set(0, 0.5, 0);
    }
  }, [activeCameraView]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL per Three.js skill
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 1. Renderer Setup
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Scene & Procedural Studio Environment
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a1931, 0.035);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 3. Camera Setup
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(7, 5.5, 7.5);
    camera.lookAt(0, 0, 0);

    // 4. Lighting Rig (Key warm light + Cool hemisphere fill)
    const keyLight = new THREE.DirectionalLight(0xfff6ea, 2.2);
    keyLight.position.set(6, 12, 6);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 25;
      keyLight.shadow.camera.left = -5;
      keyLight.shadow.camera.right = 5;
      keyLight.shadow.camera.top = 5;
      keyLight.shadow.camera.bottom = -5;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0xbfdbfe, 0x0a1931, 1.2);
    scene.add(hemiLight);

    const rimLight = new THREE.DirectionalLight(0x60a5fa, 1.5);
    rimLight.position.set(-6, 3, -6);
    scene.add(rimLight);

    // 5. Procedural Canvas Texture for Circuit Interconnects
    const createCircuitTexture = (accent: 'royal' | 'gold' | 'platinum') => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;

      // Background
      ctx.fillStyle = '#0a1931';
      ctx.fillRect(0, 0, 1024, 1024);

      // Gold / Copper bus lines
      ctx.strokeStyle = accent === 'gold' ? '#f59e0b' : accent === 'platinum' ? '#94a3b8' : '#3b82f6';
      ctx.lineWidth = 3;

      // Draw grid traces
      for (let i = 80; i < 944; i += 60) {
        ctx.beginPath();
        ctx.moveTo(80, i);
        ctx.lineTo(944, i);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(i, 80);
        ctx.lineTo(i, 944);
        ctx.stroke();
      }

      // Draw high-density bus lanes
      ctx.strokeStyle = accent === 'gold' ? '#fbbf24' : accent === 'platinum' ? '#e2e8f0' : '#60a5fa';
      ctx.lineWidth = 6;
      ctx.strokeRect(200, 200, 624, 624);
      ctx.strokeRect(320, 320, 384, 384);

      // Micro solder pads
      ctx.fillStyle = accent === 'gold' ? '#fde047' : '#93c5fd';
      for (let x = 120; x <= 900; x += 120) {
        for (let y = 120; y <= 900; y += 120) {
          ctx.beginPath();
          ctx.arc(x, y, 7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Laser marking text in center
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('NEXUS-7 INFERENCE ASIC', 512, 490);
      ctx.font = 'normal 18px monospace';
      ctx.fillText('ACCRA 2027 · RISC-V TENSOR 5nm', 512, 530);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return texture;
    };

    const circuitTex = createCircuitTexture(activeFinish);

    // 6. Assemble Composite 3–12 Part Procedural Model (`THREE.Group`)
    const chipAssembly = new THREE.Group();

    // Layer 1: Substrate Carrier PCB (Bottom)
    const substrateGeom = new THREE.BoxGeometry(4.8, 0.22, 4.8);
    const substrateMat = new THREE.MeshStandardMaterial({
      color: 0x091b3a,
      roughness: 0.35,
      metalness: 0.7,
    });
    const substrateMesh = new THREE.Mesh(substrateGeom, substrateMat);
    substrateMesh.receiveShadow = !isSoftwareGl;
    substrateMesh.castShadow = !isSoftwareGl;
    substrateMesh.position.y = 0;
    chipAssembly.add(substrateMesh);

    // Edge gold pins around substrate
    const pinGeom = new THREE.BoxGeometry(0.12, 0.08, 0.2);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.15,
    });
    const pinsGroup = new THREE.Group();
    for (let i = -2.1; i <= 2.1; i += 0.3) {
      const pinN = new THREE.Mesh(pinGeom, pinMat);
      pinN.position.set(i, 0, 2.45);
      pinsGroup.add(pinN);

      const pinS = new THREE.Mesh(pinGeom, pinMat);
      pinS.position.set(i, 0, -2.45);
      pinsGroup.add(pinS);
    }
    substrateMesh.add(pinsGroup);

    // Layer 2: Silicon Active Interposer (Middle Layer)
    const interposerGroup = new THREE.Group();
    const interposerGeom = new THREE.BoxGeometry(3.8, 0.12, 3.8);
    const interposerMat = new THREE.MeshStandardMaterial({
      color: 0x172554,
      map: circuitTex,
      roughness: 0.2,
      metalness: 0.85,
    });
    const interposerMesh = new THREE.Mesh(interposerGeom, interposerMat);
    interposerMesh.castShadow = !isSoftwareGl;
    interposerMesh.receiveShadow = !isSoftwareGl;
    interposerGroup.add(interposerMesh);
    chipAssembly.add(interposerGroup);

    // Layer 3: Dies & Accelerators (Compute Cores & HBM Stacks)
    const diesGroup = new THREE.Group();

    // 4x Neural Compute Die Cores (INT4/FP4 Systolic Arrays)
    const npuGeom = new THREE.BoxGeometry(1.1, 0.2, 1.1);
    const npuMat = new THREE.MeshStandardMaterial({
      color: activeFinish === 'gold' ? 0xd97706 : activeFinish === 'platinum' ? 0x64748b : 0x1d4ed8,
      metalness: 0.95,
      roughness: 0.12,
    });

    const npuPositions = [
      [-0.75, 0.75],
      [0.75, 0.75],
      [-0.75, -0.75],
      [0.75, -0.75],
    ];

    npuPositions.forEach(([x, z]) => {
      const npuMesh = new THREE.Mesh(npuGeom, npuMat);
      npuMesh.position.set(x, 0.1, z);
      npuMesh.castShadow = !isSoftwareGl;
      diesGroup.add(npuMesh);

      // Gold top accent pad
      const padGeom = new THREE.BoxGeometry(0.85, 0.04, 0.85);
      const padMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        metalness: 0.9,
        roughness: 0.2,
      });
      const padMesh = new THREE.Mesh(padGeom, padMat);
      padMesh.position.set(x, 0.21, z);
      diesGroup.add(padMesh);
    });

    // 2x High-Bandwidth Memory (HBM3e) Stack Dies (Flanking sides)
    const hbmGeom = new THREE.BoxGeometry(0.5, 0.35, 2.2);
    const hbmMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.8,
    });

    const hbmLeft = new THREE.Mesh(hbmGeom, hbmMat);
    hbmLeft.position.set(-1.6, 0.17, 0);
    hbmLeft.castShadow = !isSoftwareGl;
    diesGroup.add(hbmLeft);

    const hbmRight = new THREE.Mesh(hbmGeom, hbmMat);
    hbmRight.position.set(1.6, 0.17, 0);
    hbmRight.castShadow = !isSoftwareGl;
    diesGroup.add(hbmRight);

    chipAssembly.add(diesGroup);

    // Layer 4: Integrated Heat Spreader (IHS) Lid with Laser Window (Top Layer)
    const lidGroup = new THREE.Group();
    const frameGeom = new THREE.BoxGeometry(4.2, 0.25, 4.2);
    const lidMat = new THREE.MeshStandardMaterial({
      color: activeFinish === 'gold' ? 0xb45309 : activeFinish === 'platinum' ? 0x475569 : 0x1e3a8a,
      metalness: 0.95,
      roughness: 0.18,
      wireframe: false,
    });
    const lidMesh = new THREE.Mesh(frameGeom, lidMat);
    lidMesh.castShadow = !isSoftwareGl;
    lidMesh.position.y = 0.5;
    lidGroup.add(lidMesh);

    // Central cutout revealing silicon core
    const cutoutGeom = new THREE.BoxGeometry(2.6, 0.28, 2.6);
    const cutoutMat = new THREE.MeshStandardMaterial({
      color: 0x0f254e,
      metalness: 0.9,
      roughness: 0.1,
    });
    const cutoutMesh = new THREE.Mesh(cutoutGeom, cutoutMat);
    cutoutMesh.position.y = 0.52;
    lidGroup.add(cutoutMesh);

    chipAssembly.add(lidGroup);

    // Contact Shadow Ground Plane (Grounding hero object)
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d')!;
    const grad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(3, 10, 26, 0.7)');
    grad.addColorStop(0.5, 'rgba(3, 10, 26, 0.25)');
    grad.addColorStop(1, 'rgba(3, 10, 26, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 8),
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        depthWrite: false,
      })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.15;
    scene.add(shadowPlane);

    scene.add(chipAssembly);

    // 7. Silky-Smooth Animation Loop with Exponential Damping & Software Guard
    let frameId = 0;
    const currentCameraPos = camera.position.clone();
    const currentLookAt = new THREE.Vector3(0, 0, 0);

    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 75);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function animate() {
      const delta = Math.min(clock.getDelta(), 0.1);

      // Auto rotation
      if (stateRef.current.autoRotate) {
        chipAssembly.rotation.y += delta * 0.45;
      }

      // Smooth exploded layer interpolation
      const targetSep = stateRef.current.exploded / 100; // 0 to 1
      interposerGroup.position.y = THREE.MathUtils.damp(
        interposerGroup.position.y,
        0.35 + targetSep * 0.8,
        6,
        delta
      );
      diesGroup.position.y = THREE.MathUtils.damp(
        diesGroup.position.y,
        0.5 + targetSep * 1.6,
        6,
        delta
      );
      lidGroup.position.y = THREE.MathUtils.damp(
        lidGroup.position.y,
        0.65 + targetSep * 2.6,
        6,
        delta
      );

      // Smooth camera position damping
      currentCameraPos.lerp(stateRef.current.targetCameraPos, delta * 3.5);
      camera.position.copy(currentCameraPos);

      currentLookAt.lerp(stateRef.current.targetLookAt, delta * 4);
      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(animate);
      } else {
        frameId = requestAnimationFrame(animate);
      }
    }

    animate();

    // 8. Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      renderer.dispose();
      circuitTex.dispose();
      shadowTex.dispose();
    };
  }, [activeFinish]);

  return (
    <div className={`relative w-full ${isHeroEmbedded ? 'h-[460px] sm:h-[520px]' : 'h-[620px]'} bg-[#0a1931] rounded-3xl overflow-hidden border border-blue-900/60 shadow-2xl flex flex-col justify-between`}>
      
      {/* 3D WebGL Canvas Mount Container */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Top Header Overlay: Minimal Spec Badge */}
      <div className="relative z-10 p-5 sm:p-6 flex items-start justify-between pointer-events-none">
        <div className="bg-[#0f254e]/90 border border-blue-700/40 rounded-2xl p-3.5 shadow-xl text-left pointer-events-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-blue-200">
              Interactive 3D Hardware Spec
            </span>
          </div>
          <h4 className="text-base font-extrabold text-white tracking-tight">
            NEXUS-7 AI Inference ASIC
          </h4>
          <p className="text-xs text-blue-300/80">
            5nm Heterogeneous Multi-Die Chiplet · 128 TFLOPS INT4
          </p>
        </div>

        {/* Subsystem Quick Badge */}
        <div className="hidden sm:flex items-center gap-2 bg-[#0f254e]/80 border border-blue-700/30 px-3.5 py-1.5 rounded-full text-xs text-blue-200 pointer-events-auto">
          <Cpu className="w-3.5 h-3.5 text-blue-400" />
          <span>Active Layer: <strong className="text-white">{selectedSubsystem}</strong></span>
        </div>
      </div>

      {/* Unified Ergonomic Bottom Control Dock (Consolidated, Zero Center Occlusion, Collapsible) */}
      <div className="relative z-10 pb-5 px-4 sm:px-6 w-full flex flex-col items-center pointer-events-none">
        
        {/* Dock Collapse Toggle Tab */}
        <button
          onClick={() => setIsDockCollapsed(!isDockCollapsed)}
          className="pointer-events-auto mb-2 px-3.5 py-1 bg-[#0f254e]/90 hover:bg-[#1e3a8a] border border-blue-700/40 text-[11px] font-bold text-blue-200 hover:text-white rounded-full flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
        >
          {isDockCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Show 3D Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Hide Dock (Full View)</span>
            </>
          )}
        </button>

        {!isDockCollapsed && (
          <div className="pointer-events-auto w-full max-w-2xl bg-[#091b3a] border border-blue-700/50 rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            
            {/* Control 1: Exploded Assembly Slider */}
            <div className="w-full sm:w-1/2 space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-blue-200">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  <span>Layer Separation</span>
                </span>
                <span className="font-mono text-white text-[11px]">{isExploded}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={isExploded}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setIsExploded(val);
                  if (val > 60) setSelectedSubsystem('Integrated Heat Spreader (Lid)');
                  else if (val > 30) setSelectedSubsystem('NPU Systolic Cores & HBM3e');
                  else setSelectedSubsystem('Substrate BGA Interconnects');
                }}
                className="w-full h-1.5 bg-blue-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Control 2: Camera Presets */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 mr-1 hidden lg:inline">
                View:
              </span>
              {[
                { id: 'iso', label: 'Iso 3D' },
                { id: 'top', label: 'Top Die' },
                { id: 'core', label: 'Core Zoom' },
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActiveCameraView(v.id as any)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeCameraView === v.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-[#0f254e] text-blue-200 hover:bg-blue-800'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>

            {/* Control 3: Finishes & Auto-Rotate Toggle */}
            <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-blue-800/80 pt-2 sm:pt-0 sm:pl-3">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                title={autoRotate ? 'Pause 3D rotation' : 'Enable 3D rotation'}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                  autoRotate ? 'bg-blue-600 text-white' : 'bg-[#0f254e] text-blue-300 hover:text-white'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>

              {/* Finish swatch */}
              <button
                onClick={() => {
                  const finishes: ('royal' | 'gold' | 'platinum')[] = ['royal', 'gold', 'platinum'];
                  const next = finishes[(finishes.indexOf(activeFinish) + 1) % finishes.length];
                  setActiveFinish(next);
                }}
                className="px-2.5 py-1.5 bg-[#0f254e] hover:bg-blue-800 text-[11px] font-semibold text-blue-200 rounded-lg transition-colors cursor-pointer capitalize"
              >
                {activeFinish} Alloy
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
