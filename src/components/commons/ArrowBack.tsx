import { useNavigate } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';

type ArrowBackProps = {
  to?: string;
  label?: string;
}

const ArrowBack = ({ to, label = "Voltar" }: ArrowBackProps = {}) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => to ? navigate(to) : navigate(-1)}
      className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-[#f0f0f5]"
      aria-label={label}
    >
      <MoveLeft className="size-4.5 text-black" />
    </button>
  )
}

export default ArrowBack
