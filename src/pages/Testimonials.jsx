import React from "react";
import "./Testimonials.css";

const testimonials = [
  {
    quote: "The personalized workout plans helped me finally stay consistent. I love tracking my progress and seeing real results!",
    name: "Alex Kim",
    designation: "Fitness App Member",
    src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=400&q=80&facepad=2.5",
  },
  {
    quote: "Having access to certified trainers and a supportive community keeps me motivated every day. The app is so easy to use!",
    name: "Priya Singh",
    designation: "Community Member",
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=400&q=80&facepad=2.5",
  },
  {
    quote: "Meal tracking and nutrition tips have made a huge difference in my energy levels. I feel healthier than ever!",
    name: "Jordan Lee",
    designation: "Nutrition Enthusiast",
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=400&q=80&facepad=2.5",
  },
  {
    quote: "The progress charts and daily reminders keep me accountable. I’ve never felt more empowered on my fitness journey.",
    name: "Samantha Rivera",
    designation: "Progress Tracker",
    src: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&q=80&facepad=2.5",
  },
  {
    quote: "Joining group challenges is so much fun! Competing with friends pushes me to reach my goals.",
    name: "Chris Evans",
    designation: "Challenge Champion",
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&w=400&q=80&facepad=2.5",
  },
];

const Testimonials = () => {
  // Repeat testimonials to create a seamless marquee effect
  const marqueeTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="testimonial-slider-marquee">
      <div className="testimonial-slider-track">
        {marqueeTestimonials.map((t, i) => (
          <div className="testimonial-card" key={i}>
            <img src={t.src} alt={t.name} />
            <div className="testimonial-name">{t.name}</div>
            <div className="testimonial-designation">{t.designation}</div>
            <div className="testimonial-quote">{t.quote}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
