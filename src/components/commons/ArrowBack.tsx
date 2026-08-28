import { useNavigate } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';

const ArrowBack = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="size-10 rounded-full bg-[#F0F0F5] flex items-center justify-center cursor-pointer"
      aria-label="Voltar"
    >
      <MoveLeft className="size-4" />
    </button>
  )
}

export default ArrowBack
