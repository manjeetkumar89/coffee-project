import React, { createContext, useContext, useState } from 'react';
import coldBrew1 from '../assets/productImages/coldBrew1.webp'
import coldBrew2 from '../assets/productImages/coldBrew2.webp'
import coldBrew3 from '../assets/productImages/coldBrew3.webp'
import matcha1 from '../assets/productImages/matcha1.webp'
import matcha2 from '../assets/productImages/matcha2.webp'
import matcha3 from '../assets/productImages/matcha3.webp'
import coffeebeans1 from '../assets/productImages/coffeebeans1.webp'
import coffeebeans2 from '../assets/productImages/coffeebeans2.webp'
import coffeebeans3 from '../assets/productImages/coffeebeans3.webp'
import emma from '../assets/productImages/emma.avif'
// Example users
const initialUsers = [
  {
    id: 1,
    name: 'Emma Chamberlain',
    avatar: emma,
    profile: 'Coffee enthusiast, founder of Chamberlain Coffee.',
    rating: 4.9,
    reviews: [
      { productId: 1, text: 'Absolutely love the espresso blend!', rating: 5 },
      { productId: 2, text: 'The vanilla flavor is so smooth.', rating: 4.5 },
    ],
    testimonials: [
      'Chamberlain Coffee changed my mornings!',
      'Best coffee I have ever tasted.'
    ]
  },
  {
    id: 2,
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    profile: 'Avid traveler and coffee reviewer.',
    rating: 4.7,
    reviews: [
      { productId: 1, text: 'Rich and bold flavor, highly recommend.', rating: 4.8 },
      { productId: 3, text: 'Great for cold brew!', rating: 4.6 },
    ],
    testimonials: [
      'I always start my day with Chamberlain Coffee.',
    ]
  },
  {
    id: 3,
    name: 'Sophia Lee',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    profile: 'Barista and latte artist.',
    rating: 4.8,
    reviews: [
      { productId: 2, text: 'Vanilla Coffee is my go-to for a sweet treat.', rating: 4.7 },
      { productId: 3, text: 'Cold Brew Blend is so refreshing!', rating: 4.8 },
    ],
    testimonials: [
      'The best beans for latte art!',
    ]
  },
  {
    id: 4,
    name: 'Carlos Ramirez',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    profile: 'Coffee blogger and world explorer.',
    rating: 4.6,
    reviews: [
      { productId: 1, text: 'Espresso Blend gives me the energy I need.', rating: 4.6 },
    ],
    testimonials: [
      'A must-try for any coffee lover.',
    ]
  },
  {
    id: 5,
    name: 'Priya Patel',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    profile: 'Home brewer and coffee experimenter.',
    rating: 4.9,
    reviews: [
      { productId: 3, text: 'Cold Brew Blend is perfect for summer.', rating: 5 },
    ],
    testimonials: [
      'I love experimenting with Chamberlain Coffee blends!',
    ]
  },
  {
    id: 6,
    name: 'Liam Smith',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    profile: 'Espresso aficionado.',
    rating: 4.7,
    reviews: [
      { productId: 1, text: 'Espresso Blend is bold and smooth.', rating: 4.7 },
    ],
    testimonials: [
      'Never start my day without it.',
    ]
  },
  {
    id: 7,
    name: 'Mia Chen',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    profile: 'Coffee shop owner.',
    rating: 4.8,
    reviews: [
      { productId: 2, text: 'Vanilla Coffee is a customer favorite.', rating: 4.8 },
    ],
    testimonials: [
      'My customers rave about these blends!',
    ]
  },
  {
    id: 8,
    name: 'Noah Kim',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
    profile: 'Student and coffee lover.',
    rating: 4.5,
    reviews: [
      { productId: 3, text: 'Cold Brew Blend keeps me going during exams.', rating: 4.5 },
    ],
    testimonials: [
      'Affordable and delicious.',
    ]
  },
  {
    id: 9,
    name: 'Ava Müller',
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
    profile: 'Freelance designer and remote worker.',
    rating: 4.9,
    reviews: [
      { productId: 1, text: 'Espresso Blend is my creative fuel.', rating: 5 },
      { productId: 2, text: 'Vanilla Coffee is a nice afternoon treat.', rating: 4.6 },
    ],
    testimonials: [
      'Chamberlain Coffee is my work-from-home essential.',
    ]
  },
];

// Example products
const initialProducts = [
  {
    id: 1,
    name: 'Espresso Blend',
    description: 'Our Espresso Blend is a masterful combination of premium Arabica beans, roasted to perfection for a bold and rich flavor profile. Experience deep notes of chocolate and caramel, balanced by a subtle hint of fruitiness that lingers on the palate. This blend is crafted for espresso lovers who appreciate a smooth, full-bodied cup with a velvety crema. Perfect for both straight shots and milk-based drinks, it delivers a café-quality experience at home.',
    rating: 4.8,
    image: coffeebeans3,
    category: 'coffee beans',
    bestseller: true,
    price: 16.99,
    originalPrice: 21.99,
    offer: 'Save 23% + Free Shipping',
    reviews: [
      { userId: 1, name: 'Emma Chamberlain', profile: 'Coffee enthusiast, founder of Chamberlain Coffee.', text: 'Absolutely love the espresso blend!', rating: 5 },
      { userId: 2, name: 'John Doe', profile: 'Avid traveler and coffee reviewer.', text: 'Rich and bold flavor, highly recommend.', rating: 4.8 },
      { userId: 3, name: 'Sophia Lee', profile: 'Barista and latte artist.', text: 'Perfect for my morning espresso shots!', rating: 4.9 },
      { userId: 4, name: 'Carlos Ramirez', profile: 'Coffee blogger and world explorer.', text: 'Espresso Blend gives me the energy I need.', rating: 4.6 },
      { userId: 5, name: 'Priya Patel', profile: 'Home brewer and coffee experimenter.', text: 'Smooth and bold, just how I like it.', rating: 5 },
      { userId: 6, name: 'Liam Smith', profile: 'Espresso aficionado.', text: 'Espresso Blend is bold and smooth.', rating: 4.7 },
      { userId: 9, name: 'Ava Müller', profile: 'Freelance designer and remote worker.', text: 'Espresso Blend is my creative fuel.', rating: 5 },
      { userId: 7, name: 'Mia Chen', profile: 'Coffee shop owner.', text: 'A favorite among my customers.', rating: 4.8 },
      { userId: 8, name: 'Noah Kim', profile: 'Student and coffee lover.', text: 'Keeps me awake for late-night study sessions.', rating: 4.5 }
    ]
  },
  {
    id: 2,
    name: 'Vanilla Coffee',
    description: 'Indulge in the smooth, aromatic delight of our Vanilla Coffee, crafted with carefully selected beans and natural vanilla essence. Each cup offers a sweet, creamy start to your day, with a lingering vanilla finish that soothes the senses. This blend is perfect for those who crave a gentle, flavorful coffee experience, whether enjoyed black or with your favorite creamer. Treat yourself to a comforting and uplifting brew every morning.',
    rating: 4.5,
    image: coffeebeans2,
    category: 'coffee beans',
    bestseller: false,
    price: 14.99,
    originalPrice: 18.99,
    offer: '21% Off',
    reviews: [
      { userId: 1, name: 'Emma Chamberlain', profile: 'Coffee enthusiast, founder of Chamberlain Coffee.', text: 'The vanilla flavor is so smooth.', rating: 4.5 },
      { userId: 3, name: 'Sophia Lee', profile: 'Barista and latte artist.', text: 'Vanilla Coffee is my go-to for a sweet treat.', rating: 4.7 },
      { userId: 7, name: 'Mia Chen', profile: 'Coffee shop owner.', text: 'Vanilla Coffee is a customer favorite.', rating: 4.8 },
      { userId: 9, name: 'Ava Müller', profile: 'Freelance designer and remote worker.', text: 'Vanilla Coffee is a nice afternoon treat.', rating: 4.6 },
      { userId: 2, name: 'John Doe', profile: 'Avid traveler and coffee reviewer.', text: 'A sweet and smooth start to my day.', rating: 4.6 },
      { userId: 5, name: 'Priya Patel', profile: 'Home brewer and coffee experimenter.', text: 'Love the vanilla aroma!', rating: 4.9 },
      { userId: 4, name: 'Carlos Ramirez', profile: 'Coffee blogger and world explorer.', text: 'Great for making vanilla lattes.', rating: 4.7 },
      { userId: 6, name: 'Liam Smith', profile: 'Espresso aficionado.', text: 'A nice change from my usual espresso.', rating: 4.4 },
      { userId: 8, name: 'Noah Kim', profile: 'Student and coffee lover.', text: 'Perfect for a sweet study break.', rating: 4.5 }
    ]
  },
  {
    id: 3,
    name: 'House Blend',
    description: 'Our House Blend is a harmonious mix of beans from renowned coffee regions, designed for everyday enjoyment. It features a balanced body, mild acidity, and a smooth finish, making it a versatile choice for any brewing method. Expect subtle notes of nuts and cocoa, complemented by a gentle sweetness. This approachable blend is ideal for both new coffee drinkers and seasoned aficionados alike.',
    rating: 4.7,
    image: coffeebeans1,
    category: 'coffee beans',
    bestseller: false,
    price: 13.99,
    originalPrice: 15.99,
    offer: 'Limited Time: 12% Off',
    reviews: [
      { userId: 2, name: 'John Doe', profile: 'Avid traveler and coffee reviewer.', text: 'Great for cold brew!', rating: 4.6 },
      { userId: 5, name: 'Priya Patel', profile: 'Home brewer and coffee experimenter.', text: 'Cold Brew Blend is perfect for summer.', rating: 5 },
      { userId: 3, name: 'Sophia Lee', profile: 'Barista and latte artist.', text: 'Smooth and balanced, great for lattes.', rating: 4.8 },
      { userId: 1, name: 'Emma Chamberlain', profile: 'Coffee enthusiast, founder of Chamberlain Coffee.', text: 'A great everyday blend.', rating: 4.7 },
      { userId: 4, name: 'Carlos Ramirez', profile: 'Coffee blogger and world explorer.', text: 'Perfect for my morning routine.', rating: 4.7 },
      { userId: 6, name: 'Liam Smith', profile: 'Espresso aficionado.', text: 'Enjoyable as a drip coffee.', rating: 4.6 },
      { userId: 7, name: 'Mia Chen', profile: 'Coffee shop owner.', text: 'My customers love the House Blend.', rating: 4.8 },
      { userId: 8, name: 'Noah Kim', profile: 'Student and coffee lover.', text: 'Affordable and delicious.', rating: 4.5 },
      { userId: 9, name: 'Ava Müller', profile: 'Freelance designer and remote worker.', text: 'A nice pick-me-up during work.', rating: 4.9 }
    ]
  },
  {
    id: 4,
    name: 'Cold Brew Blend',
    description: 'Specially crafted for cold brew enthusiasts, this blend delivers a refreshing, crisp cup with low acidity and a naturally sweet finish. The beans are roasted to bring out chocolate and caramel undertones, resulting in a smooth, invigorating drink that’s perfect over ice. Enjoy a revitalizing cold brew that keeps you cool and energized throughout the day.',
    rating: 4.6,
    image: coldBrew1,
    category: 'cold brew',
    bestseller: true,
    price: 17.99,
    originalPrice: 22.99,
    offer: 'Save 22% + Free Mug',
    reviews: [
      { userId: 2, name: 'John Doe', profile: 'Avid traveler and coffee reviewer.', text: 'Great for cold brew!', rating: 4.6 },
      { userId: 5, name: 'Priya Patel', profile: 'Home brewer and coffee experimenter.', text: 'Cold Brew Blend is perfect for summer.', rating: 5 },
      { userId: 3, name: 'Sophia Lee', profile: 'Barista and latte artist.', text: 'So refreshing and smooth.', rating: 4.8 },
      { userId: 1, name: 'Emma Chamberlain', profile: 'Coffee enthusiast, founder of Chamberlain Coffee.', text: 'My favorite for iced coffee.', rating: 4.7 },
      { userId: 4, name: 'Carlos Ramirez', profile: 'Coffee blogger and world explorer.', text: 'A must-try for any coffee lover.', rating: 4.6 },
      { userId: 6, name: 'Liam Smith', profile: 'Espresso aficionado.', text: 'Great for making cold brew at home.', rating: 4.7 },
      { userId: 7, name: 'Mia Chen', profile: 'Coffee shop owner.', text: 'Popular with my customers.', rating: 4.8 },
      { userId: 8, name: 'Noah Kim', profile: 'Student and coffee lover.', text: 'Keeps me going during exams.', rating: 4.5 },
      { userId: 9, name: 'Ava Müller', profile: 'Freelance designer and remote worker.', text: 'Refreshing and energizing.', rating: 4.9 }
    ]
  },
  {
    id: 5,
    name: 'Classic Cold Brew',
    description: 'Our Classic Cold Brew is smooth, bold, and never bitter, making it the ultimate summer refreshment. Carefully selected beans are slow-steeped to extract maximum flavor, resulting in a rich, full-bodied brew with chocolatey undertones. Pour it over ice for a cooling treat or mix with milk for a creamy delight.',
    rating: 4.7,
    image: coldBrew2,
    category: 'cold brew',
    bestseller: false,
    price: 15.99,
    originalPrice: 19.99,
    offer: '20% Off',
    reviews: [
      { userId: 2, name: 'John Doe', profile: 'Avid traveler and coffee reviewer.', text: 'Classic Cold Brew is my go-to for hot days.', rating: 4.7 },
      { userId: 5, name: 'Priya Patel', profile: 'Home brewer and coffee experimenter.', text: 'Smooth and bold, just how I like it.', rating: 5 },
      { userId: 3, name: 'Sophia Lee', profile: 'Barista and latte artist.', text: 'Great for making coffee cocktails.', rating: 4.8 },
      { userId: 1, name: 'Emma Chamberlain', profile: 'Coffee enthusiast, founder of Chamberlain Coffee.', text: 'Perfect over ice.', rating: 4.7 },
      { userId: 4, name: 'Carlos Ramirez', profile: 'Coffee blogger and world explorer.', text: 'Never bitter, always smooth.', rating: 4.7 },
      { userId: 6, name: 'Liam Smith', profile: 'Espresso aficionado.', text: 'Enjoyable as a cold brew concentrate.', rating: 4.6 },
      { userId: 7, name: 'Mia Chen', profile: 'Coffee shop owner.', text: 'A hit in my shop.', rating: 4.8 },
      { userId: 8, name: 'Noah Kim', profile: 'Student and coffee lover.', text: 'Great for summer study sessions.', rating: 4.5 },
      { userId: 9, name: 'Ava Müller', profile: 'Freelance designer and remote worker.', text: 'My favorite cold brew.', rating: 4.9 }
    ]
  },
  {
    id: 6,
    name: 'Vanilla Cold Brew',
    description: 'Enjoy the best of both worlds with our Vanilla Cold Brew, where smooth coffee meets a hint of natural vanilla sweetness. This blend is crafted for a refreshing, subtly sweet experience that’s perfect for hot afternoons. Each sip is cool, invigorating, and leaves a pleasant vanilla aftertaste.',
    rating: 4.5,
    image: coldBrew3,
    category: 'cold brew',
    bestseller: false,
    price: 16.49,
    originalPrice: 20.49,
    offer: 'Save 20%',
    reviews: [
      { userId: 2, name: 'John Doe', profile: 'Avid traveler and coffee reviewer.', text: 'Vanilla Cold Brew is a treat.', rating: 4.6 },
      { userId: 5, name: 'Priya Patel', profile: 'Home brewer and coffee experimenter.', text: 'Love the vanilla twist!', rating: 5 },
      { userId: 3, name: 'Sophia Lee', profile: 'Barista and latte artist.', text: 'Great for summer drinks.', rating: 4.8 },
      { userId: 1, name: 'Emma Chamberlain', profile: 'Coffee enthusiast, founder of Chamberlain Coffee.', text: 'A sweet and refreshing cold brew.', rating: 4.7 },
      { userId: 4, name: 'Carlos Ramirez', profile: 'Coffee blogger and world explorer.', text: 'Perfect for hot afternoons.', rating: 4.7 },
      { userId: 6, name: 'Liam Smith', profile: 'Espresso aficionado.', text: 'A nice change from classic cold brew.', rating: 4.6 },
      { userId: 7, name: 'Mia Chen', profile: 'Coffee shop owner.', text: 'My customers love the vanilla cold brew.', rating: 4.8 },
      { userId: 8, name: 'Noah Kim', profile: 'Student and coffee lover.', text: 'Great for a quick pick-me-up.', rating: 4.5 },
      { userId: 9, name: 'Ava Müller', profile: 'Freelance designer and remote worker.', text: 'Vanilla Cold Brew is my favorite.', rating: 4.9 }
    ]
  },
  {
    id: 7,
    name: 'Ceremonial Matcha',
    description: 'Our Ceremonial Matcha is sourced from the finest Japanese tea gardens, offering a vibrant green color and earthy, umami-rich flavor. Whisked to a frothy perfection, it delivers a smooth, creamy texture and a gentle, sustained energy boost. Ideal for traditional tea ceremonies or modern matcha lattes.',
    rating: 4.9,
    image: matcha1,
    category: 'matcha',
    bestseller: true,
    price: 24.99,
    originalPrice: 29.99,
    offer: '17% Off + Free Whisk',
    reviews: [
      { userId: 2, name: 'John Doe', profile: 'Avid traveler and coffee reviewer.', text: 'Ceremonial Matcha is so vibrant.', rating: 4.9 },
      { userId: 5, name: 'Priya Patel', profile: 'Home brewer and coffee experimenter.', text: 'Love the earthy flavor.', rating: 5 },
      { userId: 3, name: 'Sophia Lee', profile: 'Barista and latte artist.', text: 'Perfect for matcha lattes.', rating: 4.9 },
      { userId: 1, name: 'Emma Chamberlain', profile: 'Coffee enthusiast, founder of Chamberlain Coffee.', text: 'A premium matcha experience.', rating: 4.9 },
      { userId: 4, name: 'Carlos Ramirez', profile: 'Coffee blogger and world explorer.', text: 'Great for my morning routine.', rating: 4.8 },
      { userId: 6, name: 'Liam Smith', profile: 'Espresso aficionado.', text: 'A nice change from coffee.', rating: 4.8 },
      { userId: 7, name: 'Mia Chen', profile: 'Coffee shop owner.', text: 'My customers love the ceremonial matcha.', rating: 4.9 },
      { userId: 8, name: 'Noah Kim', profile: 'Student and coffee lover.', text: 'Keeps me focused during study sessions.', rating: 4.8 },
      { userId: 9, name: 'Ava Müller', profile: 'Freelance designer and remote worker.', text: 'A vibrant and energizing matcha.', rating: 4.9 }
    ]
  },
  {
    id: 8,
    name: 'Vanilla Matcha',
    description: 'Vanilla Matcha combines premium Japanese matcha with a touch of natural vanilla for a creamy, aromatic cup. The result is a harmonious blend of earthy and sweet notes, perfect for those who enjoy a twist on the classic matcha experience. Enjoy it hot or iced for a refreshing treat.',
    rating: 4.6,
    image: matcha2,
    category: 'matcha',
    bestseller: false,
    price: 22.99,
    originalPrice: 26.99,
    offer: '15% Off',
    reviews: [
      { userId: 2, name: 'John Doe', profile: 'Avid traveler and coffee reviewer.', text: 'Vanilla Matcha is so creamy.', rating: 4.7 },
      { userId: 5, name: 'Priya Patel', profile: 'Home brewer and coffee experimenter.', text: 'Love the vanilla twist!', rating: 4.8 },
      { userId: 3, name: 'Sophia Lee', profile: 'Barista and latte artist.', text: 'Great for iced matcha lattes.', rating: 4.7 },
      { userId: 1, name: 'Emma Chamberlain', profile: 'Coffee enthusiast, founder of Chamberlain Coffee.', text: 'A creamy and delicious matcha.', rating: 4.7 },
      { userId: 4, name: 'Carlos Ramirez', profile: 'Coffee blogger and world explorer.', text: 'Perfect for a relaxing afternoon.', rating: 4.7 },
      { userId: 6, name: 'Liam Smith', profile: 'Espresso aficionado.', text: 'A nice change from coffee.', rating: 4.6 },
      { userId: 7, name: 'Mia Chen', profile: 'Coffee shop owner.', text: 'My customers love the vanilla matcha.', rating: 4.8 },
      { userId: 8, name: 'Noah Kim', profile: 'Student and coffee lover.', text: 'Great for a quick pick-me-up.', rating: 4.6 },
      { userId: 9, name: 'Ava Müller', profile: 'Freelance designer and remote worker.', text: 'Vanilla Matcha is my favorite.', rating: 4.8 }
    ]
  },
  {
    id: 9,
    name: 'Iced Matcha Latte',
    description: 'Our Iced Matcha Latte is a refreshing blend of high-quality matcha and a hint of sweetness, served over ice for the ultimate cool-down. The creamy texture and balanced flavor make it a favorite for warm days or whenever you need a revitalizing pick-me-up. Lightly sweetened and perfectly smooth, it’s a modern take on a traditional favorite.',
    rating: 4.7,
    image: matcha3,
    category: 'matcha',
    bestseller: false,
    price: 19.99,
    originalPrice: 23.99,
    offer: 'Save 17%',
    reviews: [
      { userId: 2, name: 'John Doe', profile: 'Avid traveler and coffee reviewer.', text: 'Iced Matcha Latte is so refreshing.', rating: 4.7 },
      { userId: 5, name: 'Priya Patel', profile: 'Home brewer and coffee experimenter.', text: 'Love the light sweetness.', rating: 4.8 },
      { userId: 3, name: 'Sophia Lee', profile: 'Barista and latte artist.', text: 'Perfect for summer days.', rating: 4.7 },
      { userId: 1, name: 'Emma Chamberlain', profile: 'Coffee enthusiast, founder of Chamberlain Coffee.', text: 'A refreshing treat.', rating: 4.7 },
      { userId: 4, name: 'Carlos Ramirez', profile: 'Coffee blogger and world explorer.', text: 'Great for a quick break.', rating: 4.7 },
      { userId: 6, name: 'Liam Smith', profile: 'Espresso aficionado.', text: 'A nice change from coffee.', rating: 4.6 },
      { userId: 7, name: 'Mia Chen', profile: 'Coffee shop owner.', text: 'My customers love the iced matcha latte.', rating: 4.8 },
      { userId: 8, name: 'Noah Kim', profile: 'Student and coffee lover.', text: 'Keeps me cool during study sessions.', rating: 4.6 },
      { userId: 9, name: 'Ava Müller', profile: 'Freelance designer and remote worker.', text: 'Iced Matcha Latte is my favorite.', rating: 4.8 }
    ]
  },
];

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState(initialUsers);
  const [products, setProducts] = useState(initialProducts);

  return (
    <DataContext.Provider value={{ users, setUsers, products, setProducts }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext); 