import type { TabOption } from '../../../shared/interfaces/TabOptions';
import s from './tabs.module.css';

interface TabsProps {
   options: TabOption[];
   activeOption: TabOption['value'];
   onChange: (selectedOption: TabOption['value']) => void;
   disabled?: boolean;
}

export const Tabs = ({
   options,
   onChange,
   activeOption,
   disabled = false,
}: TabsProps) => {
   return (
      <div className={s.container}>
         {options.map(({ label, value }, i) => (
            <button
               key={i}
               disabled={disabled}
               className={`${s.btn} ${activeOption === value && s.active}`}
               onClick={() => onChange(value)}
            >
               {label}
            </button>
         ))}

         <div
            style={{ left: activeOption == 'dlc' ? '50%' : 0 }}
            className={s.selector}
         />
      </div>
   )
}