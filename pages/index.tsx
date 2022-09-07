import type { NextPage } from 'next';
import { request, gql } from 'graphql-request'
import Container from '../components/Container';
import Image from 'next/image'
import NavButton from '../components/NavButton';
import InnerContainer from '../components/InnerContainer';
import TechStack from '../components/TechStack';
import { Suspense, useEffect, useState } from 'react';

const Home: NextPage = () => {

  return (
    <Suspense fallback={null}>
      <Container>
        <div className="flex flex-col justify-start items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16 space-y-6">
        <h1 className="uppercase tracking-tighter drop-shadow-nier text-6xl">Home</h1>
        <InnerContainer title="About me">
          <div className="flex flex-col-reverse sm:flex-row items-start px-4 pt-4">
            <div className="flex flex-col pr-8">
              <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
                Yuan Ureña
              </h1>
              <h2 className="text-gray-700 dark:text-gray-200 mb-4">
                Freelance Full-stack Web Developer
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-16">
                Currently studying Computer Science at the Polytechnic University of the Philippines - Sta. Mesa.
              </p>
            </div>
            <div className="w-[80px] sm:w-[276px] relative mb-8 sm:mb-0 mr-auto">
              <Image src="/avatar.webp" width={276} height={276}layout="responsive" alt="Avatar" className="rounded-full" />
            </div>
        </div>
        </InnerContainer>
        {<TechStack />}
        <InnerContainer title="Featured Projects">Test</InnerContainer>
        <InnerContainer title="Featured Posts">Test</InnerContainer>
        </div> 
      </Container>
    </Suspense>
  );
};

export default Home;