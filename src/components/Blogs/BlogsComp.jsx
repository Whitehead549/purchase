import React from "react";
import BlogCard from "./BlogCard";
import Img1 from "../../assets/places/tajmahal.jpg";
import Img2 from "../../assets/places/water.jpg";
import Img3 from "../../assets/places/boat.jpg";

const BlogsData = [
  {
    id: 1,
    image: Img1,
    title: "Power Up Your Day and Night: Why Lithium Batteries Are Perfect for Home Solar Systems",
    description:
      "Thinking solar? Don't forget the battery! Lithium batteries store excess solar energy, letting you use it anytime, even at night. They're compact, powerful, and require minimal maintenance - perfect for your home or office. Embrace energy independence and a brighter future with solar and lithium!",
    author: "Engr Ade",
    date: "July 23, 2024",
  },
  {
    id: 2,
    image: Img2,
    title: "Sun Power, All Hours: Lithium Batteries for Homes & Businesses",
    description:
      "Solar panels capture the sun's energy, but what about cloudy days or nighttime? Lithium batteries for solar storage are the answer. These sleek, long-lasting batteries store extra solar power, ensuring you have clean energy whenever you need it. Invest in a sustainable future for your home or office with solar and lithium!",
    author: "Engr Ade",
    date: "July 19, 2024",
  },
  {
    id: 3,
    image: Img3,
    title: "Solar Panels Light Up Homes, Offices, and Hotels",
    description:
      "Imagine powering your entire building with clean, renewable energy! Solar panels are no longer just for eco-conscious homeowners. Businesses and hotels can significantly reduce their electricity bills and environmental impact with a rooftop solar panel system. These panels convert sunlight into usable electricity, powering lights, appliances, and HVAC systems.  Scalable to fit any size building, solar offers a sustainable future for offices, homes, and hotels – one sunbeam at a time.",
    author: "Engr Ade",
    date: "July 15, 2024",
  },
];

const BlogsComp = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 border-l-4 border-primary pl-4 text-3xl font-bold">
        Our Latest Blogs
      </h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
        {BlogsData.map((item) => (
          <BlogCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default BlogsComp;

