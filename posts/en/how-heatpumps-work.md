---
title: 'How do heatpumps work?'
date: '26 February, 2024'
excerpt: 'It is not easy to avoid hearing talk about heat pumps these days and new companies installing them are constantly emerging. Many of us have probably already understood that they are an economical and environmentally friendly heating method. However, have you ever thought about what makes heat pumps so good for the environment and how they actually work in practice? In this post, I will do my best to explain the operation of heat pumps in the most easily understandable way I can.'
tags: 'InLaymansTerms,Physics,Engineering'
keywords: 'heat,pump,transfer,heating,engineering,environment'
language: 'en'
i18n: 'https://niemenjoki.fi/blogi/julkaisu/kuinka-lampopumput-toimivat'
---

It is not easy to avoid hearing talk about heat pumps these days and new companies installing them are constantly emerging. Many of us have probably already understood that they are an economical and environmentally friendly heating method. However, have you ever thought about what makes heat pumps so good for the environment and how they actually work in practice? In this post, I will do my best to explain the operation of heat pumps in the most easily understandable way I can.

## The Physics of Heat Pumps

In order to understand how heat pumps work, we must first learn some physics. Don't worry, you don't need to learn equations. You only need to understand a few principles of physics. Feel free to take a deeper dive into the physics by yourself - if you find it interesting - for example by taking a look at the links at the end of this post.

1. **The pressure, volume and temperature of a gas depend on each other**
   - a) If pressure remains constant, volume and temperature are directly proportional ([Gay-Lussac's law [1]](#references)). If volume increases, temperature increases as well.
   - b) If volume remains constant, pressure and temperature are directly proportional ([Charles's law [2]](#references)). If pressure increases, temperature increases as well.
   - c) If temperature remains constant, volume and pressure are inversely proportional ([Boyle's law [3]](#references)). If volume increases, temperature decreases.
2. **Changes in the state of matter bind and release energy ([Phase transitions [4]](#references)).**
   - a) Melting and vaporization bind energy from their surroundings. In everyday life, this phemonemon can be noticed, for example, by the fact that we feel cold after taking a shower as the water evaporates from our skin.
   - b) Solidification and condensation release energy into their surroundings. This is more difficult to notice in everyday life, but it is nevertheless true.
3. **Energy can neither be created or destroyed. It can only be converted from one form to another ([Conservation of energy [4]](#viittaukset)).**

I will reference these facts later in the text.

## The Efficiency of Heat Pumps

In oil heating, the chemical energy of the oil, and in electric heating, the electrical energy are converted directly into thermal energy. Since energy can't be created from nothing (see 3), conventional heating methods can never achieve more than 100 % efficiency. In reality, some energy is always wasted, so the efficiency ratio is usually around 80-99 %.

<aside>
   <h3>Efficiency ratio</h3>
   <div>
      The efficiency ratio is a number that tells how much of used energy is utilized in the desired way. For example, if we use 5 kWh of electric energy and produce 1 kWh of light, the efficiency ratio is 1 / 5 or 20 %. In other words, we waste 80 % of the used energy on something else, in the case of a lamp, to the lamp heating up.
   </div>
</aside>

A heat pump, on the other hand, transfers existing heat from one place to another, for example from the outside air or the ground, to a building's heating system. The advantage of transferring existing heat is that we can use a small amount of energy to transfer a large amount of heat. In general, the efficiency ratio of heat pumps is around 200-500 % which means that we can create 2-5 kilowatt hours of heat energy by using only a single kilowatt hour of electricity.

## Operation of Heat Pumps

Even in materials that we perceive as cold in our everyday lives, contain thermal energy within them. Heat pumps utilize refrigerants with properties that make it relatively easy to change their state between liquid and gas at the temperatures intended for heat pump operation. The boiling points of these refrigerants depend on pressure, allowing control of their vaporization and condensation by exposing them to different pressures.

<picture>
  <source srcset="/images/posts/how-heatpumps-work/heatpump-diagram.webp" type="image/webp" />
  <source srcset="/images/posts/how-heatpumps-work/heatpump-diagram.jpg" type="image/jpeg" />
  <img src="/images/posts/how-heatpumps-work/heatpump-diagram.jpg" alt="A function diagram of a heat pump" style="max-width: calc(100vw - 4em)" loading="lazy"/>
</picture>

<sup>Image 1: Function diagram of a heat pump. &copy; Joonas Niemenjoki 2024 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en)</sup>

Heat pumps can utilize nearly any heat source, typically ground, air, or water bodies. If the heat source is air, it is blown through the evaporator of a heat pump, and in other cases, heat is usually collected in a heat transfer fluid, which is then circulated through the evaporator.

The air or heat transfer fluid passing through an evaporator releases heat to the cold liquid refrigerant flowing through the coil of the evaporator, causing it to boil and transform into a gaseous state (see 2a).

After this, a compressor compresses the gaseous refrigerant, causing it to heat up significantly (see 1b).

Next, the extremely hot, compressed gas flows through a condenser coil, where it condenses and releases heat to the building (see 2b), as indoor air is blown or the water of a heating system is circulated through the condenser. This is possible because the refrigerant has been heated by the pressure of the compressor to a temperature hotter than indoor air or the heating system's water.

From the condenser, the refrigerant travels to the expansion valve, where its pressure drops significantly, causing it to cool down (see 1b).

The cooled refrigerant then continues to the evaporator to collect heat, and the cycle begins again.

## References

1. [Gay-Lussac's law - Wikipedia](https://en.wikipedia.org/wiki/Gay-Lussac%27s_law)
2. [Charles's law - Wikipedia](https://en.wikipedia.org/wiki/Charles%27s_law)
3. [Boylen laki - Wikipedia](https://en.wikipedia.org/wiki/Boyle%27s_law)
4. [Phase transition - Wikipedia](https://en.wikipedia.org/wiki/Phase_transition)
5. [Conservation of energy - Wikipedia](https://en.wikipedia.org/wiki/Conservation_of_energy)
