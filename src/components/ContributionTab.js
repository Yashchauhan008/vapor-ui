import React from 'react'

const ContributionTab = () => {

  const handleNewIssue = () => {
    window.location.href = "https://github.com/Yashchauhan008/vapor-ui/issues/new";
  };

  return (
    <div className="w-full mx-auto bg-gradient-to-b from-[#111] to-[#000] rounded-2xl p-8 border border-[#222] flex flex-col items-center text-center">
      <h2 className="text-white text-2xl font-semibold mb-6">
        Help us improve this component!
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        <button 
          onClick={handleNewIssue} 
          className="flex items-center gap-2 border border-[#333] rounded-xl px-6 py-3 text-cyan-400 hover:bg-[#111] hover:border-cyan-400 transition"
        >
          🐞 Report an issue
        </button>
      </div>
    </div>
  );
}

export default ContributionTab;
