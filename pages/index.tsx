import type { NextPage } from 'next';
import { request, gql } from 'graphql-request'
import Container from '../components/Container';
import Image from 'next/image'
import NavButton from '../components/NavButton';
import InnerContainer from '../components/InnerContainer';
import TechStack from '../components/TechStack';
import { Suspense, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const Home: NextPage = () => {
  const { publicURL: resumeURL, error } = supabase.storage
                                          .from('public')
                                          .getPublicUrl('URENA_RESUME.pdf');
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
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Currently studying Computer Science at the Polytechnic University of the Philippines - Sta. Mesa.
              </p>
              {!error && <a href={resumeURL!} target="_blank" rel="noreferrer" download="URENA_RESUME.pdf" className="group mb-16 w-fit">
                  <div className="flex h-10 w-40 justify-center bg-beige-400 transition-all group-hover:bg-main-50">
                      <div className="grid h-10 w-11/12 place-content-center border-x-4 border-brown-800 transition-all group-hover:border-gray-250">
                          <span className="text-brown-800 group-hover:text-gray-250 font-semibold">Get CV</span>
                      </div>
                  </div>
              </a>}
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