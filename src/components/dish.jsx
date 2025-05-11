import { useNavigate } from "react-router-dom";

export default function Dish({ image, name, id }) {
  const navigate = useNavigate();
  const viewInfo = () => {
    navigate(`/recipe/${id}`);
  };
  return (
    <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-xl w-64 h-52 flex flex-col transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
      <div className="h-[65%] overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" onClick={viewInfo} />
      </div>
      <div className="h-[35%] bg-white p-4 flex items-center">
        <h2 className="text-md font-bold text-gray-800 w-[80%]">{name}</h2>
        <img
          onClick={viewInfo}
          src="/recipe.png"
          alt=""
          className="w-12 h-12 cursor-pointer hover:invert-80 transition-all duration-300"
        />
      </div>
    </div>
  );
}
