import pdfToText from "react-pdftotext";
import React, { useReducer, useCallback, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnalysisContext } from '../context/AnalysisContext';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // <-- Import Recharts

const SkillPieChart = ({ data, title }) => {
  const COLORS = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560'];

  return (
    <div className="" >
      <h3 className="text-xl font-semibold text-green-300 text-center mb-4">{title}</h3>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`Proficiency: ${value}/10`, name]}
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                borderColor: '#39FF14',
                color: '#FFFFFF'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
const analyzeResumeWithGroq = async (resumeText) => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("Groq API key is not configured. Please check your .env.local file.");
  }

  const prompt = `
  Analyze the following resume and provide a detailed skills assessment.
  Respond ONLY with a valid JSON object. Do not include any text before or after the JSON object.
  The JSON object should follow this exact structure:
  {
    "technicalSkills": {
      "programmingLanguages": [
        {"name": "JavaScript", "proficiency": 8},
        {"name": "Python", "proficiency": 7}
      ],
      "technologiesFrameworks": [
        {"name": "React", "proficiency": 9},
        {"name": "Node.js", "proficiency": 8}
      ]
    },
    "softSkills": [
      {"name": "Communication", "score": 8, "explanation": "Clear and concise in project descriptions."},
      {"name": "Leadership", "score": 7, "explanation": "Led a key project dashboard development."}
    ],
    "careerRecommendations": {
      "suitableRoles": ["Full-Stack Developer", "Frontend Engineer", "Backend Engineer"],
      "skillsToImprove": ["Advanced DevOps", "GraphQL", "System Design"]
    },
    "overallScore": 85
  }

  Resume Text:
  ---
  ${resumeText}
`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.3,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API error: ${response.status} ${response.statusText} - ${errorBody}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};



const initialState = {
  status: 'idle',
  file: null,
  analysis: null,
  error: null,
};

function assessmentReducer(state, action) {
  switch (action.type) {
    case 'START_EXTRACTION':
      return { ...initialState, status: 'extracting', file: action.payload };
    case 'START_ANALYSIS':
      return { ...state, status: 'analyzing' };
    case 'SUCCESS':
      return { ...state, status: 'success', analysis: action.payload };
    case 'ERROR':
      return { ...state, status: 'error', error: action.payload };
    case 'RESET':
      return { ...initialState };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// --- Child Components ---

const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const FileUpload = ({ onFileSelect, disabled, fileName }) => (
  <div className="border-2 border-dashed border-green-500/50 rounded-lg p-8 text-center hover:border-green-400 hover:bg-green-900/20 transition-colors duration-300 mb-6">
    <input
      type="file"
      accept=".pdf"
      onChange={onFileSelect}
      className="hidden"
      id="resume-upload"
      disabled={disabled}
    />
    <label htmlFor="resume-upload" className={`cursor-pointer flex flex-col items-center ${disabled ? 'cursor-not-allowed' : ''}`}>
      <svg className="w-12 h-12 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      <span className="text-green-400/80">
        {fileName || 'Click to upload your resume (PDF)'}
      </span>
    </label>
  </div>
);

const StatusIndicator = ({ status, error }) => {
  
  const messages = {
    extracting: 'Extracting text from PDF...',
    analyzing: 'Analyzing resume with AI...',
    success: 'Analysis completed successfully!',
    error: error || 'An unknown error occurred.',
  };

  const colorClass = status === 'error' ? 'text-red-500' : 'text-green-400';

  if (status === 'idle') return null;

  return (
    <div className="text-sm text-center mb-6 flex items-center justify-center gap-3 p-3 bg-black/30 rounded-lg">
      {(status === 'extracting' || status === 'analyzing') && <Spinner />}
      <span className={colorClass}>{messages[status]}</span>
    </div>
  );
};

const AnalysisResult = ({ analysis }) => {
  // Memoize the parsed data to avoid re-parsing on every render
  const parsedData = useMemo(() => {
    if (!analysis) return null;
    try {
      // Find the start and end of the JSON object in case the AI adds extra text
      const jsonStart = analysis.indexOf('{');
      const jsonEnd = analysis.lastIndexOf('}') + 1;
      const jsonString = analysis.substring(jsonStart, jsonEnd);
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Failed to parse analysis JSON:", error);
      // Fallback to show raw text if JSON parsing fails
      return { rawText: analysis };
    }
  }, [analysis]);

  if (!parsedData) return null;
  
  // Fallback for non-JSON responses
  if (parsedData.rawText) {
      return (
          <div className="bg-black/50 backdrop-blur-lg border border-red-500/30 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-red-400 mb-2">Could Not Parse AI Response</h2>
              <p className="text-red-400/80 mb-4">Displaying raw text from the AI:</p>
              <pre className="text-sm whitespace-pre-wrap">{parsedData.rawText}</pre>
          </div>
      );
  }


  // Prepare data for charts
  const techSkillsData = [
    ...(parsedData.technicalSkills?.programmingLanguages || []),
    ...(parsedData.technicalSkills?.technologiesFrameworks || []),
  ].map(skill => ({ name: skill.name, value: skill.proficiency }));

  const softSkillsData = (parsedData.softSkills || []).map(skill => ({ name: skill.name, value: skill.score }));

  return (
    <div className="space-y-8">
      {/* Overall Score Section */}
      <div className="bg-black/50 backdrop-blur-lg border border-green-500/30 rounded-2xl p-6 text-center">
        <h2 className="text-xl font-semibold text-green-300 mb-2">Overall Assessment Score</h2>
        <p className="text-6xl font-bold" style={{ color: '#39FF14', textShadow: '0 0 10px #39FF14' }}>
          {parsedData.overallScore || 'N/A'}
          <span className="text-2xl">%</span>
        </p>
      </div>

      {/* Skills Charts Section */}
      <div className="grid grid-cols-1 gap-8 justify-center items-center">
        <div className="bg-black/50 backdrop-blur-lg border border-green-500/30 rounded-2xl p-6">
          <SkillPieChart data={techSkillsData} title="Technical Skills Proficiency" />
        </div>
        <div className="bg-black/50 backdrop-blur-lg border border-green-500/30 rounded-2xl p-6">
          <SkillPieChart data={softSkillsData} title="Soft Skills Score" />
        </div>
      </div>
      
      {/* Career Recommendations Section */}
      <div className="bg-black/50 backdrop-blur-lg border border-green-500/30 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-green-300 mb-4">Career Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <h3 className="text-lg font-bold text-green-400 mb-2">Suitable Roles</h3>
                  <ul className="list-disc list-inside space-y-1">
                      {(parsedData.careerRecommendations?.suitableRoles || []).map(role => <li key={role}>{role}</li>)}
                  </ul>
              </div>
              <div>
                  <h3 className="text-lg font-bold text-green-400 mb-2">Skills to Improve</h3>
                  <ul className="list-disc list-inside space-y-1">
                      {(parsedData.careerRecommendations?.skillsToImprove || []).map(skill => <li key={skill}>{skill}</li>)}
                  </ul>
              </div>
          </div>
      </div>
    </div>
  );
};


// --- Main Component ---
const SkillsAssessment = () => {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);
  const { status, file, analysis, error } = state;
  const { setAnalysisData } = useContext(AnalysisContext); 
  const navigate = useNavigate(); 
  const handleFileSelect = useCallback(async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    if (selectedFile.type !== 'application/pdf') {
      dispatch({ type: 'ERROR', payload: 'Please upload a PDF file.' });
      return;
    }

    dispatch({ type: 'START_EXTRACTION', payload: selectedFile });

    try {
      // Step 1: Extract text
      const extractedText = await pdfToText(selectedFile);
      if (!extractedText.trim()) {
        throw new Error('Could not extract text from PDF. The file might be empty or image-based.');
      }

      // Step 2: Start analysis
      dispatch({ type: 'START_ANALYSIS' });
      const analysisResult = await analyzeResumeWithGroq(extractedText);
      const jsonStart = analysisResult.indexOf('{');
      const jsonEnd = analysisResult.lastIndexOf('}') + 1;
      const jsonString = analysisResult.substring(jsonStart, jsonEnd);
      const parsedData = JSON.parse(jsonString);
      setAnalysisData(parsedData);
      // Step 3: Show success
      dispatch({ type: 'SUCCESS', payload: analysisResult });

    } catch (err) {
      console.error(err);
      dispatch({ type: 'ERROR', payload: err.message });
    }
  }, []);

  const isProcessing = status === 'extracting' || status === 'analyzing';

  return (
    <main className="relative min-h-screen w-full font-mono text-green-400 bg-black">
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center" style={{ textShadow: '0 0 5px #39FF14, 0 0 10px #39FF14' }}>
          AI-Powered Skills Assessment
        </h1>
        <div className="bg-black/50 backdrop-blur-lg border border-green-500/30 rounded-2xl shadow-2xl shadow-green-500/10 p-6 sm:p-8 mb-8">
          {status !== 'success' && (
            <>
              <h2 className="text-xl font-semibold mb-2 text-green-300">Upload Your Resume</h2>
              <p className="text-green-400/70 mb-6">
                Get an AI-powered analysis of your skills, experience, and career recommendations in seconds.
              </p>
              <FileUpload onFileSelect={handleFileSelect} disabled={isProcessing} fileName={state.file?.name} />
            </>
          )}

          <StatusIndicator status={state.status} error={state.error} />

          {status === 'success' && (
            <button
              onClick={() => dispatch({ type: 'RESET' })}
              className="w-full cursor-pointer bg-green-600 text-black font-bold py-3 px-4 rounded-lg hover:bg-green-500 transition-colors"
            >
              Analyze Another Resume
            </button>
          )}
        </div>

        <AnalysisResult analysis={analysis} />
      </div>
    </main>
  );
};

export default SkillsAssessment;