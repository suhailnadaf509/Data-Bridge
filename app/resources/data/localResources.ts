export interface Review {
    id: string
    user: string
    rating: number
    comment: string
    date: string
  }
  
  export interface Location {
    id: string
    name: string
    address: string
    phone: string
    rating: number
    reviews: Review[]
  }
  
  export interface Category {
    id: string
    name: string
    locations: Location[]
  }
  
  export const categories: Category[] = [
    {
      id: "restaurants",
      name: "Restaurants",
      locations: [
        {
          id: "rest1",
          name: "The Local Diner",
          address: "123 Main St, Anytown, USA",
          phone: "(555) 123-4567",
          rating: 4.5,
          reviews: [
            {
              id: "rev1",
              user: "John D.",
              rating: 5,
              comment: "Great food and atmosphere!",
              date: "2023-05-15",
            },
            {
              id: "rev2",
              user: "Sarah M.",
              rating: 4,
              comment: "Delicious meals but can be a bit noisy.",
              date: "2023-05-10",
            },
          ],
        },
        {
          id: "rest2",
          name: "Pasta Palace",
          address: "456 Elm St, Anytown, USA",
          phone: "(555) 987-6543",
          rating: 4.2,
          reviews: [
            {
              id: "rev3",
              user: "Mike R.",
              rating: 4,
              comment: "Authentic Italian cuisine.",
              date: "2023-05-12",
            },
          ],
        },
      ],
    },
    {
      id: "generalStores",
      name: "General Stores",
      locations: [
        {
          id: "store1",
          name: "Corner Market",
          address: "789 Oak Ave, Anytown, USA",
          phone: "(555) 246-8135",
          rating: 4.0,
          reviews: [
            {
              id: "rev4",
              user: "Emily L.",
              rating: 4,
              comment: "Great selection of local products.",
              date: "2023-05-14",
            },
          ],
        },
        {
          id: "store2",
          name: "Main Street Goods",
          address: "321 Pine Rd, Anytown, USA",
          phone: "(555) 369-2580",
          rating: 3.8,
          reviews: [],
        },
      ],
    },
  ]
  
  