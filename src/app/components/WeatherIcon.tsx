import { cn } from '@/lib/cn';
import Image from 'next/image';
import { HTMLProps } from 'react';

interface WeatherIconProps extends HTMLProps<HTMLDivElement> {
  iconName: string;
}

const WeatherIcon = ({ iconName, ...props }: WeatherIconProps) => {
  const iconUrl = `https://openweathermap.org/img/wn/${iconName}@4x.png`;

  return (
    <div
      {...props}
      title={iconName}
      className={cn('relative w-20 h-20', props.className)}
    >
      <Image
        alt={`${iconName} weather icon`} 
        src={iconUrl}
        fill
        className='object-cover'
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
        priority={false} 
        unoptimized={false}
      />
    </div>
  );
};

export default WeatherIcon;