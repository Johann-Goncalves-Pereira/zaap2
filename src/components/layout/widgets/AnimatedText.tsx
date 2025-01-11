import { component$, useStylesScoped$ } from "@builder.io/qwik";

interface AnimatedTextProps {
  text: string;
  speed: number;
}

export const AnimatedText = component$<AnimatedTextProps>(({ text, speed }) => {
  useStylesScoped$(
    `@keyframes fadeIn {to{ 
      opacity: 1; 
      transform: translateY(0);
      }}
    `
  );

  return (
    <>
      {Array.from(text).map((letter, index) => (
        <span
          key={`letter-${letter === " " ? "space" : letter}-${Math.random()
            .toString(36)
            .substring(2, 9)}`}
          style={{
            display: "inline-block",
            opacity: 0,
            transform: "translateY(1rem)",
            animation: `fadeIn 0.5s forwards ${index * speed}s`,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </>
  );
});
