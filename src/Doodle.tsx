
export type DoodleType =
  | "dog"
  | "cake"
  | "plane"
  | "star"
  | "smile"
  | "tree";

type DoodleProps = {
  type: DoodleType;
  className?: string;
};

export default function Doodle({
  type,
  className = "",
}: DoodleProps) {
  const drawings = {
    
    dog: (
    <>
        {/* Floppy ears */}
        <path d="M23 15 Q13 12 10 22 C7 32 12 36 18 34 Q20 29 20 25" />
        <path d="M41 15 Q51 12 54 22 C57 32 52 36 46 34 Q44 29 44 25" />

        {/* Head */}
        <path d="M22 17 Q32 12 42 17 C47 22 47 37 41 41 C36 45 28 45 23 41 C17 37 17 22 22 17 Z" />

        {/* Eyes */}
        <path d="M26 30 v1 M38 30 v1" />

        {/* Nose */}
        <path
        d="M29 36 Q32 35 35 36 Q33.5 39 32 39 Q30.5 39 29 36Z"
        fill="currentColor"
        stroke="none"
        />

        {/* Mouth */}
        <path
        d="M32 39 v2 M32 41 Q29 44 27.5 41 M32 41 Q35 44 36.5 41"
        strokeWidth="1.7"
        />

        {/* Sitting body */}
        <path d="M23 42 Q16 48 17 55 M41 42 Q48 48 47 55" />
        <path d="M17 55 Q16 59 24 59 L30 59 M34 59 L40 59 Q48 59 47 55" />

        {/* Front paws */}
        <path
        d="M29 47 L28 56 Q28 59 31 59 M35 47 L36 56 Q36 59 33 59"
        strokeWidth="2"
        />

        {/* Tail */}
        <path
        d="M47 53 Q55 49 55 43 Q55 39 52 40"
        strokeWidth="2.3"
        />
    </>
    ),


    cake: (
      <>
        {/* Candles */}
        <path d="M22 19 L22 29" />
        <path d="M32 17 L32 27" />
        <path d="M42 19 L42 29" />

        {/* Flames */}
        <path d="M22 15 Q18 11 22 7 Q26 12 22 15 Z" />
        <path d="M32 13 Q28 9 32 5 Q36 10 32 13 Z" />
        <path d="M42 15 Q38 11 42 7 Q46 12 42 15 Z" />

        {/* Cake body */}
        <path d="M12 31 Q32 24 52 31 L52 53 Q32 59 12 53 Z" />

        {/* Icing */}
        <path d="M12 32 Q17 39 22 33 Q28 40 33 33 Q39 40 44 33 Q49 39 52 31" />

        {/* Cake layers */}
        <path d="M13 45 Q32 50 51 45" />

        {/* Plate */}
        <path d="M8 56 Q32 61 56 56" />
      </>
    ),

    plane: (
    <>
        {/* Vertical tail */}
        <path d="M12 32 L8 16 Q8 14 11 15 L22 32" />

        {/* Far wing */}
        <path d="M31 32 L26 23 L34 23 L41 32" />

        {/* Fuselage facing right */}
        <path
        d="M10 32 C25 31 43 30 52 29 Q58 28 60 32 Q59 36 52 37 L10 37 Q6 36 10 32 Z"
        />

        {/* Main wing */}
        <path d="M34 35 L23 52 L31 52 L45 35" />
    </>
    ),



    star: (
      <>
        <path d="M32 8 L38 25 L56 27 L43 39 L47 56 L31 47 L16 56 L20 38 L8 27 L26 24 Z" />
        <path d="M51 10 L53 15" />
        <path d="M47 13 L56 12" />
      </>
    ),

    smile: (
      <>
        {/* Slightly uneven circle */}
        <path d="M53 31 C55 44 44 55 31 54 C18 54 9 43 10 30 C11 17 22 10 34 11 C46 12 53 21 53 31" />

        {/* Eyes */}
        <path d="M23 26 L24 29" />
        <path d="M40 25 L41 28" />

        {/* Smile */}
        <path d="M21 37 Q32 48 44 36" />

        {/* Cheeks */}
        <path d="M16 34 L19 35" />
        <path d="M45 34 L48 33" />
      </>
    ),

    tree: (
    <>
        {/* Star on top */}
        <path
        d="M32 5 L34.5 10 L40 11 L36 15 L37 20
            L32 17 L27 20 L28 15 L24 11 L29.5 10 Z"
        strokeWidth="1.8"
        />

        {/* Tree branches */}
        <path
        d="M32 19
            Q28 26 22 32
            Q26 34 29 32
            L17 43
            Q22 45 26 44
            L12 53
            Q32 57 52 53
            L38 44
            Q42 45 47 43
            L35 32
            Q38 34 42 32
            Q36 25 32 19 Z"
        />

        {/* Garland */}
        <path
        d="M25 36 Q32 41 39 36"
        strokeWidth="1.5"
        />
        <path
        d="M20 47 Q32 52 44 47"
        strokeWidth="1.5"
        />

        {/* Christmas ornaments */}
        <circle cx="32" cy="29" r="1.8" />
        <circle cx="24" cy="43" r="1.8" />
        <circle cx="40" cy="43" r="1.8" />
        <circle cx="33" cy="48" r="1.8" />

        {/* Tree trunk */}
        <path d="M28 55 L28 61 L36 61 L36 55" />
    </>
    ),

  };

  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {drawings[type]}
    </svg>
  );
}
