import React, { useState } from 'react';
import { useTheme } from '../contexts/Theme';
import bgVideo from '../assets/bganime3.mp4';

const SkillsAssessment = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const { themeMode } = useTheme();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setUploadStatus('');
    } else {
      setUploadStatus('Please upload a PDF file');
      setFile(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadStatus('Please select a file first');
      return;
    }
    setUploadStatus('Resume uploaded successfully!');
  };

  return (
    <main className="relative min-h-screen overflow-hidden w-full font-sans text-white">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30 -z-10"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Foreground Content */}
      <div className="relative z-10 p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Skills Assessment</h1>
        
        <div className="bg-black/30 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold mb-4">Upload Your Resume</h2>
          <p className="text-gray-300 mb-6">
            Upload your resume to get a detailed analysis of your skills and career recommendations.
          </p>

          <form onSubmit={handleUpload} className="space-y-4">
            {/* File Upload Box */}
            <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="mt-2 text-gray-300">
                  {file ? file.name : 'Click to upload your resume (PDF)'}
                </span>
              </label>
            </div>

            {/* Upload Status */}
            {uploadStatus && (
              <div
                className={`text-sm ${
                  uploadStatus.includes('success')
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
              >
                {uploadStatus}
              </div>
            )}

            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={!file}
            >
              Upload and Analyze
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SkillsAssessment;
