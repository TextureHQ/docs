import React from 'react';

interface StatusTagProps {
  supportLevel: string;
  variant?: 'badge' | 'text';
  className?: string;
}

export const StatusTag: React.FC<StatusTagProps> = ({ 
  supportLevel, 
  variant = 'text',
  className = '' 
}) => {
  const supportLevelText = {
    'production': 'Production Ready',
    'development': 'In Development', 
    'planned': 'Planned',
    'blocked': 'Blocked'
  };

  const supportLevelColors = {
    'production': '#065f46', // emerald-800
    'development': '#92400e', // amber-800
    'planned': '#5b21b6', // violet-800
    'blocked': '#991b1b' // red-800
  };

  const supportLevelBgColors = {
    'production': '#ecfdf5', // emerald-50
    'development': '#fffbeb', // amber-50
    'planned': '#f5f3ff', // violet-50
    'blocked': '#fef2f2' // red-50
  };

  const supportLevelEmojis = {
    'production': '',
    'development': '',
    'planned': '',
    'blocked': ''
  };

  const color = supportLevelColors[supportLevel as keyof typeof supportLevelColors] || '#6b7280';
  const bgColor = supportLevelBgColors[supportLevel as keyof typeof supportLevelBgColors] || 'transparent';
  const text = supportLevelText[supportLevel as keyof typeof supportLevelText] || supportLevel;
  const emoji = supportLevelEmojis[supportLevel as keyof typeof supportLevelEmojis] || '';

  if (variant === 'badge') {
    return (
      <span 
        className={`support-level-badge ${className}`}
        style={{
          backgroundColor: bgColor,
          color: color,
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '500'
        }}
      >
        {emoji} {text}
      </span>
    );
  }

  // Default text variant (for generated pages)
  return (
    <span 
      className={className}
      style={{ 
        fontWeight: '600', 
        color: color,
        fontSize: '14px'
      }}
    >
      {text}
    </span>
  );
};

export default StatusTag;
