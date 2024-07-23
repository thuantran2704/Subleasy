import React, { useState } from 'react';

let showPopupExternally;

const AnnouncementPopup = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [eventName, setEventName] = useState('');
    const [content, setContent] = useState('');

    const showPopup = (event_name, content) => {
        setEventName(event_name);
        setContent(content);
        setIsPopupVisible(true);
    };

    showPopupExternally = showPopup;

    const hidePopup = () => {
        setIsPopupVisible(false);
    };

    return (
        <div>
            {isPopupVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-800 p-6 rounded text-center">
                        <h2 className="text-2xl text-[#CB2A2D] mb-4">{eventName}</h2>
                        <p className="text-white mb-6">{content}</p>
                        <button 
                            onClick={hidePopup} 
                            className="px-4 py-2 bg-[#CB2A2D] text-white rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export const announced = (event_name, content) => {
    if (showPopupExternally) {
        showPopupExternally(event_name, content);
    }
};

export default AnnouncementPopup;
