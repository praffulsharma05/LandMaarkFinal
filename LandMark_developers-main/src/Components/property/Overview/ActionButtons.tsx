import React from 'react';
import { Share2, Heart, HelpCircle } from 'lucide-react';

interface ActionButtonsProps {
  onShare?: () => void;
  onSave?: () => void;
  onAskDetails?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onShare, 
  onSave, 
  onAskDetails 
}) => {
  return (
    // <div className="flex gap-4 mt-1 pt-1  ">
    //   <button 
    //     style={{ background: '#e1def4' }} 
    //     onClick={onShare}
    //     className="flex items-center gap-2 px-6 py-3 rounded-lg transition hover:opacity-80"
    //   >
    //     <Share2 className="w-5 h-5 text-blue-700" />
    //     <span className="text-blue-700 font-medium">Share</span>
    //   </button>
    //   <button 
    //     style={{ background: '#e1def4' }} 
    //     onClick={onSave}
    //     className="flex items-center gap-2 px-6 py-3 rounded-lg transition hover:opacity-80"
    //   >
    //     <Heart className="w-5 h-5 text-blue-700" />
    //     <span className="text-blue-700 font-medium">Save</span>
    //   </button>
    //   <button 
    //     style={{ background: '#5e40e0' }} 
    //     onClick={onAskDetails}
    //     className="flex items-center gap-2 px-6 py-3 rounded-lg transition hover:bg-purple-700 ml-auto"
    //   >
    //     <HelpCircle className="w-5 h-5 text-white" />
    //     <span className="text-white font-medium">Ask For Details</span>
    //   </button> 
    // </div>
  <div className="flex gap-4 mt-10 pt-6  ">
  
  <button
    style={{ background: '#e1def4' }}
    className="flex-[.4] flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition hover:bg-gray-200"
  >
    <Share2 className="w-5 h-5 text-blue-700" />
    <span className="text-sm text-blue-700 font-medium whitespace-nowrap">
      Share
    </span>
  </button>

  <button
    style={{ background: '#e1def4' }}
    className="flex-[.4] flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition hover:bg-gray-200"
  >
    <Heart className="w-5 h-5 text-blue-700" />
    <span className="text-sm text-blue-700 font-medium whitespace-nowrap">
      Save
    </span>
  </button>

<button
  style={{ background: '#5e40e0' }}
  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition hover:bg-purple-700"
>
  <HelpCircle className="w-5 h-5 text-white" />
  <span className="text-sm text-white font-medium whitespace-nowrap">
    Ask Details
  </span>
</button>

</div>
  );
};

export default ActionButtons;