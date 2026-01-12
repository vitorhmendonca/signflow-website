import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Float } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import signflowLogo from "@/assets/signflow-logo-square.png";

interface LogoMeshProps {
    mousePosition: { x: number; y: number };
}

const LogoMesh = ({ mousePosition }: LogoMeshProps) => {
    const meshRef = useRef<THREE.Group>(null);
    const texture = useTexture(signflowLogo);
    const { viewport } = useThree();

    // Target rotation based on mouse
    const targetRotation = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Configure texture for transparency
        texture.colorSpace = THREE.SRGBColorSpace;
    }, [texture]);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Update target rotation based on mouse position
        targetRotation.current.x = mousePosition.y * 0.25;
        targetRotation.current.y = mousePosition.x * 0.25;

        // Cap delta to prevent erratic interpolation after tab visibility changes
        // When browser throttles frames (tab inactive), delta can spike to 30+ seconds
        // Clamping to ~6 frames at 60fps (0.1s) prevents overshoot
        const cappedDelta = Math.min(delta, 0.1);

        // Smooth interpolation to target rotation
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
            meshRef.current.rotation.x,
            targetRotation.current.x,
            cappedDelta * 3
        );
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
            meshRef.current.rotation.y,
            targetRotation.current.y,
            cappedDelta * 3
        );
    });

    return (
        <Float
            speed={2}
            rotationIntensity={0.1}
            floatIntensity={0.3}
            floatingRange={[-0.1, 0.1]}
        >
            <group ref={meshRef}>
                {/* Main logo plane */}
                <mesh>
                    <planeGeometry args={[5.25, 5.25]} />
                    <meshStandardMaterial
                        map={texture}
                        transparent
                        alphaTest={0.1}
                        side={THREE.FrontSide}
                        metalness={0.2}
                        roughness={0.1}
                        envMapIntensity={0.6}
                        emissive="#ffffff"
                        emissiveIntensity={1}
                    />
                </mesh>
            </group>
        </Float>
    );
};

const SignFlowLogo3D = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Normalize to -1 to 1 range
        const x = (e.clientX - centerX) / (rect.width / 2);
        const y = -(e.clientY - centerY) / (rect.height / 2);

        setMousePosition({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
    };

    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full" style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.4))" }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
                style={{ background: "transparent" }}
                resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
            >
                <ambientLight intensity={2} />
                <directionalLight position={[5, 5, 5]} intensity={2.5} />
                <directionalLight position={[-5, 5, 5]} intensity={2} />
                <directionalLight position={[0, 0, 5]} intensity={1.5} />
                <pointLight position={[0, 0, 3]} intensity={1} />
                <LogoMesh mousePosition={mousePosition} />
            </Canvas>
        </div>
    );
};

export default SignFlowLogo3D;
