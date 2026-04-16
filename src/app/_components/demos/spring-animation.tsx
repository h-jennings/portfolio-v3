'use client';

import { css } from 'ds/css';
import { motion, useSpring } from 'motion/react';
import { useState } from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

function Slider({ label, value, min, max, step, onChange }: SliderProps) {
  return (
    <label className={sliderLabel}>
      <span className={sliderLabelText}>
        {label}: <strong>{value}</strong>
      </span>
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={sliderInput}
      />
    </label>
  );
}

export function SpringAnimation() {
  const [stiffness, setStiffness] = useState(200);
  const [damping, setDamping] = useState(10);
  const [mass, setMass] = useState(1);

  const spring = useSpring(0, { stiffness, damping, mass });

  const trigger = () => {
    spring.set(spring.get() === 0 ? 200 : 0);
  };

  return (
    <div className={container}>
      <div className={track}>
        <motion.div className={ball} style={{ x: spring }} />
      </div>
      <div className={controls}>
        <Slider
          label='Stiffness'
          value={stiffness}
          min={50}
          max={1000}
          step={10}
          onChange={setStiffness}
        />
        <Slider
          label='Damping'
          value={damping}
          min={1}
          max={100}
          step={1}
          onChange={setDamping}
        />
        <Slider
          label='Mass'
          value={mass}
          min={0.1}
          max={10}
          step={0.1}
          onChange={setMass}
        />
        <button onClick={trigger} className={triggerButton}>
          Trigger
        </button>
      </div>
    </div>
  );
}

const container = css({
  display: 'flex',
  flexDir: 'column',
  gap: 'm',
  w: 'full',
});

const track = css({
  h: '80px',
  w: 'full',
  display: 'flex',
  alignItems: 'center',
  px: 's',
});

const ball = css({
  w: '40px',
  h: '40px',
  rounded: 'round',
  bgColor: 'gold9',
  flexShrink: 0,
});

const controls = css({
  display: 'flex',
  flexDir: 'column',
  gap: '2xs',
  w: 'full',
});

const sliderLabel = css({
  display: 'flex',
  flexDir: 'column',
  gap: '3xs',
});

const sliderLabelText = css({
  fontSize: '0',
  color: 'text2',
  lineHeight: 'tight',
});

const sliderInput = css({
  w: 'full',
  cursor: 'pointer',
});

const triggerButton = css({
  mt: '2xs',
  px: 's',
  py: '2xs',
  fontSize: '1',
  lineHeight: 'tight',
  rounded: 'card',
  border: '1px solid',
  borderColor: 'slate6',
  bgColor: 'surface1',
  cursor: 'pointer',
  transition: 'default',
  transitionProperty: 'background-color',
  _hover: {
    bgColor: 'slate4',
  },
});
