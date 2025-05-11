export default function Ingradient({ name, info, revealInfo, onAddIngredient }) {
  return (
    <div className="rounded-lg overflow-hidden shadow hover:shadow-xl w-48 h-64 flex flex-col transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
      <div className="h-[75%] overflow-hidden relative">
        <img
          src={`https://www.themealdb.com/images/ingredients/${name.replace(
            /\s+/g,
            "_"
          )}.png`}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 flex items-center justify-center">
          <img
            onClick={() => revealInfo(name, info)}
            src="/info.png"
            alt="info"
            className="w-8 h-8 cursor-pointer hover:opacity-100 transition-opacity duration-300 invert-[1]"
          />
        </div>
      </div>
      <div className="flex bg-white p-4 h-[25%] justify-center items-center">
        <h2 className="text-md font-bold text-gray-800 w-[70%]">{name}</h2>
        <button 
          onClick={() => onAddIngredient(name)}
          className="flex justify-center items-center text-white w-10 h-10 cursor-pointer 
                    bg-gradient-to-r from-blue-500 to-blue-600 rounded-full text-2xl font-bold
                    shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          aria-label="Add ingredient"
        >
          <img src="/add.png" alt="add" className="w-8 h-8 cursor-pointer hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </div>
  );
}
