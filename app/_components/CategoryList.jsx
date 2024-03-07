import Image from "next/image";
import Link from "next/link";
import React from "react";

function CategoryList({ categoryList }) {
  return (
    <div
      className="mx-4 md:mx-22 lg:mx-52 grid grid-cols-3
          md:grid-cols-4 lg:grid-cols-6 gap-4"
    >
      {categoryList.length > 0 ? (
        categoryList.map((category) => (
          <Link
            href={`/search/${category.name}`}
            key={category.id}
            className={`flex flex-col items-center justify-center gap-2 bg-purple-50 p-5 rounded-lg hover:scale-110 transition-all ease-in-out cursor-pointer`}
          >
            <Image
              src={category.icon.url}
              alt={category.name}
              width={35}
              height={35}
            />
            <h2 className="text-primary">{category.name}</h2>
          </Link>
        ))
      ) : (
        <>
          {/* display 6 empty boxes */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-[120px] w-full bg-slate-200 animate-pulse rounded-lg"
            ></div>
          ))}
        </>
      )}
    </div>
  );
}

export default CategoryList;
