import { useState } from 'react';

interface DescriptionProps {
    description: string;
    previewLength?: number;
}

const Description: React.FC<DescriptionProps> = ({ description, previewLength = 100 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const previewText = description.slice(0, previewLength) + (description.length > previewLength ? '...' : '');

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="mt-1">
            <p className="text-sm text-gray-600 text-justify">
                {isExpanded ?
                    description.split("\n").map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))
                    : previewText || "Description not set"}
            </p>
            {description.length > previewLength && (
                <button
                    onClick={toggleExpanded}
                    className="mt-2 text-teal-600 font-semibold text-xs md:text-xs hover:text-teal-800 focus:outline-none transition-colors"
                >
                    {isExpanded ? "View Less" : "View More"}
                </button>
            )}
        </div>
    );
};

export default Description;
