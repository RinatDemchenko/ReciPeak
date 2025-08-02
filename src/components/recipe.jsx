import React from "react";
export default function Recipe({
  name,
  image,
  ingredients,
  measures,
  instructions,
  source,
  tutorial,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-center flex-col md:flex-row gap-12">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {name}
          </h1>
          <img
            src={image}
            alt={name}
            className="w-full max-w-md h-auto rounded-lg shadow-md mb-8 object-cover"
          />
        </div>
        <div>
          <section className="w-full mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Ingredients
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
                >
                  <img
                    src={`https://www.themealdb.com/images/ingredients/${ingredient
                      .replace(/%20/g, " ")
                      .replace(/\s+/g, "_")}-small.png`}
                    alt={ingredient}
                    className="w-12 h-12 object-contain"
                    onError={(e) => (e.target.src = "/fallback-image.png")}
                  />
                  <div>
                    <span className="font-medium text-gray-800">
                      {ingredient}
                    </span>
                    {measures[index] && (
                      <span className="text-gray-600">
                        {" "}
                        ({measures[index]})
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <section className="w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Tutorial & Instructions
        </h2>
        <div className="flex flex-col items-center lg:flex-row gap-6">
          {/* Video tutorial */}
          {tutorial ? (
            <div className="w-full lg:w-1/2">
              <div className="relative w-full max-w-2xl mx-auto aspect-video">
                <iframe
                  src={tutorial.replace("watch?v=", "embed/")}
                  title={`Tutorial for ${name}`}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ) : (
            <div className="w-full lg:w-1/2 flex items-center justify-center text-gray-600">
              No tutorial available
            </div>
          )}

          {/* Cooking instructions */}
          <div className="w-full lg:w-1/2 max-h-[500px] overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100">
            <div className="flex flex-col items-center gap-4 p-4">
              {instructions
                .filter((step) => step.trim() !== "")
                .map((step, index) => (
                  <React.Fragment key={index}>
                    <div className="flex w-full max-w-[500px] h-[100px] bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="w-20 bg-indigo-100 flex items-center justify-center">
                        <span className="text-xl font-bold text-indigo-400">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex items-center flex-1 p-4 text-gray-700 text-base leading-relaxed overflow-y-auto">
                        {step.trim()}
                      </div>
                    </div>
                    {index < instructions.length - 2 && (
                      <div className="h-10 border-l-3 border-indigo-400 border-dashed"></div>
                    )}
                  </React.Fragment>
                ))}
            </div>
          </div>
        </div>

        {source && (
          <div className="mt-8 text-center">
            <a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View full recipe source
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
