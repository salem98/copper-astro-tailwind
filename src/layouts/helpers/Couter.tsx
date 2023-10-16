import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Counter = ({ count, suffix }: { count: number; suffix: string }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <div ref={ref}>
      {inView && <CountUp className="js" end={+count} suffix={suffix} />}
    </div>
  );
};

export default Counter;
