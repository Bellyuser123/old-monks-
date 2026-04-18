/**
 * Reusable UI Components Library
 * Common components for consistent design across the app
 */

'use client';

import React from 'react';

/* ===== BUTTONS ===== */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold transition-all rounded-lg disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} disabled={isLoading} {...props}>
      {isLoading ? '⏳' : children}
    </button>
  );
}

/* ===== CARDS ===== */

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export function Card({ children, className = '', onClick, hoverEffect = false }: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${
        hoverEffect ? 'hover:shadow-md hover:border-blue-500 transition-all cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

/* ===== ALERTS ===== */

interface AlertProps {
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  onClose?: () => void;
}

export function Alert({ type, title, message, onClose }: AlertProps) {
  const colors = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
  };

  const icons = {
    success: '✅',
    warning: '⚠️',
    error: '❌',
    info: 'ℹ️',
  };

  return (
    <div className={`border rounded-lg p-4 ${colors[type]} flex items-start justify-between`}>
      <div className="flex items-start gap-3">
        <span className="text-xl mt-0.5">{icons[type]}</span>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm mt-1">{message}</p>
        </div>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-xl hover:opacity-70">
          ✕
        </button>
      )}
    </div>
  );
}

/* ===== BADGE ===== */

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export function Badge({ children, variant = 'primary' }: BadgeProps) {
  const colors = {
    primary: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
    secondary: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
    success: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
    warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200',
    danger: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200',
  };

  return <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${colors[variant]}`}>{children}</span>;
}

/* ===== LOADING SPINNER ===== */

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

/* ===== PROGRESS BAR ===== */

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
}

export function ProgressBar({ value, max = 100, label }: ProgressBarProps) {
  const percentage = (value / max) * 100;

  return (
    <div>
      {label && <p className="text-sm font-semibold mb-2">{label}</p>}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${percentage}%` }}></div>
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{Math.round(percentage)}%</p>
    </div>
  );
}

/* ===== RISK INDICATOR ===== */

interface RiskIndicatorProps {
  level: 'LOW' | 'MEDIUM' | 'HIGH';
  score: number;
}

export function RiskIndicator({ level, score }: RiskIndicatorProps) {
  const colors = {
    LOW: 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    MEDIUM: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    HIGH: 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
  };

  const icons = {
    LOW: '✅',
    MEDIUM: '⚠️',
    HIGH: '🚨',
  };

  return (
    <div className={`border rounded-lg p-4 ${colors[level]} text-center`}>
      <div className="text-3xl mb-2">{icons[level]}</div>
      <h3 className="text-lg font-bold">{level} RISK</h3>
      <p className="text-2xl font-bold mt-1">{score}/100</p>
    </div>
  );
}

/* ===== TOOLTIP ===== */

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ children, content, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  const positions = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-block">
      <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
        {children}
      </div>
      {isVisible && (
        <div className={`absolute ${positions[position]} bg-gray-900 dark:bg-gray-700 text-white text-sm rounded px-3 py-2 whitespace-nowrap z-50`}>
          {content}
          <div className="absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 transform rotate-45" />
        </div>
      )}
    </div>
  );
}

/* ===== TABS ===== */

interface TabsProps {
  tabs: Array<{ label: string; content: React.ReactNode }>;
  defaultTab?: number;
}

export function Tabs({ tabs, defaultTab = 0 }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab);

  return (
    <div>
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 font-semibold border-b-2 transition-all ${
              activeTab === idx
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[activeTab].content}</div>
    </div>
  );
}

/* ===== MODAL ===== */

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  actions?: React.ReactNode;
}

export function Modal({ isOpen, title, children, onClose, actions }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-2xl hover:opacity-70">
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
        {actions && <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">{actions}</div>}
      </div>
    </div>
  );
}
