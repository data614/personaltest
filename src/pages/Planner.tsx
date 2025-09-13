import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// =================================================================================
// TYPE DEFINITIONS
// =================================================================================

interface RoadmapStep {
  title: string;
  description: string;
}

interface Skills {
  technical: string[];
  soft: string[];
}

interface CareerPath {
  title: string;
  description: string;
  averageSalary: string;
  skills: Skills;
  roadmap: RoadmapStep[];
}

interface CareerPlan {
  careerPaths: CareerPath[];
}

interface CareerTitles {
  careerTitles: string[];
}

interface NodePosition {
  title: string;
  x: number;
  y: number;
}

type View = 'planner' | 'explorer';


const BrainCircuitIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a4.5 4.5 0 00-4.5 4.5c0 1.51.74 2.84 1.88 3.69A5.5 5.5 0 006.5 16H8v2h2v-2h4v2h2v-2h1.5a5.5 5.5 0 00-2.88-5.81c1.14-.85 1.88-2.18 1.88-3.69A4.5 4.5 0 0012 2zm0 2a2.5 2.5 0 012.5 2.5A2.5 2.5 0 0112 9a2.5 2.5 0 01-2.5-2.5A2.5 2.5 0 0112 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 16h-3M6 16H3M12 16v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const RoadmapIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CodeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const UsersIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21a6 6 0 006-6v-1a6 6 0 00-9-5.197" />
  </svg>
);

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
  </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

// =================================================================================
// UI COMPONENTS
// =================================================================================

const SkillChip: React.FC<{ skill: string }> = ({ skill }) => (
  <div className="bg-slate-800 text-violet-300 text-xs font-medium px-2.5 py-1 rounded-full border border-slate-700">
    {skill}
  </div>
);

const RoadmapStepItem: React.FC<{
  step: RoadmapStep;
  isLast: boolean;
  isOpen: boolean;
  onToggle: () => void;
  isComplete: boolean;
  onToggleComplete: () => void;
}> = ({ step, isLast, isOpen, onToggle, isComplete, onToggleComplete }) => (
  <div className={`relative pl-10 rounded-lg -my-2 py-2 transition-all duration-300 ${isComplete ? 'bg-green-500/10' : ''}`}>
    <div
      onClick={(e) => { e.stopPropagation(); onToggleComplete(); }}
      aria-label={isComplete ? 'Mark step as incomplete' : 'Mark step as complete'}
      role="button"
      className={`absolute left-0 top-3 flex items-center justify-center w-5 h-5 rounded-full ring-4 ring-slate-900 transition-colors duration-300 cursor-pointer ${
        isComplete ? 'bg-green-500' : (isOpen ? 'bg-violet-500' : 'bg-slate-700 hover:bg-violet-600')
      }`}
    >
      {isComplete && <CheckIcon className="w-3.5 h-3.5 text-slate-900" />}
    </div>
    {!isLast && <div className={`absolute left-[9px] top-8 w-0.5 h-full transition-colors duration-300 ${isComplete ? 'bg-green-500' : 'bg-slate-800'}`}></div>}
    
    <div 
      className="flex justify-between items-center cursor-pointer group" 
      onClick={onToggle}
      aria-expanded={isOpen}
      role="button"
    >
      <h4 className={`font-semibold pr-2 transition-all ${isComplete ? 'text-slate-500 line-through' : 'text-slate-200 group-hover:text-white'}`}>{step.title}</h4>
      <ChevronDownIcon className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </div>

    <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
      <div className="overflow-hidden">
        <p className={`text-slate-400 mt-2 text-sm pr-4 transition-transform duration-200 ease-out ${isOpen ? 'translate-y-0 delay-100' : '-translate-y-2'}`}>
          {step.description}
        </p>
      </div>
    </div>
  </div>
);
const CareerPathCard: React.FC<{ path: CareerPath; index: number }> = ({ path, index }) => {
  const [openStepIndex, setOpenStepIndex] = useState<number | null>(0);
  
  const storageKey = useMemo(() => `personaPath-progress-${path.title.replace(/\s+/g, '-')}`, [path.title]);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const storedProgress = localStorage.getItem(storageKey);
      if (storedProgress) {
        setCompletedSteps(new Set(JSON.parse(storedProgress) as number[]));
      }
    } catch (error) {
      console.error("Failed to load progress from localStorage", error);
    }
  }, [storageKey]);

  const handleToggleStep = (index: number) => {
    setOpenStepIndex(prevIndex => (prevIndex === index ? null : index));
  };
  
  const handleToggleComplete = useCallback((stepIndex: number) => {
    setCompletedSteps(prevCompletedSteps => {
      const newCompletedSteps = new Set(prevCompletedSteps);
      if (newCompletedSteps.has(stepIndex)) {
        newCompletedSteps.delete(stepIndex);
      } else {
        newCompletedSteps.add(stepIndex);
      }
      try {
        localStorage.setItem(storageKey, JSON.stringify(Array.from(newCompletedSteps)));
      } catch (error) {
        console.error("Failed to save progress to localStorage", error);
      }
      return newCompletedSteps;
    });
  }, [storageKey]);

  const progressPercentage = path.roadmap.length > 0 ? (completedSteps.size / path.roadmap.length) * 100 : 0;
  
  return (
    <div className="bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 sm:p-8 animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
      <div className="flex items-center gap-5">
        <div className="bg-gradient-to-br from-violet-600 to-blue-600 p-3 rounded-xl shadow-lg shadow-violet-900/50">
          <RoadmapIcon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">{path.title}</h3>
          <p className="text-lg font-semibold text-violet-400">{path.averageSalary}</p>
        </div>
      </div>
      <p className="mt-4 text-slate-300">{path.description}</p>

      <div className="mt-6">
        <h4 className="text-lg font-semibold text-white mb-3">Required Skills</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CodeIcon className="w-5 h-5 text-slate-400" />
              <h5 className="font-semibold text-slate-300">Technical Skills</h5>
            </div>
            <div className="flex flex-wrap gap-2">
              {path.skills.technical.map(skill => <SkillChip key={skill} skill={skill} />)}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <UsersIcon className="w-5 h-5 text-slate-400" />
              <h5 className="font-semibold text-slate-300">Soft Skills</h5>
            </div>
            <div className="flex flex-wrap gap-2">
              {path.skills.soft.map(skill => <SkillChip key={skill} skill={skill} />)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-lg font-semibold text-white">Your Roadmap</h4>
          <p className="text-sm font-medium text-slate-300">{`${completedSteps.size} / ${path.roadmap.length} Completed`}</p>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2.5 mb-5">
            <div
                className="bg-gradient-to-r from-green-400 to-teal-500 h-2.5 rounded-full transition-[width] duration-700 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
            />
        </div>
        <div className="space-y-6">
          {path.roadmap.map((step, i) => (
            <RoadmapStepItem
              key={i}
              step={step}
              isLast={i === path.roadmap.length - 1}
              isOpen={openStepIndex === i}
              onToggle={() => handleToggleStep(i)}
              isComplete={completedSteps.has(i)}
              onToggleComplete={() => handleToggleComplete(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CareerPlanDisplay: React.FC<{ plan: CareerPlan }> = ({ plan }) => (
  <div className="space-y-8 mt-12">
    {plan.careerPaths.map((path, index) => <CareerPathCard key={path.title} path={path} index={index}/>) }
  </div>
);

const CareerNode: React.FC<{ node: NodePosition; delay: number; isSelected: boolean; onClick: () => void; }> = ({ node, delay, isSelected, onClick }) => (
    <div
        className="absolute flex items-center gap-2 text-slate-300 animate-dreamy-enter group cursor-pointer"
        style={{
            top: `${node.y}%`,
            left: `${node.x}%`,
            animationDelay: `${delay}ms`,
            opacity: 0,
        }}
        onClick={onClick}
    >
        <div 
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              isSelected
                ? 'bg-violet-300 scale-150 shadow-[0_0_16px_theme(colors.violet.300)]'
                : 'bg-violet-400 shadow-[0_0_8px_theme(colors.violet.400)] group-hover:scale-125 group-hover:shadow-[0_0_12px_theme(colors.violet.400)] animate-subtle-pulse'
            }`}
            style={{ animationDelay: `${Math.random() * 4}s` }}
        />
        <span className={`whitespace-nowrap text-sm transition-colors duration-300 ${
          isSelected 
            ? 'text-violet-300 font-semibold' 
            : 'text-slate-400 group-hover:text-white'
        }`}>{node.title}</span>
    </div>
);
const CareerDetailModal: React.FC<{
  node: NodePosition;
  description: string | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
}> = ({ node, description, isLoading, error, onClose }) => (
    <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
        aria-modal="true"
        role="dialog"
    >
        <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-2xl p-6 sm:p-8 max-w-lg w-full relative animate-fade-in-up"
        >
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                aria-label="Close career detail view"
            >
                <CloseIcon className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
                <SparklesIcon className="w-6 h-6 text-violet-400" />
                <h3 className="text-xl sm:text-2xl font-bold text-white">{node.title}</h3>
            </div>
            <div className="mt-4 h-24">
                {isLoading && (
                    <div className="flex items-center gap-3 text-slate-400">
                        <div className="w-5 h-5 border-2 border-slate-700 border-t-violet-500 rounded-full animate-spin"></div>
                        <span>Generating description...</span>
                    </div>
                )}
                {error && <p className="text-red-400">{error}</p>}
                {description && <p className="text-slate-300">{description}</p>}
            </div>
        </div>
    </div>
);

const CareerExplorerDisplay: React.FC<{ paths: string[] }> = ({ paths }) => {
    const [selectedNode, setSelectedNode] = useState<NodePosition | null>(null);
    const [nodeDescription, setNodeDescription] = useState<string | null>(null);
    const [loadingDescription, setLoadingDescription] = useState<boolean>(false);
    const [descriptionError, setDescriptionError] = useState<string | null>(null);
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        fetch('/api/ai-key').then(r => r.json()).then(d => setApiKey(d.key));
    }, []);

    const nodePositions = useMemo<NodePosition[]>(() => {
        const positions: NodePosition[] = [];
        const minDistance = 15;
        const shuffledPaths = [...paths].sort(() => Math.random() - 0.5);

        shuffledPaths.forEach(title => {
            let bestPosition: { x: number; y: number; minDist: number } | null = null;
            
            for (let i = 0; i < 100; i++) {
                const x = Math.random() * 88 + 6;
                const y = Math.random() * 88 + 6;

                let currentMinDist = Infinity;
                for (const pos of positions) {
                    const dist = Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
                    currentMinDist = Math.min(currentMinDist, dist);
                }

                if (bestPosition === null || currentMinDist > bestPosition.minDist) {
                    bestPosition = { x, y, minDist: currentMinDist };
                }
            }

            if (bestPosition && bestPosition.minDist > minDistance / (positions.length * 0.1 + 1)) {
                 positions.push({ title, x: bestPosition.x, y: bestPosition.y });
            } else if (bestPosition) {
                 positions.push({ title, x: bestPosition.x, y: bestPosition.y });
            }
        });
        
        return positions;
    }, [paths]);

    const handleNodeClick = useCallback(async (node: NodePosition) => {
      if (selectedNode?.title === node.title) {
        setSelectedNode(null);
        return;
      }

      setSelectedNode(node);
      setLoadingDescription(true);
      setNodeDescription(null);
      setDescriptionError(null);

      if (!apiKey) {
          setDescriptionError("API key is not configured.");
          setLoadingDescription(false);
          return;
      }

      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `Provide a concise, one-paragraph description for the career path: "${node.title}". Focus on the primary responsibilities and the typical environment for this role.`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });
        
        setNodeDescription(response.text);

      } catch (err) {
        console.error("Failed to fetch description:", err);
        setDescriptionError("Could not fetch career details. Please try again.");
      } finally {
        setLoadingDescription(false);
      }
    }, [selectedNode]);

    const handleCloseModal = () => {
        setSelectedNode(null);
    };

    return (
        <div className="relative mt-12 w-full h-[600px] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden animate-fade-in">
             <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-violet-950/40 to-slate-950 bg-[length:200%_200%] animate-background-pan"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,rgba(124,58,237,0.1),transparent)]"></div>
            
            <div className="absolute inset-0">
                {nodePositions.map((node, i) => (
                    <CareerNode 
                        key={`${node.title}-${i}`} 
                        node={node} 
                        delay={i * 30} 
                        isSelected={selectedNode?.title === node.title}
                        onClick={() => handleNodeClick(node)}
                    />
                ))}
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-slate-400 border border-slate-700">
                Click on a path to learn more
            </div>
            {selectedNode && (
                <CareerDetailModal 
                    node={selectedNode}
                    description={nodeDescription}
                    isLoading={loadingDescription}
                    error={descriptionError}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

const LoadingSpinner: React.FC<{ text?: string }> = ({ text = "Crafting Your Future..." }) => (
    <div className="flex flex-col items-center justify-center text-center py-20 animate-fade-in">
        <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-violet-500 rounded-full animate-spin"></div>
        </div>
        <div className="mt-6 space-y-2">
            <h3 className="text-xl font-semibold text-white">{text}</h3>
            <p className="text-slate-400 max-w-sm md:max-w-md">Our AI is analyzing your profile. This might take a moment.</p>
        </div>
    </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="mt-12 p-4 bg-red-900/50 border border-red-700 rounded-lg text-center animate-fade-in">
        <h3 className="text-lg font-semibold text-red-300">An Error Occurred</h3>
        <p className="text-red-400 mt-1">{message}</p>
    </div>
);

// =================================================================================
// MAIN APP COMPONENT
// =================================================================================

export default function Planner() {
  const [skills, setSkills] = useState('React, TypeScript, Node.js');
  const [interests, setInterests] = useState('Building scalable web applications, UI/UX design, and artificial intelligence.');
  const [goals, setGoals] = useState('Find a senior frontend role with leadership opportunities and a healthy work-life balance.');
  
  const [careerPlan, setCareerPlan] = useState<CareerPlan | null>(null);
  const [exploredPaths, setExploredPaths] = useState<string[]>([]);
  const [loading, setLoading] = useState({ plan: false, explorer: false });
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>('planner');
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    fetch('/api/ai-key')
      .then(r => r.json())
      .then(d => setApiKey(d.key));
  }, []);

  const isLoading = loading.plan || loading.explorer;

  const handleGeneratePlan = useCallback(async () => {
    if (!skills || !interests || !goals) {
      setError("Please fill out all fields to generate your career plan.");
      return;
    }
    
    setLoading(prev => ({ ...prev, plan: true, explorer: false }));
    setError(null);
    setCareerPlan(null);
    setExploredPaths([]);
    setView('planner');

    if (!apiKey) {
        setError("API key is not configured. Please contact support.");
        setLoading(prev => ({ ...prev, plan: false }));
        return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Based on the following user profile, generate a detailed career plan. User Profile: - Current Skills: ${skills} - Interests: ${interests} - Career Goals: ${goals}. Provide 3 distinct and well-researched career path recommendations. For each career path, include: 1. A 'title' for the career path. 2. A concise, one-paragraph 'description'. 3. An estimated 'averageSalary' range in USD (e.g., "$90,000 - $130,000"). 4. A list of key 'skills' required, categorized into 'technical' (at least 4) and 'soft' (at least 3) skills. 5. A 4-step actionable 'roadmap' to enter this field, where each step has a 'title' and a detailed 'description'.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: { type: Type.OBJECT, properties: { careerPaths: { type: Type.ARRAY, description: "A list of recommended career paths.", items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, description: { type: Type.STRING }, averageSalary: { type: Type.STRING }, skills: { type: Type.OBJECT, properties: { technical: { type: Type.ARRAY, items: { type: Type.STRING } }, soft: { type: Type.ARRAY, items: { type: Type.STRING } } } }, roadmap: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, description: { type: Type.STRING } } } } } } } } }
        }
      });
      
      const responseText = response.text.trim();
      const plan = JSON.parse(responseText) as CareerPlan;
      setCareerPlan(plan);

    } catch (err) {
      console.error(err);
      setError("Failed to generate career plan. The AI may be overloaded. Please try again later.");
    } finally {
      setLoading(prev => ({ ...prev, plan: false }));
    }
  }, [skills, interests, goals]);

  const handleExplorePaths = useCallback(async () => {
    if (!skills || !interests || !goals) {
      setError("Please fill out all fields to explore career paths.");
      return;
    }
    
    setLoading(prev => ({ ...prev, explorer: true, plan: false }));
    setError(null);
    setCareerPlan(null);
    setExploredPaths([]);

    if (!apiKey) {
        setError("API key is not configured. Please contact support.");
        setLoading(prev => ({ ...prev, explorer: false }));
        return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Based on the user's skills (${skills}), interests (${interests}), and goals (${goals}), generate a list of 25 diverse and relevant career titles they could explore.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: { type: Type.OBJECT, properties: { careerTitles: { type: Type.ARRAY, items: { type: Type.STRING } } } }
        }
      });
      
      const responseText = response.text.trim();
      const titles = JSON.parse(responseText) as CareerTitles;
      setExploredPaths(titles.careerTitles);
      setView('explorer');

    } catch (err) {
      console.error(err);
      setError("Failed to explore career paths. The AI may be overloaded. Please try again later.");
    } finally {
      setLoading(prev => ({ ...prev, explorer: false }));
    }
  }, [skills, interests, goals]);

  const showTabs = careerPlan || exploredPaths.length > 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col">
      <Header />
      <div className="flex-1 p-4 sm:p-6 md:p-8 pt-20">
        <div className="max-w-4xl mx-auto">
          <main className="mt-10">
            <div className="text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400">
                  Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-500">Personal Path</span> to Success
              </h1>
              <p className="text-slate-400 mt-4 text-base sm:text-lg max-w-2xl mx-auto">Get hyper-personalized career, education, and skill development roadmaps tailored to your unique personality, skills, and life goals.</p>
          </div>
          
          <div className="mt-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="bg-slate-900/50 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl shadow-slate-950/50">
                <div className="flex items-center gap-3 mb-6">
                    <BrainCircuitIcon className="w-6 h-6 text-violet-400" />
                    <h2 className="text-2xl font-semibold text-white">Your Professional Profile</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-slate-300 mb-2">Your Current Skills</label>
                    <textarea 
                    id="skills"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="e.g., List technical skills like 'JavaScript, React, Figma' or soft skills like 'Public Speaking, Team Leadership'. More detail is better!"
                    className="w-full h-28 bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                    disabled={isLoading}
                    />
                </div>

                <div>
                    <label htmlFor="interests" className="block text-sm font-medium text-slate-300 mb-2">Your Passions & Interests</label>
                    <textarea 
                    id="interests"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    placeholder="e.g., 'I love building beautiful user interfaces', 'I'm fascinated by machine learning applications in finance', or 'I enjoy solving complex logistical problems.'"
                    className="w-full h-28 bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                    disabled={isLoading}
                    />
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="goals" className="block text-sm font-medium text-slate-300 mb-2">Your Career Goals</label>
                    <input 
                    type="text"
                    id="goals"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    placeholder="e.g., 'Become a Senior Product Manager in 5 years' or 'Transition into data science focusing on renewable energy.'"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                    disabled={isLoading}
                    />
                </div>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                    onClick={handleGeneratePlan}
                    disabled={isLoading}
                    className="w-full text-lg font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-3 px-6 rounded-lg hover:from-violet-500 hover:to-fuchsia-500 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:ring-violet-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-violet-900/50 hover:shadow-xl hover:shadow-violet-800/60 transform hover:-translate-y-0.5"
                >
                    {loading.plan ? 'Generating Plan...' : 'Create Roadmap'}
                </button>
                <button 
                    onClick={handleExplorePaths}
                    disabled={isLoading}
                    className="w-full text-lg font-semibold bg-slate-800/80 text-white py-3 px-6 rounded-lg border border-slate-700 hover:bg-slate-700/80 disabled:bg-slate-800 disabled:text-slate-400 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:ring-violet-500 transition-all duration-300 flex items-center justify-center gap-2"
                >
                    <SparklesIcon className="w-5 h-5" />
                    {loading.explorer ? 'Exploring...' : 'Explore Paths'}
                </button>
                </div>
            </div>
          </div>
          
          {showTabs && (
            <div className="mt-12 flex justify-center border-b border-slate-800 animate-fade-in">
                <button 
                    onClick={() => setView('planner')}
                    className={`px-6 py-2 text-lg font-medium transition-colors disabled:text-slate-600 disabled:cursor-not-allowed ${view === 'planner' ? 'text-violet-400 border-b-2 border-violet-400' : 'text-slate-400 hover:text-white'}`}
                    disabled={!careerPlan}
                    aria-selected={view === 'planner'}
                >
                    My Roadmap
                </button>
                 <button 
                    onClick={() => setView('explorer')}
                    className={`px-6 py-2 text-lg font-medium transition-colors disabled:text-slate-600 disabled:cursor-not-allowed ${view === 'explorer' ? 'text-violet-400 border-b-2 border-violet-400' : 'text-slate-400 hover:text-white'}`}
                    disabled={exploredPaths.length === 0}
                    aria-selected={view === 'explorer'}
                >
                    Explorer
                </button>
            </div>
          )}

          {loading.plan && <LoadingSpinner text="Generating Your Detailed Plan..." />}
          {loading.explorer && <LoadingSpinner text="Exploring Related Career Paths..." />}
          {error && <ErrorDisplay message={error} />}

          {view === 'planner' && careerPlan && <CareerPlanDisplay plan={careerPlan} />}
          {view === 'explorer' && exploredPaths.length > 0 && <CareerExplorerDisplay paths={exploredPaths} />}

          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

