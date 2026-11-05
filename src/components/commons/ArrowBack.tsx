import { useNavigate } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';

import { cn } from '@/lib/utils';

type ArrowBackProps = {
  to?: string;
  label?: string;
  className?: string;
}

const ArrowBack = ({ to, label = "Voltar", className }: ArrowBackProps = {}) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => to ? navigate(to) : navigate(-1)}
      className={cn("flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#f0f0f5]", className)}
      aria-label={label}
    >
      <MoveLeft className="size-4.5 text-black" />
    </button>
  )
}

export default ArrowBack
