import type { Category } from "../data/LocalResources"

interface CategoryListProps {
  categories: Category[]
  onSelectCategory: (category: Category) => void
  selectedCategory: Category | null
}

export default function CategoryList({ categories, onSelectCategory, selectedCategory }: CategoryListProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => onSelectCategory(category)}
              className={`w-full text-left px-4 py-2 rounded ${
                selectedCategory?.id === category.id
                  ? "bg-accent text-white"
                  : "bg-dark-gray text-gray-300 hover:bg-light-gray"
              }`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

