import React from 'react';
import { Info, AlertTriangle, AlertOctagon, CheckCircle2, Bookmark } from 'lucide-react';
import { PostNotice } from '../types';

interface NoticeBoxProps {
  notice: PostNotice;
}

export const NoticeBox: React.FC<NoticeBoxProps> = ({ notice }) => {
  const getStyle = () => {
    switch (notice.type) {
      case 'info':
        return {
          container: 'bg-sky-50 border-sky-400 text-sky-900 dark:bg-sky-950/60 dark:border-sky-600 dark:text-sky-200',
          icon: <Info className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />,
          titleColor: 'text-sky-900 dark:text-sky-100'
        };
      case 'warning':
        return {
          container: 'bg-amber-50 border-amber-400 text-amber-900 dark:bg-amber-950/60 dark:border-amber-600 dark:text-amber-200',
          icon: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />,
          titleColor: 'text-amber-900 dark:text-amber-100'
        };
      case 'danger':
        return {
          container: 'bg-rose-50 border-rose-400 text-rose-900 dark:bg-rose-950/60 dark:border-rose-600 dark:text-rose-200',
          icon: <AlertOctagon className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />,
          titleColor: 'text-rose-900 dark:text-rose-100'
        };
      case 'success':
        return {
          container: 'bg-emerald-50 border-emerald-400 text-emerald-900 dark:bg-emerald-950/60 dark:border-emerald-600 dark:text-emerald-200',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />,
          titleColor: 'text-emerald-900 dark:text-emerald-100'
        };
      case 'primary':
      default:
        return {
          container: 'bg-teal-50 border-teal-500 text-teal-900 dark:bg-teal-950/60 dark:border-teal-600 dark:text-teal-200',
          icon: <Bookmark className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />,
          titleColor: 'text-teal-900 dark:text-teal-100'
        };
    }
  };

  const style = getStyle();

  return (
    <div className={`my-6 p-4 rounded-md border-l-4 shadow-xs flex items-start gap-3 transition-all ${style.container}`}>
      {style.icon}
      <div className="flex-1 text-sm leading-relaxed">
        {notice.title && (
          <h4 className={`font-semibold mb-1 ${style.titleColor}`}>
            {notice.title}
          </h4>
        )}
        <div>{notice.content}</div>
      </div>
    </div>
  );
};
