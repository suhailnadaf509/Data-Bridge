"use client"

import { useState } from "react"
import { categories, type Category } from "../data/localResources"
import CategoryList from "./CategoryList"
import LocationList from "./LocationList"

export default function LocalResources() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-100">Local Resources</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <CategoryList
            categories={categories}
            onSelectCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </div>
        <div className="md:col-span-2">
          {selectedCategory ? (
            <LocationList category={selectedCategory} />
          ) : (
            <p className="text-gray-400">Select a category to view locations</p>
          )}
        </div>
      </div>
    </div>
  )
}

